<template>
  <router-link v-if="hasRouter"
               :to="path"
               :class="_classNames"
               :active-class="activeClass"
               :exact="exact"
               v-on="$listeners">
    <slot></slot>
  </router-link>
  <a :is="_tag"
     :class="_classNames"
     :href="url"
     v-on="$listeners"
     v-else>
    <slot></slot>
  </a>
</template>

<script>
import RouteAble from '../../mixins/RouteAble';
import ToggleAble from './mixins/ToggleAble';

export default {
    name: "BsListTile",
    mixins: [RouteAble, ToggleAble],
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        _classNames() {
            return {
                'd-flex': true,
                'md-list-tile': true,
                'md-disabled': this.disabled,
                'md-link': this._tag === 'a' && !this.disabled,
                ['md-' + this.activeClass]: !this.hasRouter && this.isActive && !this.disabled
            }
        },
        _tag() {
            return this.hasRouter || this.hasLink ? 'a' : 'div'
        }
    }
}
</script>

<style scoped>

</style>
