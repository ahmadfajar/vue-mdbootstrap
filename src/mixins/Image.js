import Util from '../utils/Helper';

export default {
    props: {
        circle: {
            type: Boolean,
            default: false
        },
        rounded: {
            type: Boolean,
            default: false
        },
        center: {
            type: Boolean,
            default: false
        },
        imgSrc: {
            type: String,
            default: undefined
        },
        size: {
            type: [Number, String, Object],
            default: 48
        }
    },
    computed: {
        imageClass() {
            return {
                'mx-auto d-block': this.center,
                'rounded-circle': this.circle && !this.rounded,
                'rounded': this.rounded && !this.circle,
            }
        },
        imageSizeStyles() {
            if (!this.size) {
                return null;
            }
            const primitive = typeof this.size === 'string' || typeof this.size === 'number';

            return {
                height: primitive ? Util.sizeUnit(this.size) : Util.sizeUnit(this.size.height),
                width: primitive ? Util.sizeUnit(this.size) : Util.sizeUnit(this.size.width)
            }
        }
    }
}
