<template>
  <div 
    v-click-outside="_clickOutSide"
    class="md-field-searchbox">
    <div
      ref="activator"
      :class="_classNames"
      class="md-searchbox-inner">
      <bs-button
        color="secondary"
        icon="search"
        mode="icon"
        size="sm"
        flat
        @click="_prepareSearch" />
      <label>
        <input
          ref="input"
          v-bind="_attributes"
          @input="setValue($event.target.value)"
          @focus="_onFocus"
          @blur="_onBlur"
          @keyup.enter="_submit" />
      </label>
      <bs-button
        v-if="localValue !== null && localValue !== ''"
        color="secondary"
        mode="icon"
        size="sm"
        flat
        @click="_clearValue">
        <bs-icon icon="clear" />
      </bs-button>
      <bs-button
        v-if="searchOptions"
        color="secondary"
        mode="icon"
        size="sm"
        flat
        @click="_popoverOpen">
        <bs-icon icon="ArrowDropDown" size="24" />
      </bs-button>
    </div>
    <bs-popover
      v-if="searchOptions"
      v-bind="_popoverAttributes"
      @close="_popoverClose">
      <slot name="popover"></slot>
    </bs-popover>
  </div>
</template>

<script>
import BsIcon from "../BsIcon/BsIcon";
import BsButton from "../BsButton/BsButton";
import BsPopover from "../BsPopover/BsPopover";
import Common from "../../mixins/Common";
import Helper from "../../utils/Helper";
import clickOutside from "../../directives/ClickOutside";

