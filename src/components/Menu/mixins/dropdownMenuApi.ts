import type { TDropdownMenuOptionProps } from '@/components/Menu/types';
import { BsPopover } from '@/components/Popover';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import { h, type EmitFn, type Ref, type Slots, type VNode } from 'vue';

declare type DropdownMenuEventEmitter = {
  close: () => void;
  'update:open': (state: boolean) => void;
};

async function hideDropdownMenu(
  emit: EmitFn<DropdownMenuEventEmitter>,
  isActive: Ref<boolean>,
  timer: Ref<number | undefined>
): Promise<void> {
  if (timer.value) {
    window.clearTimeout(timer.value);
  }

  await new Promise<void>((resolve) => {
    timer.value = window.setTimeout(() => {
      isActive.value = false;
      emit('update:open', false);
      resolve();
    }, 100);
  }).then(() => {
    emit('close');
  });
}

function showDropdownMenu(
  props: Readonly<TDropdownMenuOptionProps>,
  emit: EmitFn<DropdownMenuEventEmitter>,
  isActive: Ref<boolean>,
  timer: Ref<number | undefined>
): void {
  if (!props.disabled) {
    if (timer.value) {
      window.clearTimeout(timer.value);
    }

    isActive.value = true;
    emit('update:open', true);
  }
}

export function useRenderDropdownMenu(
  slots: Slots,
  emit: EmitFn,
  props: Readonly<TDropdownMenuOptionProps>,
  activator: Ref<Element | null>,
  isActive: Ref<boolean>,
  timer: Ref<number | undefined>
): VNode {
  const thisOnMouseEnter = () => {
    if (props.openOnHover) {
      showDropdownMenu(props, emit, isActive, timer);
    }
  };

  const thisOnMouseLeave = async () => {
    if (props.openOnHover) {
      await hideDropdownMenu(emit, isActive, timer);
    }
  };

  return h(
    'div',
    {
      class: [`${cssPrefix}dropdown-menu`, 'inline-flex', 'items-center', 'relative'],
    },
    [
      h(
        'div',
        {
          ref: activator,
          class: [`${cssPrefix}dropdown-menu-activator`, 'relative'],
          onClick: async () => {
            if (!props.openOnHover) {
              isActive.value
                ? await hideDropdownMenu(emit, isActive, timer)
                : showDropdownMenu(props, emit, isActive, timer);
            }
          },
          onMouseenter: thisOnMouseEnter,
          onMouseleave: thisOnMouseLeave,
        },
        slots.default && slots.default()
      ),
      h(
        BsPopover,
        {
          class: [`${cssPrefix}popover-dropdown-menu`, `${cssPrefix}shadow-1`],
          color: props.color,
          cover: props.cover,
          open: isActive.value,
          placement: props.placement,
          space: props.space,
          transition: props.transition,
          trigger: activator.value,
          onClick: async () => {
            if (props.contentClickClose) {
              await hideDropdownMenu(emit, isActive, timer);
            }
          },
          onMouseenter: thisOnMouseEnter,
          onMouseleave: thisOnMouseLeave,
          'onUpdate:open': (value: boolean) => {
            isActive.value = value;
            emit('update:open', value);
          },
        },
        {
          default: () => slots.content && slots.content(),
        }
      ),
    ]
  );
}
