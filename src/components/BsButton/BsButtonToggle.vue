<template>
  <div :class="['btn-group', cmpAttrClasses]" role="group">
    <label
      v-for="(item, idx) in items"
      :key="'btn-' + idx"
      :class="_btnClasses(item)">
      <input
        v-model="localValue"
        v-bind="_itemAttributes(item)"
        :value="item.value"
        class="d-none" />
      <bs-ripple
        :active.sync="rippleActive"
        :disabled="disabled || readonly">
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
import BsRipple from "../BsAnimation/BsRipple";
import ButtonToggle from "./mixins/ButtonToggle";
import Common from "../../mixins/Common";
import Input from "../BsField/mixins/Input";

export default {
    name: "BsButtonToggle",
    components: {FontAwesomeIcon, BsRipple},
    mixins: [Common, Input, ButtonToggle],
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
         * @returns {boolean} TRUE if icon position is on the Left side otherwise FALSE
         */
        iconLeft() {
            return this.iconPosition === 'left';
        },
        /**
         * Check if icon position is at the right side of text or not.
         *
         * @returns {boolean} TRUE if icon position is on the Right side otherwise FALSE
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
                    this.fireEvent('change', value);
                }
            }
        }
    },
    methods: {
        /**
         * Get button item's classes.
         *
         * @param {Object} item Current item
         * @returns {Object|*} Button's css classes
         * @private
         */
        _btnClasses(item) {
            return {
                'btn': true,
                ['btn-' + this.toggleColor]: this.isSelected(item) && this.toggleColor,
                ['btn-' + this.color + ' active']: this.isSelected(item) && !this.toggleColor,
                ['btn-outline-' + this.color]: !this.isSelected(item) && this.outlined,
                ['btn-flat-' + this.color]: !this.isSelected(item) && !this.outlined && this.flat,
                ['btn-' + this.color]: !this.isSelected(item) && !this.outlined && !this.flat,
                ['btn-' + this.size]: this.size,
                'btn-raised': this.raised,
                'disabled': this.disabled,
                'readonly': this.readonly,
            }
        },
        /**
         * Get icon binding's properties.
         *
         * @param {Object} item Current item
         * @returns {Object|*} Icon binding properties
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
         * Get input binding's properties.
         *
         * @param {Object} item Current item
         * @returns {Object|*} Component binding properties
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
         * Check if the item is selected/checked or not.
         *
         * @param {Object} item The selected item
         * @returns {boolean} TRUE if the given item is selected otherwise FALSE
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
