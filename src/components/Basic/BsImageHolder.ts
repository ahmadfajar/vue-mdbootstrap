import type { ComponentOptionsMixin, ComputedOptions, EmitsOptions, MethodOptions } from 'vue';
import { defineComponent, h, toDisplayString } from 'vue';
import { cssPrefix } from '../../mixins/CommonApi';
import type { TBsImageHolder, TImageHolderOptionProps, TRecord } from '../../types';
import Helper from '../../utils/Helper';
import { useShapeClasses } from '../Avatar/mixins/avatarApi';
import { useSizeHeight, useSizeWidth } from '../Icon/mixins/iconApi';
import { useCreateSvgNode } from '../Icon/mixins/svgApi';
import { imageHolderProps } from './mixins/imageHolderProps';

export default defineComponent<TBsImageHolder, TRecord, TRecord, ComputedOptions, MethodOptions, ComponentOptionsMixin, ComponentOptionsMixin, EmitsOptions>({
    name: 'BsImageHolder',
    props: imageHolderProps,
    setup(props) {
        const thisProps = props as Readonly<TImageHolderOptionProps>;
        const showText = () => {
            return !Helper.isEmpty(props.placeholderText) || !Helper.isEmpty(props.placeHolder);
        };
        const szHeight = useSizeHeight(thisProps);
        const szWidth = useSizeWidth(thisProps);

        return () =>
            useCreateSvgNode({
                [`${cssPrefix}img-holder`]: true,
                [`${cssPrefix}anchor-center`]: thisProps.xPos === '50%',
                ...useShapeClasses(thisProps.circle, thisProps.rounded),
            }, [], false, 'xMidYMid slice', null, {
                height: !szHeight || (<number>szHeight < 2) ? '100%' : Helper.cssUnit(szHeight),
                width: !szWidth || (<number>szWidth < 2) ? '100%' : Helper.cssUnit(szWidth),
                role: 'img',
            }, [
                showText()
                    ? h('title', toDisplayString(thisProps.placeholderText || thisProps.placeHolder))
                    : undefined,
                h('rect', {width: '100%', height: '100%', fill: thisProps.bgColor}),
                showText()
                    ? h('text', {
                            fill: thisProps.textColor,
                            x: Helper.cssUnit(thisProps.xPos),
                            y: Helper.cssUnit(thisProps.yPos),
                        },
                        toDisplayString(thisProps.placeholderText || thisProps.placeHolder)
                    )
                    : undefined,
            ]);
    }
});
