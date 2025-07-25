---
title: Table
desc: The QTable Vue component allows you to display data in a tabular manner and it's packed with a lot of related features. It's generally called a datatable.
keys: QTable,QTh,QTr,QTd
examples: QTable
related:
  - /vue-components/markup-table
  - /vue-components/pagination
---

QTable is a component that allows you to display data in a tabular manner. It's generally called a datatable. It packs the following main features:

* Filtering
* Sorting
* Single / Multiple rows selection with custom selection actions
* Pagination (including server-side if required)
* Grid mode (you can use for example QCards to display data in a non-tabular manner)
* Total customization of rows and cells through scoped slots
* Ability to add additional row(s) at top or bottom of data rows
* Column picker (through QTableColumns component described in one of the sections)
* Custom top and/or bottom Table controls
* Responsive design

::: tip
If you don't need pagination, sorting, filtering, and all other features of QTable, then you may want to check out [QMarkupTable](/vue-components/markup-table) component instead.
:::

<DocApi file="QTable" />

<DocApi file="QTh" />

<DocApi file="QTr" />

<DocApi file="QTd" />

## Defining the columns

Let’s take an example of configuring the `columns` property. We are going to tell QTable that `row-key` is ‘name’, which **must** be unique. If this was data fetched from a database we would likely use the row **id**.

```js
columns: [ // array of Objects
  // column Object definition
  {
    // unique id
    // identifies column
    // (used by pagination.sortBy, "body-cell-[name]" slot, ...)
    name: 'desc',

    // label for header
    label: 'Dessert (100g serving)',

    // row Object property to determine value for this column
    field: 'name',
    // OR field: row => row.some.nested.prop,

    // (optional) if we use visible-columns, this col will always be visible
    required: true,

    // (optional) alignment
    align: 'left',

    // (optional) tell QTable you want this column sortable
    sortable: true,

    // (optional) compare function if you have
    // some custom data or want a specific way to compare two rows
    // --> note that rows with null/undefined as value will get auto sorted
    // without calling this method (if you want to handle those as well, use "rawSort" instead)
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    // function return value:
    //   * is less than 0 then sort a to an index lower than b, i.e. a comes first
    //   * is 0 then leave a and b unchanged with respect to each other, but sorted with respect to all different elements
    //   * is greater than 0 then sort b to an index lower than a, i.e. b comes first

    // (optional) requires Quasar v2.13+
    // compare function if you have
    // some custom data or want a specific way to compare two rows
    // --> note that there is an alternative "sort" method (above) if you don't
    // want to handle (by yourself) rows with null/undefined as value
    rawSort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    // has the same return value as the alternative "sort" method above

    // (optional) override 'column-sort-order' prop;
    // sets column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending)
    sortOrder: 'ad', // or 'da'

    // (optional) you can format the data with a function
    format: (val, row) => `${val}%`,
    // one more format example:
    // format: val => val
    //   ? /* Unicode checkmark checked */ "\u2611"
    //   : /* Unicode checkmark unchecked */ "\u2610",

    // body td:
    style: 'width: 500px',
    // or as Function --> style: row => ... (return String/Array/Object)
    classes: 'my-special-class',
    // or as Function --> classes: row => ... (return String)

    // header th:
    headerStyle: 'width: 500px',
    headerClasses: 'my-special-class'
  },
  { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]
```

## Basic usage

<DocExample title="Basic" file="Basic" />

<DocExample title="Force dark mode" file="Dark" />

<DocExample title="Dense" file="Dense" />

::: tip
You can use the `dense` prop along with `$q.screen` to create a responsive behavior. Example: `:dense="$q.screen.lt.md"`. More info: [Screen Plugin](/options/screen-plugin).
:::

## Omitting columns definition

You can omit specifying the `columns`. QTable will infer the columns from the properties of the first row of the data. Note that labels are uppercased and sorting is enabled:

<DocExample title="Infering columns from data" file="InferColumns" />

## Sticky header/column

