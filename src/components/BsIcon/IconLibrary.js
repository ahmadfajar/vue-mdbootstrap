const library = [
    {
        name: 'Add',
        class: 'icon-add',
        aliases: ['add'],
        paths: [
            {d: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'Apps',
        class: 'icon-apps',
        aliases: ['apps'],
        paths: [
            {d: 'M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'ArrowBack',
        class: 'icon-arrow-back',
        aliases: ['arrow-back', 'arrow_back'],
        paths: [
            {d: 'M0 0h24v24H0z', fill: 'none'},
            {d: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z', fill: 'currentColor'}
        ]
    },
    {
        name: 'ArrowDropDown',
        class: 'icon-arrow-drop-down',
        aliases: ['arrow-drop-down', 'arrow_drop_down'],
        paths: [
            {d: 'M7 10l5 5 5-5z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'ArrowDropUp',
        class: 'icon-arrow-drop-up',
        aliases: ['arrow-drop-up', 'arrow_drop_up'],
        paths: [
            {d: 'M7 14l5-5 5 5z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'ArrowForward',
        class: 'icon-arrow-forward',
        aliases: ['arrow-forward', 'arrow_forward'],
        paths: [
            {d: 'M0 0h24v24H0z', fill: 'none'},
            {d: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z', fill: 'currentColor'}
        ]
    },
    {
        name: 'ArrowLeft',
        class: 'icon-arrow-left',
        aliases: ['arrow-left', 'arrow_left'],
        paths: [
            {d: 'M14 7l-5 5 5 5V7z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'ArrowRight',
        class: 'icon-arrow-right',
        aliases: ['arrow-right', 'arrow_right'],
        paths: [
            {d: 'M10 17l5-5-5-5v10z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'BorderAll',
        class: 'icon-border-all',
        aliases: ['border-all', 'border_all', 'tiles'],
        paths: [
            {d: 'M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'Calendar',
        class: 'icon-calendar',
        aliases: ['date-range', 'date_range'],
        paths: [
            {d: 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'ChevronLeft',
        class: 'icon-chevron-left',
        aliases: ['chevron-left', 'chevron_left', 'keyboard-arrow-left', 'keyboard_arrow_left', 'navigate-before', 'navigate_before'],
        paths: [
            {d: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'ChevronRight',
        class: 'icon-chevron-right',
        aliases: ['chevron-right', 'chevron_right', 'keyboard-arrow-right', 'keyboard_arrow_right', 'navigate-next', 'navigate_next'],
        paths: [
            {d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'Clear',
        class: 'icon-clear',
        aliases: ['close', 'clear'],
        paths: [
            {d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'CreateFolder',
        class: 'icon-create-folder',
        aliases: ['create_new_folder', 'create-new-folder', 'create_folder', 'create_folder'],
        paths: [
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
            {d: 'M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-1 8h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z', fill: 'currentColor'},
        ]
    },
    {
        name: 'Dashboard',
        class: 'icon-dashboard',
        aliases: ['dashboard'],
        paths: [
            {d: 'M0 0h24v24H0z', fill: 'none'},
            {d: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z', fill: 'currentColor'},
        ]
    },
    {
        name: 'Delete',
        class: 'icon-delete',
        aliases: ['delete', 'trash', 'trashcan', 'recyclebin'],
        paths: [
            {d: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'},
        ]
    },
    {
        name: 'ExpandLess',
        class: 'icon-expand-less',
        aliases: ['expand-less', 'expand_less', 'chevron-up', 'chevron_up', 'keyboard-arrow-up', 'keyboard_arrow_up'],
        paths: [
            {d: 'M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'},
        ]
    },
    {
        name: 'ExpandMore',
        class: 'icon-expand-more',
        aliases: ['expand-more', 'expand_more', 'chevron-down', 'chevron_down', 'keyboard-arrow-down', 'keyboard_arrow_down'],
        paths: [
            {d: 'M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'},
        ]
    },
    {
        name: 'FirstPage',
        class: 'icon-first-page',
        aliases: ['first-page', 'first_page'],
        paths: [
            {d: 'M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z', fill: 'currentColor'},
            {d: 'M24 24H0V0h24v24z', fill: 'none'},
        ]
    },
    {
        name: 'Folder',
        class: 'icon-folder',
        aliases: ['folder', 'folder-close', 'folder_close'],
        paths: [
            {d: 'M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'},
        ]
    },
    {
        name: 'FolderOpen',
        class: 'icon-folder-open',
        aliases: ['folder-open', 'folder_open'],
        paths: [
            {d: 'M0 0h24v24H0z', fill: 'none'},
            {d: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z', fill: 'currentColor'},
        ]
    },
    {
        name: 'FolderShared',
        class: 'icon-folder-shared',
        aliases: ['folder-shared', 'folder_shared'],
        paths: [
            {d: 'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5 3c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4 8h-8v-1c0-1.33 2.67-2 4-2s4 .67 4 2v1z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'},
        ]
    },
    {
        name: 'FolderSpecial',
        class: 'icon-folder-special',
        aliases: ['folder-special', 'folder_special'],
        paths: [
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
            {d: 'M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-2.06 11L15 15.28 12.06 17l.78-3.33-2.59-2.24 3.41-.29L15 8l1.34 3.14 3.41.29-2.59 2.24.78 3.33z', fill: 'currentColor'},
        ]
    },
    {
        name: 'OutlineInfo',
        class: 'icon-outline-info',
        aliases: ['outline-info', 'outline_info'],
        paths: [
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
            {d: 'M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z', fill: 'currentColor'},
        ]
    },
    {
        name: 'LastPage',
        class: 'icon-last-page',
        aliases: ['last-page', 'last_page'],
        paths: [
            {d: 'M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
        ]
    },
    {
        name: 'MenuBars',
        class: 'icon-menu-bars',
        aliases: ['menu-bars', 'menu_bars', 'menu'],
        paths: [
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
            {d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z', fill: 'currentColor'},
        ]
    },
    {
        name: 'MoreHoriz',
        class: 'icon-more-horiz',
        aliases: ['more-horiz', 'more_horiz'],
        paths: [
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
            {d: 'M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z', fill: 'currentColor'},
        ]
    },
    {
        name: 'MoreVert',
        class: 'icon-more-vert',
        aliases: ['more-vert', 'more_vert'],
        paths: [
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
            {d: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z', fill: 'currentColor'},
        ]
    },
    {
        name: 'Reorder',
        class: 'icon-reorder',
        aliases: ['reorder', 'lists'],
        paths: [
            {d: 'M0 0h24v24H0z', fill: 'none'},
            {d: 'M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z', fill: 'currentColor'}
        ]
    },
    {
        name: 'RotateLeft',
        class: 'icon-rotate-left',
        aliases: ['rotate-left', 'rotate_left'],
        paths: [
            {d: 'M0 0h24v24H0z', fill: 'none'},
            {d: 'M7.11 8.53L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z', fill: 'currentColor'}
        ]
    },
    {
        name: 'RotateRight',
        class: 'icon-rotate-right',
        aliases: ['rotate-right', 'rotate_right'],
        paths: [
            {d: 'M0 0h24v24H0z', fill: 'none'},
            {d: 'M15.55 5.55L11 1v3.07C7.06 4.56 4 7.92 4 12s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91V10l4.55-4.45zM19.93 11c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zM13 17.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z', fill: 'currentColor'}
        ]
    },
    {
        name: 'ViewModule',
        class: 'icon-view-module',
        aliases: ['view-module', 'view_module', 'modules'],
        paths: [
            {d: 'M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0z', fill: 'none'}
        ]
    },
    {
        name: 'ZoomIn',
        class: 'icon-zoom-in',
        aliases: ['zoom-in', 'zoom_in'],
        paths: [
            {d: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z', fill: 'currentColor'},
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
            {d: 'M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z', fill: 'currentColor'}
        ]
    },
    {
        name: 'ZoomOut',
        class: 'icon-zoom-out',
        aliases: ['zoom-out', 'zoom_out'],
        paths: [
            {d: 'M0 0h24v24H0V0z', fill: 'none'},
            {d: 'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z', fill: 'currentColor'}
        ]
    },
];

export default library;
