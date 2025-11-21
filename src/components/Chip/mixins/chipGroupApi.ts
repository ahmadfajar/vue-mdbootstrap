import { BsButton } from '@/components/Button';
import { BsChip } from '@/components/Chip';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import type {
  TBsButton,
  TBsChip,
  TButtonMode,
  TChipContainer,
  TChipGroupOptionProps,
  TChipOptionItem,
  TChipValue,
  TRecord,
} from '@/types';
import type { Prop, Ref, Slots, VNode } from 'vue';
import { createCommentVNode, createTextVNode, h, renderSlot, toDisplayString } from 'vue';

export function useSetSliderSize(slider: TChipContainer): void {
  const contentEl = document.getElementById(slider.contentId);
  const wrapperEl = document.getElementById(slider.wrapperId);

  slider.wrapperWidth = wrapperEl?.clientWidth || 0;
  slider.contentWidth = contentEl?.clientWidth || 0;
}

export function useChipIsSelected(
  item: TChipOptionItem,
  modelValue?: TChipValue | TChipValue[]
): boolean {
  if (modelValue && Array.isArray(modelValue)) {
    return modelValue.find((it) => it.text === item.text) != null;
  } else if (modelValue) {
    return modelValue.text === item.text;
  }

  return false;
}

function getNewOffset(
  slider: TChipContainer,
  direction: string,
  currentScrollOffset: number
): number {
  const newOffset = currentScrollOffset + (direction === 'prev' ? -1 : 1) * slider.wrapperWidth;

  return Math.max(Math.min(newOffset, slider.contentWidth - slider.wrapperWidth), 0);
}

function scrollTo(direction: string, scrollOffset: Ref<number>, slider: TChipContainer): void {
  useSetSliderSize(slider);
  scrollOffset.value = getNewOffset(slider, direction, scrollOffset.value);
}

function createSliderArrow(
  direction: string,
  canScroll: boolean,
  props: Readonly<TChipGroupOptionProps>,
  scrollOffset: Ref<number>,
  slider: TChipContainer
): VNode {
  return h(
    'div',
    {
      class: [`${cssPrefix}chip-slide-${direction}`],
    },
    [
      h<TBsButton>(BsButton, {
        mode: 'icon' as Prop<TButtonMode>,
        flat: true as unknown as Prop<boolean>,
        color: props.sliderButtonColor as Prop<string>,
        icon: (direction === 'prev' ? 'chevron_backward' : 'chevron_forward') as Prop<string>,
        iconSize: 24 as Prop<number>,
        disabled: !canScroll as unknown as Prop<boolean>,
        onClick: () => scrollTo(direction, scrollOffset, slider),
      }),
    ]
  );
}

function createChipAttrs(props: Readonly<TChipGroupOptionProps>, item: TChipOptionItem): TBsChip {
  const selected = useChipIsSelected(item, props.modelValue);
  const attrs: TRecord = {
    ...item,
    active: selected,
    color: props.color,
    size: props.size,
    pill: props.pill,
    outlined: props.outlined,
    activeClass: props.activeClass,
    imgCircle: props.imgCircle,
    imgPaddingOff: props.imgPaddingOff,
    closeButtonColor: props.closeButtonColor,
  };

  delete attrs['value'];
  delete attrs['text'];

  if (props.checkedIcon && selected) {
    attrs['icon'] = 'done';
  }

  return attrs;
}

function createChipElement(
  slots: Slots,
  props: Readonly<TChipGroupOptionProps>,
  item: TChipOptionItem,
  index: number,
  clickHandler: (item: TChipOptionItem) => Promise<void>,
  closeHandler: (item: TChipOptionItem) => void
): VNode {
  const chipProps = createChipAttrs(props, item);

  return h<TBsChip>(
    BsChip,
    {
      key: `chip-${index}`,
      ...chipProps,
      onClick: () => clickHandler(item),
      onClose: () => closeHandler(item),
    },
    {
      icon: slots.icon ? () => renderSlot(slots, 'icon', item) : undefined,
      default: () =>
        renderSlot(slots, 'text', item, () => [createTextVNode(toDisplayString(item.text))]),
    }
  );
}

export function useRenderChipGroup(
  slots: Slots,
  props: Readonly<TChipGroupOptionProps>,
  scrollOffset: Ref<number>,
  slider: TChipContainer,
  showSliderButton: boolean | undefined,
  hasPrev: boolean,
  hasNext: boolean,
  clickHandler: (item: TChipOptionItem) => Promise<void>,
  closeHandler: (item: TChipOptionItem) => void
): VNode {
  return h(
    'div',
    {
      class: [
        `${cssPrefix}chip-group`,
        props.column ? `${cssPrefix}chip-group-column` : '',
        'flex',
        'relative',
        'max-w-full',
      ],
    },
    [
      showSliderButton
        ? createSliderArrow('prev', hasPrev, props, scrollOffset, slider)
        : createCommentVNode(' v-if-chip-group-arrow '),
      h(
        'div',
        {
          id: slider.wrapperId,
          class: [
            `${cssPrefix}chip-group-slider`,
            'flex flex-fill',
            !props.column && !showSliderButton ? 'overflow-x-auto' : '',
          ],
        },
        [
          h(
            'div',
            {
              id: slider.contentId,
              class: [`${cssPrefix}chip-group-content`, 'flex', 'relative'],
            },
            props.items.map((item, idx) => {
              return createChipElement(slots, props, item, idx, clickHandler, closeHandler);
            })
          ),
        ]
      ),
      showSliderButton
        ? createSliderArrow('next', hasNext, props, scrollOffset, slider)
        : createCommentVNode(' v-if-chip-group-arrow '),
    ]
  );
}
