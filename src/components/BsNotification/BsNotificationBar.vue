<template>
  <div :style="_barStyles" class="md-notification-bar"></div>
</template>

<script>
export default {
    name: "BsNotificationBar",
    props: {
        timeout: {
            type: Number,
            default: undefined
        },
        value: {
            type: Number,
            default: undefined
        }
    },
    data: (vm) => ({
        intervalId: false,
        hideEta: false,
        progressValue: vm.value,
        width: 100
    }),
    computed: {
        _barStyles() {
            return {
                width: this.width + '%'
            }
        }
    },
    mounted() {
        if (this.progressValue === null) {
            this.hideEta = new Date().getTime() + this.timeout;
            this._setTimer();
        } else {
            this._updateProgressBar();
        }
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    },
    methods: {
        setValue(newValue) {
            this.progressValue = newValue;
            this._updateProgressBar();
        },
        _setTimer() {
            this.intervalId = setInterval(() => {
                this._updateProgressBar();
            }, 10);
        },
        _updateProgressBar() {
            let percentage;

            if (this.progressValue === null) {
                let diff   = ((this.hideEta - (new Date().getTime())));
                percentage = (diff / this.timeout) * 100;
                percentage = Math.floor(percentage);
                this.width = percentage;
            } else {
                percentage = Math.floor(this.progressValue);
                this.width = percentage;
            }
        }
    }
}
</script>

<style scoped>

</style>
