<template>
  <div
    :class="_classNames"
    :style="_cmpStyles"
    @click="_onClick"
    @mouseover="_onMouseOver"
    @mouseout="_onMouseOut">
    <bs-notification-bar
      v-if="progressbar"
      ref="notificationBar"
      :timeout="options.timeout"
      :value="options.progressBarValue" />
    <button
      v-if="options.closeButton"
      class="md-notification-close-button"
      role="button"
      type="button"
      @click="close">
      ×
    </button>
    <div class="md-notification-title" v-html="options.title"></div>
    <div class="md-notification-message" v-html="options.message"></div>
  </div>
</template>

<script>
import BsNotificationBar from "./BsNotificationBar";
import Helper from "../../utils/Helper";

export default {
    name: "BsNotificationContent",
    components: {BsNotificationBar},
    props: {
        options: {
            type: Object,
            default: undefined
        }
    },
    data: () => ({
        progressbar: false,
        intervalId: false
    }),
    computed: {
        /**
         * Get component's class names.
         *
         * @returns {String[]} Component css classes
         * @private
         */
        _classNames() {
            return [
                'md-notification-inner',
                'md-notification-' + this.options.variant
            ]
        },
        /**
         * Get component's css styles.
         *
         * @returns {Object|false} Inline css styles
         * @private
         */
        _cmpStyles() {
            if (Helper.isObject(this.options.styles)) {
                return this.options.styles;
            }

            return false;
        }
    },
    created() {
        if (Helper.isObject(this.options)) {
            if (typeof this.options.timeout !== 'undefined' && this.options.timeout > 0) {
                this.progressbar = this.options.progressBar;
                this._setTimeout();
            } else if (this.options.progressBarValue !== null && this.options.progressBar !== false) {
                this.progressbar = true;
            }
        }
    },
    beforeDestroy() {
        this._clearInterval();
    },
    methods: {
        /**
         * Manually remove component from the DOM if it's not managed.
         *
         * @returns {void}
         */
        close() {
            if (this.$parent != null) {
                this.$parent.close(this.options);
            }
        },
        /**
         * Sets notification's progress bar value.
         *
         * @param {number} newValue Progress value
         *
         * @returns {void}
         */
        setProgressBarValue(newValue) {
            if (this.options.progressBarValue !== null) {
                this.$refs.notificationBar.setValue(newValue);
            }
        },
        /**
         * Clear assigned interval.
         *
         * @returns {void}
         * @private
         */
        _clearInterval() {
            if (this.intervalId !== false) {
                clearInterval(this.intervalId);
            }
            this.intervalId = false;
        },
        /**
         * Check if clickClose is TRUE then remove component from the DOM.
         *
         * @returns {void}
         * @private
         */
        _closeOnClick() {
            if (typeof this.options.clickClose !== 'undefined' && this.options.clickClose === true) {
                this.close();
            }
        },
        /**
         * Handle onClick event.
         *
         * @param {MouseEvent} e Mouse event
         *
         * @returns {void}
         * @private
         */
        _onClick(e) {
            if (Helper.isFunction(this.options.onClicked)) {
                this.options.onClicked(e);
            }
            this._closeOnClick();
        },
        /**
         * Handle onMouseOut event.
         *
         * @param {MouseEvent} e Mouse event
         *
         * @returns {void}
         * @private
         */
        _onMouseOut(e) {
            if (Helper.isFunction(this.options.onMouseOut)) {
                this.data.onMouseOut(e);
            }
            if (!this.options.closeOnHover) {
                this._setTimeout();
            }
        },
        /**
         * Handle onMouseOver event.
         *
         * @param {MouseEvent} e Mouse event
         *
         * @returns {void}
         * @private
         */
        _onMouseOver(e) {
            if (Helper.isFunction(this.options.onMouseOver)) {
                this.options.onMouseOver(e);
            }
            if (!this.options.closeOnHover) {
                this._clearInterval();
            }
        },
        /**
         * Remove component from the DOM when the timout has been reached.
         *
         * @returns {void}
         * @private
         */
        _setTimeout() {
            this.intervalId = setTimeout(() => {
                this.close();
            }, this.options.timeout);
        }
    }
}
</script>

<style scoped>

</style>
