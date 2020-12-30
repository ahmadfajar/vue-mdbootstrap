<template>
  <div class="md-notification">
    <div
      v-for="(notification, position) in notifications"
      :key="position"
      :class="_classNames(position)">
      <bs-notification-content
        v-for="(config, idx) in notification"
        :key="idx"
        :options="config" />
    </div>
  </div>
</template>

<script>
import BsNotificationContent from "./BsNotificationContent";
import Helper from "../../utils/Helper";

export default {
    name: "BsNotification",
    components: {BsNotificationContent},
    data() {
        const positions = [
            'top-right', 'top-left', 'top-center', 'top-full-width',
            'bottom-right', 'bottom-left', 'bottom-center', 'bottom-full-width'];
        let notifications = {};
        for (let i = 0; i <= positions.length - 1; i++) {
            notifications[positions[i]] = {}
        }

        return {
            positions,
            notifications,
            defaultPosition: 'bottom-right',
            defaultVariant: 'default',
            defaultClickClose: false,
            defaultCloseButton: true,
            defaultCloseOnHover: false,
            defaultTimeout: 6000,
            defaultProgressBar: false,
            defaultProgressBarValue: null,
            defaultPreventDuplicates: false,
            defaultStyles: {},
            index: 0
        }
    },
    methods: {
        /**
         * Create and display new Notification.
         *
         * @param {Object|string} options The Notification's configuration or Notification's message
         *
         * @returns {Object|null} The Notification's instance or NULL if failed
         */
        add(options) {
            return this.addItem(this._processOptions(options));
        },
        /**
         * Add new Notification.
         *
         * @param {Object} options The Notification's configuration
         *
         * @returns {Object|null} The Notification's instance or NULL if failed
         */
        addItem(options) {
            if (typeof options !== 'object') {
                console.warn('addItem accept only Object', options);
                return null;
            }
            if (options.preventDuplicates) {
                const keys = Object.keys(this.notifications[options.position]);

                for (let i = 0; i < keys.length; i++) {
                    if (this.notifications[options.position][keys[i]].title === options.title &&
                        this.notifications[options.position][keys[i]].message === options.message) {
                        console.warn('Prevent Duplicates', options);
                        return null;
                    }
                }
            }
            this._bindItem(options);

            return options;
        },
        /**
         * Remove a Notification.
         *
         * @param {Object} data The Notification's instance
         *
         * @returns {void}
         */
        removeItem(data) {
            const item = this.notifications[data.position][data.index];

            if (typeof item !== 'undefined') {
                this.$delete(this.notifications[data.position], data.index);

                if (Helper.isFunction(data.onClosed)) {
                    this.$nextTick(() => {
                        data.onClosed();
                    });
                }
            }
        },
        /**
         * Clear and close all registered Notifications.
         *
         * @returns {void}
         */
        clearAll() {
            for (let i = 0; i < this.positions.length; i++) {
                const keys = Object.keys(this.notifications[this.positions[i]]);

                for (let j = 0; j < keys.length; j++) {
                    this.close(this.notifications[this.positions[i]][keys[j]]);
                }
            }
        },
        /**
         * Close and remove a Notification from the DOM.
         *
         * @param {Object} data The Notification's instance
         *
         * @returns {void}
         */
        close(data) {
            this.removeItem(data)
        },
        /**
         * Remove Notification by type.
         *
         * @param {string} name Notification type
         *
         * @returns {void}
         */
        removeByType(name) {
            for (let i = 0; i < this.positions.length; i++) {
                const keys = Object.keys(this.notifications[this.positions[i]]);

                for (let j = 0; j < keys.length; j++) {
                    if (this.notifications[this.positions[i]][keys[j]]['variant'] === name) {
                        this.close(this.notifications[this.positions[i]][keys[j]]);
                    }
                }
            }
        },
        /**
         * Sets default configuration's options.
         *
         * @param {Object} options The notification options
         *
         * @returns {void}
         */
        setDefaultOptions(options) {
            if (Helper.isObject(options)) {
                if (typeof options.closeButton !== 'undefined') {
                    this.defaultClickClose = options.clickClose;
                }
                if (typeof options.closeButton !== 'undefined') {
                    this.defaultCloseButton = options.closeButton;
                }
                if (typeof options.closeOnHover !== 'undefined') {
                    this.defaultCloseOnHover = options.closeOnHover;
                }
                if (typeof options.timeout !== 'undefined') {
                    this.defaultTimeout = options.timeout;
                }
                if (typeof options.position !== 'undefined') {
                    this.defaultPosition = options.position;
                }
                if (typeof options.progressBar !== 'undefined') {
                    this.defaultProgressBar = options.progressBar;
                }
                if (typeof options.progressBarValue !== 'undefined') {
                    this.defaultProgressBarValue = options.progressBarValue;
                }
                if (typeof options.preventDuplicates !== 'undefined') {
                    this.defaultPreventDuplicates = options.preventDuplicates;
                }
                if (Helper.isObject(options.styles)) {
                    this.defaultStyles = options.styles;
                }
            }
        },
        /**
         * Sets Notification's progress bar value.
         *
         * @param {Object} data     The Notification's instance
         * @param {number} newValue The progress bar value
         *
         * @returns {void}
         */
        setProgressValue(data, newValue) {
            let item = this.notifications[data.position][data.index];

            if (typeof item !== 'undefined') {
                this.$set(item, 'progressBarValue', newValue);
            }
        },
        /**
         * Shortcut method, create and display Error Notification.
         *
         * @param {Object|string} option  Notification configuration or message
         * @param {string}        [title] Notification title
         *
         * @returns {Object} Notification's instance
         */
        error(option, title) {
            let data = this._processOptions(option);
            data['variant'] = 'error';

            if (typeof title !== 'undefined') {
                data['title'] = title;
            }

            return this.addItem(data);
        },
        /**
         * Shortcut method, create and display Info Notification.
         *
         * @param {Object|string} option  Notification configuration or message
         * @param {string}        [title] Notification title
         *
         * @returns {Object} Notification's instance
         */
        info(option, title) {
            let data = this._processOptions(option);
            data['variant'] = 'info';

            if (typeof title !== 'undefined') {
                data['title'] = title;
            }

            return this.addItem(data);
        },
        /**
         * Shortcut method, create and display Success Notification.
         *
         * @param {Object|string} option  Notification configuration or message
         * @param {string}        [title] Notification title
         *
         * @returns {Object} Notification's instance
         */
        success(option, title) {
            let data = this._processOptions(option);
            data['variant'] = 'success';

            if (typeof title !== 'undefined') {
                data['title'] = title
            }

            return this.addItem(data);
        },
        /**
         * Shortcut method, create and display Warning Notification.
         *
         * @param {Object|string} option  Notification configuration or message
         * @param {string}        [title] Notification title
         *
         * @returns {Object} Notification's instance
         */
        warning(option, title) {
            let data = this._processOptions(option);
            data['variant'] = 'warning';

            if (typeof title !== 'undefined') {
                data['title'] = title;
            }

            return this.addItem(data);
        },
        /**
         * Add and bind new notification item.
         *
         * @param {Object} data The notification's configuration
         *
         * @returns {void}
         * @private
         */
        _bindItem(data) {
            this.index++;
            data['index'] = this.index;
            this.$set(this.notifications[data.position], this.index, data);

            if (Helper.isFunction(data.onCreated)) {
                this.$nextTick(() => {
                    data.onCreated();
                });
            }
        },
        /**
         * Get computed component's classes.
         *
         * @param {string} position Notification position
         *
         * @returns {string[]} Component's class names
         * @private
         */
        _classNames(position) {
            return [
                'md-notification-container',
                'md-notification-' + position
            ]
        },
        /**
         * Process notification's configuration.
         *
         * @param {Object|string} options The notification's configuration
         *
         * @returns {Object|*} Component's configurations
         * @private
         */
        _processOptions(options) {
            if (Helper.isObject(options) && typeof options.message !== 'undefined') {
                return {
                    variant: this.defaultVariant,
                    timeout: this.defaultTimeout,
                    position: this.defaultPosition,
                    clickClose: this.defaultClickClose,
                    closeButton: this.defaultCloseButton,
                    closeOnHover: this.defaultCloseOnHover,
                    progressBar: this.defaultProgressBar,
                    progressBarValue: this.progressBarValue,
                    preventDuplicates: this.defaultPreventDuplicates,
                    styles: this.defaultStyles,
                    ...options
                };
            }

            // if String
            return {
                message: options.toString(),
                variant: this.defaultVariant,
                timeout: this.defaultTimeout,
                position: this.defaultPosition,
                clickClose: this.defaultClickClose,
                closeButton: this.defaultCloseButton,
                closeOnHover: this.defaultCloseOnHover,
                progressBar: this.defaultProgressBar,
                progressBarValue: this.defaultProgressBarValue,
                preventDuplicates: this.defaultPreventDuplicates
            }
        }
    }
}
</script>

