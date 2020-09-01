export default {
    props: {
        activeClass: {
            type: String,
            default: 'active'
        },
        exact: {
            type: Boolean,
            default: false
        },
        path: {
            type: [String, Object],
            default: undefined
        },
        url: {
            type: String,
            default: undefined
        }
    },
    computed: {
        hasLink() {
            return !this.hasRouter && (typeof this.url !== 'undefined') && this.url !== '';
        },
        hasRouter() {
            return (this.$router || this.$route) && (typeof this.path !== 'undefined') && this.path !== '';
        }
    }
}
