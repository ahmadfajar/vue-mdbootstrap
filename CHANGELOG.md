# CHANGELOG

> All notable changes to this project will be documented in this file.

## v2.0.0

Released: June xx, 2023

#### Features v2.0.0

- Rewrite the components in the TypeScript language.
- Add support for **Vue 3** and **Bootstrap v5.2**.
- New components: **BsIconSpinner**, **BsIconSvg**, **BsProgressBar**, **BsColorPicker**, **BsListbox**
- **BsAlert**: add property `filled`, `iconVariant`, and `variant`.
- **BsAppbar**: add property `clippedRight`.
- **BsAppContainer**: add property `viewportHeight`.
- **BsButton**: add property `readonly`, add slot `icon` for placing a custom icon.
- **BsChip**: add property `iconVariant`, `pill`.
- **BsChipField**: add property `actionIconVariant`, `validationIcon`, `chipPill`.
- **BsDatePicker**: add property `surfaceColor`, support mousewheel, touch screen and internationalization.
- **BsDateTimeField**: add property `pickerColor`, `pickerCls`, `pickerMode`, `pickerWidth`, `pickerTransition`.
- **BsDropdownMenu**: add property `space`.
- **BsListNav**: add property `id`.
- **BsListNavItem**: add property `id`, `borderOff`, `pillOff`, `roundedOff`, `badgeColor`, and `badgeType`.
- **BsListTile**: add property `id`, `borderOff`, `pillOff`, and `roundedOff`.
- **BsListTileSubtitle**: add property `rawHtml`.
- **BsListTileTitle**: add property `rawHtml`.
- **BsListView**: add property `itemRounded`, `itemRoundedPill`, `individualState`, and `modelValue`.
- **BsMaskLoader**: add property `variant`.
- **BsNumericField**: add property `actionIconVariant`, and `validationIcon`.
- **BsOverlay**: add event `click`.
- **BsPopover**: add property `color`.
- **BsSearchField**: add property `advanceSearch`, `popoverTransition`.
- **BsSideDrawer**: add property `position`, `fixedLayout`, `overlayColor`.
- **BsSwitch**: add property `insetMode`, `insetOutlined`, `checkoffIcon`, `checkedIcon`.
- **BsTab**: add property `disabled`, `iconSpin`, `iconPulse`, `iconFlip`, `iconRotation`.
- **BsTextField**: add property `actionIconVariant`, and `validationIcon`.
- **BsToggleButton**: add property `pill`, and `rounded`.
- **BsToggleField**: add property `pill`, `rounded`, `actionIconVariant`, and `validationIcon`
- **BsToggleIcon**: add property `size`.
- **BsTooltip**: add property `show`, `zIndex`.

#### Breaking Changes

- Removed **FontAwesome icons** from package bundle, in favor of dynamic 
  loading of **[Google Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)**.
