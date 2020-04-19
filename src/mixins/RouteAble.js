export default {
    props: {
        activeClass: {
            type: String,
            default: 'active'
        },
        tag: {
            type: String,
            default: 'a'
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
            return !this.hasRouter && this.url !== undefined && this.url !== '';
        },
        hasRouter() {
            return (this.$router || this.$route) && this.path !== undefined && this.path !== '';
        }
    }
}
