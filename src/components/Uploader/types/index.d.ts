import { BaseComponentProps, Numberish, TRecord } from '@/types';
import { AxiosPromise } from 'axios';
import { ComponentObjectPropsOptions, ComponentPublicInstance, ObjectPlugin } from 'vue';

export declare type TFileBag = {
  file?: File | null;
  image?: HTMLImageElement | null;
  name?: string | null;
  type?: string | null;
  size?: number | null;
  lastModified?: number | null;
};

export declare type TCustomText = {
  dropImage?: string;
  selectImage?: string;
  changeImage?: string;
  unsupportedMessage?: string;
};

export declare type TImageUploaderOptionProps = {
  /**
   * Accepted image file types, examples: image/jpg, image/png, *.jpg, *.png
   */
  acceptTypes: string;

  /**
   * Limit the size of uploaded file, in Megabytes (MB).
   */
  limit: Numberish;

  /**
   * The html input `id` attribute, if `undefined` then it will be auto-generated.
   */
  id?: string;

  /**
   * The html input `name` attribute.
   */
  name?: string;

  /**
   * Sets the color of Button element. Default is `primary`.
   */
  buttonColor?: string;

  /**
   * Sets the size of icon on the preview container in pixel. Default is `84` pixel.
   */
  iconSize?: Numberish;

  /**
   * Custom text for component elements.
   */
  customText?: TCustomText;

  /**
   * Display alert on error or not.
   */
  alertOnError?: boolean;

  /**
   * Whether to change image on `clicked` event or not. If `false` or `undefined`
   * then a button will appear to help in changing the image.
   */
  clickedChange?: boolean;
};

export declare type TBsImageUploader = ComponentObjectPropsOptions<TImageUploaderOptionProps>;

export declare type TUploadError = {
  size: number;
  type: string;
  name: string;
  message: string;
};

declare interface ImageUploaderEvents {
  /**
   * Fired when the image on this component is changed.
   */
  onChange?: (value: File) => void;

  /**
   * Fired when the image on this component is cleared or removed.
   */
  onClear?: () => void;

  /**
   * Fired when error is occurred.
   */
  onError?: (error: TUploadError) => void;

  /**
   * Fired when the image on this component is changed.
   */
  '@change'?: (value: File) => void;

  /**
   * Fired when the image on this component is cleared or removed.
   */
  '@clear'?: () => void;

  /**
   * Fired when error is occurred.
   */
  '@error'?: (error: TUploadError) => void;
}

export declare const BsImageUploader: {
  new (): {
    $props: ImageUploaderEvents & BaseComponentProps & TImageUploaderOptionProps;
    $emits: {
      (event: 'clear'): void;
      (event: 'change', value: File): void;
      (event: 'error', error: TUploadError): void;
    };
  };
};

export declare interface BsImageUploaderInstance extends ComponentPublicInstance {
  /**
   * Process upload the image that has already store within the component instance.
   *
   * @param url       Upload destination URL
   * @param property  The html input `name` attribute, default is from `props.name`.
   * @param data      Additional data to include when uploading the image
   *
   * @throws Error when failed processing the uploaded file.
   */
  upload(url: string, property?: string, data?: TRecord): AxiosPromise;

  fileBag: {
    /**
     * The picture's file that exists within the component instance and ready to upload.
     */
    file?: File | null;

    /**
     * The name of the file. The path is stripped off, for security reason.
     *
     * @see [File](https://developer.mozilla.org/en-US/docs/Web/API/File) for more details.
     */
    filename?: string | null;

    /**
     * The size of the file, in bytes.
     *
     * @see [File](https://developer.mozilla.org/en-US/docs/Web/API/File) for more details.
     */
    filesize?: number | null;

    /**
     * The MIME type of the file.
     *
     * @see [File](https://developer.mozilla.org/en-US/docs/Web/API/File) for more details.
     */
    filetype?: string | null;
  };
}

export declare const BsUploaderPlugin: ObjectPlugin;
