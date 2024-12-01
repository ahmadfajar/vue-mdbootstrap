import { BsButton } from '@/components/Button';
import { BsIcon } from '@/components/Icon';
import type { TCustomText, TFileBag, TImageUploaderOptionProps } from '@/components/Uploader/types';
import { cssPrefix, useHttpService } from '@/mixins/CommonApi.ts';
import { preventEventTarget } from '@/mixins/DomHelper.ts';
import type { IHttpService, TButtonMode, TButtonSize, TRecord } from '@/types';
import Helper from '@/utils/Helper.ts';
import type { AxiosPromise } from 'axios';
import {
    computed,
    type ComputedRef,
    type EmitFn,
    h,
    onMounted,
    onUnmounted,
    type Prop,
    type Reactive,
    type Ref,
    toDisplayString,
    unref,
    type VNode,
} from 'vue';

function isUploadSupported(): boolean {
    if (
        navigator.userAgent.match(
            /(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/
        )
    ) {
        return false;
    }

    const el = document.createElement('input');
    el.type = 'file';

    return !el.disabled;
}

function isPreviewSupported(): boolean {
    return window.FileReader && !!window.CanvasRenderingContext2D;
}

function isDragAndDropSupported(): boolean {
    const div = document.createElement('div');
    return (
        ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
        // @ts-ignore
        !('ontouchstart' in window || navigator.msMaxTouchPoints)
    );
}

function isFileSizeValid(
    limit: string,
    source: File,
    emit: EmitFn,
    alertOnError?: boolean
): boolean {
    if (source.size <= 0 || source.size > parseFloat(limit) * 1024 * 1024) {
        const size = Helper.roundNumber(source.size / (1024 * 1024), 2);
        const msg = `File size "${size} MB" is too large and exceeds the limit of "${limit} MB".`;

        emit('error', {
            size: source.size,
            type: source.type,
            name: source.name,
            message: msg,
        });
        if (alertOnError) {
            alert(msg);
        }

        return false;
    }

    return true;
}

function isFileTypeValid(types: string[], source: File, emit: EmitFn, alertOnError?: boolean) {
    const mimeType = source.type;

    if (!types.includes(mimeType)) {
        const msg = `File type of "${mimeType}" is not valid. The permitted types are: ${types.join(', ')}.`;

        emit('error', {
            size: source.size,
            type: source.type,
            name: source.name,
            message: msg,
        });
        if (alertOnError) {
            alert(msg);
        }

        return false;
    }

    return true;
}

function drawImage(
    source: HTMLImageElement,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    containerRef: Ref<HTMLElement | undefined>
): void {
    const canvas = unref(canvasRef);
    const container = unref(containerRef);

    if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        const context = canvas.getContext('2d');

        if (context) {
            clearCanvas(canvasRef);
            // get the scale ratio
            const ratioW = canvas.width / source.width;
            const ratioH = canvas.height / source.height;
            const ratio = Math.min(ratioW, ratioH);

            // get the top left position of the image
            const x = (canvas.width - source.width * ratio) / 2;
            const y = (canvas.height - source.height * ratio) / 2;

            context.drawImage(
                source,
                0,
                0,
                source.width,
                source.height,
                x,
                y,
                source.width * ratio,
                source.height * ratio
            );
        }
    }
}

function clearCanvas(canvasRef: Ref<HTMLCanvasElement | undefined>): void {
    const canvas = unref(canvasRef);

    if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
}

function loadImage(
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    fileBag: Reactive<TFileBag>
): void {
    const reader = new FileReader();
    reader.onload = (_e) => {
        const image = new Image();
        image.onload = (_e) => {
            drawImage(image, canvasRef, containerRef);
        };

        image.src = reader.result as string;
        fileBag.image = image;
    };

    reader.readAsDataURL(fileBag.file!);
}

function doImageFileChanged(
    emit: EmitFn,
    source: File,
    fileBag: Reactive<TFileBag>,
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>
): void {
    fileBag.file = source;
    fileBag.name = source.name;
    fileBag.size = source.size;
    fileBag.type = source.type;
    fileBag.lastModified = source.lastModified;

    if (isPreviewSupported() && canvasRef.value) {
        loadImage(containerRef, canvasRef, fileBag);
    }

    emit('change', source);
}

function onImageFileChanged(
    event: InputEvent | DragEvent,
    emit: EmitFn,
    props: Readonly<TImageUploaderOptionProps>,
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    mimeTypes: ComputedRef<string[]>,
    fileBag: Reactive<TFileBag>
) {
    preventEventTarget(event);
    const files: FileList | undefined =
        (event.target as HTMLInputElement)?.files || event.dataTransfer?.files;

    if (files && files.length) {
        if (!isFileSizeValid(props.limit as string, files[0], emit, props.alertOnError)) {
            return;
        }
        if (!isFileTypeValid(mimeTypes.value, files[0], emit, props.alertOnError)) {
            return;
        }
        if (
            fileBag.name === files[0].name &&
            fileBag.size === files[0].size &&
            fileBag.lastModified === files[0].lastModified
        ) {
            return;
        }

        doImageFileChanged(emit, files[0], fileBag, containerRef, canvasRef);
    }
}

