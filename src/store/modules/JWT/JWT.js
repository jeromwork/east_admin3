export default {
    namespaced: true,
    mutations:{
        SETTOKEN(state,token) {
            state.token = token;
        }
    },
    state: {
        token:'',
    },
}