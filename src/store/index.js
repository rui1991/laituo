import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  info: {

  }
}

const getters = {

}

const mutations = {
  // 保存用户基本信息
  setLoginInfo (state, infos) {
    state.info = infos
  }
}

const actions = {

}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
