import type {ComponentInternalInstance, ComponentOptionsMixin, ComputedOptions, EmitsOptions} from "vue";
import {computed, defineComponent, getCurrentInstance, onMounted, onUnmounted, ref, shallowRef, watch} from "vue";
import {lightboxProps} from "./mixins/lightboxProps";
import {
    useComputeImgStyle,
    useNavigateNextSlide,
    useNavigatePrevSlide,
    useRenderLightbox,
    useSetActiveLightboxItem
} from "./mixins/lightboxApi";
import type {IEventResult, IHTMLElement, TBsLightbox, TImageDataset, TLightboxOptionProps, TRecord} from "../../types";
import {EventListener} from "../../mixins/DomHelper";
import PopupManager from "../Popover/mixins/PopupManager";

export default defineComponent<TBsLightbox, TRecord, TRecord, ComputedOptions, ComponentOptionsMixin, EmitsOptions>({
    name: "BsLightbox",
    props: lightboxProps,
    emits: [
        "change",
        "close",
        "exec-delete",
        "exec-download",
        "exec-info",
        "exec-rotate-left",
        "exec-rotate-right",
        "exec-zoomin",
        "exec-zoomout",
        "update:open",
    ],
    setup(props, {emit, expose, slots}) {
        const thisProps = props as Readonly<TLightboxOptionProps>;
        const instance = shallowRef<ComponentInternalInstance | null>(null);
        const activeItem = ref<TImageDataset | undefined>(
            ((thisProps.items && thisProps.items?.length > 0) ? thisProps.items[0] : undefined)
        );
        const itemIndex = ref(
            ((thisProps.items && thisProps.items?.length > 0) ? 0 : -1)
        );
        const rotate = ref(0);
        const zoom = ref(1);
        const isOpen = ref(false);
        const imgStyles = computed(
            () => useComputeImgStyle(thisProps, rotate, zoom)
        );
        let keyEvent: IEventResult | undefined;

        const setActive = (index: number) =>
            useSetActiveLightboxItem(emit, thisProps, activeItem, itemIndex, zoom, rotate, index);
        const openAt = (index: number) => {
            if (thisProps.items && index > -1 && index < thisProps.items?.length) {
                itemIndex.value = index;
                activeItem.value = thisProps.items.length > 0 ? thisProps.items[index] : undefined;
                isOpen.value = true;
                emit("update:open", true);
            } else {
                throw Error("The given image index is out of bound.");
            }
        };
        const nextSlide = () => {
            useNavigateNextSlide(emit, thisProps, activeItem, itemIndex, zoom, rotate);
        };
        const prevSlide = () => {
            useNavigatePrevSlide(emit, thisProps, activeItem, itemIndex, zoom, rotate);
        };

        expose({setActive, openAt, nextSlide, prevSlide});

        watch(
            () => <boolean>thisProps.open,
            (value) => {
                isOpen.value = value;
                if (value) {
                    zoom.value = 1;
                    rotate.value = 0;
                    itemIndex.value = itemIndex.value > -1 ? itemIndex.value : 0;
                    activeItem.value = (thisProps.items && thisProps.items.length > 0)
                        ? thisProps.items[itemIndex.value] : undefined;
                    instance.value && PopupManager.add(instance.value, thisProps, isOpen);
                }
            }
        );
        onMounted(() => {
            instance.value = getCurrentInstance();
            keyEvent = EventListener.listen(
                <IHTMLElement>document.body,
                "keydown", (evt: Event) => {
                    const evtKey = evt as KeyboardEvent;
                    if (evtKey.key && evtKey.key === "ArrowLeft") {
                        useNavigatePrevSlide(emit, thisProps, activeItem, itemIndex, zoom, rotate);
                    } else if (evtKey.key && evtKey.key === "ArrowRight") {
                        useNavigateNextSlide(emit, thisProps, activeItem, itemIndex, zoom, rotate);
                    }
                });
        });
        onUnmounted(() => keyEvent && keyEvent.remove());

        return () =>
            useRenderLightbox(
                slots, emit, instance, thisProps, imgStyles, isOpen,
                activeItem, itemIndex, rotate, zoom,
            );
    }
});
