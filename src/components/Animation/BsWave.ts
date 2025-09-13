import { cssPrefix } from '@/mixins/CommonApi.ts';
import {
  createBlock,
  createElementVNode,
  defineComponent,
  openBlock,
  Transition,
  withCtx,
} from 'vue';

const _hoisted_1 = createElementVNode(
  'span',
  { class: `${cssPrefix}ripple-wave` },
  null,
  -1 /* HOISTED */
);

export default defineComponent({
  __name: 'BsWave',
  render() {
    return (
      openBlock(),
      createBlock(
        Transition,
        {
          name: `${cssPrefix}ripple`,
          appear: true,
        },
        {
          default: withCtx(() => [_hoisted_1]),
          _: 1 /* STABLE */,
        }
      )
    );
  },
});
