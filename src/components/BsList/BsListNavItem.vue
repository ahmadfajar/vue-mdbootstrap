<template>
  <router-link v-if="hasRouter"
               tag="li"
               :active-class="activeClass"
               :class="_classNames"
               :exact="exact"
               :to="path"
               :id="id"
               @click.native="_onClick">
    <a class="md-nav-item-inner">
      <bs-ripple class="d-flex flex-row" :style="_styles">
        <font-awesome-icon v-if="icon"
                           :icon="icon"
                           :size="iconSize"
                           fixed-width />
        <span class="md-nav-text">{{ label }}</span>
        <font-awesome-icon v-if="hasChild"
                           class="caret"
                           icon="angle-right" />
      </bs-ripple>
    </a>
    <slot></slot>
  </router-link>
  <li v-else
      :id="id"
      :class="_classNames">
    <a :href="url"
       class="md-nav-item-inner"
       @click="_onClick">
      <bs-ripple class="d-flex flex-row" :style="_styles">
        <font-awesome-icon v-if="icon"
                           :icon="icon"
                           :size="iconSize"
                           fixed-width />
        <span class="md-nav-text">{{ label }}</span>
        <font-awesome-icon v-if="hasChild"
                           class="caret"
                           icon="angle-right" />
      </bs-ripple>
    </a>
    <slot></slot>
  </li>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsRipple from '../BsAnimation/BsRipple';
import RouteAble from "../../mixins/RouteAble";
import ToggleAble from "./mixins/ToggleAble";
import Helper from "../../utils/Helper";

