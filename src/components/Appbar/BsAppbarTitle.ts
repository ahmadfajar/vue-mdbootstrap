/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { TAppbarTitleOptionProps, TBsAppbarTitle } from '@/components/Appbar/types';
import { cssPrefix, useRenderSlot } from '@/mixins/CommonApi.ts';
import { stringProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import Helper from '@/utils/Helper.ts';
import type {
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
} from 'vue';
import { createTextVNode, defineComponent, h, toDisplayString } from 'vue';

export default defineComponent<TBsAppbarTitle>({
  name: 'BsAppbarTitle',
  props: {
    title: stringProp,
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TAppbarTitleOptionProps>;

    return () =>
      h(
        'div',
        {
          class: `${cssPrefix}appbar-title`,
        },
        useRenderSlot(slots, 'default', { key: Helper.uuid() }, [
          createTextVNode(toDisplayString(thisProps.title)),
        ])
      );
  },
}) as DefineComponent<
  TBsAppbarTitle,
  {},
  {},
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {},
  string,
  PublicProps,
  Readonly<TAppbarTitleOptionProps> & Readonly<{}>,
  ExtractDefaultPropTypes<TBsAppbarTitle>,
  SlotsType<VoidDefaultSlots>,
  {},
  {},
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
