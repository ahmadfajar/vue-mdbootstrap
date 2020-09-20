<template>
  <div :class="_classNames" class="md-list">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "BsListView",
    props: {
        /**
         * Render ListView with the given color variant.
         * @type {string|*}
         */
        color: {
            type: String,
            default: 'white'
        },
        /**
         * Apply css `'overflow-hidden'` or not.
         * @type {boolean|*}
         */
        overflowHidden: {
            type: Boolean,
            default: false
        },
        /**
         * If `false` then more than one item can be expanded.
         * @type {boolean|*}
         */
        singleExpand: {
            type: Boolean,
            default: true
        },
        /**
         * Give some space around each item. Valid values are: `both`, `left`, `right`.
         * @type {string|*}
         */
        spaceAround: {
            type: String,
            default: undefined,
            validator: v => ['both', 'left', 'right'].indexOf(v) > -1
        },
        /**
         * Give border around the active item.
         * Valid values are: `left`, `right`, `left-right`, `top`, `bottom`, `top-bottom`.
         * @type {string|*}
         */
        activeItemBordered: {
            type: String,
            default: undefined,
            validator: v => ['left', 'right', 'left-right', 'top', 'bottom', 'top-bottom'].indexOf(v) > -1
        },
    },
    data: (vm) => ({
        bsList: {
            items: [],
            singleExpand: vm.singleExpand,
            /**
             * Add an item to the ListView registry.
             *
             * @param {Object} item The object or item instance to add
             * @returns {void}
             */
            addItem: vm.addItem,
            /**
             * Add a child's item to a parent.
             *
             * @param {string} parentUid  The parent item ID
             * @param {Object} child      The object or item instance to add
             * @returns {void}
             */
            addChild: vm.addChild,
            /**
             * Removes an item from the ListView registry.
             *
             * @param {string} uid The ID of item that will be removed
             * @returns {void}
             */
            removeItem: vm.removeItem,
            /**
             * Removes child's item from a parent.
             *
             * @param {string} parentUid The parent item ID
             * @param {string} childUid  The child item ID that will be removed
             * @returns {void}
             */
            removeChild: vm.removeChild,
            /**
             * Find a component in the registry that has active state.
             *
             * @returns {Object} The component instance
             */
            findActive: vm.findActive,
        }
    }),
    provide() {
        return {
            bsList: this.bsList
        }
    },
    computed: {
        _classNames() {
            return {
                'overflow-hidden': this.overflowHidden,
                'md-space-both': this.spaceAround === 'both',
                'md-space-left': this.spaceAround === 'left',
                'md-space-right': this.spaceAround === 'right',
                'md-border-left': this.activeItemBordered === 'left',
                'md-border-right': this.activeItemBordered === 'right',
                'md-border-left-right': this.activeItemBordered === 'left-right',
                'md-border-top': this.activeItemBordered === 'top',
                'md-border-bottom': this.activeItemBordered === 'bottom',
                'md-border-top-bottom': this.activeItemBordered === 'top-bottom',
                [`md-list-${this.color}`]: this.color,
            }
        }
    },
    beforeDestroy() {
        this.bsList.items = null;
        this.bsList = null;
    },
    methods: {
        /**
         * Add an item to the ListView registry.
         *
         * @param {Object} item The object or item instance to add
         * @returns {void}
         */
        addItem(item) {
            this.bsList.items.push(item);
        },
        /**
         * Add a child's item to a parent.
         *
         * @param {string} parentUid  The parent item ID
         * @param {Object} child      The object or item instance to add
         * @returns {void}
         */
        addChild(parentUid, child) {
            const obj = this.bsList.items.find(el => el.uid === parentUid);

            if (obj) {
                if (!obj.children) {
                    obj.children = [];
                }
                obj.children.push(child);
            }
        },
        /**
         * Find a component in the registry that has active state.
         *
         * @returns {Object} The component instance
         */
        findActive() {
            for (const item of this.bsList.items) {
                if (item.component.isActive) {
                    return item.component;
                }
                if (item.children && item.children.length > 0) {
                    for (const child of item.children) {
                        if (child.component.isActive) {
                            return child.component;
                        }
                    }
                }
            }

            return null;
        },
        /**
         * Removes an item from the ListView registry.
         *
         * @param {string} uid The ID of item that will be removed
         * @returns {void}
         */
        removeItem(uid) {
            const index = this.bsList.items.findIndex(el => el.uid === uid);

            if (index > -1) {
                this.bsList.items.splice(index, 1);
            }
        },
        /**
         * Removes child's item from a parent.
         *
         * @param {string} parentUid The parent item ID
         * @param {string} childUid  The child item ID that will be removed
         * @returns {void}
         */
        removeChild(parentUid, childUid) {
            const obj = this.bsList.items.find(el => el.uid === parentUid);

            if (obj) {
                const idx = obj.children.findIndex(el => el.uid === childUid);
                obj.children.splice(idx, 1);
            }
        },
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-list {
    @include transition(height .3s cubic-bezier(.4, 0, .2, 1));
    list-style-type: none;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 8px 0;
    height: 100%;

    .#{$prefix}-subheader {
        @include user-select(none);
    }
}

.card {
    > .#{$prefix}-list:first-child {
        @include border-top-radius($border-radius-base * 2);
    }

    > .#{$prefix}-list:last-child {
        @include border-bottom-radius($border-radius-base * 2);
    }
}
</style>