export default {
    name: "BsListNavItem",
    components: {FontAwesomeIcon, BsRipple},
    mixins: [RouteAble, ToggleAble],
    inject: ['bsList'],
    props: {
        id: {
            type: String,
            default() {
                return 'bs-' + Helper.uuid(true);
            }
        },
        /**
         * Component item state.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Any valid FontAwesome icon name,
         * see {@link [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free)} for details
         * @type {string|Array|*}
         */
        icon: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Render the icon with predefined size, valid values are: `xs`, `sm`, `lg`, `1x`, `2x`, `3x`.
         * @type {string|*}
         */
        iconSize: {
            type: String,
            default: undefined,
            validator(v) {
                return ['lg', 'xs', 'sm', '1x', '2x', '3x'].indexOf(v) > -1;
            }
        },
        /**
         * Item depth level in tree hierarchy.
         * @type {number|*}
         */
        depth: {
            type: [String, Number],
            default: undefined,
            validator(v) {
                return !isNaN(parseInt(v, 10));
            }
        },
        /**
         * Text indentation from left side.
         * @type {string|number|*}
         */
        indent: {
            type: [String, Number],
            default: undefined
        },
        /**
         * The text to render as item label.
         * @type {string|*}
         */
        label: {
            type: String,
            default: undefined
        }
    },
    data: (vm) => ({
        children: [],
        expanded: false,
        itemActive: vm.active,
    }),
    computed: {
        _classNames() {
            return {
                'md-nav-item': true,
                'md-parent': this.hasChild,
                'md-disabled': this.disabled,
                'md-expanded': this.hasChild && this.expanded,
                'md-has-icon': !Helper.isEmpty(this.icon),
                ['md-' + this.activeClass]: this.itemActive && !this.disabled
            }
        },
        _styles() {
            const indent = 1.2 + (this.depth ? (parseInt(this.depth, 10) * 0.75) : 0);
            return {
                'padding-left': this.indent
                    ? Helper.sizeUnit(this.indent)
                    : (this.depth ? Helper.sizeUnit(indent, 'rem') : null)
            }
        },
        hasChild() {
            return this.children.length > 0;
        }
    },
    watch: {
        active(value) {
            this.itemActive = value;
            this.$emit('input', value);
        },
        itemActive(value) {
            if (value) {
                this.expand();
            }
            this.$emit('update:active', value, this);
        }
    },
    created() {
        if (this.bsList && this.$parent.$options._componentTag === 'bs-list-nav') {
            const item = {uid: this.id, component: this, componentTag: 'bs-list-nav-item'};

            if (this.$parent.child) {
                this.$parent.addItem(item);
            } else {
                this.bsList.addItem(item);
            }
        }
        if (this.hasRouter) {
            for (const matcher of this.$route.matched) {
                if (matcher.path === this.path) {
                    this.$nextTick(() => {
                        this.itemActive = true;
                    });
                    this._updateState(this.id, this.bsList.items);
                    break;
                }
            }
        }
    },
    beforeDestroy() {
        this.children = [];
    },
    methods: {
        _collapse(item) {
            if (item.component.hasChild) {
                for (const child of item.component.children) {
                    this._collapse(child);
                }
            }

            if (item.componentTag === 'bs-list-nav') {
                item.component.collapsing = true;
                Helper.defer(() => {
                    item.component.collapsing = false;
                    item.component.expanded   = false;
                }, 300);
            } else {
                item.component.expanded = false;
            }
        },
        /**
         * Check if collection of object contains item with the given UUID.
         *
         * @param {string} uid     The UUID to check
         * @param {Object[]} items Collection of object to iterate
         * @returns {boolean} TRUE if items contains item with the given UUID otherwise FALSE
         */
        _containsChild(uid, items) {
            let found = false;

            for (const item of items) {
                if (uid === item.uid) {
                    found = true;
                    break;
                } else if (item.component.children.length > 0) {
                    found = this._containsChild(uid, item.component.children);
                    if (found === true) {
                        break;
                    }
                }
            }

            return found;
        },
        /**
         * Event handler when component is clicked.
         *
         * @event click Triggers click event
         * @param {MouseEvent} e The received event
         * @returns {void}
         * @private
         */
        _onClick(e) {
            if (!this.disabled) {
                if (!this.hasChild && !this.itemActive) {
                    this.itemActive = true;
                    this._updateState(this.id, this.bsList.items);
                } else if (this.hasChild) {
                    if (this.expanded) {
                        this.collapse();
                    } else {
                        this.expand();
                    }
                }
                this.$emit('click', e);
            }
        },
        /**
         * Update component `itemActive` property to `false` if itemID doesn't match the given UUID.
         * If itemID matches the given UUID, then all its parent will have `itemActive` property to `true`.
         *
         * @param {string} uid     The UUID to check
         * @param {Object[]} items Collection of object to iterate
         * @returns {void}
         */
        _updateState(uid, items) {
            for (const item of items) {
                if (uid === item.uid) {
                    item.component.itemActive = true;
                    // iterate parent component
                    let iterator              = this.$parent;
                    let cmpTag                = iterator.$options._componentTag;

                    while (cmpTag.startsWith('bs-list-nav')) {
                        if (cmpTag === 'bs-list-nav-item') {
                            iterator.itemActive = true;
                        }
                        iterator.expanded = true;
                        iterator          = iterator.$parent;
                        cmpTag            = iterator.$options._componentTag;
                    }
                } else if (item.componentTag === 'bs-list-nav-item') {
                    item.component.itemActive = false;
                }
                if (item.component.children.length > 0) {
                    this._updateState(uid, item.component.children);
                }
            }
        },
        /**
         * Add a child item to the ListNavItem registry.
         *
         * @param {Object} item The BsListNavItem instance to add
         * @returns {void}
         */
        addChild(item) {
            this.children.push(item);
        },
        /**
         * Collapse current item and hide its child-items.
         * Only has effect if the property: <code>hasChild = true</code>.
         *
         * @returns {void}
         */
        collapse() {
            for (const child of this.children) {
                this.expanded = false;
                this._collapse(child);
            }
        },
        /**
         * Expand current item and show its child-items.
         * Only has effect if the property: <code>hasChild = true</code>.
         *
         * @returns {void}
         */
        expand() {
            if (this.hasChild && !this.expanded) {
                if (this.bsList && this.bsList.singleExpand) {
                    for (const item of this.bsList.items) {
                        if (item.uid !== this.id &&
                            !this._containsChild(this.id, item.component.children)) {
                            item.component.collapse();
                        }
                    }
                    if (this.$parent.$options._componentTag === 'bs-list-nav' && this.depth > 0) {
                        for (const child of this.$parent.children) {
                            if (child.uid !== this.id) {
                                child.component.collapse();
                            }
                        }
                    }
                }
                this.expanded = true;
                for (const child of this.children) {
                    if (child.componentTag === 'bs-list-nav') {
                        child.component.expanded = true;
                    }
                }
            }
        },
        /**
         * Remove a child item from the ListNavItem registry.
         *
         * @param {string} uid The ID of BsListNavItem that will be removed
         * @returns {void}
         */
        removeChild(uid) {
            const index = this.children.findIndex(el => el.uid === uid);

            if (index > -1) {
                this.children.splice(index, 1);
            }
        },
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/shared";
@import "../../../scss/functions";
@import "../../../scss/mixins";

.#{$prefix}-list {
  .#{$prefix}-nav-item {
    position: relative;
    white-space: nowrap;
    width: 100%;

    > .#{$prefix}-nav-item-inner {
      @extend %cursor-pointer;
      outline: 0 none;

      > .#{$prefix}-ripple {
        height: 46px;
        line-height: normal;
        padding: .75rem 0 .75rem 1.2rem;

        > .#{$prefix}-nav-text {
          @include transition(opacity .8s);
          @extend %opacity-100
        }

        > .fas, > svg {
          margin-right: .5rem;
        }
      }

      .caret {
        @include transition(all 0.3s ease 0s);
        @include transform(rotateZ(0deg));
        margin-left: auto;
        margin-right: $caret-margin;
      }

      &:hover,
      &:focus,
      &:active {
        text-decoration: none;
      }
    }

    &.#{$prefix}-expanded {
      > .#{$prefix}-nav-item-inner {
        .caret {
          @include transform(rotateZ(90deg));
        }
      }
    }

    &.#{$prefix}-active {
      &:not(.#{$prefix}-parent) {
        > .#{$prefix}-nav-item-inner {
          font-weight: $font-weight-bold;
        }

        &:before {
          background: $sidebar-item-active-bgcolor;
          content: " ";
          display: block;
          left: 0;
          top: 0;
          position: absolute;
          height: 100%;
          width: 5px;
        }
      }
    }

    &.#{$prefix}-parent {
      &:not(.#{$prefix}-has-icon) {
        > .#{$prefix}-nav-child {
          > .#{$prefix}-nav-item {
            > .#{$prefix}-nav-item-inner {
              > .#{$prefix}-ripple {
                padding-left: 1.75rem;
              }
            }
          }
        }
      }

      &.#{$prefix}-has-icon {
        > .#{$prefix}-nav-child {
          > .#{$prefix}-nav-item {
            > .#{$prefix}-nav-item-inner {
              > .#{$prefix}-ripple {
                padding-left: 3rem;
              }
            }
          }
        }
      }
    }
  }
}

@include bslist-nav-variant(white, #fff);

@each $name, $color in $material-colors {
  @include bslist-nav-variant($name, $color);
}

@each $name, $color in $theme-colors {
  @include bslist-nav-variant($name, $color);
}
</style>
