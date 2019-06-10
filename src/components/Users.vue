<template>
  <div class="users">
    <div class="container">
      <h2>{{ msg }}</h2>
      <div class="row text-right">
        <div class="col-12">
          <router-link to="/editing0" class="btn btn-success mb-2">Add users</router-link>
        </div>
      </div>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">surname</th>
            <th scope="col">phone</th>
            <th scope="col">email</th>
            <th scope="col">-</th>
            <th scope="col">-</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in results" v-bind:key="item.id">
            <th scope="row">{{index + 1}}</th>
            <td>{{item.name}}</td>
            <td>{{item.surname}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.email}}</td>
            <td>
              <button class="btn btn-danger" @click="deleteUser(item.id)">delete</button>
            </td>
            <td>
              <button class="btn btn-primary" @click="editUser(item.id)">edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  props: {
    msg: String
  },
  methods: {
    getUsers() {
      this.$store.dispatch("getUsers");
    },
    deleteUser(idUser) {
      swal({
        title: "Удалить пользователя?",
        text: "Данные пользователя удаляются навсегда!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch("deleteUser", idUser);
          swal("Пользователь удален!", {
            icon: "success"
          });
        } else {
          swal("Отмена удаления");
        }
      });
    },
    editUser(idUser) {
      this.$router.push({ name: "editing", params: { Pid: idUser } });
    },
    addUser() {
      this.$store.dispatch("addUser");
    }
  },
  computed: {
    results() {
      return this.$store.getters.results;
    }
  },
  created() {
    this.getUsers();
  }
};
</script>
