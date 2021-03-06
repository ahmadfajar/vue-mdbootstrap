<template>
  <div
    v-if="orientation === 'vertical'"
    class="md-tabs row no-gutters">
    <div :class="{'col-auto': true, 'order-last': tabPosition === 'right'}">
      <div
        :is="_tagName"
        :class="_classNames"
        v-bind="_attributes"
        v-on="$listeners">
        <bs-tab-item
          v-for="(item, index) in tabPanes"
          :key="'tab-item-' + index"
          v-bind="_tabbedAttrs(item)" />
      </div>
    </div>
    <div class="col tab-content">
      <slot></slot>
    </div>
  </div>
  <div v-else class="md-tabs">
    <div
      v-if="tabPosition === 'top'"
      :is="_tagName"
      :class="_classNames"
      v-bind="_attributes"
      v-on="$listeners">
      <bs-tab-item
        v-for="(item, index) in tabPanes"
        :key="'tab-item-' + index"
        v-bind="_tabbedAttrs(item)" />
    </div>
    <div :class="contentClass" class="tab-content">
      <slot></slot>
    </div>
    <div
      v-if="tabPosition === 'bottom'"
      :is="_tagName"
      :class="_classNames"
      v-bind="_attributes"
      v-on="$listeners">
      <bs-tab-item
        v-for="(item, index) in tabPanes"
        :key="'tab-item-' + index"
        v-bind="_tabbedAttrs(item)" />
    </div>
  </div>
</template>

<script>
import BsTabItem from "./BsTabItem";
import "../../../scss/_transitions.scss";

