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
             class="md-combobox-control align-items-center"
             :class="controlCls">
          <div v-if="floatingLabel"
               ref="floatlabel"
               class="md-floating-label"
               :class="floatingLabelClass"
               @click="activatorClick">
            <slot v-bind="{ id }"></slot>
          </div>
          <div class="md-combobox-control-inner d-flex flex-fill align-items-center"
               tabindex="0">
            <div class="md-prepend-icon" v-if="prependIcon">
              <slot name="prependSlot">
                <font-awesome-icon :icon="prependIcon" />
              </slot>
            </div>
            <div class="md-combobox-input d-flex align-items-center"
                 @click="activatorClick">
              <span v-if="fieldTagMode && multiple"
                    class="md-input-tags">
                <slot name="tags"></slot>
              </span>
              <span v-else class="md-value">
                {{ inputDisplay }}
              </span>
            </div>
            <div class="md-action-icon d-flex align-items-center">
              <bs-icon v-if="clearButton"
                       class="d-flex align-items-center"
                       icon="clear"
                       @click="clearSelected" />
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
            <select class="md-combobox-control-hidden" v-bind="attributes">
              <option v-for="(item, index) in selectedItems"
                      :key="'sel-' + index"
                      :value="getItemValue(item)"
                      selected>
                {{ getItemText(item) }}
              </option>
            </select>
          </div>
        </div>
        <div v-if="helpText || showErrorValidation || floatingLabel" class="md-help-text">
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
    <bs-popover v-bind="popoverAttributes"
                ref="content"
                class="md-combobox-popover md-shadow-1"
                @close="hideMenu">
      <bs-combobox-list-container v-bind="listContainerAttributes"
                                  @filter="_onFilterData"
                                  @select="_onSelectItem"
                                  @deselect="_onDeselectItem">
        <slot name="emptyData" slot="emptyData"></slot>
        <template slot-scope="{ item, index }">
          <slot name="itemOption" v-bind="{ item, index }">
            <template v-if="multiple">
              <bs-list-tile-action v-if="checkboxPosition !== 'right'">
                <bs-checkbox v-model="filteredBoolValues[index]"
                             :disabled="isCheckboxDisabled(item)"
                             :color="checkboxColor"
                             @change="selected => selected ? _onSelectItem(item) : _onDeselectItem(item)" />
              </bs-list-tile-action>
              <bs-list-tile-leading v-if="showAvatar && hasProperty(item, imageField)"
                                    :img-src="itemPropertyValue(item, imageField)"
                                    size="36" />
              <bs-list-tile-content>
                <slot name="itemOptionText" v-bind="{ item, index }">
                  <bs-list-tile-title>{{ getItemText(item) }}</bs-list-tile-title>
                </slot>
              </bs-list-tile-content>
              <bs-list-tile-action v-if="checkboxPosition === 'right'">
                <bs-checkbox v-model="filteredBoolValues[index]"
                             :disabled="isCheckboxDisabled(item)"
                             :color="checkboxColor"
                             @change="selected => selected ? _onSelectItem(item) : _onDeselectItem(item)" />
              </bs-list-tile-action>
            </template>
            <template v-else>
              <bs-list-tile-leading size="36"
                                    v-if="showAvatar && hasProperty(item, imageField)"
                                    :img-src="itemPropertyValue(item, imageField)" />
              <bs-list-tile-content>
                <bs-list-tile-title>{{ getItemText(item) }}</bs-list-tile-title>
              </bs-list-tile-content>
            </template>
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
import BsListTileAction from "../BsList/BsListTileAction";
import BsListTileLeading from "../BsList/BsListTileLeading";
import BsListTileContent from "../BsList/BsListTileContent";
import BsCheckbox from "./BsCheckbox";
import BsIcon from "../BsIcon/BsIcon";
import BsPopover from "../BsPopover/BsPopover";
import BsStore from "../../model/BsStore";
import Input from "../../mixins/Input";
import MenuAble from "../../mixins/MenuAble";
import FieldValidation from "./mixins/FieldValidation";
import Helper from "../../utils/Helper";
import '../../../scss/_shadows.scss';

