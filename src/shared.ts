import PopupManager from './components/Popover/mixins/PopupManager';

export {
    useAxiosPlugin,
    useBreakpointMax,
    useBreakpointMin,
    useCurrentRoute,
    useGenerateId,
    useHttpService,
    useMergeClass,
    useMobileDevice,
    useRenderSlot,
    useRenderSlotDefault,
    useRenderSlotWithWrapper,
    useRenderSlotWrapperWithCondition,
    useRenderTransition,
    useVueMdbNotification,
    useVueMdbService,
} from './mixins/CommonApi';

export { PopupManager };
export * as StringHelper from './mixins/StringHelper';
export * as Color from './mixins/colorUtils';
export { EventListener } from './mixins/DomHelper';
export { useAddResizeListener, useRemoveResizeListener } from './mixins/ResizeListener';
export { useRenderSVG, spinnerSvgData } from './components/Icon/mixins/svgApi';
