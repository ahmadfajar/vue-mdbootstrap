<template>
  <div class="md-combobox" :class="_classNames">
    <div class="md-combobox-inner row">
      <div v-if="floatingLabel === false"
           ref="label"
           class="md-combobox-label"
           @click.stop="activatorClick">
        <slot v-bind="{ id }"></slot>
      </div>
      <div class="col px-0">
        <div ref="activator"
             class="md-combobox-control align-items-end"
             :class="controlCls">
          <div class="md-combobox-control-inner d-flex flex-fill align-items-start"
               tabindex="0"
               @focus="_onFocus"
               @blur="_onBlur">
            <fieldset v-if="outlined" aria-hidden="true">
              <legend ref="legend">
                <span>​</span>
              </legend>
            </fieldset>
            <div v-if="floatingLabel"
                 ref="floatlabel"
                 class="md-floating-label"
                 :class="_floatingLabelClass"
                 @click="activatorClick">
              <slot v-bind="{ id }"></slot>
            </div>
            <div v-if="prependIcon" class="md-prepend-icon">
              <slot name="prependSlot">
                <font-awesome-icon :icon="prependIcon" />
              </slot>
            </div>
            <div class="md-combobox-input d-flex justify-content-start"
                 @click="activatorClick">
              <span v-if="_showPlaceHolder" class="md-placeholder">{{ placeholder }}</span>
              <span v-else-if="chips && multiple" class="md-input-tags">
                <slot name="tags">{{ inputDisplay }}</slot>
              </span>
              <span class="md-value" v-else>{{ inputDisplay }}</span>
            </div>
            <div class="md-action-icon d-flex align-items-center">
              <transition name="fade">
                <bs-icon v-if="_showClearButton"
                         class="d-flex align-items-center"
                         icon="clear"
                         @click="clearSelected" />
              </transition>
              <bs-icon icon="expand_more"
                       class="caret"
                       size="24"
                       @click="activatorClick" />
            </div>
            <div class="md-append-icon" v-if="appendIcon">
              <slot name="appendSlot">
                <font-awesome-icon :icon="appendIcon" />
              </slot>
            </div>
            <select class="md-combobox-control-hidden" v-bind="_inputAttributes">
              <option v-for="(item, index) in selectedItems"
                      :key="'item-' + index"
                      :value="getItemValue(item)"
                      selected>
                {{ getItemText(item) }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="helpText || showErrorValidation" class="md-help-text">
          <slot name="helptext">
            <small v-if="showHelpText" class="text-muted d-block">
              {{ helpText }}
            </small>
          </slot>
          <template v-if="hasValidationError">
            <small v-for="(fld) in errorItems"
                   :key="fld"
                   class="text-danger d-block">
              {{ _validationMessage(fld) }}
            </small>
          </template>
        </div>
      </div>
    </div>
    <bs-popover v-bind="_popoverAttributes"
                ref="content"
                @close="hideMenu">
      <bs-combobox-list-container v-bind="_listContainerAttributes"
                                  @dataFiltered="_onFilterData"
                                  @itemSelected="_onSelectItem"
                                  @itemDeselected="_onDeselectItem">
        <slot slot="emptyData" name="emptyData" />
        <slot slot="optionItem"
              slot-scope="{ item, index }"
              v-bind="{ item, index }"
              name="optionItem" />
      </bs-combobox-list-container>
    </bs-popover>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsComboboxListContainer from "./BsComboboxListContainer";
import BsIcon from "../BsIcon/BsIcon";
import BsPopover from "../BsPopover/BsPopover";
import AbstractStore from "../../model/AbstractStore";
import Input from "../../mixins/Input";
import MenuAble from "../../mixins/MenuAble";
import FieldValidation from "./mixins/FieldValidation";
import Helper from "../../utils/Helper";
import '../../../scss/_shadows.scss';

export default {
    name: "BsCombobox",
    components: {
        FontAwesomeIcon, BsComboboxListContainer, BsIcon, BsPopover
    },
    mixins: [Input, FieldValidation, MenuAble],
    props: {
        checkOption: {
            type: Object,
            default() {
                return {
                    color: 'purple',
                    position: 'left'
                }
            }
        },
        checkOptionColor: {
            type: String,
            default: undefined
        },
        checkOptionPosition: {
            type: String,
            default: undefined,
            validator(value) {
                return ['left', 'right'].indexOf(value) > -1;
            }
        },
        listboxColor: {
            type: String,
            default: undefined
        },
        maxHeight: {
            type: [String, Number],
            default: 300
        },
        minimumItemsForSearch: {
            type: Number,
            default: 15
        },
        emptyDataMessage: {
            type: String,
            default: 'No data to display.'
        },
        notFoundMessage: {
            type: String,
            default: 'Data not found.'
        },
        parentValue: {
            type: [String, Boolean, Number, Array],
            default: undefined
        },
        persistentHelpText: {
            type: Boolean,
            default: true
        },
        dataSource: {
            type: Object,
            default: undefined
        },
        placeholder: {
            type: String,
            default: undefined
        },
        prependIcon: {
            type: [String, Array],
            default: undefined
        },
        appendIcon: {
            type: [String, Array],
            default: undefined
        },
        controlCls: {
            type: [String, Array],
            default: undefined
        },
        imageSize: {
            type: Number,
            default: undefined
        },
        minimumPopoverWidth: {
            type: Number,
            default: undefined
        },
        transition: {
            type: String,
            default: BsPopover.props.transition.default
        },
        clearButton: Boolean,
        multiple: Boolean,
        chips: Boolean,
        flat: Boolean,
        floatingLabel: Boolean,
        outlined: Boolean,
        itemSeparator: Boolean,
        showImage: Boolean,
        roundedImage: Boolean,
        circleImage: Boolean,
        valueAsObject: Boolean,
    },
    data: (vm) => ({
        dataModel: {},
        /**
         * @type {Object}
         * Default data model schema.
         */
        defaultSchema: {
            displayField: 'text',
            valueField: 'value',
            imageField: 'image',
            cascadeField: 'parent',
            disableField: 'disabled'
        },
        popoverWidth: vm.minimumPopoverWidth ? vm.minimumPopoverWidth : 0,
        dataFetched: false,
        isFocused: false,
        inputDisplay: '',
        inputValue: vm.value,
        placement: 'bottom',
        selectedItems: [],
        trigger: null
    }),
    provide() {
        return {
            dataModel: this.dataModel,
            getItemValue: this.getItemValue,
            getItemText: this.getItemText,
            hasProperty: this.hasProperty,
            itemPropertyValue: this.itemPropertyValue
        }
    },
    computed: {
        /**
         * Get computed component's styles.
         *
         * @return {*} Collection of css classes
         */
        _classNames() {
            return {
                ...this.cmpAttrClasses,
                'md-open': this.active,
                'md-combobox-flat': this.flat,
                'md-combobox-outlined': this.outlined,
                'md-combobox-multiple': this.multiple,
                'md-floating-active': this.floatingLabel,
                'md-focused': this.isFocused || this.active,
                'has-error': this.hasValidationError,
                'has-success': this.wasValidated && !this.hasValidationError
            };
        },
        /**
         * Get computed binding's properties.
         *
         * @return {*} Attributes to bind
         */
        _inputAttributes() {
            return {
                ...this.cmpAttrs,
                'tabindex': -1,
                'aria-hidden': true,
                'multiple': this.multiple,
                'aria-required': this.required,
                'aria-disabled': this.disabled
            };
        },
        /**
         * Check if feature clear button is enabled or not.
         *
         * @return {boolean} TRUE if has clear button otherwise FALSE
         */
        _showClearButton() {
            return this.clearButton && !this.readonly && !this.disabled && this.selectedItems.length > 0;
        },
        /**
         * @return {boolean} Display placeholder or not
         */
        _showPlaceHolder() {
            return !this.inputValue;
        },
        /**
         * Get computed floating label's class names.
         *
         * @return {*} Floating label css classes
         */
        _floatingLabelClass() {
            return {
                'md-active': this.placeholder || this.active || this.selectedItems.length > 0,
                'md-after-icon': this.prependIcon
            }
        },
        /**
         * Get combobox list container binding attributes.
         *
         * @return {*} Attributes to bind
         */
        _listContainerAttributes() {
            return {
                active: this.active,
                disabled: this.disabled,
                itemSeparator: this.itemSeparator,
                multiple: this.multiple,
                showImage: this.showImage,
                roundedImage: this.roundedImage,
                circleImage: this.circleImage,
                imageSize: this.imageSize,
                listboxColor: this.listboxColor,
                checkOptionColor: this.checkboxColor,
                checkOptionPosition: this.checkboxPosition,
                dataItems: this.dataItems,
                selectedItems: this.selectedItems,
                cascadeField: this.cascadeField,
                disableField: this.disableField,
                displayField: this.displayField,
                imageField: this.imageField,
                valueField: this.valueField,
                maxHeight: this.maxHeight,
                minimumItemsForSearch: this.minimumItemsForSearch,
                emptyDataMessage: this.emptyDataMessage,
                notFoundMessage: this.notFoundMessage,
                style: this._popoverStyles
            }
        },
        /**
         * Get Popover computed binding attributes.
         *
         * @return {*} Attributes to bind
         */
        _popoverAttributes() {
            return {
                open: this.active,
                placement: this.placement,
                transition: this.transition,
                trigger: this.trigger,
                style: this._popoverStyles,
                class: {
                    'md-combobox-popover': true,
                    'md-shadow-1': true,
                    ['bg-' + this.listboxColor] : this.listboxColor
                }
            }
        },
        /**
         * Get popover's computed width.
         *
         * @return {Number} Popover minimum width
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
         * @return {Object} Popover styles
         */
        _popoverStyles() {
            return {
                'min-width': this.trigger ? Helper.sizeUnit(this._popoverMinWidth) : '',
                'max-height': Helper.sizeUnit(this.maxHeight)
            }
        },
        /**
         * Get checkbox color.
         *
         * @return {string} Color name
         */
        checkboxColor() {
            this._assignCheckOptionColor(this.checkOptionColor);
            return this.checkOption.color;
        },
        /**
         * Get checkbox position when multi-selection is enabled.
         *
         * @return {string} Position name
         */
        checkboxPosition() {
            this._assignCheckOptionPosition(this.checkOptionPosition);
            return this.checkOption.position;
        },
        /**
         * Get data items.
         *
         * @return {Object[]} Items
         */
        dataItems() {
            return this.dataSource ? this.dataSource.proxy.dataItems : [];
        },
        /**
         * Get property cascade field name from data schema.
         *
         * @return {string} A field name
         */
        cascadeField() {
            return this.dataModel.cascadeField;
        },
        /**
         * Get property disabled field name from data schema.
         *
         * @return {string} A field name
         */
        disableField() {
            return this.dataModel.disableField;
        },
        /**
         * Get property display/text field name from data schema.
         *
         * @return {string} A field name
         */
        displayField() {
            return this.dataModel.displayField;
        },
        /**
         * Get property image field name from data schema.
         *
         * @return {string} A field name
         */
        imageField() {
            return this.dataModel.imageField;
        },
        /**
         * Get property value field name from data schema.
         *
         * @return {string} A field name
         */
        valueField() {
            return this.dataModel.valueField;
        },
        /**
         * Create getter and setter for v-model
         */
        model: {
            get() {
                if (this.multiple && this.valueAsObject) {
                    return this.selectedItems;
                } else if (!this.multiple && this.valueAsObject) {
                    return this.selectedItems.slice(0, 1);
                }

                return this.inputValue;
            },
            set(value) {
                const ctor = value.constructor.toString().match(/function (\w*)/)[1].toLowerCase();
                if (ctor !== 'inputevent' && ctor !== 'changeevent') {
                    this.inputValue = value;
                    this.$emit('input', value);
                }
            }
        }
    },
    watch: {
        active(value) {
            if (value && !this.minimumPopoverWidth) {
                this.popoverWidth = this.trigger.offsetWidth;
            }
            this._updateLegend(value);
        },
        parentValue(newValue) {
            if (!Helper.isEmpty(this.cascadeField) && newValue !== undefined) {
                Helper.defer(() => {
                    this.dataFetched = false;
                    this.clearSelected();
                    this._fetchData();
                }, 100);
            }
        },
        value(newValue) {
            this.inputValue = newValue;
            this._updateLegend(newValue);
            this._setSelectedItems();
        }
    },
    created() {
        this._fetchData();
    },
    mounted() {
        this._updateLabel();
        this._updateValue();
        this._updateLegend();
    },
    beforeDestroy() {
        this.selectedItems = [];
        this.dataModel     = null;
    },
    methods: {
        /**
         * Remove all selected items.
         *
         * @return {Array} The deleted items
         */
        clearSelected() {
            const results = this.selectedItems.splice(0, this.selectedItems.length);
            this._computeInternalValues();
            this.$emit('input', this.inputValue);

            return results;
        },
        /**
         * Get value from the given item.
         *
         * @param {Object|Array|string|number} item The given item
         * @return {string|boolean|number} The item value
         */
        getItemValue(item) {
            if (Helper.isPrimitive(item)) {
                return item;
            } else if (Helper.isArray(item)) {
                return item[0];
            }

            return Helper.getObjectValueByPath(
                item, this.valueField, this.itemPropertyValue(item, this.displayField)
            );
        },
        /**
         * Get display text from the given item.
         *
         * @param {Object|Array|string|number} item The given item
         * @return {string|boolean|number} The text to display
         */
        getItemText(item) {
            if (Helper.isPrimitive(item)) {
                return item;
            } else if (Helper.isArray(item)) {
                return item[1] ? item[1] : item[0];
            }

            return Helper.getObjectValueByPath(
                item, this.displayField, this.itemPropertyValue(item, this.valueField)
            );
        },
        /**
         * Check if the given object has a property or not.
         *
         * @param {Object} item  The object to evaluate
         * @param {string} field The property name to check
         * @return {boolean} TRUE if has the property otherwise false
         */
        hasProperty(item, field) {
            const ret = Helper.getObjectValueByPath(item, field);

            return (ret !== null && ret !== undefined);
        },
        /**
         * Get object property value from the given item.
         *
         * @param {Object} item           The object to evaluate
         * @param {String|Function} field The property name
         * @return {string|boolean|number} The property value
         */
        itemPropertyValue(item, field) {
            return Helper.getObjectValueByPath(item, field);
        },
        /**
         * Assign checkbox color property.
         *
         * @param {string} color CheckBox color
         * @return {void}
         */
        _assignCheckOptionColor(color) {
            if (color) {
                this.checkOption.color = color;
            }
        },
        /**
         * Assign checkbox position property.
         *
         * @param {string} position CheckBox position
         * @return {void}
         */
        _assignCheckOptionPosition(position) {
            if (position && ['left', 'right'].includes(position)) {
                this.checkOption.position = position;
            }
        },
        /**
         * Compute and join the selected array values.
         *
         * @return {void}
         * @private
         */
        _computeInternalValues() {
            let values = [], text = [];
            this.selectedItems.forEach(item => {
                values.push(this.getItemValue(item));
                text.push(this.getItemText(item));
            });
            this.inputValue   = this.multiple
                ? (values.length > 0 ? values : null)
                : (values.length > 0 ? values[0] : null);
            this.inputDisplay = text.join(', ');
        },
        /**
         * Fetch data from static data source or remote server.
         *
         * @return {void}
         * @private
         */
        _fetchData() {
            const ds    = this.dataSource;
            let doFetch = false;

            if (ds !== undefined) {
                if (ds.schema && ds.schema.valueField) {
                    this.dataModel = Object.assign(this.dataModel, ds.schema);
                    if (Helper.isEmpty(ds.schema.displayField)) {
                        this.dataModel.displayField = this.dataModel.valueField;
                    }
                } else {
                    // assign with default schema
                    this.dataModel = Object.assign(this.dataModel, this.defaultSchema);
                }
                if (!this.dataFetched && Helper.isObject(ds.proxy) && ds.proxy instanceof AbstractStore) {
                    if (!Helper.isEmpty(this.parentValue) && !Helper.isEmpty(this.cascadeField)) {
                        ds.proxy.setFilters({
                            'property': this.cascadeField,
                            'value': this.parentValue,
                            'operator': Helper.isArray(this.parentValue) ? 'in' : 'eq'
                        }, true);
                        doFetch = true;
                    } else if (Helper.isEmpty(this.parentValue) &&
                        (Helper.isEmpty(this.cascadeField) || this.cascadeField === 'parent')) {
                        doFetch = true;
                    }
                    if (doFetch) {
                        ds.proxy.load().then(() => {
                            this.$emit('data-bind', this.dataModel.items);
                            this.dataFetched = true;
                            this._updateValue();
                        }).catch((error) => {
                            this.$emit('data-error', error);
                            this.dataFetched = false;
                        });
                    }
                }
            }
        },
        /**
         * Set attribute "for" for the given element.
         *
         * @param {Element} elm The DOM element
         * @return {void}
         * @private
         */
        _setLabelFor(elm) {
            if (elm && !elm.hasAttribute('for')) {
                elm.setAttribute('for', this.id);
            }
        },
        /**
         * Compute selected items in the combobox.
         *
         * @return {void}
         * @private
         */
        _setSelectedItems() {
            const items        = this.dataItems;
            this.selectedItems = [];

            if (this.inputValue) {
                if (Helper.isArray(this.inputValue)) {
                    items.forEach(el => {
                        this.inputValue.forEach(it => {
                            if (Helper.isObject(it) && this.getItemValue(it) === this.getItemValue(el)) {
                                this.selectedItems.push(el);
                            } else if (Helper.isPrimitive(it) && it === this.getItemValue(el)) {
                                this.selectedItems.push(el);
                            }
                        })
                    });
                } else {
                    this.selectedItems = items.filter(el =>
                        (this.inputValue === this.getItemValue(el)) ||
                        (this.getItemValue(el) === this.getItemValue(this.inputValue))
                    );
                }
            }

            this._computeInternalValues();
        },
        /**
         * Update combobox label.
         *
         * @return {void}
         * @private
         */
        _updateLabel() {
            let label;
            this.trigger = this.$refs.activator;

            if (!this.floatingLabel && this.$refs.label.children.length > 0) {
                const elm = this.$refs.label.children[0];
                label     = this.$refs.label.querySelector('label');

                this.$refs.label.className += ' ' + elm.className;
                elm.className = 'md-empty-class';
                this._setLabelFor(label);
            } else if (this.floatingLabel && this.$refs.floatlabel.children) {
                const children = this.$refs.floatlabel.children;

                if (children.length > 0) {
                    label = this.$refs.floatlabel.children[0];
                    if (!Helper.isEmpty(label.classList) && !Helper.isEmpty(label.className)) {
                        label.className = 'md-empty-class';
                    }
                }

                label = this.$refs.floatlabel.querySelector('label');
                this._setLabelFor(label);
            }
        },
        /**
         * Update computed values.
         *
         * @return {void}
         * @private
         */
        _updateValue() {
            if (this.value) {
                this.inputValue = this.value;
                this._setSelectedItems();
            }
        },
        /**
         * Handler for event data filtering.
         *
         * @param {Array} items The filtered items
         * @return {void}
         * @private
         */
        _onFilterData(items) {
            this.$emit('data-filter', items);
        },
        _onFocus() {
            this.isFocused = true;
            this._updateLegend();
        },
        _onBlur() {
            this.isFocused = false;
            this._updateLegend();
        },
        /**
         * Handler when an item within combobox is deselected.
         *
         * @param {Object} item The unselected item
         * @return {void}
         * @private
         */
        _onDeselectItem(item) {
            const ds = this.selectedItems;

            if (ds.includes(item)) {
                this.selectedItems = ds.filter(target => target !== item);
                this.$emit('deselect', item);
            }
            this._computeInternalValues();
            if (!this.multiple) {
                this.active = false;
            }
            if (this.inputValue === null) {
                this.$emit('input', null);
            } else {
                if (this.valueAsObject) {
                    this.model = this.multiple ? this.selectedItems : this.selectedItems[0];
                } else {
                    this.model = this.inputValue;
                }
            }

            this.$nextTick(() => {
                this.$emit('change', null, item);
            });
        },
        /**
         * Handler when an item within combobox is selected.
         *
         * @param {Object} item The selected item
         * @return {void}
         * @private
         */
        _onSelectItem(item) {
            let oldItem;
            const ds = this.selectedItems;

            if (this.multiple) {
                oldItem = this.selectedItems.length > 0 ? this.selectedItems[this.selectedItems.length - 1] : null;
                if (!ds.includes(item)) {
                    this.selectedItems.push(item);
                }
                this.$emit('select', this.selectedItems);
            } else {
                oldItem = this.selectedItems.pop();
                this.selectedItems.push(item);
                this.$emit('select', this.selectedItems[0]);
            }

            this._computeInternalValues();
            if (!this.multiple) {
                this.active = false;
            }
            if (this.valueAsObject) {
                this.model = this.multiple ? this.selectedItems : this.selectedItems[0];
            } else {
                this.model = this.inputValue;
            }

            this.$nextTick(() => {
                this.$emit('change', item, oldItem);
            });
        },
        _updateLegend(value) {
            if (this.outlined && this.$refs.legend) {
                let label    = this.floatingLabel
                    ? this.$refs.floatlabel
                    : this.$el.querySelector('label');
                let hasWidth = this.floatingLabel && (this.active || this.placeholder || this.inputValue || value);

                if (hasWidth && label) {
                    this.$refs.legend.style.width = Helper.sizeUnit(label.clientWidth);
                } else {
                    this.$refs.legend.style.width = Helper.sizeUnit(0);
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

$dropdown-checkbox-size: 16px;
$dropdown-checkbox-ripple-size: 40px;

.#{$prefix}-combobox {
  position: relative;
  width: 100%;

  &.#{$prefix}-required {
    .#{$prefix}-floating-label,
    .#{$prefix}-combobox-label,
    .col-form-label {
      font-weight: bold;
    }
  }

  > .#{$prefix}-combobox-inner {
    .#{$prefix}-combobox-label {
      @include user-select(none);

      label {
        margin-bottom: 0;
      }
    }

    .#{$prefix}-help-text {
      display: block;
      min-height: 18px;
      margin: ($padding-base / 4) $padding-base 0 $padding-base;

      > * {
        font-size: 83% !important;
      }
    }

    .#{$prefix}-combobox-control {
      @include display-flex();
      @include flex(1 1 auto);
      margin-left: $padding-base - .06;
      margin-right: $padding-base - .06;
      min-height: 2rem;
      padding-left: 0;
      padding-right: 0;
      position: relative;
      outline: 0 none;
      width: auto;

      .#{$prefix}-floating-label {
        @include transition(0.3s cubic-bezier(0.25, 0.8, 0.5, 1));
        @include transform-origin(top left, false);
        display: inline-block;
        left: 0;
        top: $padding-base / 4;
        right: auto;
        line-height: 1.2;
        max-width: 90%;
        min-height: .5rem;
        overflow: hidden;
        position: absolute;
        pointer-events: none;
        text-overflow: ellipsis;
        white-space: nowrap;
        z-index: 2;

        &.#{$prefix}-active {
          @include transform(translateY(-24px) scale(.9));
          color: $gray-600;
        }
      }

      > .#{$prefix}-combobox-control-inner {
        @include transition(border .3s ease-in-out);
        @include box-shadow(none);
        outline: 0 none;
        height: 100%;
        border-bottom: 1px solid $gray-500;
        position: relative;

        &:after {
          @include transition($transition-basic);
          background-color: $blue-darken-2;
          position: absolute;
          content: '';
          height: 1px;
          left: 50%;
          bottom: 0;
          width: 0;
        }

        > .#{$prefix}-prepend-icon,
        > .#{$prefix}-append-icon {
          color: $gray-700;
          display: inline;
          font-size: 1rem;
        }

        > .#{$prefix}-prepend-icon {
          margin-right: $padding-sm;
        }

        > .#{$prefix}-append-icon {
          margin-left: .4rem;
          margin-right: .3rem;
        }
      }

      .#{$prefix}-combobox-control-hidden {
        background-color: transparent;
        border: 0 none;
        display: none;
        outline: 0 none;
        position: absolute;
      }

      .#{$prefix}-combobox-input {
        @include flex(1 auto);
        max-width: 100%;
        min-height: 1.25rem;

        > .#{$prefix}-placeholder {
          @include user-select(none);
          cursor: default !important;
          color: $gray-500;
          font-weight: $font-weight-light;
        }

        .#{$prefix}-input-tags {
          margin: 4px 4px 4px 0;
        }

        .#{$prefix}-value {
          pointer-events: none;
        }
      }

      .#{$prefix}-action-icon {
        cursor: pointer;
        padding-left: $padding-sm;

        .#{$prefix}-icon {
          &.icon-clear {
            color: $gray-500;
            font-size: 1rem;

            &:focus, &:active, &:hover, &:active:focus {
              color: $red-base;
            }
          }
        }

        .caret {
          @include transition(all 0.3s ease 0s);
        }
      }
    }
  }

  &.#{$prefix}-combobox-flat {
    > .#{$prefix}-combobox-inner {
      .#{$prefix}-combobox-control {
        > .#{$prefix}-combobox-control-inner {
          border-bottom-color: transparent;
        }
      }
    }
  }

  &.#{$prefix}-focused {
    &:not(.#{$prefix}-disabled) {
      .#{$prefix}-combobox-control {
        .#{$prefix}-prepend-icon,
        .#{$prefix}-append-icon,
        .#{$prefix}-floating-label {
          color: $primary-color;
        }

        .#{$prefix}-action-icon > .caret {
          color: $blue-darken-3 !important;
        }
      }
    }
  }

  &.has-error {
    .col-form-label {
      color: $danger-color-dark !important;
    }

    > .#{$prefix}-combobox-inner {
      .#{$prefix}-combobox-control {
        > .#{$prefix}-combobox-control-inner {
          .#{$prefix}-prepend-icon,
          .#{$prefix}-append-icon,
          .#{$prefix}-floating-label {
            color: $danger-color-dark;
          }

          border-bottom-color: $danger-color !important;

          &:after {
            background-color: $danger-color;
          }
        }
      }
    }
  }

  &.has-success {
    .col-form-label {
      color: $success-color-dark !important;
    }

    > .#{$prefix}-combobox-inner {
      .#{$prefix}-combobox-control-inner {
        .#{$prefix}-prepend-icon,
        .#{$prefix}-append-icon,
        .#{$prefix}-floating-label {
          color: $success-color-dark;
        }
      }
    }

    &:not(.#{$prefix}-focused) {
      > .#{$prefix}-combobox-inner {
        .#{$prefix}-combobox-control-inner {
          border-bottom-color: $success-color-dark !important;
        }
      }
    }
  }

  &.#{$prefix}-floating-active {
    padding-top: 1rem;

    .#{$prefix}-combobox-control {
      .#{$prefix}-floating-label {
        > .#{$prefix}-empty-class, label {
          margin-bottom: 0;
        }

        &.#{$prefix}-after-icon:not(.#{$prefix}-active) {
          margin-left: $padding-base + .5;
        }
      }
    }
  }

  &.#{$prefix}-active,
  &.#{$prefix}-focused,
  &.#{$prefix}-open {
    &:not(.#{$prefix}-disabled) {
      &:not(.#{$prefix}-combobox-outlined) {
        .#{$prefix}-combobox-control-inner {
          border-bottom-color: $blue-darken-2;

          &:after {
            left: 0 !important;
            width: 100% !important;
          }
        }
      }
    }
  }

  &.#{$prefix}-open {
    .#{$prefix}-combobox-control-inner {
      .caret {
        @include transform(rotateZ(-180deg));
      }
    }
  }

  &.#{$prefix}-combobox-outlined {
    padding-top: $padding-sm - .25;

    > .#{$prefix}-combobox-inner {
      .#{$prefix}-help-text {
        margin-left: $padding-xl - .35;
      }
    }

    .#{$prefix}-combobox-control-inner {
      @include border-radius($border-radius-sm);
      border-width: 0 !important;
      padding: 0 $padding-sm 0 ($padding-base - .25);

      legend {
        @include transition(width .3s cubic-bezier(.25, .8, .5, 1));
        display: table;
        line-height: 1;
        max-width: 98%;
        padding: 0;
        margin: 0;
      }

      > fieldset {
        @include border-radius($border-radius-sm);
        @include transition(border, color $md-transition-stand);
        display: block;
        border-collapse: collapse;
        border: 1px solid;
        bottom: 0;
        left: 0;
        right: 0;
        top: -10px;
        color: rgba(0, 0, 0, .4);
        padding-left: $padding-sm;
        pointer-events: none;
        position: absolute;
      }

      > .#{$prefix}-floating-label {
        margin-left: $padding-base - .25;
        padding-top: $padding-base - .25;

        &.#{$prefix}-active {
          @include transform(translateY(-21px) scale(.9));
        }

        &.#{$prefix}-after-icon:not(.#{$prefix}-active) {
          margin-left: $padding-xl;
        }
      }

      .#{$prefix}-combobox-input {
        @include align-items(center);
        padding-top: $padding-sm;
        padding-bottom: $padding-sm;
        min-height: 3rem;
      }

      .#{$prefix}-action-icon {
        padding-top: $padding-base - .25;
      }

      .#{$prefix}-prepend-icon, .#{$prefix}-append-icon {
        margin-top: $padding-base - .3;
      }
    }

    &.#{$prefix}-focused {
      &:not(.#{$prefix}-disabled) {
        .#{$prefix}-combobox-control-inner {
          > fieldset {
            color: $blue-darken-2;
            border-width: 2px;
          }
        }
      }
    }

    &.has-error {
      .#{$prefix}-combobox-control-inner {
        > fieldset {
          color: $danger-color-dark;
        }
      }
      &.#{$prefix}-focused {
        .#{$prefix}-combobox-control-inner {
          > fieldset {
            color: $danger-color-dark;
          }
        }
      }
    }

    &.has-success {
      .#{$prefix}-combobox-control-inner {
        > fieldset {
          color: $success-color-dark;
        }
      }
      &.#{$prefix}-focused {
        .#{$prefix}-combobox-control-inner {
          > fieldset {
            color: $success-color-dark;
          }
        }
      }
    }
  }

  &.#{$prefix}-disabled {
    .col-form-label {
      color: $gray-500;
    }

    &.#{$prefix}-combobox-outlined {
      .#{$prefix}-combobox-control-inner {
        > fieldset {
          color: rgba($black, .25);
        }
      }
    }
  }
}