function onElementClicked(
    props: Readonly<TImageUploaderOptionProps>,
    inputRef: Ref<HTMLInputElement | undefined>,
    fileBag: Reactive<TFileBag>
): void {
    if (!props.clickedChange) {
        !fileBag.file && inputRef.value && inputRef.value.click();
    } else {
        inputRef.value && inputRef.value.click();
    }
}

function onDragEnter(draggingOver: Ref<boolean>): void {
    if (!isDragAndDropSupported()) {
        return;
    }

    draggingOver.value = true;
}

function onDragLeave(draggingOver: Ref<boolean>): void {
    if (!isDragAndDropSupported()) {
        return;
    }

    draggingOver.value = false;
}

function onFileDrop(
    event: DragEvent,
    emit: EmitFn,
    props: Readonly<TImageUploaderOptionProps>,
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    mimeTypes: ComputedRef<string[]>,
    fileBag: Reactive<TFileBag>,
    draggingOver: Ref<boolean>
): void {
    onDragLeave(draggingOver);
    onImageFileChanged(event, emit, props, containerRef, canvasRef, mimeTypes, fileBag);
}

function onChangeImage(event: Event, inputRef: Ref<HTMLInputElement | undefined>): void {
    preventEventTarget(event);
    inputRef.value && inputRef.value.click();
}

function onRemoveImage(
    emit: EmitFn,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    inputRef: Ref<HTMLInputElement | undefined>,
    fileBag: Reactive<TFileBag>
): void {
    clearCanvas(canvasRef);
    fileBag.file = null;
    fileBag.image = null;
    fileBag.name = null;
    fileBag.size = null;
    fileBag.lastModified = null;

    if (inputRef.value) {
        inputRef.value.value = '';
        inputRef.value.type = '';
        inputRef.value.type = 'file';
    }

    emit('clear');
}

function createSelectOrDropText(props: Readonly<TImageUploaderOptionProps>): VNode {
    return h(
        'h4',
        {
            class: [`${cssPrefix}link`, 'text-center'],
        },
        [
            h(BsIcon, {
                icon: 'cloud_upload_outlined' as Prop<string>,
                size: (props.iconSize || 84) as Prop<number>,
            }),
            h(
                'span',
                { class: 'd-block' },
                toDisplayString(
                    isDragAndDropSupported()
                        ? props.customText?.dropImage || 'Drop image here'
                        : props.customText?.selectImage || 'Select image'
                )
            ),
        ]
    );
}

function createUploaderButtons(
    emit: EmitFn,
    props: Readonly<TImageUploaderOptionProps>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    inputRef: Ref<HTMLInputElement | undefined>,
    fileBag: Reactive<TFileBag>
): VNode {
    return h(
        'div',
        {
            class: {
                'upload-toolbar': true,
                'justify-content-between': !props.clickedChange,
                'justify-content-end': props.clickedChange,
            },
        },
        [
            !props.clickedChange &&
                h(
                    BsButton,
                    {
                        color: (props.buttonColor || 'primary') as Prop<string>,
                        size: 'sm' as Prop<TButtonSize>,
                        style: { zIndex: 4 },
                        title: 'Change image',
                        onClick: (evt: Event) => {
                            onChangeImage(evt, inputRef);
                        },
                    },
                    toDisplayString(props.customText?.changeImage || 'Change')
                ),
            h(BsButton, {
                color: (props.buttonColor || 'primary') as Prop<string>,
                icon: 'delete_outlined' as Prop<string>,
                mode: 'icon' as Prop<TButtonMode>,
                size: 'sm' as Prop<TButtonSize>,
                style: { zIndex: 4 },
                title: 'Remove image',
                // @ts-ignore
                tonal: true as Prop<boolean>,
                onClick: () => {
                    onRemoveImage(emit, canvasRef, inputRef, fileBag);
                },
            }),
        ]
    );
}

function createPreviewContainer(
    emit: EmitFn,
    props: Readonly<TImageUploaderOptionProps>,
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    inputRef: Ref<HTMLInputElement | undefined>,
    mimeTypes: ComputedRef<string[]>,
    fileBag: Reactive<TFileBag>,
    draggingOver: Ref<boolean>
): VNode {
    return h(
        'div',
        {
            ref: containerRef,
            class: 'drop-image-container',
        },
        [
            h('canvas', {
                ref: canvasRef,
                class: { 'image-preview': true, 'dragging-over': draggingOver.value },
                tabindex: 0,
                onDrag: preventEventTarget,
                onDragover: preventEventTarget,
                onDragstart: preventEventTarget,
                onDragend: preventEventTarget,
                onDragenter: (e) => {
                    preventEventTarget(e);
                    onDragEnter(draggingOver);
                },
                onDragleave: (e) => {
                    preventEventTarget(e);
                    onDragLeave(draggingOver);
                },
                onDrop: (e) => {
                    onFileDrop(
                        e,
                        emit,
                        props,
                        containerRef,
                        canvasRef,
                        mimeTypes,
                        fileBag,
                        draggingOver
                    );
                },
                onClick: (_) => {
                    onElementClicked(props, inputRef, fileBag);
                },
                onKeyup: (_) => {
                    onElementClicked(props, inputRef, fileBag);
                },
            }),
            !fileBag.file && createSelectOrDropText(props),
            fileBag.file && createUploaderButtons(emit, props, canvasRef, inputRef, fileBag),
        ]
    );
}

