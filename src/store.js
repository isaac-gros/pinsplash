import Unsplash, { toJson } from 'unsplash-js';
import { createStore } from 'vuex';

const unsplash = new Unsplash({ accessKey: process.env.VUE_APP_UNSPLASH_KEY });
export default createStore({
  state: {
    loading: false,
    currentPage: 0,
    pictures: [],
    pins: [],
  },
  mutations: {
    setLoading (state, loading) {
      state.loading = loading
    },
    incrementCurrentPage(state) {
      state.currentPage++
    },
    addPictures (state, newPictures) {
      state.pictures.push(newPictures)
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
    fetchPictures: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        commit('setLoading', true)
        commit('incrementCurrentPage')

        unsplash.photos.listPhotos(state.currentPage, 10)
          .then(toJson)
          .then(response => {
            let newPage = {
              'page': state.currentPage,
              'pictures': response
            }
            commit('addPictures', newPage)
            commit('setLoading', false)
            resolve(state.pictures)
          })
          .catch(error => {
            commit('setLoading', false)
            console.log(error)
            reject()
          })
      })
    },
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