.#{$prefix}-combobox-popover {
  border: 1px solid rgba($black, 0.1) !important;
  border-right-width: 0 !important;
  overflow: hidden !important;

  > .#{$prefix}-combobox-list-container {
    background-color: $white;
    overflow: hidden;

    > .#{$prefix}-combobox-search-wrapper {
      display: block;
      padding: 6px;
      margin: 0;

      > .#{$prefix}-combobox-search {
        border: 1px solid $gray-500;
        color: $gray-800;
        font-size: 14px;
        outline: none;
        padding: 6px 8px;
        width: 100%;
      }
    }

    > .#{$prefix}-list {
      overflow-x: hidden;
      overflow-y: auto;
    }

    .#{$prefix}-list-item {
      padding: 5px 8px 5px 16px !important;

      .#{$prefix}-list-tile-action + .#{$prefix}-list-tile-content {
        margin-left: 4px !important;
      }

      &.#{$prefix}-active {
        .#{$prefix}-list-tile-title, .#{$prefix}-list-tile-subtitle {
          color: $primary-color-dark;
        }
      }
    }

    .#{$prefix}-checkbox {
      margin: 10px 10px 10px 0;

      > .#{$prefix}-checkbox-inner {
        height: $dropdown-checkbox-size;
        min-width: $dropdown-checkbox-size;
        width: $dropdown-checkbox-size;

        &:before {
          height: $dropdown-checkbox-ripple-size;
          width: $dropdown-checkbox-ripple-size;
        }

        &:after {
          height: 10px;
          width: 6px;
          left: 3px;
        }

        .#{$prefix}-ripple {
          height: $dropdown-checkbox-ripple-size !important;
          width: $dropdown-checkbox-ripple-size !important;
        }
      }
    }
  }
}

@each $color_name, $color in $material-colors {
  .#{$prefix}-combobox-popover {
    &.bg-#{$color_name} {
      .#{$prefix}-combobox-search-wrapper {
        > .#{$prefix}-combobox-search {
          @if(lightness($color) < 81) {
            background-color: rgba(lighten($color, 20%), .25);
            border-color: rgba($gray-500, .6) !important;
            color: darken($white-base, 10%) !important;
          }
        }
      }
    }
  }
}

@each $color_name, $color in $theme-colors {
  .#{$prefix}-combobox-popover {
    &.bg-#{$color_name} {
      .#{$prefix}-combobox-search-wrapper {
        > .#{$prefix}-combobox-search {
          @if(lightness($color) < 81) {
            background-color: rgba(lighten($color, 20%), .25);
            border-color: rgba($gray-500, .6) !important;
            color: darken($white-base, 10%) !important;
          }
        }
      }
    }
  }
}
</style>
