import { createApi, toJson } from 'unsplash-js';
import { createStore } from 'vuex';

const unsplash = createApi({ accessKey: process.env.VUE_APP_UNSPLASH_KEY });
export default createStore({
  state: {
    error: false,
    loading: false,
    currentPage: 1,
    pictures: [],
    pins: [],
  },
  mutations: {
    setLoading (state, loading) {
      state.loading = loading
    },
    setError (state, error) {
      state.error = error
    },
    incrementCurrentPage(state) {
      state.currentPage++
    },
    resetCurrentPage(state) {
      state.currentPage = 0
    },
    addPictures (state, newPictures) {
      state.pictures.push(newPictures)
    },
    resetCurrentPictures(state) {
      state.pictures = []
    },
    addPin (state, picture) {
      state.pins.push(picture)
    },
    removePin (state, picture) {
      let pinToRemove = null;
      state.pins.forEach((pinnedPicture, index) => {
        pinToRemove = (pinnedPicture.id === picture.id) ? index : pinToRemove;
      })

      if(pinToRemove != null) {
        state.pins.splice(pinToRemove, 1)
      } else {
        console.log('Nothing deleted') 
      }
    }
  },
  getters: {
    pinsCount: state => {
      return state.pins.length
    }
  },
  actions: {

    /**
     * Picture fetching
     */
    fetchPictures: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)

        unsplash.photos.list({ page: state.currentPage }, 10)
          .then(toJson)
          .then(response => {
            console.log(response)

            if(response.status != 200) {
              console.error('One or several errors occured. ', response.errors)
              commit('setError', true)
              commit('setLoading', false)
              reject(response.errors)
            } else {
              let newPage = {
                'page': state.currentPage,
                'pictures': response.response.results
              }
              commit('incrementCurrentPage')
              commit('addPictures', newPage)
              commit('setLoading', false)
              resolve(state.pictures)
            }
          })
          .catch(error => {
            commit('setError', true)
            commit('setLoading', false)
            console.error('One or several errors occured. ', error)
            reject(error)
          })
      })
    },
    searchPictures: ({commit, state}, queryString) => {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('incrementCurrentPage')

        unsplash.search.photos(queryString, state.currentPage, 10)
          .then(toJson)
          .then(response => {
            if(response.errors) {
              console.error('One or several errors occured. ', response.errors)
              commit('setError', true)
              commit('setLoading', false)
              reject(response.errors)
            } else {
              if(response.total > 0) {
                let newPage = {
                  'page': state.currentPage,
                  'pictures': response.results
                }
                commit('addPictures', newPage)
                commit('setLoading', false)
                resolve({
                  'total': response.total,
                  'pictures': state.pictures
                })
              } else {
                resolve({
                  'total': 0,
                  'pictures': state.pictures
                })
              }
            }
          })
          .catch(error => {
            commit('setError', true)
            commit('setLoading', false)
            console.error('One or several errors occured. ', error)
            reject(error)
          })
      })
    },
    resetPictures: ({commit, state}) => {
      return new Promise((resolve, reject) => {
        try {
          commit('resetCurrentPage')
          commit('resetCurrentPictures')
          resolve(state.pictures)
        } catch(error) {
          console.log(error)
          reject()
        }
      })
    },

    /**
     * Pins actions
     */
    addPin: ({commit, state}, picture) => {
      return new Promise((resolve, reject) => {
        try {
          commit('addPin', picture)
          resolve(state.pins)
        } catch(error) {
          console.log(error)
          reject()
        }
      })
    },
    removePin: ({commit, state}, picture) => {
      return new Promise((resolve, reject) => {
        try {
          commit('removePin', picture)
          resolve(state.pins)
        } catch (error) {
          console.log(error)
          reject()
        }
      })
    },
    getPins: ({state}) => {
      return new Promise((resolve) => {
        resolve(state.pins)
      })
    },
  }
})