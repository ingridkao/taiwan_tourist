import { createStore } from "vuex"

export default createStore({
    state() {
        return {
            searchtext: ''
        }
    },
    mutations: {
        keyinKeyword(state, payload) {
            state.searchtext = payload
        }
    }
})