function createInputFile(
    emit: EmitFn,
    props: Readonly<TImageUploaderOptionProps>,
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    inputRef: Ref<HTMLInputElement | undefined>,
    mimeTypes: ComputedRef<string[]>,
    fileBag: Reactive<TFileBag>
): VNode {
    return h('div', { class: 'd-none' }, [
        h('input', {
            ref: inputRef,
            id: props.id,
            name: props.name,
            type: 'file',
            accept: mimeTypes.value.join(','),
            capture: 'environment',
            onChange: (e) => {
                onImageFileChanged(
                    e as InputEvent,
                    emit,
                    props,
                    containerRef,
                    canvasRef,
                    mimeTypes,
                    fileBag
                );
            },
        }),
    ]);
}

function renderImageUploader(
    emit: EmitFn,
    props: Readonly<TImageUploaderOptionProps>,
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    inputRef: Ref<HTMLInputElement | undefined>,
    mimeTypes: ComputedRef<string[]>,
    fileBag: Reactive<TFileBag>,
    draggingOver: Ref<boolean>
): VNode[] {
    if (isPreviewSupported()) {
        return [
            createPreviewContainer(
                emit,
                props,
                containerRef,
                canvasRef,
                inputRef,
                mimeTypes,
                fileBag,
                draggingOver
            ),
            createInputFile(emit, props, containerRef, canvasRef, inputRef, mimeTypes, fileBag),
        ];
    } else {
        return [
            createInputFile(emit, props, containerRef, canvasRef, inputRef, mimeTypes, fileBag),
        ];
    }
}

export function useRenderImageUploader(
    emit: EmitFn,
    props: Readonly<TImageUploaderOptionProps>,
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    inputRef: Ref<HTMLInputElement | undefined>,
    mimeTypes: ComputedRef<string[]>,
    fileBag: Reactive<TFileBag>,
    draggingOver: Ref<boolean>
): VNode {
    return h(
        'div',
        { class: `${cssPrefix}image-uploader` },
        isUploadSupported()
            ? renderImageUploader(
                  emit,
                  props,
                  containerRef,
                  canvasRef,
                  inputRef,
                  mimeTypes,
                  fileBag,
                  draggingOver
              )
            : renderUnsupportedText(props.customText)
    );
}

function renderUnsupportedText(config?: TCustomText): VNode {
    if (config?.unsupportedMessage) {
        return h('div', { class: 'unsupported-text', innerHTML: config.unsupportedMessage });
    }

    return h(
        'div',
        { class: 'unsupported-text' },
        h('h4', 'Your device does not support file uploading.')
    );
}

export function useSetupImageUploader(
    props: Readonly<TImageUploaderOptionProps>,
    expose: <Exposed extends Record<string, any> = Record<string, any>>(exposed?: Exposed) => void,
    containerRef: Ref<HTMLElement | undefined>,
    canvasRef: Ref<HTMLCanvasElement | undefined>,
    fileBag: Reactive<TFileBag>
): void {
    let httpSvc: IHttpService;

    function upload(url: string, property?: string, data?: TRecord): AxiosPromise {
        if (Helper.isEmpty(url)) {
            throw Error('Upload destination "url" must not be empty.');
        }
        if (Helper.isEmpty(props.name) && Helper.isEmpty(property)) {
            throw Error('The "name" attribute for the input field must not be empty.');
        }

        if (fileBag.file) {
            const form = new FormData();
            form.append((props.name || property) as string, fileBag.file);

            if (data && Object.keys(data).length) {
                for (const key in data) {
                    form.append(key, (data[key] ?? '') as string);
                }
            }

            return httpSvc.post(url, form);
        } else {
            throw Error('There is no file to upload.');
        }
    }

    expose({
        upload,
        fileBag: computed(() => ({
            file: fileBag.file,
            filename: fileBag.name,
            filesize: fileBag.size,
            filetype: fileBag.type,
        })),
    });

    function onResize() {
        if (containerRef.value && canvasRef.value) {
            canvasRef.value.height = containerRef.value.clientHeight;
            canvasRef.value.width = containerRef.value.clientWidth;
            fileBag.image && drawImage(fileBag.image as HTMLImageElement, canvasRef, containerRef);
        }
    }

    onMounted(() => {
        httpSvc = useHttpService() as IHttpService;

        if (window && canvasRef.value) {
            const dpRatio = window.devicePixelRatio;
            canvasRef.value.getContext('2d')?.scale(dpRatio, dpRatio);

            window.addEventListener('resize', onResize);
            window.requestAnimationFrame(onResize);
        }
    });
    onUnmounted(() => {
        window && window.removeEventListener('resize', onResize);
    });
}
