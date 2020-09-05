# CHANGELOG

> All notable changes to this project will be documented in this file.

## v1.1.0
Released:

### Features v1.1.0

- Add new component: **BsListNav**, **BsListNavItem**, **BsExpandTransition**, **BsCardMedia**, **BsIconToggle**
- **BsButton:** add property `pill` and `rounded`, emit events `input` to update `active` property
- **BsCard:** add properties `img-bottom-alt`, `img-bottom-src`, `img-top-alt`, `img-top-src`
- **BsListTile:** add properties `ripple-off` and `navigable`
- Add css classes: `font-weight-bold`, `font-weight-bolder`, `font-weight-boldest`

### Bug Fixes & Improvement v1.0.5

- **BsAlert:** fix css alert-variant
- **BsMaskLoader:** incorrect z-index
- **BsButton:** rename property `button` to `type` and `ripple` to `ripple-off`
- **BsIcon:** remove css class `d-flex` and `align-items-center`
- **BsImageHolder:** computed cssClass, height and width improvement
- **BsListView:** beforeDestroy improvement, add function` addItem()`, `addChild()`, `findActive()`, 
  `removeItem()`, `removeChild()`
- **BsListTile:** improve when to generate `<a>` element or `<div>` element
- **BsProgress:** change property `type` default value to 'bar' 
- **BsSideDrawer:** computed inline style improvement
- Fix scss color variables


# v1.0.4

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


# v1.0.3

Released: Mei 20, 2020

### Bug Fixes v1.0.3

- **BsSpacer:** can't fill available space


# v1.0.2

Released: Mei 20, 2020

### Bug Fixes v1.0.3

- **BsGrid:** fix localPaging, localSorting, and localFiltering
- **BsPagination:** fix combobox paging
- **BsArrayStore, BsStore:** enhance LocalFilter to match BsGrid filterable spec
