import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //title: 'tituloooo'
    artists: [],
  },

  getters: {
    //title: state => state.artists
  },

  mutations: {

    setArtists(state, artists) {
      state.artists = artists;
    },
    addArtist(state, artist) {
      state.artists.push(artist);
    },
    updateArtist(state, { index, artist }) {
      Vue.set(state.artists, index, artist);
    },
    deleteArtist(state, index) {
      state.artists.splice(index, 1);
    },
  },

  actions: {
    
    fetchArtists({ commit }) {
      // Simula una llamada a una API o carga inicial de datos
      const artists = [
        {
          name: 'Aespa',
          numeroalbums: 6,
          seguidores: 11.4,
          anioinicio: 2020,
        },
        
        {
          name: 'Blackpink',
          numeroalbums: 5,
          seguidores: 57.5,
          anioinicio: 2016,
        },
        {
          name: 'BTS',
          numeroalbums: 22,
          seguidores: 74,
          anioinicio: 2013,
        },
        {
          name: 'Itzy',
          numeroalbums: 10,
          seguidores: 19.7,
          anioinicio: 2019,
        },
        {
          name: 'Mamamoo',
          numeroalbums: 15,
          seguidores: 7.8,
          anioinicio: 2014,
        },
        {
          name: 'Twice',
          numeroalbums: 32,
          seguidores: 28.8,
          anioinicio: 2015,
        }, 
      ];
      commit('setArtists', artists);
    },
    
  },

  modules: {
  }
})
