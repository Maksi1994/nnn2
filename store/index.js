const cookieparser = process.server ? require('cookieparser') : undefined
import Vuex from 'vuex';

new Vuex.Store({
  state: () => ({
    user: null
  }),
  mutations: {
      setUser(state, userData) {
        state.user = userData;
      }
  },
  actions: {
    async nuxtServerInit ({ commit, $axios }, { req }) {
      let authUser;

      if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie)
        try {
          if (parsed.auth) {
            authUser = await $axios.get('/get-curr-user');
          }
        } catch (err) {
            // No valid cookie found
        }

        commit('setUser', authUser);
      }
    }
  },
  modules: {

  }
});
