import {
  useRenderImageUploader,
  useSetupImageUploader,
} from '@/components/Uploader/mixins/uploaderApi.ts';
import type {
  TBsImageUploader,
  TCustomText,
  TFileBag,
  TImageUploaderOptionProps,
} from '@/components/Uploader/types';
import { useGenerateId } from '@/mixins/CommonApi.ts';
import {
  booleanProp,
  objectProp,
  stringMandatoryProp,
  stringOrNumberProp,
  stringProp,
} from '@/mixins/CommonProps.ts';
import { computed, defineComponent, type Prop, reactive, ref } from 'vue';

export default defineComponent<TBsImageUploader>({
  name: 'BsImageUploader',
  props: {
    alertOnError: booleanProp,
    clickedChange: booleanProp,
    acceptTypes: stringMandatoryProp,
    buttonColor: stringProp,
    iconSize: stringOrNumberProp,
    name: stringProp,
    id: {
      type: String,
      default: useGenerateId(),
    },
    limit: {
      type: [String, Number],
      default: undefined,
      required: true,
      validator: (value: string): boolean => !isNaN(parseFloat(value)),
    },
    customText: objectProp as Prop<TCustomText>,
  },
  emits: ['change', 'clear', 'error'],
  setup(props, { emit, expose }) {
    const thisProps = props as Readonly<TImageUploaderOptionProps>;
    const input = ref<HTMLInputElement>();
    const container = ref<HTMLElement>();
    const canvas = ref<HTMLCanvasElement>();
    const draggingOver = ref<boolean>(false);
    const fileBag = reactive<TFileBag>({});

    const mimeTypes = computed(() =>
      thisProps.acceptTypes.split(',').map((it) => {
        const str = it.trim();
        if (str.startsWith('*.')) {
          return 'image/' + str.substring(2);
        } else if (str.startsWith('.')) {
          return 'image/' + str.substring(1);
        } else if (str.startsWith('image/')) {
          return str;
        }

        return `image/${str}`;
      })
    );

    useSetupImageUploader(thisProps, expose, container, canvas, fileBag);

    return () =>
      useRenderImageUploader(
        emit,
        thisProps,
        container,
        canvas,
        input,
        mimeTypes,
        fileBag,
        draggingOver
      );
  },
});
