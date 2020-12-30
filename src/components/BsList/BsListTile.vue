<template>
  <router-link
    v-if="hasRouter"
    v-on="$listeners"
    :active-class="activeClass"
    :class="_classNames"
    :exact="exact"
    :to="path"
    @click="_onClick">
    <bs-ripple
      :active.sync="rippleActive"
      :disabled="_disableRipple"
      class="d-flex">
      <slot></slot>
    </bs-ripple>
  </router-link>
  <a
    :is="_tag"
    v-else
    v-on="$listeners"
    :class="_classNames"
    :href="url"
    @click="_onClick">
    <bs-ripple
      :active.sync="rippleActive"
      :disabled="_disableRipple"
      class="d-flex">
      <slot></slot>
    </bs-ripple>
  </a>
</template>

<script>
import BsRipple from "../BsAnimation/BsRipple";
import RouteAble from '../../mixins/RouteAble';
import ToggleAble from './mixins/ToggleAble';

export default {
    name: "BsListTile",
    components: {BsRipple},
    mixins: [RouteAble, ToggleAble],
    props: {
        /**
         * Component state.
         * @type {boolean|*}
         */
        disabled: {
            type: Boolean,
            default: false
        },
        /**
         * Render ListTile as menu item.
         * @type {boolean|*}
         */
        navigable: {
            type: Boolean,
            default: false
        },
        /**
         * Enabled or disabled ripple effect.
         * @type {boolean|*}
         */
        rippleOff: {
            type: Boolean,
            default: false
        },
    },
    data: () => ({
        rippleActive: false
    }),
    computed: {
        _classNames() {
            return {
                'd-flex': true,
                'md-list-tile': true,
                'md-disabled': this.disabled,
                'md-link': this._tag === 'a' && !this.disabled,
                ['md-' + this.activeClass]: this.isActive && !this.disabled
            }
        },
        _disableRipple() {
            return this.disabled || this.rippleOff || this._tag !== 'a';
        },
        _tag() {
            return this.hasRouter || this.hasLink || this.navigable ? 'a' : 'div';
        }
    },
    beforeUpdate() {
        this._routeMatch();
    },
    methods: {
        _onClick() {
            this.$emit('input', !this.active);
        },
        _routeMatch() {
            if (this.hasRouter && this.$route.path === this.path) {
                this.itemActive = true;
                this.$nextTick(() => {
                    this.$emit('input', true);
                });
            }
        }
    },
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";
@import "../../../scss/functions";
@import "../../../scss/mixins";

.#{$prefix}-list-tile {
    @include transition($transition-hoverable);
    @include user-select(none);
    color: inherit;
    margin: 0;
    position: relative;
    text-decoration: none;

    &:active,
    &:focus,
    &:hover {
        text-decoration: none;
    }

    .#{$prefix}-list-tile-title,
    .#{$prefix}-list-tile-subtitle {
        @include transition(.3s cubic-bezier(.25, .8, .5, 1));
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }

    .#{$prefix}-list-tile-action {
        min-width: 24px;
        max-width: 100%;

        &.#{$prefix}-action-stack {
            @include align-self(flex-start);
        }

        .#{$prefix}-checkbox {
            margin-top: $padding-sm;
        }
    }

    .#{$prefix}-list-tile-leading {
        max-width: 100%;
    }

    .#{$prefix}-list-tile-content {
        @include flexbox((flex: 1, align-self: center));
        max-width: 100%;
        width: auto;
        overflow: hidden;

        > .#{$prefix}-list-tile-title {
            font-size: 1rem;
            font-weight: $font-weight-normal;
        }

        > .#{$prefix}-list-tile-subtitle {
            font-size: .88rem;
        }

        &.#{$prefix}-multiline {
            > .#{$prefix}-list-tile-subtitle {
                white-space: normal;
            }
        }
    }

    > .#{$prefix}-ripple {
        min-height: 48px;
        padding: $padding-sm $padding-base;
        position: relative;

        > div[class^="#{$prefix}-list-tile-"] {
            &:nth-child(2),
            &:last-child:not(:first-child) {
                margin-left: $padding-base;
            }

            &.#{$prefix}-has-icon {
                @include flexbox((display: flex, align-items: center, align-self: center, justify-content: center));
                margin-right: $padding-base;
            }
        }
    }
}

.#{$prefix}-list {
    &.#{$prefix}-space-both,
    &.#{$prefix}-space-left,
    &.#{$prefix}-space-right {
        > .#{$prefix}-list-tile {
            margin-bottom: 4px;
            margin-top: 4px;

            > .#{$prefix}-ripple {
                min-height: 46px;
            }
        }
    }

    &.#{$prefix}-space-both,
    &.#{$prefix}-space-left {
        > .#{$prefix}-list-tile {
            margin-left: 6px;

            > .#{$prefix}-ripple {
                padding-left: 10px;
            }
        }
    }

    &.#{$prefix}-space-both,
    &.#{$prefix}-space-right {
        > .#{$prefix}-list-tile {
            margin-right: 6px;

            > .#{$prefix}-ripple {
                padding-right: 10px;
            }
        }
    }

    &.#{$prefix}-border-left,
    &.#{$prefix}-border-right,
    &.#{$prefix}-border-left-right,
    &.#{$prefix}-border-top,
    &.#{$prefix}-border-bottom,
    &.#{$prefix}-border-top-bottom {
        > .#{$prefix}-list-tile {
            &.active, &.#{$prefix}-active {
                > .#{$prefix}-ripple {
                    &:before,
                    &:after {
                        content: " ";
                        display: block;
                        position: absolute;
                    }
                }
            }
        }
    }

    &.#{$prefix}-border-left,
    &.#{$prefix}-border-left-right {
        > .#{$prefix}-list-tile {
            &.active, &.#{$prefix}-active {
                > .#{$prefix}-ripple {
                    &:before {
                        background: $sidebar-item-active-bgcolor;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 5px;
                    }
                }
            }
        }
    }

    &.#{$prefix}-border-right,
    &.#{$prefix}-border-left-right {
        > .#{$prefix}-list-tile {
            &.active, &.#{$prefix}-active {
                > .#{$prefix}-ripple {
                    &:after {
                        background: $sidebar-item-active-bgcolor;
                        right: 0;
                        top: 0;
                        height: 100%;
                        width: 5px;
                    }
                }
            }
        }
    }

    &.#{$prefix}-border-top,
    &.#{$prefix}-border-top-bottom {
        > .#{$prefix}-list-tile {
            &.active, &.#{$prefix}-active {
                > .#{$prefix}-ripple {
                    &:before {
                        background: $sidebar-item-active-bgcolor;
                        left: 0;
                        top: 0;
                        height: 5px;
                        width: 100%;
                    }
                }
            }
        }
    }

    &.#{$prefix}-border-bottom,
    &.#{$prefix}-border-top-bottom {
        > .#{$prefix}-list-tile {
            &.active, &.#{$prefix}-active {
                > .#{$prefix}-ripple {
                    &:after {
                        background: $sidebar-item-active-bgcolor;
                        left: 0;
                        bottom: 0;
                        height: 5px;
                        width: 100%;
                    }
                }
            }
        }
    }

}

@include bslist-variant(white, #fff);

@each $name, $color in $material-colors {
    @include bslist-variant($name, $color);
}

@each $name, $color in $theme-colors {
    @include bslist-variant($name, $color);
}
</style>
