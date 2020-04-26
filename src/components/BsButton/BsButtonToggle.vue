<template>
  <div role="group" :class="['btn-group', cmpAttrClasses]">
    <label v-for="(item, idx) in items" :key="'btn-' + idx" :class="_btnClasses(item)">
      <input v-model="localValue"
             v-bind="_itemAttributes(item)"
             :value="item.value"
             class="d-none" />
      <bs-ripple :disabled="disabled" :active="rippleActive" @update:active="_toggleRipple">
        <span class="btn-inner d-inline-flex align-items-center">
          <span v-if="iconLeft && item.icon" class="pr-2">
            <font-awesome-icon v-bind="_iconAttributes(item)" />
          </span>
          <span v-if="item.label" class="btn-text">
            {{ item.label }}
          </span>
          <span v-if="iconRight && item.icon" class="pl-2">
            <font-awesome-icon v-bind="_iconAttributes(item)" />
          </span>
        </span>
      </bs-ripple>
    </label>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ButtonToggle from "./mixins/ButtonToggle";
import Input from "../../mixins/Input";
import Helper from "../../utils/Helper";

export default {
    name: "BsButtonToggle",
    components: {FontAwesomeIcon},
    mixins: [Input, ButtonToggle],
    model: {
        prop: 'value',
        event: 'change'
    },
    data: () => ({
        trueValue: true,
        falseValue: false,
        rippleActive: false
    }),
    computed: {
        /**
         * Check if icon position is at the left side of text or not.
         *
         * @return {boolean} TRUE if icon position is on the Left side otherwise FALSE
         */
        iconLeft() {
            return this.iconPosition === 'left';
        },
        /**
         * Check if icon position is at the right side of text or not.
         *
         * @return {boolean} TRUE if icon position is on the Right side otherwise FALSE
         */
        iconRight() {
            return this.iconPosition === 'right';
        },
        localValue: {
            get() {
                return this.value;
            },
            set(value) {
                if (!this.disabled && !this.readonly) {
                    this.$emit('change', value);
                }
            }
        }
    },
    methods: {
        /**
         * Get button item's classes.
         *
         * @param {Object} item Current item
         * @return {string[]} Button's css classes
         * @private
         */
        _btnClasses(item) {
            return [
                'btn',
                this.isSelected(item) ? 'btn-' + this.toggleColor :
                    this.outlined ? 'btn-outline-' + this.color :
                        this.flat ? 'btn-flat-' + this.color : 'btn-' + this.color,
                this.raised ? 'btn-raised' : '',
                this.size ? 'btn-' + this.size : '',
                this.disabled ? 'disabled' : '',
                this.readonly ? 'readonly' : ''
            ]
        },
        /**
         * Get icon binding's properties.
         *
         * @param {Object} item Current item
         * @return {Object} Icon binding properties
         * @private
         */
        _iconAttributes(item) {
            return {
                icon: item.icon,
                size: item.iconSize,
                fixedWidth: item.iconFixed,
                flip: item.iconFlip,
                pulse: item.iconPulse,
                rotation: item.iconRotation,
                spin: item.iconSpin,
                class: {
                    'md-icon-left': this.iconLeft,
                    'md-icon-right': this.iconRight,
                }
            }
        },
        /**
         * Generate component's ID.
         *
         * @return {string} The generated ID
         * @private
         */
        _generateId() {
            return 'bs-' + Helper.uuid(true);
        },
        /**
         * Get input binding's properties.
         *
         * @param {Object} item Current item
         * @return {Object} Component binding properties
         * @private
         */
        _itemAttributes(item) {
            if (!item.id) {
                item.id = this._generateId();
            }

            const attr = {
                id: item.id,
                role: this.multiple ? 'checkbox' : 'radio',
                type: this.multiple ? 'checkbox' : 'radio',
                name: this.multiple ? item.name : this.name,
                required: this.required,
                disabled: this.disabled || item.disabled,
                readonly: this.readonly || item.readonly,
                'aria-disabled': this.disabled || item.disabled,
                'aria-checked': this.isSelected(item)
            };

            if (this.multiple) {
                return {
                    ...attr,
                    'true-value': this.trueValue,
                    'false-value': this.falseValue
                }
            }

            return attr;
        },
        /**
         * Toggle Ripple animation state.
         *
         * @param {boolean} active Ripple state to apply
         * @return {void}
         * @private
         */
        _toggleRipple(active) {
            this.rippleActive = active;
        },
        /**
         * Check if the item is selected/checked or not.
         *
         * @param {Object} item The selected item
         * @return {boolean} TRUE if the given item is selected otherwise FALSE
         */
        isSelected(item) {
            if (this.multiple && Array.isArray(this.value)) {
                return this.value.includes(item.value);
            } else {
                return this.value === item.value;
            }
        }
    }
}
</script>

<style scoped>

</style>
