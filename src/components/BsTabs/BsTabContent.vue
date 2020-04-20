<template>
  <div class="tab-content">
    <slot></slot>
  </div>
</template>

<script>
import Helper from "../../utils/Helper";

export default {
    name: "BsTabContent",
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        transition: {
            type: String,
            default: 'slide-fade'
        },
        value: {
            type: [String, Number, Object],
            default: undefined
        }
    },
    provide() {
        return {
            tabs: {
                transition: this.transition,
                register: this.register,
                unregister: this.unregister,
                setActiveItem: this.setActiveItem
            }
        }
    },
    data: () => ({
        activeItem: null,
        items: []
    }),
    watch: {
        value(newVal) {
            this.setActiveItem(newVal);
        }
    },
    beforeDestroy() {
        this.activeItem = null;
    },
    mounted() {
        this.setActiveItem(this.value);
    },
    methods: {
        register(item) {
            return this.items.push(item);
        },
        unregister(idx) {
            this.items.splice(idx, 1);
        },
        setActiveItem(key) {
            let item;

            if (Helper.isObject(key)) {
                item = this.items.find(el => el.id === key.target && el.tabref === key.tabref);
            } else if (!isNaN(parseInt(key, 10))) {
                item = this.items[key];
            }
            if (item) {
                this.items.forEach(el => el.active = false);
                item.active = true;
                this.activeItem = item;
            }
        },
        _emitInput() {
            if (this.activeItem.id && this.activeItem.tabref) {
                const obj = {target: this.activeItem.id, tabref: this.activeItem.tabref};
                this.$emit('input', obj);
            } else {
                this.$emit('input', this.activeItem.itemIndex);
            }
        }
    }
}
</script>

<style lang="scss">
.tab-content {
    position: relative;
    overflow: hidden;
}
</style>
