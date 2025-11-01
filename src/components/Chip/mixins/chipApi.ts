import { BsRipple } from '@/components/Animation';
import { useCreateIconProps } from '@/components/Avatar/mixins/avatarApi.ts';
import { BsButton } from '@/components/Button';
import { BsIcon } from '@/components/Icon';
import { cssPrefix, useWrapSlot, useWrapSlotDefault } from '@/mixins/CommonApi.ts';
import type {
  PromiseVoidFunction,
  TBsButton,
  TBsIcon,
  TBsRipple,
  TButtonMode,
  TButtonSize,
  TChipOptionProps,
  TChipSize,
  TRecord,
  TSizeProps,
} from '@/types';
import Helper from '@/utils/Helper.ts';
import type { ComputedRef, Prop, Slots, VNode } from 'vue';
import { createCommentVNode, h } from 'vue';

export function useChipClassNames(props: Readonly<TChipOptionProps>, attrs: TRecord): TRecord {
  const clickable =
    !!(props.href || attrs.click || attrs.onclick || attrs.onClick) &&
    !props.disabled &&
    !props.readonly;
  const enableColor = !!props.color && (!props.activeClass || props.active === false);

  return {
    [`${cssPrefix}chip`]: true,
    [`${cssPrefix}chip-sm`]: props.size === 'sm',
    [`${cssPrefix}chip-lg`]: props.size === 'lg',
    [`${cssPrefix}chip-pill`]: props.pill,
    [`${cssPrefix}chip-clickable`]: clickable,
    [`${cssPrefix}chip-${props.color}`]: enableColor && !props.outlined,
    [`${cssPrefix}chip-outline-${props.color}`]: enableColor && props.outlined,
    [props.activeClass as string]: props.activeClass && props.active === true && !props.disabled,
    'inline-flex': true,
    'items-center': true,
    'max-w-full': true,
    'overflow-hidden': true,
    relative: true,
    active: props.active === true && !props.disabled && !props.activeClass,
    disabled: props.disabled === true,
    readonly: props.readonly === true && !props.disabled,
  };
}

function getChipAvatarSize(chipSize: TChipSize | undefined, paddingOff?: boolean): TSizeProps {
  let imgSize: string;

  if (chipSize === 'sm') {
    imgSize = paddingOff ? '1.56rem' : '1.125rem';
  } else if (chipSize === 'lg') {
    imgSize = paddingOff ? '3rem' : '2.375rem';
  } else {
    imgSize = paddingOff ? '2rem' : '1.5rem';
  }

  return {
    height: imgSize,
    width: imgSize,
  };
}

function createChipAvatar(props: Readonly<TChipOptionProps>): VNode {
  return h(
    'div',
    {
      class: [
        `${cssPrefix}chip-avatar`,
        'flex',
        'items-center',
        props.imgPaddingOff ? `${cssPrefix}chip-avatar-bounded` : '',
      ],
    },
    [
      h('img', {
        src: props.imgSrc,
        alt: 'Chip Avatar',
        class: props.imgCircle || props.pill ? 'rounded-circle' : undefined,
        style: getChipAvatarSize(props.size, props.imgPaddingOff),
      }),
    ]
  );
}

function isLightColor(color: string): boolean {
  return [
    'light',
    'light-gray',
    'light-grey',
    'gray-100',
    'gray-200',
    'gray-300',
    'gray-400',
    'neutral-100',
    'neutral-200',
    'neutral-300',
    'neutral-400',
  ].some((it: string) => it === color);
}

function createCloseBtnAttr(
  props: Readonly<TChipOptionProps>,
  clickHandler: PromiseVoidFunction
): TBsButton {
  return <TBsButton>{
    flat: true as unknown as Prop<boolean>,
    mode: 'icon' as Prop<TButtonMode>,
    icon: 'close' as Prop<string>,
    iconSize: (props.size === 'sm' ? 14 : props.size === 'lg' ? 22 : 20) as Prop<number>,
    size: (props.size === 'sm' ? 'xs' : 'sm') as Prop<TButtonSize>,
    color: (props.closeButtonColor
      ? props.closeButtonColor
      : isLightColor(props.color as string)
        ? 'secondary'
        : props.color) as Prop<string>,
    onClick: clickHandler,
  };
}

export function useRenderChip(
  slots: Slots,
  props: Readonly<TChipOptionProps>,
  classNames: ComputedRef<TRecord>,
  tagName: string,
  rippleDisabled: boolean,
  dismissHandler: PromiseVoidFunction
): VNode {
  return h(
    tagName,
    {
      class: classNames.value,
      href:
        !Helper.isEmpty(props.href) && !props.disabled && !props.readonly ? props.href : undefined,
    },
    [
      h<TBsRipple>(
        BsRipple,
        {
          disabled: rippleDisabled as unknown as Prop<boolean>,
          class: [`${cssPrefix}chip-content`, 'inline-flex', 'items-center', 'max-w-full'],
        },
        {
          default: () => [
            useWrapSlot(
              slots,
              'icon',
              !Helper.isEmpty(props.icon) ? `key-${props.icon}` : Helper.uuid(true),
              {
                class: [
                  `${cssPrefix}chip-icon`,
                  'flex',
                  'items-center',
                  'w-full',
                  Helper.isEmpty(props.icon) && !slots.icon ? `${cssPrefix}empty-icon` : '',
                  props.iconPosition === 'right' ? 'order-1' : '',
                ],
                style: {
                  width: !props.size && !Helper.isEmpty(props.icon) ? '18px' : undefined,
                  height: !props.size && !Helper.isEmpty(props.icon) ? '18px' : undefined,
                },
              },
              !Helper.isEmpty(props.icon)
                ? h<TBsIcon>(BsIcon, {
                    ...useCreateIconProps(props),
                    size: (props.size === 'sm'
                      ? 18
                      : props.size === 'lg'
                        ? 40
                        : 22) as Prop<number>,
                  })
                : undefined
            ),
            props.imgSrc ? createChipAvatar(props) : createCommentVNode(' v-if-chip-avatar '),
            useWrapSlotDefault('div', slots, [`${cssPrefix}chip-text`, 'flex', 'items-center']),
            props.dismissible
              ? h<TBsButton>(BsButton, createCloseBtnAttr(props, dismissHandler))
              : createCommentVNode(' v-if-chip-dismissible '),
          ],
        }
      ),
    ]
  );
}
