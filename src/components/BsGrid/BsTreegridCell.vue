<template>
  <td
    :class="column ? column.columnCls : null"
    class="md-grid-cell md-treegrid-cell"
    role="gridcell">
    <div class="d-flex">
      <bs-icon
        v-for="idx in _arrayDepth"
        :key="'bsIcon-' + idx"
        :class="{'expanded': node.expanded}"
        :icon="_iconName(_arrayDepth.length, idx)"
        class="text-grey-600"
        size="20"
        @click="_onIconClick(_arrayDepth.length, idx)" />
      <div :class="_cellStyles" class="md-grid-cell-inner">
        <slot>
          <div v-if="hasFormatter" v-html="value"></div>
          <template v-else>
            {{ value === '' || value === null ? '&nbsp;' : value }}
          </template>
        </slot>
      </div>
    </div>
  </td>
</template>

<script>
import BsIcon from "../BsIcon/BsIcon";
import Helper from "../../utils/Helper";
import Cell from "./mixins/Cell";

export default {
    name: "BsTreegridCell",
    components: {BsIcon},
    mixins: [Cell],
    props: {
        node: {
            type: Object,
            default: undefined
        }
    },
    computed: {
        _arrayDepth() {
            if (this.node.depth > -1) {
                return Helper.createRange(this.node.depth + 1);
            }

            return [];
        }
    },
    methods: {
        _iconName(length, index) {
            if (this.node.leaf === false && (index === length - 1)) {
                return 'chevron-right';
            }

            return '';
        },
        _onIconClick(length, index) {
            if (this.node.leaf === false && (index === length - 1)) {
                if (this.node.expanded) {
                    this.$parent.collapse(this.node);
                } else {
                    this.$parent.expand(this.node);
                }
            }
        }
    }
}
</script>

<style scoped>

</style>