export default {
    name: "BsSearchField",
    components: {BsButton, BsIcon, BsPopover},
    directives: {clickOutside},
    mixins: [Common],
    props: {
        autofocus: {
            type: Boolean,
            default: false
        },
        darkMode: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        open: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        searchOptions: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default() {
                return 'bs-' + Helper.uuid(true);
            }
        },
        popoverCls: {
            type: String,
            default: 'bg-white md-shadow'
        },
        popoverMinWidth: {
            type: [Number, String],
            default: 480,
            validator: value => parseInt(value, 10) > 0
        },
        popoverPosition: {
            type: String,
            default: 'bottom'
        },
        innerCls: {
            type: String,
            default: undefined
        },
        minlength: {
            type: [String, Number],
            default: 4,
            validator: value => parseInt(value, 10) > 0
        },
        name: {
            type: String,
            default: undefined
        },
        placeholder: {
            type: String,
            default: 'Search...'
        },
        transition: {
            type: String,
            default: 'popover'
        },
        value: {
            type: String,
            default: undefined
        },
    },
    data: (vm) => ({
        active: vm.open,
        localValue: vm.value || null,
        popoverWidth: vm.popoverMinWidth || 0,
        isFocused: false,
        trigger: null,
    }),
    computed: {
        _attributes() {
            return {
                'type': 'text',
                'role': 'searchbox',
                'spellcheck': 'false',
                'autocomplete': 'false',
                'id': this.id,
                'name': this.name,
                'value': this.localValue,
                'disabled': this.disabled,
                'readonly': this.readonly,
                'autofocus': this.autofocus,
                'placeholder': this.placeholder,
                'minlength': this.minlength,
                'aria-disabled': this.disabled,
                'aria-readonly': this.readonly,
                'aria-placeholder': this.placeholder
            }
        },
        _classNames() {
            return {
                'md-disabled': this.disabled,
                'md-readonly': this.readonly,
                'md-focused': this.isFocused,
                'md-searchbox-dark': this.darkMode,
                [this.innerCls]: this.innerCls
            };
        },
        /**
         * Get Popover computed binding attributes.
         *
         * @returns {Object} Attributes to bind
         */
        _popoverAttributes() {
            return {
                open: this.active,
                trigger: this.trigger,
                transition: this.transition,
                placement: this.popoverPosition,
                class: this.popoverCls,
                style: this._popoverStyles
            }
        },
        /**
         * Get popover's computed width.
         *
         * @returns {number} Popover minimum width
         */
        _popoverMinWidth() {
            if (this.trigger && (this.popoverWidth < this.trigger.offsetWidth)) {
                return this.trigger.offsetWidth;
            }

            return this.popoverWidth;
        },
        /**
         * Get computed popover's styles.
         *
         * @returns {Object} Popover styles
         */
        _popoverStyles() {
            return {
                'min-width': this.trigger ? Helper.sizeUnit(this._popoverMinWidth) : ''
            }
        },
    },
    watch: {
        open(value) {
            if (value && parseInt(this.popoverMinWidth, 10) < this.trigger.offsetWidth) {
                this.popoverWidth = this.trigger.offsetWidth;
            } else {
                this.popoverWidth = this.popoverMinWidth;
            }
            this.active = value;
        },
        value(newValue) {
            this.localValue = newValue;
        },
    },
    mounted() {
        this.trigger = this.$refs.activator;
    },
    methods: {
        _clearValue() {
            this.setValue(null);
        },
        _clickOutSide(e) {
            let result = false;

            document.querySelectorAll('.md-popover').forEach((el) => {
                if (el.contains(e.target)) {
                    result = true;
                }
            });

            if (!result) {
                this.fireEvent('open', false);
            }
        },
        _doSearch() {
            const term = this.localValue.trim();

            if (term.length >= this.minlength) {
                this.fireEvent('search', term);
            }
        },
        _onBlur(event) {
            this.isFocused = false;
            this.fireEvent('blur', event);
        },
        _onFocus(event) {
            if (!this.$refs.input) {
                return;
            }
            if (document.activeElement !== this.$refs.input) {
                this.$refs.input.focus();
            }
            this.isFocused = true;
            this.fireEvent('focus', event);
        },
        _popoverClose(reason) {
            if (['ESC Pressed', 'Overlay clicked'].includes(reason)) {
                this.fireEvent('open', false);
            }
        },
        _popoverOpen() {
            this.fireEvent('open', !this.active);
        },
        _prepareSearch() {
            if (!Helper.isEmpty(this.localValue)) {
                this._doSearch();
            } else {
                this.fireEvent('input', this.localValue);
            }
        },
        _submit() {
            if (!Helper.isEmpty(this.localValue)) {
                this._doSearch();
            } else {
                this.setValue(null);
            }
        },
        getValue() {
            return this.localValue;
        },
        setValue(value) {
            this.localValue = value;
            this.fireEvent('input', value);
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-field-searchbox {
    position: relative;
    width: 100%;

    .#{$prefix}-searchbox-inner {
        @include transition(border-color $transition-basic, box-shadow $transition-basic);
        @include flexbox((display: flex, align-items: center));
        background-color: rgba($black, .015);
        border: 1px solid rgba($black, .05);
        border-radius: .36rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 4px 6px;
        position: relative;
        width: 100%;

        &.#{$prefix}-focused {
            @include box-shadow(0 0 0.1rem 0.2rem rgba(0, 123, 255, .25));
            background-color: $white;
            border-color: $info-color-dark;
        }

        label {
            display: block;
            margin: 0 0 0 4px;
            padding: 0;
            width: 100%;
        }

        input {
            border: 0 transparent;
            background: transparent;
            color: $gray-600;
            width: 100%;
            outline: none;
            padding-left: 2px;

            &:focus {
                outline: none;
            }

            &::placeholder {
                color: $gray-500;
                font-weight: $font-weight-light;
            }

            &::-moz-placeholder {
                color: $gray-500;
                font-weight: $font-weight-light;
            }

            &::-webkit-input-placeholder {
                color: $gray-500;
                font-weight: $font-weight-light;
            }

            &:-ms-input-placeholder {
                color: $gray-500;
                font-weight: $font-weight-light;
            }
        }

        &.#{$prefix}-searchbox-dark {
            background-color: rgba($black, .25);
            border: 1px solid rgba($black, .085);

            input {
                color: $gray-500;
            }

            &.#{$prefix}-focused {
                @include box-shadow(0 0 0.1rem 0.23rem rgba(100, 100, 100, 0.32));
                background-color: rgba($black, 0.35);
                border-color: rgba($black, 0.25);

                input {
                    &:focus {
                        color: $gray-200;
                    }
                }
            }
        }
    }
}
</style>
