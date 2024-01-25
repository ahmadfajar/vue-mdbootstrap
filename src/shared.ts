import PopupManager from './components/Popover/mixins/PopupManager';

export {
    useMobileDevice, useBreakpointMax, useBreakpointMin, useAxiosPlugin,
    useHttpService, useVueMdbService, useVueMdbNotification, useCurrentRoute,
    useMergeClass, useRenderSlot, useRenderSlotDefault, useRenderSlotWithWrapper,
    useRenderSlotWrapperWithCondition, useRenderTransition, useGenerateId
} from './mixins/CommonApi';

export { PopupManager };
export * as StringHelper from './mixins/StringHelper';
export * as Color from './mixins/colorUtils';
export { EventListener } from './mixins/DomHelper';
export { useAddResizeListener, useRemoveResizeListener } from './mixins/ResizeListener';
export { useCreateSvgComponent, spinnerSvgData } from './components/Icon/mixins/svgApi';
