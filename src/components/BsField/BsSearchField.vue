<template>
  <div class="md-field-searchbox">
    <div
      class="md-searchbox-inner"
      ref="activator"
      :class="_classNames">
      <bs-button
        color="secondary"
        mode="icon"
        icon="search"
        size="sm"
        flat
        @click="_onSearch" />
      <label>
        <input
          ref="input"
          v-bind="_attributes"
          @input="setValue($event.target.value)"
          @focus="_onFocus"
          @blur="_onBlur"
          @keyup.enter="_onSubmit" />
      </label>
      <bs-button
        v-if="value !== null && value !== ''"
        color="secondary"
        mode="icon"
        size="sm"
        flat
        @click="_onClear">
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
      <slot name="dropdownlist"></slot>
    </bs-popover>
  </div>
</template>

<script>
import BsIcon from "../BsIcon/BsIcon";
import BsButton from "../BsButton/BsButton";
import BsPopover from "../BsPopover/BsPopover";
import Common from "../../mixins/Common";
import Helper from "../../utils/Helper";

export default {
    name: "BsSearchField",
    components: {BsButton, BsIcon, BsPopover},
    mixins: [Common],
    props: {
        autofocus: {
            type: Boolean,
            default: false
        },
        canClose: {
            type: Boolean,
            default: true
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
        dropdownBackgroundCls: {
            type: String,
            default: 'bg-white md-shadow-1'
        },
        dropdownMinWidth: {
            type: [Number, String],
            default: 480,
            validator: value => parseInt(value, 10) > 0
        },
        dropdownPosition: {
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
        isFocused: false,
        popoverWidth: vm.dropdownMinWidth || 0,
        trigger: null
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
                'value': this.value,
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
                open: this.open,
                trigger: this.trigger,
                transition: this.transition,
                placement: this.dropdownPosition,
                class: this.dropdownBackgroundCls,
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
            if (value && parseInt(this.dropdownMinWidth, 10) < this.trigger.offsetWidth) {
                this.popoverWidth = this.trigger.offsetWidth;
            } else {
                this.popoverWidth = this.dropdownMinWidth;
            }
        }
    },
    mounted() {
        this.trigger = this.$refs.activator;
    },
    methods: {
        _onBlur(event) {
            this.isFocused = false;
            this.fireEvent('blur', event);
        },
        _onClear() {
            this.setValue(null);
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
        _onSearch() {
            if (!Helper.isEmpty(this.value)) {
                this._doSearch();
            } else {
                this.fireEvent('input', this.value);
            }
        },
        _onSubmit() {
            if (!Helper.isEmpty(this.value)) {
                this._doSearch();
            } else {
                this.setValue(null);
            }
        },
        _doSearch() {
            const term = this.value.trim();

            this.fireEvent('input', term);
            if (term.length >= this.minlength) {
                this.fireEvent('search', term);
            }
        },
        _popoverClose(reason) {
            this.fireEvent('update:open', !this.canClose, reason);
        },
        _popoverOpen() {
            this.fireEvent('update:open', true, 'trigger button');
        },
        getValue() {
            return this.value;
        },
        setValue(value) {
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
