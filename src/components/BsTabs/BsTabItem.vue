<template>
  <li
    v-if="_tagName === 'li'"
    :is="_tagName"
    :class="_classNames"
    role="presentation"
    v-on="$listeners">
    <router-link
      v-if="hasRouter"
      v-bind="_attributes"
      :active-class="activeClass"
      :class="_linkClass"
      :exact="exact"
      :to="path"
      @click.native="_onClick">
      <bs-tab-label v-bind="_tabLabelAttrs" />
    </router-link>
    <a
      v-else
      v-bind="_attributes"
      :class="_linkClass"
      :href="url"
      @click="_onClick">
      <bs-tab-label v-bind="_tabLabelAttrs" />
    </a>
  </li>
  <router-link
    v-else-if="hasRouter"
    v-bind="_attributes"
    v-on="$listeners"
    :active-class="activeClass"
    :class="_classNames"
    :exact="exact"
    :to="path"
    @click.native="_onClick">
    <bs-tab-label v-bind="_tabLabelAttrs" />
  </router-link>
  <a
    v-else
    v-bind="_attributes"
    v-on="$listeners"
    :class="_classNames"
    :href="url"
    @click="_onClick">
    <bs-tab-label v-bind="_tabLabelAttrs" />
  </a>
</template>

<script>
import BsTabLabel from "./BsTabLabel";
import RouteAble from "../../mixins/RouteAble";

export default {
    name: "BsTabItem",
    inject: ['tabs'],
    components: {BsTabLabel},
    mixins: [RouteAble],
    props: {
        id: {
            type: String,
            default: undefined
        },
        icon: {
            type: [String, Array],
            default: undefined
        },
        label: {
            type: String,
            default: undefined
        },
        target: {
            type: String,
            default: undefined
        },
        value: {
            type: Number,
            default: undefined
        }
    },
    data: () => ({
        isActive: false,
        tabIndex: -1
    }),
    computed: {
        /**
         * @property {Object} tabs
         */

        /**
         * Get computed binding's attributes.
         *
         * @returns {Object|*} HTML attributes
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
         * @returns {Object} Css class names
         * @private
         */
        _classNames() {
            return {
                'nav-item': true,
                'nav-link': this._tagName !== 'li',
                'text-center': this._tagName !== 'li',
                'flex-fill': this.tabs.alignment === 'justified',
                [this.activeClass]: this.active && this._tagName !== 'li' && !this.hasRouter
            }
        },
        /**
         * Get computed link's class names.
         *
         * @returns {Object} Css class names
         * @private
         */
        _linkClass() {
            return {
                'nav-link': true,
                'text-center': true,
                'flex-fill': this.tabs.align === 'justified',
                [this.activeClass]: this.active && !this.hasRouter,
                [this.tabs.tabClass]: this.tabs.tabClass && !this.active && !this.hasRouter,
            }
        },
        /**
         * Get computed TabLabel binding's attributes.
         *
         * @returns {Object|*} TabLabel attributes
         * @private
         */
        _tabLabelAttrs() {
            return {
                label: this.label,
                icon: this.icon,
                iconPosition: this.tabs.iconPosition,
                iconSize: this.tabs.iconSize
            }
        },
        /**
         * Get computed html TAG.
         *
         * @returns {string} HTML tag
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
        const idx = this.tabs.registerTab(this);
        this.tabIndex = idx - 1;
    },
    beforeDestroy() {
        this.tabs.unregisterTab(this.tabIndex);
    },
    mounted() {
        if (this.hasRouter) {
            this._onRouteChange();
        } else if (this.value === this.tabIndex) {
            this.tabs.setActiveTab(this.tabIndex);
        }
    },
    methods: {
        _onClick(e) {
            if (this.hasLink && this.url.startsWith('#') && e) {
                e.preventDefault();
            }
            if (!this.active) {
                this.tabs.setActiveTab(this.tabIndex);
                this.$emit('tab-click', this);
            }
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
