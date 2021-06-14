<template>
  <router-link
    v-if="hasRouter"
    :id="id"
    :active-class="activeClass"
    :class="_classNames"
    :exact="exact"
    :to="path"
    tag="li"
    @click.native="_onClick">
    <a class="md-nav-item-inner">
      <bs-ripple
        :active.sync="rippleActive"
        :disabled="_disableRipple"
        :style="_styles"
        class="d-flex ">
        <bs-icon
          v-if="icon && isInternal"
          v-bind="_iconAttributes" />
        <span
          v-else-if="icon && !isInternal"
          :style="_faWidth"
          class="md-icon text-center">
          <font-awesome-icon v-bind="_iconAttributes" :style="_faStyles" />
        </span>
        <span class="md-nav-text">{{ label }}</span>
        <bs-badge
          v-if="badge"
          :variant="badgeVariant"
          class="font-weight-normal mr-3">
          {{ badge }}
        </bs-badge>
        <bs-icon
          v-if="hasChild"
          icon="expand-more"
          size="24" />
      </bs-ripple>
    </a>
    <slot></slot>
  </router-link>
  <li
    v-else
    :id="id"
    :class="_classNames">
    <a
      :href="url"
      class="md-nav-item-inner"
      @click="_onClick">
      <bs-ripple
        :active.sync="rippleActive"
        :disabled="_disableRipple"
        :style="_styles"
        class="d-flex">
        <bs-icon
          v-if="icon && isInternal"
          v-bind="_iconAttributes" />
        <span
          v-else-if="icon && !isInternal"
          :style="_faWidth"
          class="md-icon text-center">
          <font-awesome-icon v-bind="_iconAttributes" :style="_faStyles" />
        </span>
        <span class="md-nav-text">{{ label }}</span>
        <bs-badge
          v-if="badge"
          :variant="badgeVariant"
          class="font-weight-normal mr-3">
          {{ badge }}
        </bs-badge>
        <bs-icon
          v-if="hasChild"
          icon="expand-more"
          size="24" />
      </bs-ripple>
    </a>
    <slot></slot>
  </li>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsRipple from '../BsAnimation/BsRipple';
import IconMixin from "../BsBasic/mixins/IconMixin";
import RouteAble from "../../mixins/RouteAble";
import ToggleAble from "./mixins/ToggleAble";
import Helper from "../../utils/Helper";

