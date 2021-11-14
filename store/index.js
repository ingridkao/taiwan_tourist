import { createStore } from "vuex"

export default createStore({
    state() {
        return {
            searchtext: '',
            informationObj: {},
            fullPage: false,
            navToggle:false
        }
    },
    mutations: {
        keyinKeyword(state, payload) {
            state.searchtext = payload
        },
        setInformationObj(state, payload) {
            state.informationObj = payload
        },
        setNavToggle(state) {
            state.navToggle = !state.navToggle
        },
        detectWidth(state, payload) {
            state.fullPage = (payload > 1080)
        },
    }
})