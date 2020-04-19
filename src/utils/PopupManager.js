import Vue from 'vue';
import BsOverlay from '../components/BsAnimation/BsOverlay';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const OverlayCmp = Vue.extend(BsOverlay);

/**
 * Class PopupManager
 *
 * @author Ahmad Fajar
 * @since  05/07/2018, modified: 06/08/2018 08:18
 */
const PopupManager = {
    instances: [],
    overlay: undefined,

    allowScrolling() {
        const body = document.getElementsByTagName('body')[0];
        enableBodyScroll(body, {
            reserveScrollBarGap: true
        });
        clearAllBodyScrollLocks();
        this.locked = false;
    },
    changeOverlayStyle() {
        const instance = this.instances[this.instances.length - 1];
        if (!this.overlay || this.instances.length === 0) {
            return;
        }

        if (instance.overlay) {
            this.overlay.color   = instance.overlayColor;
            this.overlay.opacity = instance.overlayOpacity;
            this.overlay.zIndex  = instance.overlayZIndex;
        } else {
            this.closeOverlay();
        }
    },
    close(instance) {
        const index = this.instances.indexOf(instance);
        if (index === -1) {
            return;
        }
        this.instances.splice(index, 1);
        Vue.nextTick(() => {
            if (this.instances.length === 0) {
                this.closeOverlay();
            }
            if (instance.overlay) {
                this.changeOverlayStyle();
            }
        });
    },
    closeOverlay() {
        if (!this.overlay) {
            return;
        }

        this.allowScrolling();
        const overlay = this.overlay;
        overlay.show  = false;
        this.overlay  = null;
        setTimeout(() => {
            document.body.removeChild(overlay.$el);
            overlay.$destroy();
        }, 50);
    },
    handleOverlayClick() {
        if (this.instances.length === 0) {
            return;
        }
        const instance = this.instances[this.instances.length - 1];
        if (instance.overlayClick) {
            instance.overlayClick();
        }
    },
    open(instance) {
        if (!instance || this.instances.indexOf(instance) !== -1) {
            return;
        }
        if (!this.overlay && instance.overlay) {
            this.showOverlay(instance);
        }

        this.instances.push(instance);
        if (instance.overlay) {
            this.changeOverlayStyle();
        }
    },
    preventScrolling() {
        if (this.locked) {
            return;
        }

        const body = document.getElementsByTagName('body')[0];
        disableBodyScroll(body, {
            reserveScrollBarGap: true
        });
        this.locked = true;
    },
    showOverlay(instance) {
        const overlay = this.overlay = new OverlayCmp({
            el: document.createElement('div')
        });

        overlay.fixed   = true;
        overlay.color   = instance.overlayColor;
        overlay.opacity = instance.overlayOpacity;
        overlay.zIndex  = instance.overlayZIndex;
        overlay.onClick = this.handleOverlayClick.bind(this);

        document.body.appendChild(overlay.$el);
        this.preventScrolling();
        Vue.nextTick(() => {
            overlay.show = true;
        });
    }
};

document.addEventListener('keydown', (e) => {
    if (PopupManager.instances.length === 0 || (e.key && e.key.toLowerCase() !== 'escape')) {
        return;
    }
    const instance = PopupManager.instances[PopupManager.instances.length - 1];
    if (instance.escPress) {
        instance.escPress();
    }
});

export default PopupManager;