export default {
    name: "BsListNavItem",
    components: {FontAwesomeIcon, BsRipple},
    mixins: [RouteAble, ToggleAble, IconMixin],
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
         * Render the icon with predefined size, valid values are: `xs`, `sm`, `lg`, `1x`, `2x`.
         * @type {string|*}
         */
        iconSize: {
            type: String,
            default: undefined,
            validator(v) {
                return ['lg', 'xs', 'sm', '1x', '2x'].indexOf(v) > -1 || !isNaN(parseInt(v, 10));
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
            default: undefined,
            required: true
        },
        /**
         * The text to render as badge label.
         * @type {string|*}
         */
        badge: {
            type: String,
            default: undefined
        },
        /**
         * The badge variant, valid values: `primary`, `secondary`, `success`, `danger`, `warning`,
         * `info`, `light`, `dark`.
         * @type {string|*}
         */
        badgeVariant: {
            type: String,
            default: 'success'
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
    data: (vm) => ({
        children: [],
        expanded: false,
        itemActive: vm.active,
        rippleActive: false
    }),
    computed: {
        _classNames() {
            return {
                'md-nav-item': true,
                'md-parent': this.hasChild,
                'md-disabled': this.disabled,
                'md-expanded': this.hasChild && this.expanded,
                'md-has-icon': !Helper.isEmpty(this.icon),
                ['md-' + this.activeClass]: this.isActive && !this.disabled
            }
        },
        _disableRipple() {
            return this.disabled || this.rippleOff;
        },
        /**
         * Get BsIcon binding attributes.
         *
         * @returns {Object|*} The icon attributes
         * @private
         */
        _iconAttributes() {
            return {
                ...this.iconAttributes,
                size: this.isInternal && !this.iconSize ? 24 : this.iconSize
            };
        },
        _faStyles() {
            if (!this.iconSize || ['xs', 'sm', '1x'].indexOf(this.iconSize) > -1) {
                return {
                    height: '20px',
                    width: '20px'
                }
            }
            return null;
        },
        _faWidth() {
            return {
                'width': !this.iconSize || ['lg', 'xs', 'sm', '1x'].indexOf(this.iconSize) > -1 ? Helper.sizeUnit(24) : null
            }
        },
        _styles() {
            const indent = 16 + (this.depth ? (parseInt(this.depth, 10) * 16) : 0);
            return {
                'padding-left': this.indent
                    ? Helper.sizeUnit(this.indent)
                    : (this.depth ? Helper.sizeUnit(indent, 'px') : null)
            }
        },
        hasChild() {
            return this.children.length > 0;
        }
    },
    watch: {
        active(value) {
            this.itemActive = value;
        },
        itemActive(value) {
            if (value) {
                this.expand();
            }
            this.$emit('update:active', value, this);
        },
        $route(to, from) {
            this._routeMatch(to.path, from.path);
        },
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
            this._routeMatch(this.$route.path);
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
                    item.component.expanded = false;
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
                this.$nextTick(() => {
                    this.$emit('click', e, this);
                });
            }
        },
        _routeMatch(route) {
            if (route === this.path) {
                this.$nextTick(() => {
                    this.itemActive = true;
                    this.$emit('input', true);
                });
                this._updateState(this.id, this.bsList.items);
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
                    let iterator = this.$parent;
                    let cmpTag = iterator.$options._componentTag;

                    while (cmpTag.startsWith('bs-list-nav')) {
                        if (cmpTag === 'bs-list-nav-item') {
                            iterator.itemActive = true;
                        }
                        iterator.expanded = true;
                        iterator = iterator.$parent;
                        cmpTag = iterator.$options._componentTag;
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
                    if (this.$parent.$options._componentTag === 'bs-list-nav') {
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

.#{$prefix}-list-nav {
    .#{$prefix}-nav-item {
        position: relative;
        white-space: nowrap;
        width: 100%;

        > .#{$prefix}-nav-item-inner {
            @extend %cursor-pointer;
            display: block;
            outline: 0 none;
            font-size: 1rem;

            > .#{$prefix}-ripple {
                height: 48px;
                line-height: normal;
                padding: .75rem 0 .75rem $padding-lg;

                > .#{$prefix}-nav-text {
                    @include transition(opacity .8s);
                    @include opacity(1);
                    @include flex(1);
                }

                > .icon-expand-more {
                    @include transition(all 0.3s ease 0s);
                    @include transform(rotateZ(0deg));
                }

                > .#{$prefix}-icon {
                    margin-right: $padding-base;

                    &:first-child {
                        margin-right: $padding-xl;
                    }
                }

                > .badge {
                    line-height: normal;
                }
            }

            &:hover,
            &:focus,
            &:active {
                text-decoration: none;
            }
        }

        &.#{$prefix}-has-icon {
            > .#{$prefix}-nav-item-inner {
                > .#{$prefix}-ripple {
                    padding-left: $padding-base;
                }
            }
        }

        &.#{$prefix}-expanded {
            > .#{$prefix}-nav-item-inner {
                > .#{$prefix}-ripple {
                    > .icon-expand-more {
                        @include transform(rotateZ(-180deg));
                    }
                }
            }
        }

        &.#{$prefix}-active {
            > .#{$prefix}-nav-item-inner {
                font-weight: $font-weight-bold;
            }

            &:not(.#{$prefix}-parent) {
                > .#{$prefix}-nav-item-inner {
                    font-weight: $font-weight-bold;
                }
            }
        }
    }

    > .#{$prefix}-nav-item {
        &.#{$prefix}-expanded {
            &:not(:first-child) {
                border-top: 1px solid $gray-300;
            }

            &:not(:last-child) {
                border-bottom: 1px solid $gray-300;
            }
        }

        &:not(.#{$prefix}-has-icon) {
            .#{$prefix}-nav-item {
                &:not(.#{$prefix}-has-icon) {
                    > .#{$prefix}-nav-item-inner {
                        > .#{$prefix}-ripple {
                            padding-left: $padding-base * 2.5;
                        }
                    }
                }
            }
        }

        &.#{$prefix}-has-icon {
            .#{$prefix}-nav-item {
                &:not(.#{$prefix}-has-icon) {
                    > .#{$prefix}-nav-item-inner {
                        > .#{$prefix}-ripple {
                            padding-left: $padding-base * 4.5;
                        }
                    }
                }
            }
        }
    }
}

