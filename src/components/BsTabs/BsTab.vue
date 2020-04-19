<template>
  <li v-if="_tagName === 'li'"
      :is="_tagName"
      :class="_classNames"
      v-on="$listeners">
    <router-link v-if="hasRouter"
                 v-bind="_attributes"
                 :class="_linkClass"
                 :to="path"
                 :active-class="activeClass"
                 :exact="exact"
                 @click.native="_onClick">
      <bs-tab-label v-bind="{ label:label, icon:icon, iconPosition:tabs.iconPosition, iconSize:tabs.iconSize }" />
    </router-link>
    <a v-else
       v-bind="_attributes"
       :href="url"
       :class="_linkClass"
       @click="_onClick">
      <bs-tab-label v-bind="{ label:label, icon:icon, iconPosition:tabs.iconPosition, iconSize:tabs.iconSize }" />
    </a>
  </li>
  <router-link v-else-if="hasRouter"
               v-bind="_attributes"
               :class="_classNames"
               :to="path"
               :active-class="activeClass"
               :exact="exact"
               @click.native="_onClick"
               v-on="$listeners">
    <bs-tab-label v-bind="{ label: label, icon: icon, iconPosition: tabs.iconPosition, iconSize: tabs.iconSize }" />
  </router-link>
  <a v-else
     v-bind="_attributes"
     :href="url"
     :class="_classNames"
     @click="_onClick"
     v-on="$listeners">
    <bs-tab-label v-bind="{ label: label, icon: icon, iconPosition: tabs.iconPosition, iconSize: tabs.iconSize }" />
  </a>
</template>

<script>
import RouteAble from '../../mixins/RouteAble';
import BsTabLabel from "./BsTabLabel";

export default {
    name: 'BsTab',
    components: {BsTabLabel},
    mixins: [RouteAble],
    inject: ['tabs'],
    props: {
        id: {
            type: String,
            default: undefined
        },
        icon: {
            type: [String, Array],
            default: undefined
        },
        target: {
            type: String,
            default: undefined
        },
        label: {
            type: String,
            default: undefined
        },
    },
    data: () => ({
        isActive: false,
        tabIndex: -1
    }),
    computed: {
        /**
         * Get computed binding's attributes.
         *
         * @return {Object} HTML attributes
         * @private
         */
        _attributes() {
            return {
                'id': this.id,
                'role': 'tab',
                'aria-controls': this.target,
                'aria-selected': this.active
            }
        },
        /**
         * Get computed component's class names.
         *
         * @return {Object} Css class names
         * @private
         */
        _classNames() {
            return {
                'nav-item': true,
                'nav-link': this._tagName !== 'li',
                'text-center': this._tagName !== 'li',
                'flex-fill': this.tabs.align === 'justified',
                [this.activeClass]: this.active && this.tagName !== 'li' && !this.hasRouter
            }
        },
        /**
         * Get computed link's class names.
         *
         * @return {Object} Css class names
         * @private
         */
        _linkClass() {
            return {
                'nav-link': true,
                'text-center': true,
                'flex-fill': this.tabs.align === 'justified',
                [this.activeClass]: this.active && !this.hasRouter
            }
        },
        /**
         * Get computed html TAG.
         *
         * @return {string} HTML tag
         * @private
         */
        _tagName() {
            return this.tabs.variant === 'pills' ? 'li' : 'a';
        },
        active: {
            get() {
                return this.isActive;
            },
            set(value) {
                this.isActive = value;
            }
        }
    },
    created() {
        const idx     = this.tabs.register(this);
        this.tabIndex = idx - 1;
    },
    mounted() {
        if (this.hasRouter) {
            this._onRouteChange();
        }
    },
    beforeDestroy() {
        this.tabs.unregister(this.tabIndex);
    },
    methods: {
        _onClick(e) {
            if (this.hasLink && this.url.startsWith('#') && e) {
                e.preventDefault();
            }
            this.tabs.setActiveTab(this.tabIndex);
            this.$emit('click', this);
        },
        _onRouteChange() {
            if (this.hasRouter && this.$route.path === this.path) {
                this._onClick();
            }
        }
    }
}
</script>

<style scoped>

</style>
