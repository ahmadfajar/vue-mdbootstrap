# CHANGELOG

> All notable changes to this project will be documented in this file.

## v1.2.1

Released: July 01, 2021

### Bug Fixes & Improvement v1.2.1

- Upgrade package builder to **webpack v5.x**
- Improve build scripts
- **BsNotification**: fix component registration
- **BsChip**, **BsChipField**, **BsCombobox**, **BsNumericField**: fix missing component import 
- **BsRadio**: fix property mutation


## v1.2.0

Released: June 29, 2021

### Features v1.2.0

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

### Bug Fixes & Improvement v1.2.0

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

### Features v1.1.4

- **BsMaskLoader:** add properties `overlay-color`, `overlay-opacity`, `spinner-color`,
  `spinner-thickness`, and `spinner-type`

### Bug Fixes & Improvement v1.1.4

- **BsAppbarItems:** remove `font-size` scss styles
- **BsMenu:** improve keyboard navigation using `arrow-down` and `arrow-up`
- **BsPopover:** fix `space` property did not apply correctly when `placement` property sets to 
  `top`, `top-left` or `top-right`
- Refactor `popover` transition animation to `scale`  


## v1.1.3

Released: January 5, 2021

### Bug Fixes & Improvement v1.1.3

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

### Bug Fixes & Improvement v1.1.1

- **Touch** directive did not expose correctly
- **BsCard:** add DOM event listener
- **BsNotification:** change default variant and update css styles
- **BsTextField, BsTextArea, BsRadioGroup, BsDateTimeField, BsCombobox, BsCheckboxGroup:** bug fix 
  when form reset


## v1.1.0

Released: December 18, 2020

### Features v1.1.0

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

### Bug Fixes & Improvement v1.1.0

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

### Bug Fixes & Improvement v1.0.4

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

### Bug Fixes v1.0.3

- **BsSpacer:** fix didn't fill available space


## v1.0.2

Released: Mei 20, 2020

### Bug Fixes v1.0.2

- **BsGrid:** fix local paging, local sorting, and local filtering
- **BsPagination:** fix combobox paging
- **BsArrayStore, BsStore:** enhance LocalFilter to match BsGrid filterable spec