.#{$prefix}-list {
    &.#{$prefix}-space-both,
    &.#{$prefix}-space-left,
    &.#{$prefix}-space-right {
        > .#{$prefix}-list-nav {
            .#{$prefix}-nav-item {
                &:not(.#{$prefix}-parent),
                &.#{$prefix}-parent:not(.#{$prefix}-expanded) {
                    margin-bottom: 2px;
                    margin-top: 2px;

                    > .#{$prefix}-nav-item-inner {
                        > .#{$prefix}-ripple {
                            height: 46px;
                        }
                    }
                }
            }
        }
    }

    &.#{$prefix}-space-both,
    &.#{$prefix}-space-left {
        > .#{$prefix}-list-nav {
            .#{$prefix}-nav-item-inner {
                margin-left: 6px;
            }

            > .#{$prefix}-nav-item {
                &.#{$prefix}-has-icon {
                    .#{$prefix}-nav-item {
                        &:not(.#{$prefix}-has-icon) {
                            > .#{$prefix}-nav-item-inner {
                                > .#{$prefix}-ripple {
                                    padding-left: 66px;
                                }
                            }
                        }
                    }
                }
            }

            .#{$prefix}-nav-item {
                &.#{$prefix}-has-icon {
                    > .#{$prefix}-nav-item-inner {
                        > .#{$prefix}-ripple {
                            padding-left: 10px;
                        }
                    }
                }
            }
        }
    }

    &.#{$prefix}-space-both,
    &.#{$prefix}-space-right {
        > .#{$prefix}-list-nav {
            .#{$prefix}-nav-item-inner {
                margin-right: 6px;
            }

            .#{$prefix}-nav-item {
                > .#{$prefix}-nav-item-inner {
                    > .#{$prefix}-ripple {
                        > .icon-expand-more {
                            margin-right: 10px;
                        }
                    }
                }
            }
        }
    }

    &.#{$prefix}-border-left,
    &.#{$prefix}-border-right,
    &.#{$prefix}-border-left-right,
    &.#{$prefix}-border-top,
    &.#{$prefix}-border-bottom,
    &.#{$prefix}-border-top-bottom {
        > .#{$prefix}-list-nav {
            .#{$prefix}-nav-item {
                &.#{$prefix}-active {
                    &:not(.#{$prefix}-parent) {
                        > .#{$prefix}-nav-item-inner {
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
            }
        }
    }

    &.#{$prefix}-border-left,
    &.#{$prefix}-border-left-right {
        > .#{$prefix}-list-nav {
            .#{$prefix}-nav-item {
                &.#{$prefix}-active {
                    &:not(.#{$prefix}-parent) {
                        > .#{$prefix}-nav-item-inner {
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
            }
        }
    }

    &.#{$prefix}-border-right,
    &.#{$prefix}-border-left-right {
        > .#{$prefix}-list-nav {
            .#{$prefix}-nav-item {
                &.#{$prefix}-active {
                    &:not(.#{$prefix}-parent) {
                        > .#{$prefix}-nav-item-inner {
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
            }
        }
    }

    &.#{$prefix}-border-top,
    &.#{$prefix}-border-top-bottom {
        > .#{$prefix}-list-nav {
            .#{$prefix}-nav-item {
                &.#{$prefix}-active {
                    &:not(.#{$prefix}-parent) {
                        > .#{$prefix}-nav-item-inner {
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
            }
        }
    }

    &.#{$prefix}-border-bottom,
    &.#{$prefix}-border-top-bottom {
        > .#{$prefix}-list-nav {
            .#{$prefix}-nav-item {
                &.#{$prefix}-active {
                    &:not(.#{$prefix}-parent) {
                        > .#{$prefix}-nav-item-inner {
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