<style lang="scss">
@import "~compass-sass-mixins/lib/compass/css3";
@import "../../../scss/colors";
@import "../../../scss/variables";

.#{$prefix}-notification {
    .#{$prefix}-notification-title {
        font-weight: $font-weight-bold;
        font-size: 110%;
    }

    .#{$prefix}-notification-message {
        @include word-break(break-word);

        a, label {
            color: $white;
        }

        a:hover {
            color: $gray-300;
            text-decoration: none;
        }
    }

    .#{$prefix}-notification-close-button {
        @include opacity(0.8);
        @include text-shadow(0 1px 0 rgba($white, 1));
        position: relative;
        right: -0.3em;
        top: -0.3em;
        float: right;
        font-size: 20px;
        font-weight: $font-weight-normal;
        color: $white;

        &:hover,
        &:focus {
            @include opacity(0.4);
            color: $black;
            cursor: pointer;
            text-decoration: none;
        }
    }

    /*Additional properties for button version
     iOS requires the button element instead of an anchor tag.
     If you want the anchor version, it requires `href="#"`.*/
    button.#{$prefix}-notification-close-button {
        border: 0;
        padding: 0;
        cursor: pointer;
        background: transparent;
        -webkit-appearance: none;
    }

    .#{$prefix}-notification-top-right {
        top: 12px;
        right: $padding-base;
    }

    .#{$prefix}-notification-top-left {
        top: 12px;
        left: $padding-base;
    }

    .#{$prefix}-notification-top-center {
        top: 12px;
        right: 0;
        width: 100%;
    }

    .#{$prefix}-notification-top-full-width {
        top: 12px;
        right: 0;
        width: 100%;
        padding-left: $padding-base;
        padding-right: $padding-base;
    }

    .#{$prefix}-notification-bottom-right {
        right: $padding-base;
        bottom: 12px;
    }

    .#{$prefix}-notification-bottom-left {
        bottom: 12px;
        left: $padding-base;
    }

    .#{$prefix}-notification-bottom-center {
        bottom: 12px;
        right: 0;
        width: 100%;
    }

    .#{$prefix}-notification-bottom-full-width {
        bottom: 12px;
        right: 0;
        width: 100%;
        padding-left: $padding-base;
        padding-right: $padding-base;
    }

    .#{$prefix}-notification-container {
        position: fixed;
        z-index: 99999;
        pointer-events: none;

        * {
            @include box-sizing(border-box);
        }

        > .#{$prefix}-notification-inner {
            @include border-radius(3px 3px 3px 3px);
            @include box-shadow(0 0 12px $grey-base);
            @include opacity(.8);
            color: $white;
            display: block;
            position: relative;
            pointer-events: auto;
            overflow: hidden;
            margin: 0 0 6px;
            width: 350px;
            padding: 15px 15px 15px 50px;
            background-position: 15px center;
            background-repeat: no-repeat;
        }

        > :hover {
            @include box-shadow(0 0 12px $black);
            @include opacity(1);
            cursor: pointer;
        }

        .#{$prefix}-notification-bar {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 4px;
            background-color: $warning-color;
        }

        > .#{$prefix}-notification-default,
        > .#{$prefix}-notification-custom {
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7EAAAOxAGVKw4bAAACnklEQVRIibWVT0gUcRTHP+/XICkkzPqPSCNPgUjWuUN/LBg9iJGE1CFw91A3D0GeLCjpVAQGEY6XsFNUELGtLSF0DOyQhmAHoYJScNYklYr9vQ7ubuu0s4rku8x35vfe+773fczviaoSZW482QT0iJh2VdsqYmKqVoFFYErEpFXtk8xo59eoHFKKwI0nG0XMTVXbC1SIGFG1mn8Wgtff14CHIuZa4HvzmxLEEqkzwAhQE3aurNiFBX7+ypYq9htwMfC9V5EEsUTqsqodBkxxtSJGwgThjnL4F9CXGe189A+BG092iZinqtYUBRSC+7taGexqBGDg8RwPUjOlCBT4LWK8wPcmCgSxRKoBmALqSvUOMHHLoy13+mYuS/dQOsoV4DNwKPC9JQdA1V4HakUMJSpCxMjkxwxtdS4Ab2cXoiTK4yZVOwAMiBt/Wa9q54DKMgEiQGuzi81aPnz6vhmBqNoM0OwA3SKmqjCU3EDDWIGpuQzhsyh/EeMCHQ5wskwVBTzYe0T7TzUIoDdefOHOs/dl/XP4hAO0lJtW3kwxFon0C1mLA9Ru1XsbVusAWkbHv6UKUkDrZ2X9c1gdYEHV7s1/jNIURXPJFUDVbmUGCw4wLWIO71AH0w6QVrUXdqiDtAM8B5aBav6vzQNpJ/C9pVgiNQJcKdfyNiQaDnxvNX8XDQHnRMz+qJazVgsSZbO6mUSzqvYubLyuj4mYcVVbUYpgX02V9p0+KFZV7ydnWFxeiyJYETHHA9+b3EAAEEukzgJjwO5t6v4D6Al8b7wgVXhluvHkUWBMxBwIVxexk4tlOZ8Z7XxXnC9q6VeLmKuq9hLgbkKwANwTMbcD31sN5ypJkLdYIrUH6ADaWb8U61n/D+aBaeA1MB743kpUjj/Zds3fTDZCJAAAAABJRU5ErkJggg==') !important;

            > .#{$prefix}-notification-bar {
                background-color: $warning-color-dark;
            }
        }

        > .#{$prefix}-notification-info {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=") !important;
        }

        > .#{$prefix}-notification-error {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=") !important;
        }

        > .#{$prefix}-notification-success {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==") !important;
        }

        > .#{$prefix}-notification-warning {
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=") !important;

            > .#{$prefix}-notification-bar {
                background-color: $danger-color-dark;
            }
        }

        /*overrides*/
        &.#{$prefix}-notification-top-center > div,
        &.#{$prefix}-notification-bottom-center > div {
            width: 350px;
            margin-left: auto;
            margin-right: auto;
        }

        &.#{$prefix}-notification-top-full-width > div,
        &.#{$prefix}-notification-bottom-full-width > div {
            width: 100%;
        }
    }

    .#{$prefix}-notification-inner {
        background-color: darken($gray-900, 5%);
    }

    .#{$prefix}-notification-success {
        background-color: $success-color-dark;
    }

    .#{$prefix}-notification-error {
        background-color: $danger-color-dark;
    }

    .#{$prefix}-notification-info {
        background-color: $info-color-dark;
    }

    .#{$prefix}-notification-warning {
        background-color: $warning-color-dark;
    }

    @media all and (max-width: 240px) {
        .#{$prefix}-notification-container {

            > .#{$prefix}-notification-inner {
                padding: 8px 8px 8px 50px;
                width: 11em;
            }

            & .#{$prefix}-notification-close-button {
                right: -0.2em;
                top: -0.2em;
            }
        }
    }

    @media all and (min-width: 241px) and (max-width: 480px) {
        .#{$prefix}-notification-container {
            > .#{$prefix}-notification-inner {
                padding: 8px 8px 8px 50px;
                width: 18em;
            }

            & .#{$prefix}-notification-close-button {
                right: -0.2em;
                top: -0.2em;
            }
        }
    }

    @media all and (min-width: 481px) and (max-width: 768px) {
        .#{$prefix}-notification-container {
            > .#{$prefix}-notification-inner {
                padding: 15px 15px 15px 50px;
                width: 25em;
            }
        }
    }
}
</style>