export default {
    name: "BsCombobox",
    components: {
        FontAwesomeIcon, BsComboboxListContainer, BsListTileContent, BsListTileAction,
        BsListTileLeading, BsListTileTitle, BsCheckbox, BsIcon, BsPopover
    },
    mixins: [Input, FieldValidation, MenuAble],
    props: {
        checkOption: {
            type: Object,
            default() {
                return {
                    color: 'pink',
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
                return ['left', 'right'].indexOf(value) !== -1;
            }
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
            default: 'No data found.'
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
        items: {
            type: Array,
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
        fieldTagMode: Boolean,
        flat: Boolean,
        floatingLabel: Boolean,
        itemSeparator: Boolean,
        multiple: Boolean,
        showAvatar: Boolean,
        valueAsObject: Boolean,
    },
    data: (vm) => ({
        dataModel: {
            items: [],
            // define the data field's schema
            schema: {
                displayField: 'text',
                valueField: 'value',
                imageField: 'image',
                cascadeField: 'parent',
                disableField: 'disabled'
            }
        },
        popoverWidth: vm.minimumPopoverWidth ? vm.minimumPopoverWidth : 0,
        dataFetched: false,
        inputDisplay: '',
        inputValue: vm.value,
        placement: 'bottom',
        selectedItems: [],
        filteredBoolValues: [],
        filteredItems: [],
        trigger: null
    }),
    provide() {
        return {
            dataModel: this.dataModel,
            getItemValue: this.getItemValue,
            getItemText: this.getItemText
        }
    },
    computed: {
        /**
         * Get computed component's styles.
         *
         * @return {Object} Collection of css classes
         */
        _classNames() {
            return {
                ...this.cmpAttrClasses,
                'md-open': this.active,
                'md-combobox-flat': this.flat,
                'md-combobox-multiple': this.multiple,
                'md-floating-active': this.floatingLabel,
                'has-error': this.hasValidationError,
                'has-success': this.wasValidated && !this.hasValidationError
            };
        },
        /**
         * Get computed binding's properties.
         *
         * @return {Object} Attributes to bind
         */
        attributes() {
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
         * Get computed floating label's class names.
         *
         * @return {Object} Floating label css classes
         */
        floatingLabelClass() {
            return {
                'md-active': this.active || this.selectedItems.length > 0,
                'md-prepend-icon': this.prependIcon
            }
        },
        /**
         * Get combobox list container binding attributes.
         *
         * @return {Object} Attributes to bind
         */
        listContainerAttributes() {
            return {
                active: this.active,
                disabled: this.disabled,
                maxHeight: this.maxHeight,
                itemSeparator: this.itemSeparator,
                selectedItems: this.selectedItems,
                minimumItemsForSearch: this.minimumItemsForSearch,
                emptyDataMessage: this.emptyDataMessage,
                notFoundMessage: this.notFoundMessage,
                dataItems: this.dataItems,
                cascadeField: this.cascadeField,
                disableField: this.disableField,
                displayField: this.disableField,
                imageField: this.imageField,
                valueField: this.valueField,
                style: this.popoverStyles
            }
        },
        /**
         * Get Popover computed binding attributes.
         *
         * @return {Object} Attributes to bind
         */
        popoverAttributes() {
            return {
                open: this.active,
                placement: this.placement,
                transition: this.transition,
                trigger: this.trigger,
                style: this.popoverStyles
            }
        },
        /**
         * Get popover's computed width.
         *
         * @return {Number} Popover minimum width
         */
        popoverMinWidth() {
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
        popoverStyles() {
            return {
                'min-width': this.trigger ? Helper.sizeUnit(this.popoverMinWidth) : '',
                'max-height': Helper.sizeUnit(this.maxHeight)
            }
        },
        /**
         * Get checkbox color.
         *
         * @return {string} Color name
         */
        checkboxColor() {
            if (this.checkOptionColor) {
                this.checkOption.color = this.checkOptionColor;
            }

            return this.checkOption.color;
        },
        /**
         * Get checkbox position when multi-selection is enabled.
         *
         * @return {string} Position name
         */
        checkboxPosition() {
            if (this.checkOptionPosition) {
                this.checkOption.position = this.checkOptionPosition;
            }

            return this.checkOption.position;
        },
        /**
         * Get data items.
         *
         * @return {Array} Items
         */
        dataItems() {
            return this.dataModel ? this.dataModel.items : [];
        },
        /**
         * Get property cascade field name from data schema.
         *
         * @return {string} A field name
         */
        cascadeField() {
            return this.dataModel.schema.cascadeField;
        },
        /**
         * Get property disabled field name from data schema.
         *
         * @return {string} A field name
         */
        disableField() {
            return this.dataModel.schema.disableField;
        },
        /**
         * Get property display/text field name from data schema.
         *
         * @return {string} A field name
         */
        displayField() {
            return this.dataModel.schema.displayField;
        },
        /**
         * Get property image field name from data schema.
         *
         * @return {string} A field name
         */
        imageField() {
            return this.dataModel.schema.imageField;
        },
        /**
         * Get property value field name from data schema.
         *
         * @return {string} A field name
         */
        valueField() {
            return this.dataModel.schema.valueField;
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
            this._resetFilters();
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
            this._setSelectedItems();
        }
    },
    created() {
        this._resetFilters();
        this._fetchData();
    },
    mounted() {
        this._updateLabel();
        this._updateValue();
    },
    beforeDestroy() {
        this.filteredBoolValues = [];
        this.filteredItems = [];
        this.selectedItems = [];
        this.dataModel.items = [];
        this.dataModel = null;
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
            this._resetFilters();
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

            return Helper.getObjectValueByPath(item, this.valueField, this.itemPropertyValue(item, this.displayField));
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

            return Helper.getObjectValueByPath(item, this.displayField, this.itemPropertyValue(item, this.valueField));
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
         * Check if checkbox selection for the given item must be disabled or not.
         *
         * @param {Object} item The object to evaluate
         * @return {boolean} Item checkbox state
         */
        isCheckboxDisabled(item) {
            return (this.disabled === true ? true : this.itemPropertyValue(item, this.disableField));
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
            // text.sort();
            this.inputValue = this.multiple ? values : values.length > 0 ? values[0] : null;
            this.inputDisplay = text.join(', ');
        },
        /**
         * Fetch data from static data source or remote server.
         *
         * @return {void}
         * @private
         */
        _fetchData() {
            const ds = this.dataSource;
            let doFetch = false;

            if (!Helper.isEmpty(this.items) && !Helper.isEmpty(this.dataModel)) {
                this.dataModel.items = this.items;
                this.$emit('data-bind', this.dataModel.items);
            } else if (ds !== undefined && !Helper.isEmpty(this.dataModel)) {
                if (ds.schema && ds.schema.valueField) {
                    this.dataModel.schema = Object.assign(this.dataModel.schema, ds.schema);
                }
                if (!this.dataFetched && Helper.isObject(ds.proxy) && ds.proxy instanceof BsStore) {
                    if (!Helper.isEmpty(this.parentValue) && !Helper.isEmpty(this.cascadeField)) {
                        ds.proxy.setFilters({
                            'property': this.cascadeField,
                            'value': this.parentValue,
                            'operator': Helper.isArray(this.parentValue) ? 'in' : 'eq'
                        }, true);
                        doFetch = true;
                    } else if (Helper.isEmpty(this.parentValue) && this.cascadeField === 'parent') {
                        doFetch = true;
                    }
                    if (doFetch) {
                        ds.proxy.query().then(() => {
                            this.dataModel.items = ds.proxy.dataItems;
                            this.$emit('data-bind', this.dataModel.items);
                            this.dataFetched = true;
                            this._resetFilters();
                            this._updateValue();
                        }).catch((error) => {
                            this.$emit('fetch-error', error);
                            this.dataFetched = false;
                        });
                    }
                } else if (Helper.isArray(ds.items)) {
                    this.dataModel.items = ds.items;
                    this.$emit('data-bind', this.dataModel.items);
                }
            }
        },
        /**
         * Reset filtered dataItems.
         *
         * @return {void}
         * @private
         */
        _resetFilters() {
            this.filteredItems = this.dataItems;
            this.filteredBoolValues = this.filteredItems.map(item => this.selectedItems.includes(item));
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
                    this.selectedItems = items.filter(el => (this.inputValue === this.getItemValue(el)) || (this.getItemValue(el) === this.getItemValue(this.inputValue)));
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
                label = this.$refs.label.querySelector('label');
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
            this.filteredItems = items;
            if (this.filteredBoolValues.length !== this.filteredItems.length) {
                this.filteredBoolValues = this.filteredItems.map(el => this.selectedItems.includes(el));
            }
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
            const idx = this.filteredItems.lastIndexOf(item);

            if (ds.includes(item)) {
                this.selectedItems = ds.filter(target => target !== item);
                this.$emit('deselect', item);
            }
            this._computeInternalValues();
            this.filteredBoolValues[idx] = false;
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
                this.$emit('change', (this.inputValue === null ? null : this.selectedItems[0]));
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
            const ds = this.selectedItems;
            const idx = this.filteredItems.lastIndexOf(item);

            if (this.multiple) {
                if (!ds.includes(item)) {
                    this.selectedItems.push(item);
                }
            } else {
                this.selectedItems.pop();
                this.selectedItems.push(item);
            }

            this._computeInternalValues();
            this.filteredBoolValues[idx] = true;
            if (!this.multiple) {
                this.active = false;
            }
            if (this.valueAsObject) {
                this.model = this.multiple ? this.selectedItems : this.selectedItems[0];
            } else {
                this.model = this.inputValue;
            }

            this.$nextTick(() => {
                this.$emit('select', this.multiple ? this.selectedItems : this.selectedItems[0]);
            });
            this.$nextTick(() => {
                this.$emit('change', item);
            });
        }
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
            min-height: 10px;
            margin: 4px 15px 0 15px;

            > * {
                font-size: 83% !important;
            }
        }

        .#{$prefix}-combobox-control {
            @include display-flex();
            @include flex(1 1 auto);
            margin-left: 15px;
            margin-right: 15px;
            padding-left: 0;
            padding-right: 0;
            position: relative;
            width: auto;

            > .#{$prefix}-floating-label {
                @include transition(0.3s cubic-bezier(0.25, 0.8, 0.5, 1));
                @include transform-origin(top left, false);
                display: inline-block;
                left: 0;
                right: auto;
                line-height: 1.2;
                max-width: 90%;
                min-height: .5rem;
                overflow: hidden;
                margin-left: .4rem;
                padding-top: .3rem;
                position: absolute;
                pointer-events: none;
                text-overflow: ellipsis;
                white-space: nowrap;
                z-index: 2;

                &.#{$prefix}-active {
                    @include transform(translateY(-20px) scale(.9));
                    color: $gray-600;
                    margin-left: 0;
                    padding-top: 0;
                }
            }

            > .#{$prefix}-combobox-control-inner {
                @include transition(border .3s ease-in-out);
                @include box-shadow(none);
                outline: 0 none;
                min-height: 2rem;
                height: 100%;
                border-bottom: 1px solid $gray-500;

                &:after {
                    @include transition(all .3s ease-in-out);
                    background-color: $primary-color;
                    position: absolute;
                    content: '';
                    height: 2px;
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

                &:focus, &:active {
                    border-bottom-color: $primary-color;

                    &:after {
                        left: 0;
                        width: 100%;
                    }
                }
            }

            .#{$prefix}-combobox-control-hidden {
                background-color: transparent;
                border: 0 none;
                display: none;
                outline: 0 none;
                // height: 1px !important;
                // width: 0 !important;
                position: absolute;
            }

            .#{$prefix}-combobox-input {
                @include flex(1 auto);
                max-width: 100%;
                min-height: 2rem;
                // padding-bottom: 6px;

                > input {
                    background-color: transparent;
                    border: 0 none;
                    outline: none;
                    flex: 1 1 auto;
                    margin: 0 0 0 4px;
                    min-height: 2rem;
                    pointer-events: none;
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
                margin-left: $padding-sm;
                // margin-right: $padding-sm;

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

    &.has-error {
        .#{$prefix}-floating-label, .col-form-label {
            color: $danger-color-dark !important;
        }

        > .#{$prefix}-combobox-inner {
            .#{$prefix}-combobox-control {
                > .#{$prefix}-combobox-control-inner {
                    &:after {
                        background-color: $danger-color;
                    }
                }
            }
        }
    }

    &.has-success {
        .#{$prefix}-floating-label, .col-form-label {
            color: $success-color-dark !important;
        }

        > .#{$prefix}-combobox-inner {
            .#{$prefix}-combobox-control-inner {
                border-bottom-color: $success-color-dark !important;
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

    &.#{$prefix}-floating-active {
        margin-top: 1.2rem;

        .#{$prefix}-combobox-control {
            > .#{$prefix}-floating-label {
                > .#{$prefix}-empty-class, label {
                    margin-bottom: 0;
                }

                &.#{$prefix}-prepend-icon:not(.#{$prefix}-active) {
                    margin-left: $padding-base + .5;
                }
            }
        }
    }

    &.#{$prefix}-active,
    &.#{$prefix}-focus,
    &.#{$prefix}-open {
        .#{$prefix}-combobox-control-inner {
            border-bottom-color: $primary-color !important;

            &:after {
                left: 0 !important;
                width: 100% !important;
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
</style>
