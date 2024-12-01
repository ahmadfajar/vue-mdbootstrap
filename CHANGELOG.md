# CHANGELOG

> All notable changes to this project will be documented in this file.


## v2.1.0

Released: December XX, 2024

### Features & Improvements

- Migrate **Google Material Icons** to **[Google Material Symbol](https://fonts.google.com/icons?icon.set=Material+Symbols)**.
  This migration improve icon naming consistency, clarity and reduce the bundle size.
- Migrate scss files from legacy SASS to modern SASS.
- Reduce the number of color variants for each component on main css file
  (comply to [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/) colors with some addition)
  and put other color variants on different css file. This action greatly reduces the size of the main css file.
- New components: **BsFontAwesome**, **BsBreadcrumb** and **BsImageUploader**. 
- **BsIcon**, **BsIconSvg**, **BsToggleIcon**: 
  - Improve `icon` property to better accommodate **Google Material Symbols**.
  - Add new property `filled` to better accommodate **Google Material Symbols**.
- **BsAlert**, **BsChip**, **BsChipGroup**:
  - Improve `icon` property to better accommodate **Google Material Symbols**. 
  - Improve `icon-variant` property to better accommodate **Google Material Symbols**.
  - Change property of `icon-variant` default value to `outlined`.
- **BsAvatar**, **BsTab**, **BsListTileLeading**, **BsListNavItem**, **BsButton**, **BsToggleButton**, **BsToggleField**:
  - Add new property `icon-variant` to better accommodate **Google Material Symbols**.
  - Improve `icon` property to better accommodate **Google Material Symbols**.
- **BsChipField**, **BsTextArea**, **BsTextField**, **BsNumericField**, **BsDateTimeField**, **BsCombobox**:
  - Improve properties: `append-icon`, `append-icon-outer`, `prepend-icon`, `prepend-icon-outer`
    and `action-icon-variant` to better accommodate **Google Material Symbols**.


## v2.0.15

Released: November 14, 2024

### Features & Improvements

- **BsLightbox**: add `z-index` property to control component stacking within HTML layers.
- **BsPopover**: improve UI display positioning.
- **BsTooltip**: 
  - Add new properties: `activator` and `arrow-off`.
  - Improve UI performance and css variables.

### Bug Fixes

- **BsArrayStore**: fixed bug loading state was not updated when method _load_ 
  was called without argument.


## v2.0.13

Released: September 27, 2024

### Features & Improvements

- **BsButton**: improve UI to better comply material design spec.
- Class **Helper**: improve `uuid` generation performance.

### Bug Fixes

- **BsListTile**: fixed bug **BsListTileSubtitle** text overlapped with **BsListTileAction**
  if multiline property of **BsListTileContent** was active and in ripple animation state.
- **BsModal**, **BsLightbox**: fixed bug closing programmatically didn't revert 
  document scrolling to original.


## v2.0.12

Released: September 20, 2024

### Features & Improvements

- **BsLightbox**: improve image loading using preloader.
- **BsSideDrawer**: improve collapse animation if used together with `<BsAppbar>`.


## v2.0.11

Released: September 08, 2024

### Features & Improvements

- **BsListNavItem**, **BsListTile**, **BsTab**, **BsTabItem**:
  - Add `path-name` and `location` properties to better accommodate the `<RouterLink>` property.
- **BsListNavItem**, **BsListTile**: improve route matcher
- **BsSideDrawer**: improvement when there are multiple `<BsApp>` and `<BsSideDrawer>` instances.
- Replace `<BsAppContainer>` with `<BsApp>` and marked `<BsAppContainer>` as deprecated.

### Bug Fixes

- **BsModel**: fixed bug when the `toObject` method was overridden and its return 
  value did not have a field that was mentioned by the `idProperty` property.


## v2.0.10

Released: August 12, 2024

### Features & Improvements

- **BsProgressBar**: 
  - Add properties: `label`, `label-alignment`, `label-position` and `inner-cls`.
  - Replace property: `rounded` with `rounded-off`.
- **BsTextField**, **BsNumericField**: add properties `prefix` and `suffix`.
- **BsChip**: improve UI border-radius to comply material design spec.
- **BsDateTimeField**: prevents the DatePicker from being displayed when the field is in read-only state.
- **BsStore**: add `expression` property on `TFilterOption` configuration.

### Bug Fixes

- **BsModel**: fix error when destroyed from BsStore.


## v2.0.9

Released: July 10, 2024

### Improvements

- **BsDatePicker**: landscape mode now works on medium-screen.
- **BsStore**: remote filter can have mixed logic **and/or** via filter options.

### Bug Fixes

- **BsColorPicker**: fix color thumb strange behaviour on VitePress.
- **BsDatePicker**: fix picker element hover size.
- **BsDateTimeField**: prevent closing popup DatePicker when time element is clicked.
- **BsTab**: fix `icon-flip`, `icon-pulse`, `icon-spin`, `icon-rotation` properties not working properly.


## v2.0.8

Released: May 18, 2024

### Improvements

- **BsChipField**: improve UI padding on **filled** and **outlined** style variant.
- **BsCombobox**: 
  - Improve floating label css.
  - Improve UI padding when **chip mode** is active.
- **BsCheckboxGroup**, **BsRadioGroup**, **BsToggleField**: improve padding on feedback message.
- **BsNumericField**: transform internal value to integer when `max-fraction` property is set to `0`.

### Bug Fixes

- **BsCombobox**: fix cascade selection when `remoteFilter` property is set to `false`.
- **BsListbox**: fix filter searchbox not working properly.
- **BsNumericField**, **BsDatePicker**, **BsDateTimerField**: fix locale resolver on SSR.
- **BsToggleField**: fix `tonal` property not working properly.


## v2.0.7

Released: April 20, 2024

### Improvements

- **BsCheckbox**: improve css variables to enable changing the checkbox appearance.

### Bug Fixes

- **BsNumericField**: fix UI when `rounded` property is enabled and `prepend-icon` 
  property is defined or action buttons is placed at left or both side.


## v2.0.6

Released: April 11, 2024

### Bug Fixes

- **BsTabs**: fix tab alignment not working properly on horizontal tabs.
- **BsChipField**: fix input field width.


## v2.0.5

Released: April 8, 2024

### Features & Improvements

- Add memory **CacheManager**.
- **AbstractStore**, **BsStore**, **BsModel**: improve data-model processing and 
  make property `restUrl` writable.
- **BsButton**: 
  - Improve css styles when `dropdown-toggle` and `tonal` property is defined.
  - improve css styles on `xs` (extra-small) button size.
- **BsCombobox**: 
  - Improve popover display placement coordinates.
  - Improve chain loading dataset when `parentValue` is defined.
- **BsIcon**, **BsIconSvg**: cache loaded icon using CacheManager to improve performance. 
- **BsNumericField**: improve classic form field styles.
- **BsListbox**: add property `autoload` to turn off the autoload dataset from remote source.
- **BsListTile**: improvement when the `navigable` property is defined.
- **BsPopover**: improve display placement coordinates.
- **BsTabs**: 
  - Improve padding on small-screen device. 
  - Support sliding on horizontal tabs when the sum of tabs width exceed the container width. 
- **BsTextArea**, **BsTextField**, **BsChipField**, **BsCombobox**, **BsNumericField**, 
  **BsDateTimeField** : move the placement of the validation icon to always be on the right at the end
- Improve TypeScript definition.

### Bug Fixes

- **BsButton**: fix border style on `flat` button variant.
- **BsCheckboxGroup**, **BsRadioGroup**: bug fix when `column` props is defined.
- **BsListbox**: fix searchbox visibility.
- **BsListNavItem**: fix incorrect html tag when component is disabled.
- **BsTabs**: 
  - Fix `tabClass` property for custom css is not applied.
  - Fix activeTab not sync when `modelValue` is changed programmatically.
- **BsNumericField**: fix `maxValue` and `minValue` property didn't work properly.
- **BsTextField**: fix field value doesn't change immediately when the `type` property is `password`.
- **BsTextArea**, **BsTextField**, **BsChipField**, **BsCombobox**, **BsNumericField**, **BsDateTimeField**: 
  - Fix validation integration using external validator.
  - Fix `validationIcon` property doesn't work properly.
  - Fix `outlined` property conflict with `filled` property when both property are present.


## v2.0.4

Released: November 25, 2023

### Features & Improvements

- **BsBadge**: add property `outlined`.
- **BsButton**: 
  - Add property `tonal` to enable **Filled Tonal** button style variant.
  - Improve `background-color`, `border-color`, `color`, `box-shadow` on various button state
    (like: `hover`, `active`, `focus`, etc.) and style variants.
  - Improve `padding` on text button style variant to meet **Google Material 
    Design 3 - Text Button** style.
- **BsMaskLoader**: refactor property `variant` to `type`, and change its valid 
  values to: `linear`, `linear-alt`, `spinner`, `grow`.
- **BsChip**, **BsChipGroup**: add property `imgPaddingOff` and improve css styles.
- **BsToggleButton**: add property `tonal`.

### Bug Fixes

- **BsAppContainer**, **BsContainer**, **BsContent**, **BsAppbar**, **BsSideDrawer**: 
  fix bug unable to get element size on non-SPA environment.
- **BsAppbar**, **BsSideDrawer**: fix onResize event arguments.
- **BsAvatar**, **BsIcon**: fix property conflict when calculating component's dimension.
- **BsBadge**: fix `badge-label` css.
- **BsButton**, **BsChip**: when `href` attribute is defined component didn't render as `<a>` element. 
- **BsListNavItem**: fix item could not resolve route path that caused wrong active item when page reloaded.
- **BSSideDrawer**: fix `marginTop` and height.
- **BsModel**: remove data from body when performing DELETE request, fix dynamic properties reactivity issue.
- **Resize**, **Scroll** directive: fix wrong callback arguments. 


## v2.0.3

Released: July 12, 2023

### Features & Improvements

- **BsAppbar**: 
  - Add property `stickyTop`.
  - Property `stickyTop` and `fixedTop` is treated like 
    [Bootstrap position helpers](https://getbootstrap.com/docs/5.3/helpers/position/)
- **BsAvatar**: add property `border`, `borderColor`.
- **BsCard**: add property `roundedOff`, `borderOff`.
- **BsChip**: add property `readonly`, `iconPosition`, 
- **BsContainer**, **BsContent**: improve css styles when **BsAppbar** `fixedTop` property is set.
- **BsProgressBar**: add property `valuePosition`.
- **BsSideDrawer**: improve computing of drawer position.
- Improve TypeScript definition. 

### Bug Fixes

- **BsChip**:
  - Fix padding and border-radius on small chip size.
  - Fix margin and icon-size on default chip size.
- **BsDropdownMenu**: bug fix when `v-model:open` is defined.
- **BsListNav**, **BsListTile**: fix padding when `spaceAround` property is set on **BsListView**.
- **BsListNavItem**: bug fix when `v-model:active` is defined.
- **BsRipple**: fix unnecessary animation effect when parent component becomes visible.


## v2.0.1

Released: July 4, 2023

### Features & Improvements

- **BsButton**:
  - Add slot `icon` for placing a custom button icon.
- **BsChipGroup**:
  - Add slot `icon` for placing a custom chip icon.
  - Add slot `text` for placing a custom chip label.
- **BsToggleButton**, **BsToggleField**:
  - Add slot `icon` for placing a custom button icon.
  - Add slot `label` for placing a custom button label.
- **BsCombobox**, **BsListbox**:
  - Add slot `empty-data-msg` for placing custom message.
  - Add slot `not-found-msg` for placing custom message.
- **BsDatePicker**: add touchpad swipe gesture.
- **BsLightbox**: placed title container on top image like image title overlay.

### Bug Fixes

- Fix custom slot-name doesn't work properly when used as web component using 
  **UMD/ESM javascript** resource. All custom slot-name now using `kebab-case` naming convention.
- **BsChipGroup**: fix checked icon doesn't display correctly.
- **BsCheckboxGroup**, **BsRadioGroup**: fix wrong multi-column.  


## v2.0.0

Released: June 30, 2023

### Features & Improvements

- Rewrite the components in the TypeScript language.
- Add support for **Vue.js 3** and **Bootstrap v5.2**.
- New components: **BsIconSpinner**, **BsIconSvg**, **BsProgressBar**, **BsColorPicker**, **BsListbox**
- **BsAlert**: add property `filled`, `iconVariant`, and `variant`.
- **BsAppbar**: add property `clippedRight`.
- **BsAppContainer**: add property `viewportHeight`.
- **BsButton**: add property `readonly`. 
- **BsChip**: add property `iconVariant`, `pill`.
- **BsChipField**: add property `actionIconVariant`, `validationIcon`, `chipPill`.
- **BsChipGroup**: Add property `sliderButton`, `sliderButtonColor`.
- **BsCombobox**: add property `minSearchChars`, `minSearchLength`, `listboxMaxHeight`, 
  `listboxMinWidth`, `listboxSearchLabel`, `checkboxColor`, `checkboxPosition`, `chipPill`.
- **BsDatePicker**: add property `surfaceColor`, support mousewheel, touch and internationalization.
- **BsDateTimeField**: add property `pickerColor`, `pickerCls`, `pickerMode`, `pickerWidth`, `pickerTransition`.
- **BsDropdownMenu**: add property `space`.
- **BsLightbox**: support navigation using keyboard arrow left/right and touch left/right.
- **BsListNav**: add property `id`.
- **BsListNavItem**: add property `id`, `borderOff`, `pillOff`, `roundedOff`, `badgeColor`, and `badgeType`.
- **BsListTile**: add property `id`, `borderOff`, `pillOff`, and `roundedOff`.
- **BsListTileSubtitle**: add property `rawHtml`.
- **BsListTileTitle**: add property `rawHtml`.
- **BsListView**: add property `itemRounded`, `itemRoundedPill`, `individualState`, and `modelValue`.
- **BsMaskLoader**: add property `variant`.
- **BsModal**: add property `overlayClickClose`.
- **BsNumericField**: add property `actionIconVariant`, and `validationIcon`.
- **BsOverlay**: add event `click`.
- **BsPopover**: add property `color`.
- **BsSearchField**: add property `advanceSearch`, `popoverTransition`.
- **BsSideDrawer**: add property `position`, `fixedLayout`, `overlayColor`.
- **BsSwitch**: add property `insetMode`, `insetOutlined`, `checkoffIcon`, `checkedIcon`.
- **BsTab**: add property `disabled`, `iconSpin`, `iconPulse`, `iconFlip`, `iconRotation`.
- **BsTextField**: add property `actionIconVariant`, and `validationIcon`.
- **BsToggleButton**: add property `pill`, `rounded`.
- **BsToggleField**: add property `pill`, `rounded`, `actionIconVariant`, `validationIcon`
- **BsToggleIcon**: add property `size`.
- **BsTooltip**: add property `show`, `zIndex`.

### Breaking Changes

- Removed **FontAwesome icons** from package bundle, in favor of dynamic 
  loading of **[Google Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons)**.
- All components which have `value` property is replaced with `modelValue` property.
  See [Vue 3 Migration Guide](https://v3-migration.vuejs.org/breaking-changes/v-model.html).
- All `input` event is replaced with `update:modelValue` event, so it can be integrated with `v-model` directive.
  See [Vue 3 Migration Guide](https://v3-migration.vuejs.org/breaking-changes/v-model.html).
- **BsAlert**: 
  - Deprecated property `solid-fill`, use property `filled` instead. 
  - Replaced property `iconOutlined` with `iconVariant` for flexibility.
  - Replaced property `value` with `modelValue`.
  - Rename slot `alertIcon` with `icon`.
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
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced property `value` with `modelValue`.
  - Replaced event `change` with `update:modelValue`.
  - Rename slot `helpText` with `help-text`.
- **BsCard**: replaced property `flat` with `rounded`.
- **BsCheckbox**: 
  - Replaced property `checked` with `modelValue`. 
  - Removed property `falseValue` and `trueValue`.
  - Replaced event `change` with `update:modelValue`.
- **BsCheckboxGroup**: 
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced event `change` with `update:modelValue`.
  - Rename property `columns` with `column`. 
  - Replaced slot `helpText` with `help-text`.
- **BsChip**: 
  - Replaced property `value` with `modelValue`. 
  - Removed `label` property to meet the MD3 design specification. 
  - Removed property `activeColor`, because it is redundant with property `activeClass`.
  - Removed property `faStyles` as of [FontAwesome](https://fontawesome.com/search?m=free&s=solid)
    is removed from package bundle. 
  - Replaced slot `chipIcon` with `icon`.
- **BsChipField**: 
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced slot `prependIcon` with `prepend-inner`.
  - Replaced slot `prependIconOuter` with `prepend-outer`.
  - Replaced slot `appendIcon` with `append-inner`.
  - Replaced slot `appendIconOuter` with `append-outer`.
  - Replaced slot `helpText` with `help-text`.
  - Removed property `chipLabeled`, used `chipPill` instead. 
  - Removed event `change`, already covered by event `update:modelValue`.
- **BsChipGroup**:
  - Removed property `sliderArrows`, used property `sliderButton` instead.
  - Removed property `arrowsColor`, used property `sliderButtonColor` instead.
  - Removed property `activeColor`, used property `activeClass` instead.
  - Replaced property `value` with `modelValue`.
- **BsCombobox**: 
  - Deprecated property `popoverMaxHeight`, use property `listboxMaxHeight` instead.
  - Deprecated property `popoverMinWidth`, use property `listboxMinWidth` instead.
  - Deprecated property `checkOptionColor`, use property `checkboxColor` instead.
  - Deprecated property `checkOptionPosition`, use property `checkboxPosition` instead.
  - Deprecated property `minimumItemsForSearch`, use property `minSearchLength` instead.
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced slot `optionItem` with `option-item`.
  - Replaced slot `prependIcon` with `prepend-inner`.
  - Replaced slot `prependIconOuter` with `prepend-outer`.
  - Replaced slot `appendIcon` with `append-inner`.
  - Replaced slot `appendIconOuter` with `append-outer`.
  - Replaced slot `helpText` with `help-text`.
  - Removed property `open`.
  - Removed property `chipLabeled`, used `chipPill` instead.
  - Removed event `change`, already covered by event `update:modelValue`.
- **BsDatePicker**: 
  - Deprecated property `viewMode`, use property `mode` instead.
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced dependency of `momentjs` with `luxon`.
  - Removed property `color`.
  - Removed property `firstDayOfWeek`.
  - Removed property `format`.
  - The output value of the `modelValue` property follows the **ISO 8601** standard.
- **BsDateTimeField**: 
  - Deprecated property `viewMode`, use property `pickerMode` instead.
  - Deprecated property `transition`, use property `pickerTransition` instead.
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced dependency of `momentjs` with `luxon`.
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced slot `prependIcon` with `prepend-inner`.
  - Replaced slot `prependIconOuter` with `prepend-outer`.
  - Replaced slot `appendIcon` with `append-inner`.
  - Replaced slot `appendIconOuter` with `append-outer`.
  - Replaced slot `helpText` with `help-text`.
  - Removed property `open`.
  - Removed property `color`, use property `pickerColor` instead.
  - Removed property `firstDayOfWeek`.
  - Removed event `change`, already covered by event `update:modelValue`.
- **BsIcon**: replace property `rotation` with `rotate`.
- **BsIconToggle**: 
  - Deprecated, use **BsToggleIcon** instead.
  - Replaced property `value` with `modelValue`.
- **BsLightbox**:
  - Deprecated property `overlayClose`, use property `overlayClickClose` instead.
  - Removed method `changeActive`, use `setActive` instead.
- **BsListNavItem**:
  - Removed property `exact`.
  - Replace event `input` with `update:active`.
- **BsListTile**:
  - Replace event `input` with `update:active`.
  - Removed property `exact`.
- **BsListView**: 
  - Replace property `activeItemBordered` with `itemBorderVariant`.
- **BsMaskLoader**: 
  - Deprecated property `spinnerType`, use property `variant` instead.
- **BsModal**: 
  - Deprecated property `overlayClose`, use property `overlayClickClose` instead.
- **BsMenu**: 
  - Deprecated, use **BsDropdownMenu** instead.
- **BsNotification**:
  - Component must be activated first on the file `app.vue` or `main.vue` before using  
    `this.$notification` option api or `useVueMdbNotification()` composable api.
- **BsNumericField**: 
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced slot `prependIcon` with `prepend-inner`.
  - Replaced slot `prependIconOuter` with `prepend-outer`.
  - Replaced slot `appendIcon` with `append-inner`.
  - Replaced slot `appendIconOuter` with `append-outer`.
  - Replaced slot `helpText` with `help-text`.
  - Removed property `actionButtonColor`.
  - Removed event `change`, already covered by event `update:modelValue`.
- **BsPopover**: 
  - Replace property `overlayClose` with `overlayClickClose`.
- **BsRadio**:
  - Replaced property `checked` with `modelValue`.
  - Replaced event `change` with `update:modelValue`.
- **BsRadioGroup**:
  - Replaced property `columns` with `column`.
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replace event `change` with `update:modelValue`.
  - Replaced slot `helpText` with `help-text`.
- **BsRipple**: 
  - Removed property `eventTrigger`.
- **BsSearchField**:
  - Replaced event `input` with `update:modelValue`.
  - Replaced property `value` with `modelValue`.
  - Replaced property `searchOptions` with `advanceSearch`.
  - Replaced property `transition` with `popoverTransition`.
  - Removed property `innerCls`.
- **BsSwitch**:
  - Replaced property `checked` with `modelValue`.
  - Replaced event `change` with `update:modelValue`.
  - Removed property `falseValue` and `trueValue`.
- **BsTab**: 
  - Replace property `value` with `modelValue`.
- **BsTextArea**, **BsTextField**:
  - Deprecated property `externalValidator`, use property `validator` instead.
  - Replaced property `value` with `modelValue`.
  - Replaced event `input` with `update:modelValue`.
  - Replaced slot `prependIcon` with `prepend-inner`.
  - Replaced slot `prependIconOuter` with `prepend-outer`.
  - Replaced slot `appendIcon` with `append-inner`.
  - Replaced slot `appendIconOuter` with `append-outer`.
  - Replaced slot `helpText` with `help-text`.
  - Removed event `change`, already covered by event `update:modelValue`.


## v1.2.1

Released: July 01, 2021

### Bug Fixes & Improvements

- Upgrade package builder to **webpack v5.x**
- Improve build scripts
- **BsNotification**: fix component registration
- **BsChip**, **BsChipField**, **BsCombobox**, **BsNumericField**: fix missing component import 
- **BsRadio**: fix property mutation


## v1.2.0

Released: June 29, 2021

### Features

- New components: **BsNumericField**, **BsChip**, **BsChipGroup**, **BsChipField**
- New icons: `AddCircle`, `AddCircleOutline`, `CheckCircle`, `CheckCircleOutline`, `Checked`, `Error`, 
  `ErrorOutline`, `Help`, `HelpCenter`, `HelpOutline`, `Info`, `Remove`, `RemoveCircle`, 
  `RemoveCircleOutline`, `Report`, `ReportOutline`, `Shield`, `Verified`, `VerifiedUser`, 
  `Warning`, `WarningOutline`, `InvertColors`
- **BsCombobox**: add properties `chip-enabled`, `chip-color`, `chip-labeled` and `chip-outlined`
- **BsListNavItem**: add properties `badge`, and `badge-variant`
- **BsAlert**: add properties `icon-flip`, `icon-outlined`, `icon-pulse`, `icon-rotation`, 
  `icon-spin`, `icon-type`, and `solid-fill`
- **BsTabs**: add properties `active-class`  

### Bug Fixes & Improvements

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

### Features & Improvements

- **BsMaskLoader:** add properties `overlay-color`, `overlay-opacity`, `spinner-color`,
  `spinner-thickness`, and `spinner-type`
- **BsMenu:** improve keyboard navigation using `arrow-down` and `arrow-up`  

### Bug Fixes

- **BsAppbarItems**: remove `font-size` scss styles
- **BsPopover**: fix `space` property did not apply correctly when `placement` property sets to 
  `top`, `top-left` or `top-right`
- Refactor `popover` transition animation to `scale`  


## v1.1.3

Released: January 5, 2021

### Bug Fixes & Improvements

- **BsGrid**: fix side effect on methods `sort`, `setPageSize`, `_fetchData`, and update scss styles 
- **BsSearchField**: remove property `can-close` and fix `BsPopover` show/hide procedure when 
  `search-options` is enabled
- **BsTreegridCell**: fix warning when icon is null
- **BsCheckboxGroup, BsRadioGroup**: fix multi-column items when `columns` property value is `1` 
- **BsButtonToggleField**: fix non-persistent help text and update scss styles
- **AbstractStore**: add methods `setPageSize` and `setSorters`
- **BsStore**: fix method `append` didn't send data to remote service
- **BsModel**: constructor improvement


## v1.1.1

Released: December 21, 2020

### Bug Fixes & Improvements

- **Touch**: directive did not expose correctly
- **BsCard**: add DOM event listener
- **BsNotification**: change default variant and update css styles
- **BsTextField, BsTextArea, BsRadioGroup, BsDateTimeField, BsCombobox, BsCheckboxGroup**: bug fix 
  when form reset


## v1.1.0

Released: December 18, 2020

### Features

- New components: **BsExpandTransition**, **BsCardMedia**, **BsIconToggle**, **BsListNav**, **BsListNavItem**
- **BsAvatar**: add properties `icon-flip`, `icon-spin` and `icon-pulse`
- **BsButton**: add properties `pill` and `rounded`, emit events `input` to update `active` property
- **BsCard**: add properties `img-bottom-alt`, `img-bottom-src`, `img-top-alt`, `img-top-src`
- **BsCheckbox**: add property `readonly`
- **BsCheckboxGroup**: add property `readonly`
- **BsSwitch**: add property `readonly`
- **BsIcon**: add properties `flip`, `pulse`, `rotation`, `spin`, and add new icons: `delete-outline`
- **BsListTile**: add properties `ripple-off` and `navigable`
- **BsListTileAction**: add `center` property
- **BsListTileLeading**: add properties `icon`, `icon-flip`, `icon-rotation`, `icon-spin` and `icon-pulse`
- **BsListView**: add properties `single-expand`, `space-around`, and `active-item-bordered`
- **BsTextArea**: add properties `append-icon-outer`, `prepend-icon-outer`, and `filled`
- **BsTextField**: add properties `append-icon-outer`, `prepend-icon-outer`, and `filled`
- **BsCombobox**: add properties `append-icon-outer`, `prepend-icon-outer`, and `filled`
- **BsDateTimeField**: add properties `append-icon-outer`, `prepend-icon-outer`, and `filled`
- **BsGridColumn**: add properties `order`, `cell-data`
- **BsModal**: add properties `body-class`, `footer-class`, and `header-class`
- **BsLightbox**: add properties `image-class`, and `image-styles`
- Add css classes: `font-weight-bold`, `font-weight-bolder`, `font-weight-boldest`

### Bug Fixes & Improvements

- **BsAlert**: improve css alert-variant
- **BsMaskLoader**: incorrect z-index
- **BsButton**: rename property `button` to `type` and `ripple` to `ripple-off`
- **BsIcon**: remove css class `d-flex` and `align-items-center`
- **BsImageHolder**: computed cssClass, height and width improvement
- **BsListView**: beforeDestroy improvement, add function` addItem()`, `addChild()`, `findActive()`, 
  `removeItem()`, `removeChild()`
- **BsListTile:** improve when to generate `<a>` element or `<div>` element and update component scss
- **BsProgress**: change property `type` default value to 'bar' 
- **BsSideDrawer**: computed inline style improvement
- **BsCheckbox, BsSwitch**: improve css classes
- **BsCombobox**: improve html template and css classes
- **BsTextArea**: improve html template and css classes
- **BsTextField**: improve html template and css classes
- **BsDateTimeField**: improve html template and css classes
- **BsGrid**: improve html template and css classes, rename property `borderless` to `bordered`
- **BsModal**: rename slot `title` to `header`, and rename property `fullscreen` to `full-page`
- **BsTabLabel**: fix icon padding
- Improve scss color variables
- Improve JsDoc


## v1.0.4

Released: August 10, 2020

### Bug Fixes & Improvements

- **BsMaskLoader, BsButtonToggle, BsContent, BsCheckboxGroup, BsRadioGroup, BsSearchField, BsGrid, 
  BsLightbox, BsPagination** : add missing import and components declaration
- **BsAppbar**: smooth transition when minimize SideDrawer
- **BsModal**: fix invalid css padding and line-height at modal title 
- **AbstractStore**: add functions `find()`, `findBy()`, `findIndex()`, `remove()`, `removeAt()`, 
  and some improvement
- **BsModel**: constructor improvement and function `delete()`  
- **BsStore**: constructor improvement and add function `delete()`, `deletes()` 
- **Helper**: add function `isString()`


## v1.0.3

Released: Mei 20, 2020

### Bug Fixes

- **BsSpacer**: fix didn't fill available space


## v1.0.2

Released: Mei 20, 2020

### Bug Fixes

- **BsGrid**: fix local paging, local sorting, and local filtering
- **BsPagination**: fix combobox paging
- **BsArrayStore, BsStore**: enhance LocalFilter to match BsGrid filterable spec
