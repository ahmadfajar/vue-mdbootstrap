<template>
  <router-link v-if="hasRouter"
               :tag="tag"
               :to="path"
               :class="_classNames"
               :active-class="activeClass"
               :exact="exact"
               v-on="$listeners">
    <slot></slot>
  </router-link>
  <a :is="tag"
     v-else
     :class="_classNames"
     :href="url"
     v-on="$listeners">
    <slot></slot>
  </a>
</template>

<script>
import RouteAble from '../../mixins/RouteAble';
import ToggleAble from './mixins/ToggleAble';

export default {
    name: "BsListTile",
    props: {
        disabled: Boolean
    },
    mixins: [RouteAble, ToggleAble],
    computed: {
        _classNames() {
            return {
                'd-flex': true,
                'md-list-tile': true,
                'md-disabled': this.disabled,
                'md-link': (this.hasRouter || this.tag === 'a') && !this.disabled,
                ['md-' + this.activeClass]: !this.hasRouter && this.isActive && !this.disabled
            }
        }
    }
}
</script>

<style scoped>

</style>