export default {
    name: 'BsTabs',
    components: {BsTabItem},
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        /**
         * Tabs alignment. Valid values: `left`, `right`, `center`, `justified`.
         * @type {string|*}
         */
        alignment: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right', 'center', 'justified'].indexOf(value) !== -1;
            }
        },
        /**
         * Tabs style variant. Valid values: `tabs`, `pills`, `material`, `modern`.
         * @type {string|*}
         */
        variant: {
            type: String,
            default: 'tabs',
            validator(value) {
                return ['tabs', 'pills', 'modern', 'material'].indexOf(value) !== -1;
            }
        },
        /**
         * TabItem icon position. Valid values: `left`, `right`, `top`, `bottom`.
         * @type {string|*}
         */
        iconPosition: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right', 'top', 'bottom'].indexOf(value) !== -1;
            }
        },
        /**
         * Tabs position. Valid values: `left`, `right`, `top`, `bottom`.
         * @type {string|*}
         */
        tabPosition: {
            type: String,
            default: 'top',
            validator(value) {
                return ['left', 'right', 'top', 'bottom'].indexOf(value) !== -1;
            }
        },
        /**
         * TabItem css class name.
         * @type {string|Array|*}
         */
        tabClass: {
            type: [String, Array],
            default: undefined
        },
        /**
         * CSS class name for active TabItem.
         * @type {string|*}
         */
        activeClass: {
            type: String,
            default: 'active'
        },
        /**
         * TabItem's container css class name.
         * @type {string|Array|*}
         */
        innerClass: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Tab content css class name.
         * @type {string|Array|*}
         */
        contentClass: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Tab content display animation transition.
         * @type {string|*}
         */
        contentTransition: {
            type: String,
            default: 'fade',
            validator(value) {
                return ['fade', 'slide-fade', 'slide-fade-reverse', 'popover'].indexOf(value) !== -1;
            }
        },
        /**
         * TabItem icon size.
         * @type {string|*}
         */
        iconSize: {
            type: String,
            default: undefined
        },
        /**
         * Tabs color style for tab variant: `modern` and `material`.
         * @type {string|*}
         */
        color: {
            type: String,
            default: undefined
        },
        /**
         * Create tab variant of `tabs` or `pills` with flex.
         * @type {string|*}
         */
        flex: {
            type: Boolean,
            default: false
        },
        /**
         * The value maintained by `v-model`
         * @type {string|*}
         */
        value: {
            type: [String, Number, Object],
            default: undefined
        }
    },
    data: () => ({
        activeTab: null,
        tabPanes: [],
        tabItems: []
    }),
    provide() {
        return {
            tabs: {
                iconPosition: this.iconPosition,
                iconSize: this.iconSize,
                alignment: this.alignment,
                variant: this.variant,
                tabClass: this.tabClass,
                transition: this.contentTransition,
                register: this.register,
                unregister: this.unregister,
                registerTab: this._registerTab,
                unregisterTab: this._unregisterTab,
                setActiveTab: this.setActiveTab
            }
        }
    },
    computed: {
        /**
         * Gets tabs orientation.
         *
         * @returns {string} Tabs orientation: horizontal or vertical
         */
        orientation() {
            if (['left', 'right'].includes(this.tabPosition)) {
                return 'vertical';
            } else {
                return 'horizontal'
            }
        },
        /**
         * Get computed binding's attributes.
         *
         * @returns {Object|*} HTML attributes
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
         * @returns {String[]} Css class names
         * @private
         */
        _classNames() {
            let cls = [
                'nav',
                'nav-' + this.variant,
                this.alignment === 'justified' && this.orientation === 'horizontal' ?
                    (this.flex ? 'flex-column flex-sm-row' : 'nav-justified')
                    : (this.orientation === 'vertical' ? 'flex-column h-100' : ''),
                this.alignment === 'center' ? 'justify-content-center' : '',
                this.alignment === 'right' ? 'justify-content-end' : '',
                this.tabPosition === 'top' ? 'md-tab-top' : (this.tabPosition === 'bottom' ? 'md-tab-bottom' : ''),
                this.tabPosition === 'left' ? 'md-tab-left' : (this.tabPosition === 'right' ? 'md-tab-right' : ''),
                ['material', 'modern'].indexOf(this.variant) > -1 && this.color ? 'bg-' + this.color : ''
            ];

            if (this.innerClass && typeof this.innerClass === 'string') {
                cls.push(this.innerClass);
            } else if (this.innerClass && this.innerClass.length > 0) {
                cls = cls.concat(this.innerClass);
            }

            return cls;
        },
        /**
         * Get computed html TAG.
         *
         * @returns {string} HTML tag
         * @private
         */
        _tagName() {
            return this.variant === 'pills' ? 'ul' : 'div'
        },
    },
    beforeDestroy() {
        this.activeTab = null;
    },
    methods: {
        register(tabPane) {
            return this.tabPanes.push(tabPane);
        },
        unregister(idx) {
            this.tabPanes.splice(idx, 1);
        },
        setActiveTab(key) {
            let tab, tabPane, obj;

            if (!isNaN(parseInt(key, 10))) {
                tab = this.tabItems[key];
                tabPane = this.tabPanes[key];
            }
            if (!tab) {
                tab = this.tabItems.find(el => el.id === 'tab-' + key);
                tabPane = this.tabPanes.find(el => el.id === key);
            }
            if (tab) {
                this.tabItems.forEach(el => el.active = false);
                this.tabPanes.forEach(el => el.active = false);

                tab.active = true;
                tabPane.active = true;
                this.$emit('change', tabPane, this.activeTab);

                if (tab.id && tab.target) {
                    obj = {id: tab.id, index: tab.tabIndex, tabRef: tab.target};
                    this.$emit('input', obj);
                } else {
                    this.$emit('input', tab.tabIndex);
                }

                this.activeTab = tabPane;
            }
        },
        _registerTab(tab) {
            return this.tabItems.push(tab);
        },
        _unregisterTab(idx) {
            this.tabItems.splice(idx, 1);
        },
        /**
         * Compute Tabbed binding's attribute for a given object.
         *
         * @param {Object} tabPane Raw attributes from a tab-pane object
         * @returns {Object|*} Tabbed binding's attribute
         * @private
         */
        _tabbedAttrs(tabPane) {
            return {
                id: tabPane.id ? 'tab-' + tabPane.id : null,
                icon: tabPane.icon,
                label: tabPane.label,
                target: tabPane.ariaLabel,
                activeClass: tabPane.activeClass !== 'active' ? tabPane.activeClass : (this.activeClass ? this.activeClass : tabPane.activeClass),
                exact: tabPane.exact,
                path: tabPane.path,
                url: tabPane.url,
                value: this.value,
                class: !tabPane.active ? this.tabClass : null
            }
        },
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

$tab-colors: map-remove($merge-theme-colors, 'light', 'light-grey');

.#{$prefix}-tabs {
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

        &.nav-tabs {
            &.#{$prefix}-tab-top {
                padding-bottom: 0;
            }

            &.#{$prefix}-tab-bottom {
                padding-top: 0;

                > .nav-item {
                    @include border-top-radius(0);
                    @include border-bottom-radius(($border-radius));
                    margin-bottom: 0;
                    margin-top: -1px;

                    &.active, &.#{$prefix}-active {
                        border-color: $white-base $gray-300 $gray-300;
                    }
                }
            }
        }

        &.nav-pills {
            padding: $tab-padding-base;

            .nav-item {
                @include border-radius($border-radius);
            }

            .nav-link {
                @each $color_name, $color in $tab-colors {
                    &.bg-#{$color_name}:not(.active) {
                        color: rgba($white, .7);

                        &:hover {
                            background-color: rgba($white, .1) !important;
                            color: rgba($white, .9);
                        }
                    }
                }

                &.active {
                    @include box-shadow($z-depth-1);
                }
            }
        }

        &.nav-material {
            overflow-x: hidden;
            position: relative;

            > .nav-link {
                @include border-radius(0);
                list-style: none;
                background-color: transparent;
                border-color: transparent;
                border-style: solid;
                border-width: 0;
                color: rgba($white, .6);
                text-transform: uppercase;

                > .#{$prefix}-ripple {
                    padding: $tab-material-padding;
                }

                &:hover {
                    color: rgba($white, .8);
                }

                &.active {
                    color: $white;
                }
            }

            &.#{$prefix}-tab-top {
                @include box-shadow(0px 4px 5px rgba(#000, .15), 0px 2px 2px rgba(#000, .14), 0px 3px 1px -2px rgba(#000, .12));

                > .nav-link {
                    border-bottom-width: 3px !important;

                    &.active {
                        border-bottom-color: $white;
                    }
                }
            }

            &.#{$prefix}-tab-bottom {
                @include box-shadow(0px -1px 5px rgba(#000, .2), 0px -1px 2px rgba(#000, .14), 0px -3px 1px -2px rgba(#000, .12));

                > .nav-link {
                    border-top-width: 3px !important;

                    &.active {
                        border-top-color: $white;
                    }
                }
            }

            &.#{$prefix}-tab-left {
                @include box-shadow(1px 0px 5px rgba(#000, .2), 2px 0px 2px rgba(#000, .14), 3px 0px 1px -2px rgba(#000, .12));

                > .nav-link {
                    border-right-width: 3px !important;

                    &.active {
                        border-right-color: $white;
                    }
                }
            }

            &.#{$prefix}-tab-right {
                @include box-shadow(-1px 0px 5px rgba(#000, .2), -2px 0px 2px rgba(#000, .14), -3px 0px 1px -2px rgba(#000, .12));

                > .nav-link {
                    border-left-width: 3px !important;

                    &.active {
                        border-left-color: $white;
                    }
                }
            }

            &.#{$prefix}-tab-top,
            &.#{$prefix}-tab-bottom {
                > .nav-link {
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
        }

        &.nav-modern {
            @include border-radius($border-radius);
            border-width: 0;
            padding: $tab-modern-padding;

            &.#{$prefix}-tab-top {
                @include box-shadow(0px 4px 5px rgba(#000, .15), 0px 2px 2px rgba(#000, .14), 0px 3px 1px -2px rgba(#000, .12));
                //@include box-shadow(0 5px 11px 0 rgba(0, 0, 0, .18), 0 4px 15px 0 rgba(0, 0, 0, .15));
            }

            &.#{$prefix}-tab-bottom {
                @include box-shadow(0 -2px 10px 0 rgba(0, 0, 0, .18), 0 -4px 15px 0 rgba(0, 0, 0, .15));
            }

            .nav-link {
                @include border-radius($border-radius);
                border-width: 0 !important;
                color: rgba($white, .6);

                &:hover {
                    color: rgba($white, .8);
                }

                &.active {
                    background-color: rgba($black, .2);
                    color: $white;
                }
            }
        }

        &.nav-pills, &.nav-modern {
            &.#{$prefix}-tab-top,
            &.#{$prefix}-tab-bottom {
                .nav-item + .nav-item {
                    margin-left: $tab-item-margin-between;
                }
            }

            &.#{$prefix}-tab-left,
            &.#{$prefix}-tab-right {
                .nav-item + .nav-item {
                    margin-top: $tab-item-margin-between;
                }
            }
        }
    }

    .tab-content {
        overflow: hidden;
        position: relative;
        padding: $padding-base + .25;
    }
}

