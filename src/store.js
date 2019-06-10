import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// localStorage persistence
var STORAGE_KEY = 'test-vue-5';
var userLocalStorage = {
  fetch: function() {
    var usersLocal = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return usersLocal;
  },
  save: function(usersLocal) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usersLocal));
  },
};
var usersLocal = userLocalStorage.fetch();

export default new Vuex.Store({
  state: {
    users: [],
  },
  getters: {
    results(state) {
      if (!state.users.length > 0) {
        return [];
      }

      return state.users.map(item => {
        item.name = item.name.toUpperCase();
        return item;
      });
    },
    getNewId(state) {
      if (state.users.length === 0) {
        return 1;
      }

      const newId =
        state.users.reduce((prev, current) => (prev.id < current.id ? current : prev)).id + 1;
      return newId;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    set(state, { type, items }) {
      state[type] = items;
    },
    addUser(state, payload) {
      state.users.push(payload);
    },
    updateUser(state, updUser) {
      const index = state.users.findIndex(item => item.id === item.id);
      if (index !== -1) {
        state.users.splice(index, 1, updUser);
      }
    },
    deleteUser(state, id) {
      state.users = state.users.filter(item => item.id !== id);
    },
  },
  actions: {
    getUsers({ state, dispatch, commit }, query = '') {
      const users = userLocalStorage.fetch();

      commit('set', { type: 'users', items: users });
    },
    deleteUser({ state, dispatch, commit }, idUser) {
      const users = state.users.filter(x => x.id !== idUser);
      userLocalStorage.save(users);
      commit('deleteUser', idUser);
    },
    editUser({ state, dispatch, commit }, editUser) {
      const users = state.users.slice();
      users.forEach(item => {
        if (item.id === editUser.id) {
          Object.assign(item, editUser);
        }
      });
      userLocalStorage.save(users);

      commit('updateUser', editUser);
    },
    addUser({ state, dispatch, commit }, newUser) {
      const user = Object.assign({}, newUser);
      user.id = this.getters.getNewId;

      const users = state.users.slice();
      users.push(user);
      userLocalStorage.save(users);

      commit('addUser', user);
    },
  },
});
