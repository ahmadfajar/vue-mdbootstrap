# CHANGELOG

> All notable changes to this project will be documented in this file.

## v1.1.0
Released:

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

- **BsSpacer:** can't fill available space


## v1.0.2

Released: Mei 20, 2020

### Bug Fixes v1.0.2

- **BsGrid:** fix localPaging, localSorting, and localFiltering
- **BsPagination:** fix combobox paging
- **BsArrayStore, BsStore:** enhance LocalFilter to match BsGrid filterable spec
