<template>
  <div class="md-list" :class="_classNames">
    <slot></slot>
  </div>
</template>

<script>
import "../../../scss/_others.scss";

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
                [`md-list-${this.color}`]: this.color,
            }
        }
    },
    beforeDestroy() {
        this.bsList.items = null;
        this.bsList       = null;
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
        findActive() {
            for (const item of this.bsList.items) {
                for (const child of item.component.children) {
                    if (child.component.active) {
                        return child.component;
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

  a {
    cursor: pointer;
    text-decoration: none;
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