.card {
    &.rounded-0 {
        .#{$prefix}-tabs {
            .nav-modern {
                @include border-radius(0);
            }
        }
    }

    &:not(.rounded-0) {
        > .#{$prefix}-tabs {
            .nav-material {
                &.#{$prefix}-tab-bottom:last-child {
                    @include border-bottom-radius($border-radius);
                }
            }

            .nav-modern {
                &.#{$prefix}-tab-top:first-child {
                    @include border-bottom-radius(0);
                }

                &.#{$prefix}-tab-bottom:last-child {
                    @include border-top-radius(0);
                }

                &.#{$prefix}-tab-left:first-child {
                    @include border-right-radius(0);
                }

                &.#{$prefix}-tab-right:last-child {
                    @include border-left-radius(0);
                }
            }

            &:not(:first-child) {
                .nav-modern {
                    @include border-top-radius(0);
                }
            }

            &:first-child {
                .nav-material {
                    &.#{$prefix}-tab-top:first-child {
                        @include border-top-radius($border-radius);
                    }

                    &.#{$prefix}-tab-left:first-child {
                        @include border-top-left-radius($border-radius);
                    }

                    &.#{$prefix}-tab-right:last-child {
                        @include border-top-right-radius($border-radius);
                    }
                }
            }

            &:last-child {
                .nav-material {
                    &.#{$prefix}-tab-left:first-child {
                        @include border-bottom-left-radius($border-radius);
                    }

                    &.#{$prefix}-tab-right:last-child {
                        @include border-bottom-right-radius($border-radius);
                    }
                }
            }
        }
    }
}
</style>
