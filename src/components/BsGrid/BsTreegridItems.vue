<template>
  <tbody>
    <tr
      v-for="(item, index) in visibleItems"
      :key="'row-' + index"
      :class="_rowClasses(index)"
      role="row">
      <slot v-bind="{ index: index, item: item.data, level: item.depth, node: item }">
        <template v-for="(column, colIdx) in columns">
          <component
            :is="_componentName(colIdx)"
            :column="column"
            :index="colIdx"
            :item="item.data"
            :node="item"
            :key="column.field + '-' + _uuid()" />
        </template>
      </slot>
    </tr>
  </tbody>
</template>

<script>
/**
 * TreeNode data type.
 *
 * @typedef {Object} ITreeNode
 * @property {BsModel|Object} data The Node's data model
 * @property {number} depth        The Node's depth level in the TreeList
 * @property {number} index        The Node's absolute index position in the ArrayList
 * @property {ITreeNode} parent    The parent of this Node
 * @property {boolean} leaf        The Node's flag, describe it is the last child in the TreeList or not
 * @property {boolean} expanded    The Node's state, expanded or collapsed
 */
import BsTreeStore from "../../model/BsTreeStore";
import BsTreegridCell from "./BsTreegridCell";
import BsGridCell from "./BsGridCell";
import Common from "../../mixins/Common";
import Helper from "../../utils/Helper";

export default {
    name: "BsTreegridItems",
    components: {BsTreegridCell, BsGridCell},
    mixins: [Common],
    inject: ['TreeGrid'],
    props: {
        columns: {
            type: Array,
            default: undefined
        },
        items: {
            type: Array,
            default: undefined
        }
    },
    data: () => ({
        childrenFieldmap: '',
        treeNodes: []
    }),
    computed: {
        visibleItems() {
            return this.treeNodes.filter(node => {
                return node.depth === 0 || node.expanded || node.parent.expanded;
            });
        }
    },
    created() {
        this.treeNodes = [];
        this.childrenFieldmap = this.TreeGrid.childrenFieldmap;
    },
    beforeDestroy() {
        this.treeNodes = null;
    },
    methods: {
        /**
         * Get component's name at the given index.
         *
         * @param {int} columnIndex Column index position
         * @returns {string} The component's name
         * @private
         */
        _componentName(columnIndex) {
            return columnIndex === 0 ? 'bs-treegrid-cell' : 'bs-grid-cell';
        },
        /**
         * Get row css class at the given index.
         *
         * @param {int} index Absolute index position
         * @returns {string[]} Css classes
         * @private
         */
        _rowClasses(index) {
            return [
                index % 2 === 0 ? 'md-grid-row' : 'md-grid-row-alt',
            ]
        },
        /**
         * Append childnodes to the treeitems.
         *
         * @param {ITreeNode} parentNode     Parent node
         * @param {BsModel[]|Object[]} datas Collection of data model
         * @returns {void}
         * @private
         */
        _appendChild(parentNode, datas) {
            let tmpNodes = [];

            for (let i = 0; i < this.treeNodes.length; i++) {
                const node = this.treeNodes[i];
                tmpNodes.push(node);

                if (node === parentNode) {
                    let rowIndex = i + 1;
                    for (const data of datas) {
                        const childNode = this._createNode(data, parentNode, (parentNode.depth + 1), rowIndex, false);
                        tmpNodes.push(childNode);
                        rowIndex++;
                    }
                }
                node.index = i;
            }

            this.treeNodes = tmpNodes;
        },
        /**
         * Create ITreeNode from the given data model.
         *
         * @param {BsModel|Object} data   Data model
         * @param {ITreeNode} parentNode  Parent node
         * @param {int} depth             Node depth level within the TreeList
         * @param {int} index             Absolute node index position within the TreeList
         * @param {boolean} expanded      The node state
         * @returns {ITreeNode} The treeNode
         * @private
         */
        _createNode(data, parentNode, depth, index, expanded) {
            return {
                data: data,
                depth: depth,
                index: index,
                parent: parentNode,
                leaf: this.hasChildren(data) === false,
                expanded: expanded
            }
        },
        /**
         * Iterate childnodes and put them to the given collection.
         *
         * @param {ITreeNode} parentNode   Parent node whos child will be iterated
         * @param {ITreeNode[]} collection An array collection to store the childnodes
         * @returns {void}
         * @private
         */
        _iterateChildNode(parentNode, collection) {
            for (let i = parentNode.index; i < this.treeNodes.length; i++) {
                const node = this.treeNodes[i];
                if (node.parent === parentNode) {
                    collection.push(node);
                    if (this.hasChildren(node.data)) {
                        this._iterateChildNode(node, collection);
                    }
                }
            }
        },
        /**
         * Collapse the given node and fires event <b>collapsed</b>.
         *
         * @param {ITreeNode} node The node to collapse
         * @returns {void}
         */
        collapse(node) {
            let collapsedNodes = [];

            collapsedNodes.push(node);
            if (this.hasChildren(node.data)) {
                this._iterateChildNode(node, collapsedNodes);
            }
            for (const item of collapsedNodes) {
                item.expanded = false;
            }

            this.TreeGrid.fireEvent('collapsed', node);
        },
        /**
         * Expand the given node and fires event <b>expanded</b>.
         *
         * @param {ITreeNode} node The node to expand
         * @returns {void}
         */
        expand(node) {
            const children = this.getChildren(node.data);
            const adapter = this.TreeGrid.dataSource;

            if (this.hasChildren(node.data) && Helper.isEmpty(children) && (adapter instanceof BsTreeStore)) {
                adapter.loadChildren(node.data).then(response => {
                    const responseData = response.data;

                    // Dirty check, populate nodes if condition has been met
                    if (responseData.hasOwnProperty(adapter._config.dataProperty) && responseData.data.length > 0) {
                        this._appendChild(node, this.getChildren(node.data));
                    }
                }).catch(error => {
                    this.TreeGrid.fireEvent('error', error);
                });
            } else if (Helper.isEmpty(children)) {
                node.leaf = true;
            }

            if (node.leaf === false) {
                node.expanded = true;
                this.TreeGrid.fireEvent('expanded', node);
            }
        },
        /**
         * Get children of the given data model.
         *
         * @param {BsModel|Object} item Data model
         * @returns {BsModel[]|Object[]} The child items
         */
        getChildren(item) {
            return item[this.childrenFieldmap];
        },
        /**
         * Check if the given data model has one or more child or not.
         *
         * @param {Object} item Data model to check
         * @returns {boolean} TRUE if the given model has child otherwise FALSE
         */
        hasChildren(item) {
            const children = this.getChildren(item);

            return item.hasChildren === true || item.leaf === false || (Helper.isArray(children) && children.length > 0);
        },
        /**
         * Populate and create list of nodes from the given data sources.
         *
         * @param {int} depth                   Node depth level
         * @param {BsModel[]|Object[]} sources  Collection of data model
         * @param {ITreeNode|*} parentNode      Parent node
         * @returns {void}
         */
        populateNodes(depth, sources, parentNode = null) {
            const expandDepth = this.TreeGrid.expandDepth;
            const expanded = this.TreeGrid.expanded;
            let rowIndex = this.treeNodes.length;

            for (const source of sources) {
                const node = this._createNode(
                    source, parentNode, depth, rowIndex,
                    (source.expanded === true ? true : (expandDepth > depth ? true : expanded))
                );

                rowIndex = this.treeNodes.push(node);
                if (this.hasChildren(source)) {
                    this.populateNodes(depth + 1, this.getChildren(source), node);
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
