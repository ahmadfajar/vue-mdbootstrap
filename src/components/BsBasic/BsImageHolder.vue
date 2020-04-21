<template>
  <svg :class="_svgClasses"
       :height="height"
       :width="width"
       focusable="false"
       preserveAspectRatio="xMidYMid slice"
       role="img"
       xmlns="http://www.w3.org/2000/svg">
    <title v-if="placeHolder">{{ placeHolder }}</title>
    <rect width="100%" height="100%" :fill="bgColor" />
    <text v-if="placeHolder && placeHolder !== ''"
          :fill="textColor"
          :x="xPos"
          :y="yPos">
      {{ placeHolder }}
    </text>
  </svg>
</template>

<script>
export default {
    name: "BsImageHolder",
    props: {
        height: {
            type: [String, Number],
            default: undefined
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        bgColor: {
            type: String,
            default: '#868e96'
        },
        center: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        placeHolder: {
            type: String,
            default: undefined
        },
        rounded: {
            type: Boolean,
            default: false
        },
        textColor: {
            type: String,
            default: '#dee2e6'
        },
        xPos: {
            type: [String, Number],
            default: '15%'
        },
        yPos: {
            type: [String, Number],
            default: '50%'
        }
    },
    computed: {
        _svgClasses() {
            return {
                'mx-auto d-block': this.center,
                'rounded-circle': this.circle && !this.rounded,
                'rounded': this.rounded && !this.circle,
            }
        }
    }
}
</script>

<style scoped>

</style>
