export default {
    data: () => ({
        // follow Bootstrap4 MediaQuery
        screenMaxSm: window.matchMedia('(max-width: 767.98px)'),
        screenMinMd: window.matchMedia('(min-width: 768px)'),
        screenMaxMd: window.matchMedia('(max-width: 991.98px)'),
        screenMinLg: window.matchMedia('(min-width: 992px)'),
        screenMaxLg: window.matchMedia('(max-width: 1199.98px)'),
        screenMinXL: window.matchMedia('(min-width: 1200px)')
    })
}
