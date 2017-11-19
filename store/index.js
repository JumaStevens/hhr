import Vuex from 'vuex'
import firebase from '~/plugins/firebase'

const createStore = () => {
  return new Vuex.Store({
    state: {
      jobPosts: [],
      currentUser: null,
      menuOpen: false
    },
    mutations: {
      addJobPost (state, payload) {
        state.jobPosts.push(payload)
      },
      clearJobPosts (state) {
        state.jobPosts.length = 0
      },
      setCurrentUser (state, payload) {
        state.currentUser = payload
      },
      toggleMenuOpen (state) {
        state.menuOpen = !state.menuOpen
      }
    },
    actions: {
      nuxtServerInit ({ commit }) {
        // initialize jobPosts with all job posts from Firebase
        firebase.database().ref('posts').on('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            const data = childSnapshot.val()
            data.key = childSnapshot.key
            commit('addJobPost', data)
          })
        })
      },
      getCurrentUser ({ commit }) {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            commit('setCurrentUser', firebase.auth().currentUser)
          } else {
            commit('setCurrentUser', null)
          }
        })
      },
      getJobPosts ({ commit }) {
        commit('clearJobPosts')
        firebase.database().ref('posts').on('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            const data = childSnapshot.val()
            data.key = childSnapshot.key
            commit('addJobPost', data)
          })
        })
      }
    },
    getters: {
      getCurrentUser: (state) => {
        return state.currentUser
      },
      getCurrentUserPosts: (state) => {
        const user = state.currentUser
        const posts = state.jobPosts
        if (user && posts.length) {
          return posts.filter(post => {
            return post.user_email === user.email
          })
        } else {
          return []
        }
      }
    }
  })
}

export default createStore
