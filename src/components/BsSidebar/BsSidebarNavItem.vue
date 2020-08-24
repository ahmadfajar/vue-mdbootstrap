<template>
  <router-link v-if="hasRouter"
               tag="li"
               :active-class="activeClass"
               :class="['nav-item', _classNames]"
               :exact="exact"
               :to="path"
               @click.native="_onClick">
    <a class="nav-item-inner">
      <bs-ripple class="d-flex flex-row">
        <font-awesome-icon v-if="icon"
                           :icon="icon"
                           :size="iconSize"
                           fixed-width />
        <span class="display-name">{{ label }}</span>
        <font-awesome-icon v-if="parent"
                           class="caret"
                           icon="angle-right" />
      </bs-ripple>
    </a>
    <slot></slot>
  </router-link>
  <li v-else
      :class="['nav-item', _classNames]">
    <a :href="url"
       class="nav-item-inner"
       @click="_onClick">
      <bs-ripple class="d-flex flex-row">
        <font-awesome-icon v-if="icon"
                           :icon="icon"
                           :size="iconSize"
                           fixed-width />
        <span class="display-name">{{ label }}</span>
        <font-awesome-icon v-if="parent"
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
import Helper from '../../utils/Helper';
import RouteAble from "../../mixins/RouteAble";

export default {
    name: 'BsSidebarNavItem',
    components: {FontAwesomeIcon, BsRipple},
    mixins: [RouteAble],
    inject: ['listItems'],
    props: {
        active: {
            type: Boolean,
            default: false
        },
        parent: {
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
        itemActive: vm.active
    }),
    computed: {
        _classNames() {
            return {
                'parent': this.parent,
                'active': this.itemActive || this.active,
                'expanded': this.expanded
            }
        }
    },
    watch: {
        active(value) {
            this.itemActive = value;
        }
    },
    mounted() {
        if (Helper.isArray(this.listItems)) {
            this.listItems.push(this);
        }
        if (this.$el) {
            // this._updateActive(true);
            // const child = this.$el.childNodes[1];

            // console.log('child0', this.$el.childNodes[0]);
            // console.log('child1', this.$el.childNodes[1]);
            // console.log('child2', this.$el.childNodes[2]);

            if (this.parent && !this.active) {
                // child.classList.add('collapse');
            } else if (this.parent && this.active) {
                this.expanded = true;
            }
        }
    },
    methods: {
        /**
         * Event handler when component is clicked.
         *
         * @event click Triggers click event
         * @param {MouseEvent} e The received event
         * @return {void}
         * @private
         */
        _onClick(e) {
            this._updateActive();
            if (this.parent) {
                if (this.$parent.$options._componentTag === 'bs-sidebar-nav') {
                    for (const element of this.$parent.$children) {
                        element.collapse();
                    }
                }
                if (this.expanded) {
                    this.collapse();
                } else {
                    this.expand();
                }

                e.preventDefault();
            }

            this.$emit('click', e);
        },
        /**
         * Update component state, active or in-active.
         *
         * @param {boolean} silent Triggers event or not
         * @return {void}
         * @private
         */
        _updateActive(silent = false) {
            if (!this.parent) {
                for (const item of this.listItems) {
                    item.setActive(false, true);
                }
                if (this.hasRouter) {
                    for (const matcher of this.$route.matched) {
                        if (matcher.path.startsWith(this.path)) {
                            this.$nextTick(() => {
                                this.setActive(true, silent);
                            });
                            break;
                        }
                    }
                }
            }
        },
        /**
         * Collapse or hide submenus of the component.
         * Only has effect if the property: <code>parent = true</code>.
         *
         * @return {void}
         */
        collapse() {
            if (this.parent && this.expanded) {
                // const child = this.$el.childNodes[1];
                // console.log('childNodes[1]', child);
                // child.classList.add('collapsing');
                // Helper.defer(() => {
                //     child.classList.remove('collapsing');
                //     child.classList.add('collapse');
                // }, 500);
                this.$nextTick(() => {
                    this.expanded = false;
                })
            }
        },
        /**
         * Expand or show submenus of the component.
         * Only has effect if the property: <code>parent = true</code>.
         *
         * @return {void}
         */
        expand() {
            if (this.parent && !this.expanded) {
                // const child = this.$el.childNodes[1];
                // console.log('childNodes[1]', child);
                // child.classList.remove('collapse');
                this.expanded = true;
            }
        },
        /**
         * Sets the component state as active or in-active.
         *
         * @param {boolean} value  The state
         * @param {boolean} silent Triggers event or not
         * @return {void}
         */
        setActive(value, silent = false) {
            this.itemActive = value;
            if (silent === false) {
                this.$emit('update:active', this.itemActive);
            }

            if (this.$parent.$parent && this.$parent.$parent.$options._componentTag === 'bs-sidebar-nav-item') {
                this.$parent.$parent.setActive(this.itemActive, silent);
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-sidebar,
.#{$prefix}-side-drawer {
  > .#{$prefix}-sidebar-inner,
  > .#{$prefix}-side-drawer-inner {
    > .#{$prefix}-sidebar-nav {
      .nav-item {
        position: relative;
        white-space: nowrap;
        width: 100%;

        &:hover {
          background-color: $sidebar-hover-bgcolor;
        }

        &.expanded {
          background-color: $sidebar-expanded-bgcolor;
        }

        &.active {
          > .nav-item-inner {
            .display-name {
              font-weight: $font-weight-bold;
            }
          }

          &.parent:not(.expanded) {
            background: $sidebar-active-bgcolor;
          }

          &:not(.parent) {
            background-color: $sidebar-active-bgcolor;

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

        > .nav-item-inner {
          cursor: pointer;
          outline: 0 none;

          > .#{$prefix}-ripple {
            height: 46px;
            line-height: 1;
            padding: $sidebar-item-padding;

            > .display-name {
              @include transition(opacity .8s);
              opacity: 1;
            }

            > .fas, > svg {
              margin-right: .5rem;
            }
          }

          &:hover,
          &:focus,
          &:active {
            text-decoration: none;
          }
        }

        &.parent {
          > .nav-child {
            > .nav-item > .nav-item-inner > .#{$prefix}-ripple {
              padding-left: 1.7rem;
            }
          }

          .nav-item-inner .caret {
            @include transition(all 0.3s ease 0s);
            @include transform(rotateZ(0deg));
            margin-left: auto;
            margin-right: $caret-margin;
          }

          &.expanded {
            .nav-item-inner .caret {
              @include transition(all 0.3s ease 0s);
              @include transform(rotateZ(90deg));
            }
          }
        }

        &.divider {
          border-bottom: 1px solid var(--light);
        }
      }
    }
  }

  &.#{$prefix}-mini {
    > .#{$prefix}-sidebar-inner,
    > .#{$prefix}-side-drawer-inner {
      > .#{$prefix}-sidebar-nav {
        .nav-item {
          > .nav-item-inner {
            > .#{$prefix}-ripple {
              > .display-name {
                opacity: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
