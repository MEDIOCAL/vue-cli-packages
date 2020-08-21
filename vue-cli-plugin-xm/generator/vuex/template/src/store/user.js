export default {
    namespaced: true,
    state: {
        info: {}
    },
    getters: {
        info(state) {
            return state.info;
        }
    },
    mutations: {
        setUserInfo(state, data) {
            state.info = data;
        }
    }
};
