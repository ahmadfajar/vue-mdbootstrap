import {
  afterEnter,
  afterLeave,
  beforeEnter,
  beforeLeave,
  onEnter,
  onLeave,
} from '@/components/Animation/mixins/expandTransitionApi.ts';
import { defineComponent, h, Transition } from 'vue';

export default defineComponent({
  name: 'BsExpandTransition',
  setup(_, { slots }) {
    return () =>
      h(
        Transition,
        {
          name: 'expand',
          onBeforeEnter: beforeEnter,
          onEnter: onEnter,
          onAfterEnter: afterEnter,
          onBeforeLeave: beforeLeave,
          onLeave: onLeave,
          onAfterLeave: afterLeave,
        },
        {
          default: () => slots.default && slots.default(),
        }
      );
  },
});
