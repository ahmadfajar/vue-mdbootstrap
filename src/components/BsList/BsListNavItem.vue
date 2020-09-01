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
      <bs-ripple class="d-flex flex-row">
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
      <bs-ripple class="d-flex flex-row">
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
        disabled: {
            type: Boolean,
            default: false
        },
        hasChild: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: undefined
        },
        icon: {
            type: [String, Array],
            default: undefined
        },
        iconSize: {
            type: String,
            default: undefined
        }
    },
    data: (vm) => ({
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
        }
    },
    watch: {
        active(value) {
            this.itemActive = value;
        },
        itemActive(value) {
            if (value) {
                this.expand();
            } else {
                this.collapse();
            }
            this.$emit('input', value);
        }
    },
    created() {
        if (this.bsList) {
            if (this.$parent.$options._componentTag === 'bs-list-nav') {
                this.bsList.addChild(this.$parent.id, {uid: this.id, component: this});
            }
        }
        if (this.hasRouter) {
            for (const matcher of this.$route.matched) {
                if (matcher.path === this.path) {
                    this.$nextTick(() => {
                        this.itemActive = true;
                    });
                    this._updateState();
                    break;
                }
            }
        }
    },
    methods: {
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
                    this._updateState();
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
        _updateState() {
            // update other component state
            for (const item of this.bsList.items) {
                for (const child of item.component.children) {
                    child.component.itemActive = child.uid === this.id;
                }
            }

            // iterate parent component
            let iter = this.$parent;
            let tag  = iter.$options._componentTag;

            while (tag.startsWith('bs-list-nav')) {
                if (tag === 'bs-list-nav-item') {
                    iter.itemActive = true;
                }
                iter.expanded = true;
                iter = iter.$parent;
                tag  = iter.$options._componentTag;
            }
        },
        /**
         * Collapse current item and hide its child-items.
         * Only has effect if the property: <code>hasChild = true</code>.
         *
         * @returns {void}
         */
        collapse() {
            if (this.hasChild && this.expanded) {
                this.expanded = false;

                for (const child of this.$children) {
                    if (child && child.$options._componentTag === 'bs-list-nav') {
                        child.collapsing = true;
                        Helper.defer(() => {
                            child.collapsing = false;
                            child.expanded   = false;
                        }, 500);
                        // this.$nextTick().then(() => {
                        //     child.collapsing = false;
                        //     child.expanded   = false;
                        // });
                    }
                }
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
                    for (const el of this.bsList.items) {
                        for (const child of el.component.children) {
                            if (child.uid !== this.id && child.component.hasChild) {
                                child.component.collapse();
                            }
                        }
                    }
                }
                this.expanded = true;
                for (const child of this.$children) {
                    if (child && child.$options._componentTag === 'bs-list-nav') {
                        child.expanded = true;
                    }
                }
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

.#{$prefix}-list-nav {
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
