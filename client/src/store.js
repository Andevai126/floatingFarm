import { createStore } from 'vuex';

const store = createStore({
    state: {
        loggedIn: false, // Initial state
    },
    mutations: {
        setLoggedIn(state, loggedIn) {
            state.loggedIn = loggedIn;
        }
    },
    actions: {
        setLoggedIn({ commit }, loggedIn) {
            commit('setLoggedIn', loggedIn);
        }
    },
    getters: {
        loggedIn: (state) => state.loggedIn
    }
});

export default store;