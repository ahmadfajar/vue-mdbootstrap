<template>
  <div :class="_classNames" class="md-field md-combobox row">
    <div
      v-if="floatingLabel === false"
      ref="label"
      class="md-combobox-label"
      @click.stop="activatorClick">
      <slot v-bind="{ id }"></slot>
    </div>
    <div class="md-field-wrapper">
      <div
        v-if="prependIconOuter"
        class="md-prepend-icon">
        <slot name="prependIconOuter">
          <font-awesome-icon :icon="prependIconOuter" fixed-width />
        </slot>
      </div>
      <div class="md-field-ctrl">
        <div
          ref="activator"
          class="md-field-inner"
          @mouseenter="onMouseEnter">
          <fieldset
            v-if="outlined"
            aria-hidden="true">
            <legend ref="legend">
              <span>​</span>
            </legend>
          </fieldset>
          <div
            v-if="prependIcon"
            class="md-prepend-icon">
            <slot name="prependIcon">
              <font-awesome-icon :icon="prependIcon" fixed-width />
            </slot>
          </div>
          <div
            class="md-field-input-wrapper"
            tabindex="0"
            @blur="_onBlur"
            @click="activatorClick"
            @focus="_onFocus">
            <div
              v-if="floatingLabel"
              ref="floatLabel"
              :class="_floatingLabelClass"
              class="md-field-label">
              <slot v-bind="{ id }" />
            </div>
            <div class="md-combobox-input">
              <span
                v-if="_showPlaceHolder"
                class="md-placeholder">{{ placeholder }}</span>
              <div
                v-else-if="chipEnabled && multiple"
                class="md-input-tags">
                <bs-chip
                  v-for="(item, index) in selectedItems"
                  :key="'chip-' + index"
                  :color="chipColor"
                  :disabled="disabled"
                  :label="chipLabeled"
                  :outlined="chipOutlined">
                  {{ getItemText(item) }}
                </bs-chip>
              </div>
              <span class="md-value" v-else>{{ inputDisplay }}</span>
            </div>
            <select v-bind="_inputAttributes" class="d-none">
              <option
                v-for="(item, index) in selectedItems"
                :key="'item-' + index"
                :value="getItemValue(item)"
                selected>
                {{ getItemText(item) }}
              </option>
            </select>
          </div>
          <div class="md-action-icon">
            <transition name="fade">
              <bs-icon
                v-if="_showClearButton"
                height="24"
                icon="clear"
                @click="clearSelected" />
            </transition>
            <bs-icon
              icon="expand_more"
              size="24"
              @click="activatorClick" />
          </div>
          <div
            v-if="appendIcon"
            class="md-append-icon">
            <slot name="appendIcon">
              <font-awesome-icon :icon="appendIcon" fixed-width />
            </slot>
          </div>
        </div>
        <div
          v-if="helpText || showErrorValidation"
          class="md-help-text">
          <transition name="fade">
            <slot name="helpText">
              <small
                v-if="showHelpText"
                class="text-muted d-block">
                {{ helpText }}
              </small>
            </slot>
          </transition>
          <template v-if="hasValidationError">
            <small
              v-for="(fld) in errorItems"
              :key="fld"
              class="text-danger d-block">
              {{ _validationMessage(fld) }}
            </small>
          </template>
        </div>
      </div>
      <div
        v-if="appendIconOuter"
        class="md-append-icon">
        <slot name="appendIconOuter">
          <font-awesome-icon :icon="appendIconOuter" fixed-width />
        </slot>
      </div>
    </div>
    <bs-popover
      ref="content"
      v-bind="_popoverAttributes"
      class="md-combobox-popover md-shadow-1"
      @close="hideMenu">
      <bs-combobox-list-container
        v-bind="_listContainerAttributes"
        @data-filtered="_onFilterData"
        @item-selected="_onSelectItem"
        @item-deselected="_onDeselectItem">
        <template #emptyDataMessage>
          <slot name="emptyData">
            <bs-list-tile-title>{{ emptyDataMessage }}</bs-list-tile-title>
          </slot>
        </template>
        <template #optionItem="{ item, index }">
          <slot v-bind="{ item, index }" name="optionItem">
            <bs-list-tile-title>{{ getItemText(item) }}</bs-list-tile-title>
          </slot>
        </template>
      </bs-combobox-list-container>
    </bs-popover>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BsComboboxListContainer from "./BsComboboxListContainer";