::: warning
Sticky headers and columns are achieved through CSS with `position: sticky`. This is NOT supported on all browsers. Check [caniuse.com](https://caniuse.com/#search=sticky) before using this technique.
:::

::: tip
Pay attention to the code in the "style" section in the following examples, especially around `position: sticky`.
:::

<DocExample title="Sticky header" file="StickyHeader" />

<DocExample title="Sticky first column" file="StickyColumn" />

<DocExample title="Sticky last column" file="StickyLastColumn" />

<DocExample title="Sticky header and column" file="StickyHeaderAndColumn" />

<DocExample title="Sticky header and last column" file="StickyHeaderAndLastColumn" />

## Separators

<DocExample title="Separators" file="Separators" />

## Styling

<DocExample title="Custom column" file="CustomColumn" />

::: tip
For all the styling component properties, please check the API card at the top of the page.
:::

<DocExample title="Custom coloring" file="CustomColor" />

<DocExample title="No header/footer" file="NoHeaderFooter" />

## Virtual scrolling

Notice that when enabling virtual scroll you will need to specify the `table-style` (with a max-height) prop. In the example below, we are also forcing QTable to display all rows at once (note the use of `pagination` and `rows-per-page-options` props).

<DocExample title="Basic virtual scroll" file="VirtscrollBasic" />

You can dynamically load new rows when scroll reaches the end:

<DocExample title="Dynamic loading virtual scroll" file="VirtscrollDynamic" />

You can have both virtual scroll and pagination:

<DocExample title="Virtual scroll and pagination" file="VirtscrollPagination" />

The example below shows how virtual scroll can be used along with a sticky header. Notice the `virtual-scroll-sticky-start` prop which is set to the header height.

<DocExample title="Virtual scroll with sticky header" file="VirtscrollSticky" />

There are 2 utility CSS classes that control VirtualScroll size calculation:

* Use `q-virtual-scroll--with-prev` class on an element rendered by the VirtualScroll to indicate that the element should be grouped with the previous one (main use case is for multiple table rows generated from the same row of data).
* Use `q-virtual-scroll--skip` class on an element rendered by the VirtualScroll to indicate that the element's size should be ignored in size calculations.

<DocExample title="Virtual scroll with multiple rows for a data row" file="VirtscrollMultipleRows" />

## Selection

::: warning
The property `row-key` must be set in order for selection to work properly.
:::

<DocExample title="Single selection" file="SingleSelection" />

<DocExample title="Multiple selection" file="MultipleSelection" />

<DocExample title="Selection cell slots" file="SelectionSlots" />

<DocExample title="Selection cell slots with range selection" file="SelectionSlotsRange" />

<DocExample title="Custom multiple selection" file="CustomSelection" />

## Visible columns, custom top, fullscreen

Please note that columns marked as `required` (in the column definition) cannot be toggled and are always visible.

<DocExample title="Visible columns, custom top and fullscreen" file="VisibleColumns" />

<DocExample title="Visible columns" file="VisibleColumns2" />

## Popup editing

::: tip
Below is an example with the user being able to edit “in place” with the help of **QPopupEdit** component. Please note that we are using the `body` scoped slot. **QPopupEdit** won’t work with cell scoped slots.
:::

<DocExample title="Popup editing" file="PopupEditing" />

## Editing with an input

<DocExample title="Input editing" file="InputEditing" />

## Grid style

::: tip
You can use the `grid` prop along with `$q.screen` to create a responsive behavior. Example: `:grid="$q.screen.lt.md"`. More info: [Screen Plugin](/options/screen-plugin).
:::

In the example below, we let QTable deal with displaying the grid mode (not using the specific slot):

<DocExample title="Grid style" file="GridStyle" />

<DocExample title="Grid with header" file="GridHeader" />

<DocExample title="Colored grid style" file="GridStyleColored" />

<DocExample title="Masonry like grid" file="GridMasonry" />

However, if you want to fully customize the content, check the example below, where:

* We are using a Vue scoped slot called `item` to define how each record (the equivalent of a row in non-grid mode) should look. This allows you total freedom.
* We are using multiple selection.

<DocExample title="Grid style with slot" file="GridStyleSlot" />

## Expanding rows

::: warning
Add unique (distinct) `key` on QTr if you generate more than one QTr from a row in data.
:::

<DocExample title="Internal expansion model" file="ExpandedRowInternal" />

An external expansion model can also be used:

<DocExample title="External expansion model" file="ExpandedRowExternal" />

If you are using virtual scroll with QTable, you should know that there are 2 utility CSS classes that control VirtualScroll size calculation:
* Use `q-virtual-scroll--with-prev` class on an element rendered by the VirtualScroll to indicate that the element should be grouped with the previous one (main use case is for multiple table rows generated from the same row of data).
* Use `q-virtual-scroll--skip` class on an element rendered by the VirtualScroll to indicate that the element's size should be ignored in size calculations.

<DocExample title="Virtual scroll with expansion model" file="VirtscrollExpandedRow" />

## Before/after slots

<DocExample title="Before/After slots (header/footer)" file="BeforeAfterHeaderFooter" />

## Pagination

::: tip
When `pagination` has a property named `rowsNumber`, then this means that you’ll be configuring Table for **server**-side pagination (& sorting & filtering). See *"Server side pagination, filter and sorting"* section.
:::

Below are two examples of handling the pagination (and sorting and rows per page).

The first example highlights how to configure the initial pagination:

<DocExample title="Initial pagination" file="PaginationInitial" />

The second example uses the "v-model:pagination" directive because we want to access its current value at any time. A use-case for the technique below can be to control the pagination from outside of QTable.

<DocExample title="Synchronized pagination" file="PaginationSync" />

## Pagination slot

For learning purposes, we will customize the pagination controls with the default controls in order to help you get started with your own.

<DocExample title="Pagination slot" file="PaginationSlot" />

## Loading state

<DocExample title="Default loading" file="Loading" />

<DocExample title="Custom loading state" file="CustomLoading" />

## Custom top

<DocExample title="Custom top with add/remove row" file="CustomTop" />

## Body slots

The example below shows how you can use a slot to customize the entire row:

<DocExample title="Body slot" file="SlotBody" />

Below, we use a slot which gets applied to each body cell:

<DocExample title="Body-cell slot" file="SlotBodyCell" />

We can also customize only one particular column only. The syntax for this slot is `body-cell-[name]`, where `[name]` should be replaced by the property of each row which is used as the row-key.

<DocExample title="Body-cell-[name] slot" file="SlotBodyCellName" />

## Header slots

The example below shows how you can use a slot to customize the entire header row:

<DocExample title="Header slot" file="SlotHeader" />

Below, we use a slot which gets applied to each header cell:

<DocExample title="Header-cell slot" file="SlotHeaderCell" />

We can also customize only one particular header cell only. The syntax for this slot is `header-cell-[name]`, where `[name]` should be replaced by the property of each row which is used as the row-key.

<DocExample title="Header-cell-[name] slot" file="SlotHeaderCellName" />

## No data

<DocExample title="No Data Label" file="NoData" />

There is also a "no-data" scoped slot (see below) that you can also to customize the messages for both when a filter doesn't returns any results or the table has no data to display. Also type something into the "Search" input.

<DocExample title="No Data Slot" file="NoDataSlot" />

## Handling bottom layer

There are a few properties that you can use to hide the bottom layer or specific parts of it. You can play with it below:

<DocExample title="Hiding bottom layer" file="HideBottom" />

## Custom sorting

<DocExample title="Custom sorting" file="CustomSorting" />

## Responsive tables

In order to create responsive tables, we have two tools at our disposal: `dense` and `grid` properties. We can connect these with `$q.screen`. More info: [Screen Plugin](/options/screen-plugin).

First example below uses `$q.screen.lt.md` (for enabling dense mode) and the second examples uses `$q.screen.xs` to enable grid mode, so play with browser width to see them in action.

<DocExample title="Using dense prop" file="ResponsiveDense" />

<DocExample title="Using grid prop" file="ResponsiveGrid" />

## Server side pagination, filter and sorting

When your database contains a big number of rows for a Table, obviously it’s not feasible to load them all for multiple reasons (memory, UI rendering performance, …). Instead, you can load only a Table page. Whenever the user wants to navigate to another Table page, or wants to sort by a column or wants to filter the Table, a **request** is sent to the **server** to fetch the partially paged data.

1. First step to enable this behavior is to specify `pagination` prop, which MUST contain `rowsNumber`. QTable needs to know the total number of rows available in order to correctly render the pagination links. Should filtering cause the `rowsNumber` to change then it must be modified dynamically.

2. Second step is to listen for `@request` event on QTable. This event is triggered when data needs to be fetched from the **server** because either page number or sorting or filtering changed.

3. It’s best that you also specify the `loading` prop in order to notify the user that a background process is in progress.

::: tip
In the example below, steps have been taken to emulate an ajax call to a server. While the concepts are similar, if you use this code you will need to make the appropriate changes to connect to your own data source.
:::

<DocExample title="Synchronizing with server" file="Synchronizing" />

## Exporting data

Below is an example of a naive csv encoding and then exporting table data by using the [exportFile](/quasar-utils/other-utils#export-file) Quasar util. The browser should trigger a file download. For a more professional approach in regards to encoding we do recommend using [csv-parse](https://csv.js.org/parse/) and [csv-stringify](https://csv.js.org/stringify/) packages.

::: tip
You could also make use of the `filteredSortedRows` internal computed property of QTable should you want to export the user filtered + sorted data.
:::

<DocExample title="Export to csv" file="ExportCsv" />

## Keyboard navigation

Below is an example of keyboard navigation in the table using selected row. Use `ArrowUp`, `ArrowDown`, `PageUp`, `PageDown`, `Home` and `End` keys to navigate.

<DocExample title="Keyboard navigation" file="KeyboardNavigation" />
