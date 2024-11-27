import { useShapeClasses } from '@/components/Avatar/mixins/avatarApi.ts';
import { imageHolderProps } from '@/components/Basic/mixins/imageHolderProps.ts';
import type { TBsImageHolder, TImageHolderOptionProps } from '@/components/Basic/types';
import { useSizeHeight, useSizeWidth } from '@/components/Icon/mixins/iconApi.ts';
import { useCreateSvgNode } from '@/components/Icon/mixins/svgApi.ts';
import { cssPrefix } from '@/mixins/CommonApi.ts';
import Helper from '@/utils/Helper';
import { computed, defineComponent, h, toDisplayString } from 'vue';

export default defineComponent<TBsImageHolder>({
    name: 'BsImageHolder',
    props: imageHolderProps,
    setup(props) {
        const thisProps = props as Readonly<TImageHolderOptionProps>;
        const showText = computed(() => {
            return (
                !Helper.isEmpty(thisProps.placeHolder) || !Helper.isEmpty(thisProps.placeholderText)
            );
        });
        const szHeight = useSizeHeight(thisProps);
        const szWidth = useSizeWidth(thisProps);

        return () =>
            useCreateSvgNode(
                {
                    [`${cssPrefix}img-holder`]: true,
                    [`${cssPrefix}anchor-center`]: thisProps.xPos === '50%',
                    ...useShapeClasses(thisProps.circle, thisProps.rounded),
                },
                [],
                false,
                'xMidYMid slice',
                null,
                {
                    height:
                        !szHeight || (szHeight as number) < 2 ? '100%' : Helper.cssUnit(szHeight),
                    width: !szWidth || (szWidth as number) < 2 ? '100%' : Helper.cssUnit(szWidth),
                    role: 'img',
                },
                [
                    showText.value
                        ? h(
                              'title',
                              toDisplayString(thisProps.placeHolder || thisProps.placeholderText)
                          )
                        : undefined,
                    h('rect', { width: '100%', height: '100%', fill: thisProps.bgColor }),
                    showText.value
                        ? h(
                              'text',
                              {
                                  fill: thisProps.textColor,
                                  x: Helper.cssUnit(thisProps.xPos),
                                  y: Helper.cssUnit(thisProps.yPos),
                              },
                              toDisplayString(thisProps.placeHolder || thisProps.placeholderText)
                          )
                        : undefined,
                ]
            );
    },
});