- All components which have `value` property is replaced with `modelValue` property.
  See [Vue 3 Migration Guide](https://v3-migration.vuejs.org/breaking-changes/v-model.html).
- All `input` event is replaced with `update:modelValue` event, so it can be integrated with `v-model` directive.
  See [Vue 3 Migration Guide](https://v3-migration.vuejs.org/breaking-changes/v-model.html).
- **BsAlert**: 
  - Replaced property `iconOutlined` with `iconVariant` for flexibility.
  - Property `solid-fill` is deprecated, use property `filled` instead. 
  - Replaced property `value` with `modelValue`.
- **BsAvatar**: removed property `center`. 
- **BsButton**: 
  - Removed property `block` 
    see [Bootstrap 5](https://getbootstrap.com/docs/5.2/components/buttons/#block-buttons) on how to achieve 
    the same result.
  - Removed property `iconFixed` as of [FontAwesome](https://fontawesome.com/search?m=free&s=solid) 
    is removed from package bundle.
- **BsButtonToggle**: 
  - Deprecated, use **BsToggleButton** instead. 
  - Replaced property `value` with `modelValue`.
  - Replaced event `change` with `update:modelValue`.
- **BsButtonToggleField**: 
  - Deprecated, use **BsToggleField** instead. 
  - Replaced property `value` with `modelValue`.
  - Replaced event `change` with `update:modelValue`.
  - Replaced slot `prependIcon` with `prependInner`.
  - Replaced slot `prependIconOuter` with `prependOuter`.
  - Replaced slot `appendIcon` with `appendInner`.
  - Replaced slot `appendIconOuter` with `appendOuter`.
  - Deprecated property `externalValidator`, use property `validator` instead.
- **BsCard**: replaced property `flat` with `rounded`.
- **BsCheckbox**: 
  - Replaced property `checked` with `modelValue`. 
  - Removed property `falseValue` and `trueValue`.
  - Replaced event `change` with `update:modelValue`.
- **BsCheckboxGroup**: 
  - Replaced property `columns` with `column`. 
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced event `change` with `update:modelValue`.
- **BsChip**: 
  - Replaced property `value` with `modelValue`. 
  - Removed `label` property to meet the MD3 design specification. 
  - Removed property `activeColor`, because it is redundant with property `activeClass`.
  - Removed property `faStyles` as of [FontAwesome](https://fontawesome.com/search?m=free&s=solid)
    is removed from package bundle. 
- **BsChipField**: 
  - Removed `chipLabeled`, used `chipPill` instead. 
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced slot `prependIcon` with `prependInner`.
  - Replaced slot `prependIconOuter` with `prependOuter`.
  - Replaced slot `appendIcon` with `appendInner`.
  - Replaced slot `appendIconOuter` with `appendOuter`.
  - Removed event `change`, already covered by event `update:modelValue`.
  - Deprecated property `externalValidator`, use property `validator` instead.
- **BsDatePicker**: 
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Deprecated property `viewMode`, use property `mode` instead.
  - Removed property `color`.
  - Removed property `firstDayOfWeek`.
  - Removed property `format`.
  - Replaced dependency of `momentjs` with `luxon`.
  - The output value of the `modelValue` property follows the **ISO 8601** standard.
- **BsDateTimeField**: 
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced event `open` with `update:open`.
  - Deprecated property `viewMode`, use property `pickerMode` instead.
  - Deprecated property `transition`, use property `pickerTransition` instead.
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced slot `prependIcon` with `prependInner`.
  - Replaced slot `prependIconOuter` with `prependOuter`.
  - Replaced slot `appendIcon` with `appendInner`.
  - Replaced slot `appendIconOuter` with `appendOuter`.
  - Replaced dependency of `momentjs` with `luxon`.
  - Removed property `color`, use property `pickerColor` instead.
  - Removed property `firstDayOfWeek`.
  - Removed event `change`, already covered by event `update:modelValue`.
- **BsIcon**: replace property `rotation` with `rotate`.
- **BsIconToggle**: is deprecated, use **BsToggleIcon** instead. Replaced property `value` with `modelValue`.
- **BsListNavItem**:
  - Removed property `exact`.
  - Replace event `input` with `update:active`.
- **BsListTile**:
  - Removed property `exact`.
  - Replace event `input` with `update:active`.
- **BsListView**: Replace property `activeItemBordered` with `itemBorderVariant`.
- **BsMaskLoader**: property `spinnerType` is deprecated, use property `variant` instead.
- **BsMenu**: is deprecated, use **BsDropdownMenu** instead.
- **BsNumericField**: 
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced slot `prependIcon` with `prependInner`.
  - Replaced slot `prependIconOuter` with `prependOuter`.
  - Replaced slot `appendIcon` with `appendInner`.
  - Replaced slot `appendIconOuter` with `appendOuter`.
  - Removed property `actionButtonColor`.
  - Removed event `change`, already covered by event `update:modelValue`.
  - Deprecated property `externalValidator`, use property `validator` instead.
- **BsPopover**: Replace property `overlayClose` with `overlayClickClose`.
- **BsRadio**:
  - Replaced property `checked` with `modelValue`.
  - Replaced event `change` with `update:modelValue`.
- **BsRadioGroup**:
  - Replaced property `columns` with `column`.
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replace event `change` with `update:modelValue`.
- **BsRipple**: removed property `eventTrigger`.
- **BsSearchField**:
  - Replaced event `input` with `update:modelValue`.
  - Replaced property `value` with `modelValue`.
  - Replaced property `searchOptions` with `advanceSearch`.
  - Replaced property `transition` with `popoverTransition`.
  - Removed property `innerCls`.
- **BsSwitch**:
  - Replaced property `checked` with `modelValue`.
  - Removed property `falseValue` and `trueValue`.
  - Replaced event `change` with `update:modelValue`.
- **BsTab**: Replace property `value` with `modelValue`.
- **BsTextField**:
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced slot `prependIcon` with `prependInner`.
  - Replaced slot `prependIconOuter` with `prependOuter`.
  - Replaced slot `appendIcon` with `appendInner`.
  - Replaced slot `appendIconOuter` with `appendOuter`.
  - Removed event `change`, already covered by event `update:modelValue`.
  - Deprecated property `externalValidator`, use property `validator` instead.


## v1.2.2

Released: July xx, 2021

#### Features v1.2.2

- **BsSideDrawer:** add property `position`
- **BsAppbar:** add property `clipped-right`
- **BsAppContainer:** add property `viewport-height`

#### Bug Fixes & Improvement v1.2.2

- Improve **BsAppContainer**
- **BsSideDrawer, BsAppbar, BsContainer**: detect **BsAppContainer** and `appId` upon mounting


## v1.2.1

Released: July 01, 2021

#### Bug Fixes & Improvement v1.2.1

- Upgrade package builder to **webpack v5.x**
- Improve build scripts
- **BsNotification**: fix component registration
- **BsChip**, **BsChipField**, **BsCombobox**, **BsNumericField**: fix missing component import 
- **BsRadio**: fix property mutation


## v1.2.0

Released: June 29, 2021

#### Features v1.2.0

- New components: **BsNumericField**, **BsChip**, **BsChipGroup**, **BsChipField**
- New icons: `AddCircle`, `AddCircleOutline`, `CheckCircle`, `CheckCircleOutline`, `Checked`, `Error`, 
  `ErrorOutline`, `Help`, `HelpCenter`, `HelpOutline`, `Info`, `Remove`, `RemoveCircle`, 
  `RemoveCircleOutline`, `Report`, `ReportOutline`, `Shield`, `Verified`, `VerifiedUser`, 
  `Warning`, `WarningOutline`, `InvertColors`
- **BsCombobox:** add properties `chip-enabled`, `chip-color`, `chip-labeled` and `chip-outlined`
- **BsListNavItem:** add properties `badge`, and `badge-variant`
- **BsAlert:** add properties `icon-flip`, `icon-outlined`, `icon-pulse`, `icon-rotation`, 
  `icon-spin`, `icon-type`, and `solid-fill`
- **BsTabs:** add properties `active-class`  

#### Bug Fixes & Improvement v1.2.0

- Improve Helper class: add method `roundNumber`
- Improve Tabs component: customize inactive TabItem via `tab-class` property and active TabItem
  via `active-class` property for tabs variant: `pills`, `modern`, and `material`.
- Improve **BsIcon** template rendering
- Improve **BsAlert**: enable using internal icon via `icon` property
- **BsNumericField**: prevent value changing with UP/DOWN arrows when field state is `readonly` 
  or `disabled` and fix `tab` key  
- **BsNumericField, BsTextField, BsTextArea**: fix css when field state is `readonly` or `disabled` 
- **BsDateTimeField**: disabling focus when field state is `disabled`  
- Expose `FontAwesomeLayers` and `FontAwesomeLayersText` components


## v1.1.4

Released: January 31, 2021

#### Features v1.1.4

- **BsMaskLoader:** add properties `overlay-color`, `overlay-opacity`, `spinner-color`,
  `spinner-thickness`, and `spinner-type`

#### Bug Fixes & Improvement v1.1.4

- **BsAppbarItems:** remove `font-size` scss styles
- **BsMenu:** improve keyboard navigation using `arrow-down` and `arrow-up`
- **BsPopover:** fix `space` property did not apply correctly when `placement` property sets to 
  `top`, `top-left` or `top-right`
- Refactor `popover` transition animation to `scale`  


## v1.1.3

Released: January 5, 2021

#### Bug Fixes & Improvement v1.1.3

- **BsGrid:** fix side effect on methods `sort`, `setPageSize`, `_fetchData`, and update scss styles 
- **BsSearchField:** remove property `can-close` and fix `BsPopover` show/hide procedure when 
  `search-options` is enabled
- **BsTreegridCell:** fix warning when icon is null
- **BsCheckboxGroup, BsRadioGroup:** fix multi-column items when `columns` property value is `1` 
- **BsButtonToggleField:** fix non-persistent help text and update scss styles
- **AbstractStore:** add methods `setPageSize` and `setSorters`
- **BsStore:** fix method `append` didn't send data to remote service
- **BsModel:** constructor improvement


## v1.1.1

Released: December 21, 2020

#### Bug Fixes & Improvement v1.1.1

- **Touch** directive did not expose correctly
- **BsCard:** add DOM event listener
- **BsNotification:** change default variant and update css styles
- **BsTextField, BsTextArea, BsRadioGroup, BsDateTimeField, BsCombobox, BsCheckboxGroup:** bug fix 
  when form reset


## v1.1.0

Released: December 18, 2020

#### Features v1.1.0

- New components: **BsExpandTransition**, **BsCardMedia**, **BsIconToggle**, **BsListNav**, **BsListNavItem**
- **BsAvatar:** add properties `icon-flip`, `icon-spin` and `icon-pulse`
- **BsButton:** add properties `pill` and `rounded`, emit events `input` to update `active` property
- **BsCard:** add properties `img-bottom-alt`, `img-bottom-src`, `img-top-alt`, `img-top-src`
- **BsCheckbox:** add property `readonly`
- **BsCheckboxGroup:** add property `readonly`
- **BsSwitch:** add property `readonly`
- **BsIcon:** add properties `flip`, `pulse`, `rotation`, `spin`, and add new icons: `delete-outline`
- **BsListTile:** add properties `ripple-off` and `navigable`
- **BsListTileAction:** add `center` property
- **BsListTileLeading:** add properties `icon`, `icon-flip`, `icon-rotation`, `icon-spin` and `icon-pulse`
- **BsListView:** add properties `single-expand`, `space-around`, and `active-item-bordered`
- **BsTextArea:** add properties `append-icon-outer`, `prepend-icon-outer`, and `filled`
- **BsTextField:** add properties `append-icon-outer`, `prepend-icon-outer`, and `filled`
- **BsCombobox:** add properties `append-icon-outer`, `prepend-icon-outer`, and `filled`
- **BsDateTimeField:** add properties `append-icon-outer`, `prepend-icon-outer`, and `filled`
- **BsGridColumn:** add properties `order`, `cell-data`
- **BsModal:** add properties `body-class`, `footer-class`, and `header-class`
- **BsLightbox:** add properties `image-class`, and `image-styles`
- Add css classes: `font-weight-bold`, `font-weight-bolder`, `font-weight-boldest`

#### Bug Fixes & Improvement v1.1.0

- **BsAlert:** improve css alert-variant
- **BsMaskLoader:** incorrect z-index
- **BsButton:** rename property `button` to `type` and `ripple` to `ripple-off`
- **BsIcon:** remove css class `d-flex` and `align-items-center`
- **BsImageHolder:** computed cssClass, height and width improvement
- **BsListView:** beforeDestroy improvement, add function` addItem()`, `addChild()`, `findActive()`, 
  `removeItem()`, `removeChild()`
- **BsListTile:** improve when to generate `<a>` element or `<div>` element and update component scss
- **BsProgress:** change property `type` default value to 'bar' 
- **BsSideDrawer:** computed inline style improvement
- **BsCheckbox, BsSwitch:** improve css classes
- **BsCombobox:** improve html template and css classes
- **BsTextArea:** improve html template and css classes
- **BsTextField:** improve html template and css classes
- **BsDateTimeField:** improve html template and css classes
- **BsGrid:** improve html template and css classes, rename property `borderless` to `bordered`
- **BsModal:** rename slot `title` to `header`, and rename property `fullscreen` to `full-page`
- **BsTabLabel:** fix icon padding
- Improve scss color variables
- Improve JsDoc


## v1.0.4

Released: August 10, 2020

#### Bug Fixes & Improvement v1.0.4

- **BsMaskLoader, BsButtonToggle, BsContent, BsCheckboxGroup, BsRadioGroup, BsSearchField, BsGrid, 
  BsLightbox, BsPagination:** add missing import and components declaration
- **BsAppbar**: smooth transition when minimize SideDrawer
- **BsModal**: fix invalid css padding and line-height at modal title 
- **AbstractStore**: add functions `find()`, `findBy()`, `findIndex()`, `remove()`, `removeAt()`, 
  and some improvement
- **BsModel**: constructor improvement and function `delete()`  
- **BsStore**: constructor improvement and add function `delete()`, `deletes()` 
- **Helper**: add function `isString()`


## v1.0.3

Released: Mei 20, 2020

#### Bug Fixes v1.0.3

- **BsSpacer:** fix didn't fill available space


## v1.0.2

Released: Mei 20, 2020

#### Bug Fixes v1.0.2

- **BsGrid:** fix local paging, local sorting, and local filtering
- **BsPagination:** fix combobox paging
- **BsArrayStore, BsStore:** enhance LocalFilter to match BsGrid filterable spec
