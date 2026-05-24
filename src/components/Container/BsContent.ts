import { BsContainer } from '@/components/Container';
import type { TBsContainer, TBsContent, TContainerOptionProps } from '@/components/Container/types';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { booleanProp } from '@/mixins/CommonProps.ts';
import type { TRecord } from '@/types';
import type { VoidDefaultSlots } from '@/types/internals.ts';
import type {
  Component,
  ComponentOptionsMixin,
  ComponentProvideOptions,
  ComputedOptions,
  DefineComponent,
  Directive,
  EmitsOptions,
  ExtractDefaultPropTypes,
  MethodOptions,
  PublicProps,
  SlotsType,
  VNode,
} from 'vue';
import { defineComponent, h } from 'vue';

export default defineComponent<TBsContent>({
  name: 'BsContent',
  props: {
    app: booleanProp,
    tag: {
      type: String,
      default: 'main',
    },
  },
  setup(props, { slots }) {
    const thisProps = props as Readonly<TContainerOptionProps>;

    const renderContent = (): VNode =>
      h(
        thisProps.tag || 'main',
        {
          class: `${cssPrefix}content-wrap`,
        },
        slots.default && slots.default()
      );

    return () =>
      thisProps.app
        ? h(
            BsContainer,
            {
              app: thisProps.app,
              tag: thisProps.tag,
            },
            {
              default: () => renderContent(),
            }
          )
        : renderContent();
  },
}) as DefineComponent<
  TBsContent,
  TRecord,
  TRecord,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  EmitsOptions,
  string,
  PublicProps,
  Readonly<TContainerOptionProps> & Readonly<EmitsOptions>,
  ExtractDefaultPropTypes<TBsContainer>,
  SlotsType<VoidDefaultSlots>,
  Record<string, Component>,
  Record<string, Directive>,
  string,
  ComponentProvideOptions,
  false,
  TRecord,
  never
>;
