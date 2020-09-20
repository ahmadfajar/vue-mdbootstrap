<template>
  <ul v-bind="_attributes" class="md-list-nav">
    <slot></slot>
  </ul>
</template>

<script>
import Helper from "../../utils/Helper";

export default {
    name: "BsListNav",
    props: {
        id: {
            type: String,
            default() {
                return 'bs-' + Helper.uuid(true);
            }
        },
        /**
         * Treat the items inside it as child items..
         * @type {boolean|*}
         */
        child: {
            type: Boolean,
            default: false
        },
    },
    data: () => ({
        collapsing: false,
        expanded: false,
        children: []
    }),
    computed: {
        _attributes() {
            return {
                'id': this.id,
                'class': this._classNames
            }
        },
        _classNames() {
            return {
                'md-nav-child': this.child,
                'collapse': this.child && !this.expanded,
                'collapsing': this.child && this.collapsing,
            }
        },
        hasChild() {
            return this.children.length > 0;
        }
    },
    created() {
        if (this.child) {
            if (this.$parent && this.$parent.$options._componentTag === 'bs-list-nav-item') {
                this.$parent.addChild({uid: this.id, component: this, componentTag: 'bs-list-nav'});
            }
        }
    },
    beforeDestroy() {
        this.children = [];
    },
    methods: {
        /**
         * Add an item to the ListNav registry.
         *
         * @param {Object} item The BsListNavItem instance to add
         * @returns {void}
         */
        addItem(item) {
            this.children.push(item);
        },
        /**
         * Remove an item from the ListNav registry.
         *
         * @param {string} uid The ID of BsListNavItem that will be removed
         * @returns {void}
         */
        removeItem(uid) {
            const index = this.children.findIndex(el => el.uid === uid);

            if (index > -1) {
                this.children.splice(index, 1);
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-list-nav {
    @include display-flex();
    @include flex-wrap(wrap);
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;

    .collapsing {
        @include transition($md-transition-default);
        height: 0;
        overflow: hidden;
    }
}
</style>
