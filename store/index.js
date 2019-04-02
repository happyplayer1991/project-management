import axios from 'axios'
const cookieparser = require('cookieparser')
const cookie = require('js-cookie')

export const state = () => ({
  authUser: null,
  token: null,
})

export const mutations = {
  SET_USER: function (state, user) {
    if(user) {
      state.authUser = user
      state.token = user.token
      cookie.set('token', user.token)
    }
    else {
      state.authUser = null
      state.token = null
    }
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      let { token } = cookieparser.parse(req.headers.cookie)
      commit('SET_USER', { token: token })
    }
    /*
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
    */
  },
  async login({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Your Email or Password is incorrect.')
      }
      throw error
    }
  },
  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }

}
