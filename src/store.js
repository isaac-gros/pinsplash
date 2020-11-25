import Unsplash, { toJson } from 'unsplash-js';
import { createStore } from 'vuex';

const unsplash = new Unsplash({ accessKey: process.env.VUE_APP_UNSPLASH_KEY });
export default createStore({
  state: {
    loading: false,
    currentPage: 0,
    pictures: []
  },
  mutations: {
    setLoading (state, loading) {
      state.loading = loading;
    },
    incrementCurrentPage(state) {
      state.currentPage++;
    },
    addPictures (state, newPictures) {
      state.pictures.push(newPictures);
    }
  },
  getters: {
    getPictures: state => {
      return state.pictures
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
    debug({ commit, state }) {
      console.log(commit);
      console.log(state);
    }
  }
})