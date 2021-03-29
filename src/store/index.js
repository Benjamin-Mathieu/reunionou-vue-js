import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage : window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins : [vuexLocal.plugin],
  state: {
    events: [],
    privateEvents: [],
    messages: [],
    jwtToken: false
  },
  mutations: {
    setEvents(state,events)
    {
      state.events= events;
    },
    setPrivateEvents(state,privateEvents)
    {
      state.privateEvents= privateEvents;
    },
    setMessages(state, messages)
    {
      state.messages = messages
    },
    setToken(state, jwtToken)
    {
      state.jwtToken = jwtToken;
    }
  },
  actions: {
  },
  modules: {
  }
})