import BsListTileTitle from "../BsList/BsListTileTitle";
import BsIcon from "../BsIcon/BsIcon";
import BsChip from "../BsBasic/BsChip";
import BsPopover from "../BsPopover/BsPopover";
import AbstractStore from "../../model/AbstractStore";
import Input from "./mixins/Input";
import MenuAble from "../../mixins/MenuAble";
import FieldValidation from "./mixins/FieldValidation";
import Helper from "../../utils/Helper";
import "../../../scss/_field.scss"
import '../../../scss/utilities/_shadows.scss';

export default {
    name: "BsCombobox",
    components: {
        FontAwesomeIcon, BsComboboxListContainer, BsIcon, BsChip, BsPopover,
        BsListTileTitle,
    },
    mixins: [Input, MenuAble, FieldValidation],
    props: {
        /**
         * Sets icon to display on inner right side. Use any valid
         * [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        appendIcon: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets icon to display on outer right side. Use any valid
         * [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        appendIconOuter: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets the checkbox color for ListBox options.
         * @type {string|*}
         */
        checkOptionColor: {
            type: String,
            default: 'purple'
        },
        /**
         * Sets the checkbox position for ListBox options. Valid values are: `left`, `right`.
         * @type {string|*}
         */
        checkOptionPosition: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right'].indexOf(value) > -1;
            }
        },
        /**
         * Sets auto show the clear button.
         * @type {boolean|*}
         */
        clearButton: {
            type: Boolean,
            default: false
        },
        /**
         * Sets data source for the ListBox options.
         * @type {Object|*}
         */
        dataSource: {
            type: Object,
            default: undefined
        },
        /**
         * Sets the **no data message** when ListBox options is empty.
         * @type {string|*}
         */
        emptyDataMessage: {
            type: String,
            default: 'No data to display.'
        },
        /**
         * Sets the ListBox background color.
         * @type {string|*}
         */
        listboxColor: {
            type: String,
            default: undefined
        },
        /**
         * Sets the ListBox background color.
         * @type {number|string|*}
         */
        minimumItemsForSearch: {
            type: [Number, String],
            default: 15,
            validator: value => parseInt(value, 10) > 0
        },
        /**
         * Enable/disable multi selection.
         * @type {boolean|*}
         */
        multiple: {
            type: Boolean,
            default: false
        },
        /**
         * Sets the **not found message** when searching returns no result.
         * @type {string|*}
         */
        notFoundMessage: {
            type: String,
            default: 'Data not found.'
        },
        /**
         * Sets the cascading combobox parent value.
         * @type {string|number|boolean|Array|*}
         */
        parentValue: {
            type: [String, Boolean, Number, Array],
            default: undefined
        },
        /**
         * Keeps help text visible when the component is not focused.
         * @type {boolean|*}
         */
        persistentHelpText: {
            type: Boolean,
            default: true
        },
        /**
         * Sets the field placeholder.
         * @type {string|*}
         */
        placeholder: {
            type: String,
            default: undefined
        },
        /**
         * Sets maximum height for the Popover or ListBox container.
         * @type {number|string|*}
         */
        popoverMaxHeight: {
            type: [String, Number],
            default: 300,
            validator: value => parseInt(value, 10) > 0
        },
        /**
         * Sets minimum width for the Popover or ListBox container.
         * @type {number|string|*}
         */
        popoverMinWidth: {
            type: [String, Number],
            default: undefined,
            validator: value => parseInt(value, 10) > 0
        },
        /**
         * Sets icon to display on inner left side. Use any valid
         * [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        prependIcon: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets icon to display on outer left side. Use any valid
         * [FontAwesome](https://fontawesome.com/icons?d=gallery&s=solid&m=free) icon name.
         * @type {string|*}
         */
        prependIconOuter: {
            type: [String, Array],
            default: undefined
        },
        /**
         * Sets **Chip** style for the selected items.
         * @type {boolean|*}
         */
        chipEnabled: {
            type: Boolean,
            default: false
        },
        /**
         * The default Chips color to apply.
         * @type {string|*}
         */
        chipColor: {
            type: String,
            default: 'light-grey'
        },
        /**
         * Remove Chip's circle edges.
         * @type {boolean|*}
         */
        chipLabeled: {
            type: Boolean,
            default: false
        },
        /**
         * Render Chips with outlined style or not.
         * @type {boolean|*}
         */
        chipOutlined: {
            type: Boolean,
            default: false
        },
        /**
         * Create the component with **flat** appearance, and removes the borders.
         * The component appearance will be styled like plain text.
         * @type {boolean|*}
         */
        flat: {
            type: Boolean,
            default: false
        },
        /**
         * Create the component with **filled** appearance.
         * See [Google Material Design](https://material.io/components/text-fields) spec.
         * @type {boolean|*}
         */
        filled: {
            type: Boolean,
            default: false
        },
        /**
         * Create the component with **outlined** appearance.
         * See [Google Material Design](https://material.io/components/text-fields) spec.
         * @type {boolean|*}
         */
        outlined: {
            type: Boolean,
            default: false
        },
        /**
         * Create the component with floating field label.
         * See [Google Material Design](https://material.io/components/text-fields) spec.
         * @type {boolean|*}
         */
        floatingLabel: {
            type: Boolean,
            default: false
        },
        /**
         * Show or hide the ListBox item separator.
         * @type {boolean|*}
         */
        itemSeparator: {
            type: Boolean,
            default: false
        },
        /**
         * Sets the image size for each ListBox items when `show-image` is enabled.
         * @type {number|string|*}
         */
        imageSize: {
            type: [Number, String],
            default: undefined,
            validator: value => parseInt(value, 10) > 0
        },
        /**
         * Show or hide image if ListBox item's object contains image field.
         * @type {boolean|*}
         */
        showImage: {
            type: Boolean,
            default: false
        },
        /**
         * Sets **rounded** effect for the displayed image from ListBox item.
         * @type {boolean|*}
         */
        roundedImage: {
            type: Boolean,
            default: false
        },
        /**
         * Sets **circle** effect for the displayed image from ListBox item.
         * @type {boolean|*}
         */
        circleImage: {
            type: Boolean,
            default: false
        },
        /**
         * Sets transition animation when showing the Popover.
         * @type {string|*}
         */
        transition: {
            type: String,
            default: BsPopover.props.transition.default
        },
        /**
         * Sets the returns value from `v-model` as object.
         * @type {boolean|*}
         */
        valueAsObject: {
            type: Boolean,
            default: false
        },
    },
    data: (vm) => ({
        dataModel: {},
        /**
         * Default data model schema.
         * @type {Object}
         */
        defaultSchema: {
            displayField: 'text',
            valueField: 'value',
            imageField: 'image',
            cascadeField: 'parent',
            disableField: 'disabled'
        },
        popoverWidth: vm.popoverMinWidth ? vm.popoverMinWidth : 0,
        popoverPlacement: 'bottom',
        dataFetched: false,
        isFocused: false,
        inputDisplay: '',
        inputValue: vm.value,
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
         * @returns {Object|*} Collection of css classes
         * @private
         */
        _classNames() {
            return {
                ...this.cmpAttrClasses,
                'md-open': this.active,
                'md-field-flat': this.flat,
                'md-field-filled': this.filled,
                'md-field-outlined': this.outlined,
                'md-chip-enabled': this.chipEnabled,
                'md-floating-label': this.floatingLabel,
                'md-focused': (this.isFocused || this.active) && !this.disabled,
                'has-error': this.hasValidationError,
                'has-success': this.hasValidated && !this.hasValidationError,
            };
        },
        /**
         * Get computed binding's properties.
         *
         * @returns {Object|*} Attributes to bind
         * @private
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
         * @returns {boolean} TRUE if has clear button otherwise FALSE
         * @private
         */
        _showClearButton() {
            return this.clearButton && !this.readonly && !this.disabled && this.selectedItems.length > 0;
        },
        /**
         * @returns {boolean} Display placeholder or not
         * @private
         */
        _showPlaceHolder() {
            return !this.inputValue;
        },
        /**
         * Get computed floating label's class names.
         *
         * @returns {Object|*} Floating label css classes
         * @private
         */
        _floatingLabelClass() {
            return {
                'md-active': this.placeholder || this.active || this.selectedItems.length > 0,
            }
        },
        /**
         * Get combobox list container binding attributes.
         *
         * @returns {Object|*} Attributes to bind
         * @private
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
                checkOptionColor: this.checkOptionColor,
                checkOptionPosition: this.checkOptionPosition,
                dataItems: this.dataItems,
                selectedItems: this.selectedItems,
                cascadeField: this.cascadeField,
                disableField: this.disableField,
                displayField: this.displayField,
                imageField: this.imageField,
                valueField: this.valueField,
                maxHeight: this.popoverMaxHeight,
                minimumItemsForSearch: this.minimumItemsForSearch ? parseInt(this.minimumItemsForSearch) : undefined,
                emptyDataMessage: this.emptyDataMessage,
                notFoundMessage: this.notFoundMessage,
                style: this._popoverStyles
            }
        },
        /**
         * Get Popover computed binding attributes.
         *
         * @returns {Object|*} Attributes to bind
         * @private
         */
        _popoverAttributes() {
            return {
                open: this.active,
                placement: this.popoverPlacement,
                transition: this.transition,
                trigger: this.trigger,
                style: this._popoverStyles,
                space: this.outlined ? 2 : 0,
                class: {
                    ['bg-' + this.listboxColor]: this.listboxColor
                }
            }
        },
        /**
         * Get popover's computed width.
         *
         * @returns {number} Popover minimum width
         * @private
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
         * @private
         */
        _popoverStyles() {
            return {
                'min-width': this.trigger ? Helper.sizeUnit(this._popoverMinWidth) : '',
                'max-height': Helper.sizeUnit(this.popoverMaxHeight)
            }
        },
        /**
         * Get data items.
         *
         * @returns {Object[]} Items
         */
        dataItems() {
            return this.dataSource ? this.dataSource.proxy.dataItems : [];
        },
        /**
         * Get property cascade field name from data schema.
         *
         * @returns {string} A field name
         */
        cascadeField() {
            return this.dataModel.cascadeField;
        },
        /**
         * Get property disabled field name from data schema.
         *
         * @returns {string} A field name
         */
        disableField() {
            return this.dataModel.disableField;
        },
        /**
         * Get property display/text field name from data schema.
         *
         * @returns {string} A field name
         */
        displayField() {
            return this.dataModel.displayField;
        },
        /**
         * Get property image field name from data schema.
         *
         * @returns {string} A field name
         */
        imageField() {
            return this.dataModel.imageField;
        },
        /**
         * Check if helpText will be shown or not.
         *
         * @returns {boolean} TRUE to show help text otherwise FALSE
         */
        showHelpText() {
            if (this.externalValidator && this.externalValidator.hasError && !this.wasValidated) {
                this.wasValidated = true;
            }

            return !!(this.helpText && (this.persistentHelpText || this.isFocused || this.active));
        },
        /**
         * Get property value field name from data schema.
         *
         * @returns {string} A field name
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
            if (value && !this.popoverMinWidth) {
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
        this.dataModel = null;
    },
    methods: {
        /**
         * Remove all selected items.
         *
         * @returns {Array} The deleted items
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
         * @returns {string|boolean|number} The item value
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
         * @returns {string|boolean|number} The text to display
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
         * @returns {boolean} TRUE if has the property otherwise false
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
         * @returns {string|boolean|number} The property value
         */
        itemPropertyValue(item, field) {
            return Helper.getObjectValueByPath(item, field);
        },
        /**
         * Compute and join the selected array values.
         *
         * @returns {void}
         * @private
         */
        _computeInternalValues() {
            let values = [], text = [];
            this.selectedItems.forEach(item => {
                values.push(this.getItemValue(item));
                text.push(this.getItemText(item));
            });
            this.inputValue = this.multiple
                ? (values.length > 0 ? values : null)
                : (values.length > 0 ? values[0] : null);
            this.inputDisplay = text.join(', ');
        },
        /**
         * Fetch data from static data source or remote server.
         *
         * @returns {void}
         * @private
         */
        _fetchData() {
            const ds = this.dataSource;
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
         * @returns {void}
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
         * @returns {void}
         * @private
         */
        _setSelectedItems() {
            const items = this.dataItems;
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
         * @returns {void}
         * @private
         */
        _updateLabel() {
            let label;
            this.trigger = this.$refs.activator;

            if (!this.floatingLabel && this.$refs.label.children.length > 0) {
                const elm = this.$refs.label.children[0];
                // label = this.$refs.label.querySelector('label');
                this.$refs.label.className += ' ' + elm.className;
                elm.className = 'md-empty-class';
                // this._setLabelFor(label);
            } else if (this.floatingLabel && this.$refs.floatLabel.children) {
                const children = this.$refs.floatLabel.children;

                if (children.length > 0) {
                    label = this.$refs.floatLabel.children[0];
                    if (!Helper.isEmpty(label.classList) && !Helper.isEmpty(label.className)) {
                        label.className = 'md-empty-class';
                    }
                }
                // label = this.$refs.floatLabel.querySelector('label');
                // this._setLabelFor(label);
            }
        },
        _updateLegend(value) {
            if (this.outlined && this.$refs.legend) {
                const label = this.floatingLabel
                    ? this.$refs.floatLabel
                    : this.$el.querySelector('label');
                const hasWidth = this.floatingLabel && (this.active || this.placeholder || this.inputValue || value);

                if (hasWidth && label) {
                    const width = label.clientWidth < 80 ? label.clientWidth : label.clientWidth - 8;
                    this.$refs.legend.style.width = Helper.sizeUnit(width);
                } else {
                    this.$refs.legend.style.width = Helper.sizeUnit(0);
                }
            }
        },
        /**
         * Update computed values.
         *
         * @returns {void}
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
         * @returns {void}
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
         * @returns {void}
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
         * @returns {void}
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
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-combobox {
    .#{$prefix}-field-input-wrapper {
        @include align-items(center);
        outline: none;
        min-height: 40px;

        > .#{$prefix}-combobox-input {
            padding: .5rem 0;
        }
    }

    .#{$prefix}-combobox-label,
    .col-form-label {
        label {
            margin-bottom: 0;
        }
    }

    .#{$prefix}-placeholder {
        @include user-select(none);
        cursor: default !important;
        color: $gray-600;
        font-weight: $font-weight-light;
    }

    .#{$prefix}-input-tags {
        margin: .25rem 0 0 0;
    }

    .#{$prefix}-value {
        pointer-events: none;
    }

    .#{$prefix}-action-icon {
        > .icon-expand-more {
            @include transition(all 0.3s ease 0s);
            cursor: pointer;
        }
    }

    &.#{$prefix}-disabled {
        .#{$prefix}-action-icon {
            > .icon-expand-more {
                color: $gray-500;
            }
        }
    }

    &.#{$prefix}-required {
        .#{$prefix}-combobox-label,
        .col-form-label {
            font-weight: bold;
        }
    }

    &.#{$prefix}-focused {
        &:not(.#{$prefix}-disabled) {
            .#{$prefix}-action-icon > .icon-expand-more {
                color: $blue-darken-3 !important;
            }
        }
    }

    &.has-success {
        .#{$prefix}-combobox-label {
            color: $success-color-dark !important;
        }

    }

    &.has-error {
        .#{$prefix}-combobox-label {
            color: $danger-color-dark !important;
        }
    }

    &.#{$prefix}-open {
        .#{$prefix}-action-icon > .icon-expand-more {
            @include transform(rotateZ(-180deg));
        }
    }

    &.#{$prefix}-field-filled {
        &.#{$prefix}-floating-label {
            .#{$prefix}-field-input-wrapper {
                min-height: 50px;

                > .#{$prefix}-combobox-input {
                    padding-top: 18px;
                }
            }
        }
    }

    &.#{$prefix}-chip-enabled {
        .#{$prefix}-field-input-wrapper {
            min-height: 2.75rem;  // 40px

            > .#{$prefix}-combobox-input {
                padding: 0;

                > .#{$prefix}-input-tags {
                    > .#{$prefix}-chip {
                        margin: .15rem $padding-sm .25rem 0;
                    }
                }
            }
        }

        &.#{$prefix}-floating-label {
            &.#{$prefix}-field-filled {
                .#{$prefix}-field-inner {
                    padding-bottom: 0;

                    > .#{$prefix}-field-input-wrapper {
                        min-height: 3.65rem; // 59px

                        > .#{$prefix}-combobox-input {
                            padding-top: .7rem;
                        }

                        > .#{$prefix}-field-label {
                            top: 1rem;

                            &.#{$prefix}-active {
                                @include transform(translateY(-16px) scale(.8));
                            }
                        }
                    }
                }
            }
            &.#{$prefix}-field-outlined {
                .#{$prefix}-field-inner {
                    padding-bottom: .125rem;
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
    }
}

@each $color_name, $color in $material-colors {
    .#{$prefix}-combobox-popover {
        &.bg-#{$color_name} {
            .#{$prefix}-combobox-search-wrapper {
                > .#{$prefix}-combobox-search {
                    @if (lightness($color) < 81) {
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
                    @if (lightness($color) < 81) {
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
