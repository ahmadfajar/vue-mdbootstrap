import { computed, defineComponent, h, toDisplayString } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import Helper from '../../utils/Helper';
import { useShapeClasses } from '../Avatar/mixins/avatarApi';
import { useSizeHeight, useSizeWidth } from '../Icon/mixins/iconApi';
import { useCreateSvgNode } from '../Icon/mixins/svgApi';
import { imageHolderProps } from './mixins/imageHolderProps';
import type { TBsImageHolder, TImageHolderOptionProps } from './types';

export default defineComponent<TBsImageHolder>({
    name: 'BsImageHolder',
    props: imageHolderProps,
    setup(props) {
        const thisProps = props as Readonly<TImageHolderOptionProps>;
        const showText = computed(() => {
            return !Helper.isEmpty(props.placeholderText) || !Helper.isEmpty(props.placeHolder);
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
                    height: !szHeight || <number>szHeight < 2 ? '100%' : Helper.cssUnit(szHeight),
                    width: !szWidth || <number>szWidth < 2 ? '100%' : Helper.cssUnit(szWidth),
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
