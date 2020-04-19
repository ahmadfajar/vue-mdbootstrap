<template>
  <div :is="_tagName"
       :class="_classNames"
       v-bind="_attributes"
       v-on="$listeners">
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'BsTabs',
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        align: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right', 'center', 'justified'].indexOf(value) !== -1;
            }
        },
        orientation: {
            type: String,
            default: 'horizontal',
            validator(value) {
                return ['horizontal', 'vertical'].indexOf(value) !== -1;
            }
        },
        variant: {
            type: String,
            default: 'tabs',
            validator(value) {
                return ['tabs', 'pills', 'modern', 'material'].indexOf(value) !== -1;
            }
        },
        iconPosition: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right', 'top', 'bottom'].indexOf(value) !== -1;
            }
        },
        iconSize: {
            type: String,
            default: undefined
        },
        color: {
            type: String,
            default: undefined
        },
        flex: {
            type: Boolean,
            default: false
        },
        value: {
            type: [String, Number, Object],
            default: undefined
        }
    },
    provide() {
        return {
            tabs: {
                iconPosition: this.iconPosition,
                iconSize: this.iconSize,
                align: this.align,
                variant: this.variant,
                register: this.register,
                unregister: this.unregister,
                setActiveTab: this.setActiveTab
            }
        }
    },
    data: () => ({
        activeTab: null,
        tabs: []
    }),
    computed: {
        /**
         * Get computed binding's attributes.
         *
         * @return {Object} HTML attributes
         * @private
         */
        _attributes() {
            return {
                'role': 'tablist',
                'aria-orientation': this.orientation
            }
        },
        /**
         * Get computed component's class names.
         *
         * @return {String[]} Css class names
         * @private
         */
        _classNames() {
            return [
                'nav',
                'nav-' + this.variant,
                this.align === 'justified' && this.orientation === 'horizontal' ?
                    (this.flex ? 'flex-column flex-sm-row' : 'nav-justified')
                    : this.orientation === 'vertical' ? 'flex-column' : '',
                this.align === 'center' && this.orientation === 'horizontal' ? 'justify-content-center' : '',
                this.align === 'right' && this.orientation === 'horizontal' ? 'justify-content-end' : '',
                ['material', 'modern'].indexOf(this.variant) > -1 ? this.color : ''
            ]
        },
        /**
         * Get computed html TAG.
         *
         * @return {string} HTML tag
         * @private
         */
        _tagName() {
            return this.variant === 'pills' ? 'ul' : 'div'
        }
    },
    watch: {
        value(key) {
            this._activateTab(key);
        }
    },
    beforeDestroy() {
        this.activeTab = null;
    },
    mounted() {
        this.setActiveTab(this.value);
    },
    methods: {
        register(tab) {
            return this.tabs.push(tab);
        },
        unregister(idx) {
            this.tabs.splice(idx, 1);
        },
        setActiveTab(key) {
            let tab, obj;

            if (!isNaN(parseInt(key, 10))) {
                tab = this.tabs[key];
            }
            if (!tab) {
                tab = this.tabs.find(el => el.id === key);
            }
            if (tab) {
                this.tabs.forEach(el => el.active = false);
                tab.active = true;
                this.$emit('tabchange', tab, this.activeTab);

                if (tab.id && tab.target) {
                    obj = {target: tab.target, tabref: tab.id};
                    this.$emit('input', obj);
                } else {
                    this.$emit('input', tab.tabIndex);
                }

                this.activeTab = tab;
            }
        },
        _activateTab(key) {
            let tab;

            if (!isNaN(parseInt(key, 10))) {
                tab = this.tabs[key];
            }
            if (!tab) {
                tab = this.tabs.find(el => el.id === key);
            }
            if (tab) {
                this.tabs.forEach(el => el.active = false);
                tab.active     = true;
                this.activeTab = tab;
            }
        }
    }
}
</script>

<style lang="scss">
  @import "~bootstrap/scss/functions";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins/breakpoints";
  @import "~compass-sass-mixins/lib/compass/css3";
  @import "../../../scss/colors";
  @import "../../../scss/variables";

  .nav {
    .nav-link {
      cursor: pointer;
      font-size: .95rem;
      outline: 0 none;
      padding: 0;

      > .#{$prefix}-ripple {
        @include user-select(none);
        padding: $tab-padding-base;
      }
    }

    &.nav-pills {
      .nav-link {
        &.active {
          @include box-shadow($z-depth-1);

          &:hover {
            color: $white;
          }
        }
      }
    }

    &.nav-material {
      @include box-shadow(0px 1px 5px rgba(#000, .2), 0px 2px 2px rgba(#000, .14), 0px 3px 1px -2px rgba(#000, .12));
      overflow-x: hidden;
      position: relative;

      > .nav-link {
        @include border-radius(0);
        list-style: none;
        background-color: transparent !important;
        border-color: transparent;
        border-style: solid;
        border-width: 0;
        border-bottom-width: 3px !important;
        color: rgba($white, .6);
        text-transform: uppercase;

        > .#{$prefix}-ripple {
          padding: $tab-material-padding;
        }

        &:hover {
          color: rgba($white, .6);
        }

        &.active {
          color: var(--white);
          border-bottom-color: var(--white);
        }

        @include media-breakpoint-up(lg) {
          &:first-child {
            margin-left: $padding-base;
          }
          &:last-child {
            margin-right: $padding-base;
          }
        }
      }
    }

    &.nav-modern {
      @include border-radius(.25rem);
      @include box-shadow(0 5px 11px 0 rgba(0, 0, 0, .18), 0 4px 15px 0 rgba(0, 0, 0, .15));
      border-width: 0 !important;
      padding: $tab-modern-padding;

      .nav-link {
        @include border-radius(.25rem);
        border-width: 0 !important;
        color: rgba($white, .6);

        &:hover {
          color: rgba($white, .6);
        }

        &.active {
          background-color: rgba($black, .2);
          color: var(--white);
        }
      }
    }
  }

  .card {
    &:not(.rounded-0) {
      > .nav-material {
        @include border-top-radius(.25rem);
      }

      > .nav-modern {
        @include border-bottom-radius(0);
      }
    }

    &.rounded-0 {
      > .nav-modern {
        @include border-radius(0);
      }
    }
  }
</style>
