import Vue from "vue";
import BsTooltipContent from "../components/BsTooltip/BsTooltipContent";
import Util from "../utils/Helper";
import { EventListener } from "../utils/DomHelper";

let tooltips   = [];
const CmpClass = Vue.extend(BsTooltipContent);

function createTooltip(el, binding) {
    const defValue = {
        content: '',
        open: false,
        placement: 'bottom',
        timer: undefined,
        trigger: el
    };

    let data = Util.isObject(binding.value) ? {
        ...defValue,
        ...binding.value
    } : {
        ...defValue,
        content: binding.value
    };

    const msg = data.content || '';
    delete data['content'];
    const instance = new CmpClass({propsData: data});

    instance.$slots.default = [msg];

    const showTooltip = function () {
        if (instance.timer) {
            clearTimeout(instance.timer);
        }
        instance.timer = setTimeout(() => {
            instance.$props.open = true;
        }, 300);
    };
    const hideTooltip = function () {
        if (instance.timer) {
            clearTimeout(instance.timer);
        }
        instance.$props.open = false;
    };
    el['_mouseEvent'] = {
        'mouseEnter': EventListener.listen(el, 'mouseenter', showTooltip),
        'mouseLeave': EventListener.listen(el, 'mouseleave', hideTooltip)
    };

    const length     = tooltips.push(instance);
    el['varsOffset'] = length - 1;
    instance.$mount();
}

function destroyTooltip(el) {
    if (tooltips.length > 0) {
        const index = el['varsOffset'] || 0;
        let obj     = tooltips[index];

        if (Util.isObject(obj)) {
            obj.$destroy();
            tooltips[index] = null;
        }

        const {mouseEnter, mouseLeave} = el._mouseEvent;
        mouseEnter.remove();
        mouseLeave.remove();
        el._mouseEvent = null;
    }
}

export default {
    name: 'tooltip',
    bind: createTooltip,
    unbind: destroyTooltip
};
