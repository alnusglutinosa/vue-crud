<template>
  <div class="form-section">
    <div class="container">
      <h2>{{ this.$route.params.Pid === "0" ? 'Add user' : `Edit user ${this.$route.params.Pid}` }}</h2>

      <form class="form" id="form" @submit.prevent="onSignup">
        <div class="form-group">
          <label for="name">Name *</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': $v.user.name.$error }"
            id="name"
            placeholder="Name"
            v-model="user.name"
            name="name"
            @blur="$v.user.name.$touch()"
          >

          <div v-if="$v.user.name.$error" class="form-main__item-error error-text">
            <p v-if="!$v.user.name.required">Name is required</p>
            <p v-if="!$v.user.name.minLength">User name, should be 2-30 characters</p>
          </div>
        </div>
        <div class="form-group">
          <label for="inputSurname">Surname *</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': $v.user.surname.$error }"
            id="inputSurname"
            placeholder="Surname"
            v-model="user.surname"
            name="surname"
            @blur="$v.user.surname.$touch()"
          >

          <div v-if="$v.user.surname.$error" class="form-main__item-error error-text">
            <p v-if="!$v.user.surname.required">Surname is required</p>
            <p v-if="!$v.user.surname.minLength">Surname, should be 2-30 characters</p>
          </div>
        </div>

        <div class="form-group">
          <label for="inputPhone">Phone *</label>
          <input
            type="tel"
            class="form-control"
            :class="{'is-invalid': $v.user.phone.$error }"
            id="inputPhone"
            placeholder="Enter phone"
            v-model="user.phone"
            name="phone"
            @blur="$v.user.phone.$touch()"
          >

          <div class="form-main__item-error error-text">
            <p v-if="!$v.user.phone.required && $v.user.phone.$error">Phone is required</p>
            <p
              v-if="!$v.user.phone.minLength || !$v.user.phone.maxLength"
            >Phone, should be 2-30 characters</p>
          </div>
        </div>

        <div class="form-group">
          <label for="inputEmail1">Email address *</label>
          <input
            type="email"
            class="form-control"
            :class="{'is-invalid': $v.user.email.$error }"
            id="inputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="user.email"
            name="email"
            @blur="$v.user.email.$touch()"
          >

          <div v-if="$v.user.email.$error" class="form-main__item-error error-text">
            <p v-if="!$v.user.email.required">Email is required</p>
            <p v-if="!$v.user.email.email">Email is invalid</p>
          </div>
        </div>

        <button
          type="submit"
          :disabled="!formIsValid"
          class="btn btn-success"
        >{{ this.$route.params.Pid === "0" ? 'Add user' : 'Edit user' }}</button>
      </form>

      <br>
      <br>

      <form class="form" id="form-json" @submit.prevent="onJsonSignup">
        <div class="form-group">
          <label for="textareaJson">Import JSON:</label>
          <textarea
            v-model="jsonUser"
            name="textareaJson"
            id="textareaJson"
            cols="20"
            rows="7"
            class="form-control"
          ></textarea>
        </div>

        <div v-if="errors.length">
          <p class="text-danger">
            <b>Пожалуйста исправьте указанные ошибки:</b>
          </p>
          <ul class="text-danger">
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
          </ul>
        </div>

        <button type="submit" class="btn btn-primary">Import JSON</button>
      </form>

      <br>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
  helpers
} from "vuelidate/lib/validators";
import { error } from "util";
import { close } from "fs";

export default {
  name: "Form",
  data() {
    return {
      errors: [],
      user: {
        id: null,
        name: null,
        surname: null,
        phone: null,
        email: null
      },
      jsonUser:
        '{"name": "name Json", "surname": "surname json", "phone": "09712388", "email": "testjson@ukr.net" }'
    };
  },
  props: {
    msg: String
  },
  validations: {
    user: {
      name: { required, minLength: minLength(2), maxLength: maxLength(30) },
      surname: { required, minLength: minLength(2), maxLength: maxLength(30) },
      email: { required, email },
      phone: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(30)
      }
    }
  },
  computed: {
    formIsValid: function() {
      return !this.$v.$invalid;
    },
    results() {
      return this.$store.getters.results;
    }
  },
  methods: {
    onSignup(event) {
      if (this.$route.params.Pid === "0") {
        this.addUser();
      } else {
        this.editUser();
      }
    },
    onJsonSignup() {
      let jsonUser;
      this.errors = [];

      try {
        jsonUser = JSON.parse(this.jsonUser);
      } catch (err) {
        this.errors.push("Неверный формат JSON");
        return;
      }

      if (Object.prototype.toString.call(jsonUser) !== "[object Object]") {
        this.errors.push("JSON не объект");
      }

      if (Object.prototype.hasOwnProperty.call(jsonUser, "name")) {
        this.user.name = jsonUser.name;
      }

      if (Object.prototype.hasOwnProperty.call(jsonUser, "surname")) {
        this.user.surname = jsonUser.surname;
      }

      if (Object.prototype.hasOwnProperty.call(jsonUser, "phone")) {
        this.user.phone = jsonUser.phone;
      }

      if (Object.prototype.hasOwnProperty.call(jsonUser, "email")) {
        this.user.email = jsonUser.email;
      }
    },
    addUser() {
      this.$store.dispatch("addUser", this.user);
      this.clearUser();
      swal("Готово", "Пользователь создан!", "success");
      this.$router.push({ name: "home" });
    },
    editUser() {
      this.$store.dispatch("editUser", this.user);
      this.clearUser();
      swal("Готово", "Пользователь отредактирован!", "success");
      this.$router.push({ name: "home" });
    },
    clearUser() {
      this.user = {
        id: null,
        name: null,
        surname: null,
        phone: null,
        email: null
      };
    },
    getUserFromParams() {
      if (this.$route.params.Pid !== "0") {
        const results = this.$store.getters.results;
        const currentUser = results.filter(
          item => item.id == this.$route.params.Pid
        );

        if (currentUser.length && currentUser[0].id) {
          this.user = {
            id: currentUser[0].id,
            name: currentUser[0].name,
            surname: currentUser[0].surname,
            phone: currentUser[0].phone,
            email: currentUser[0].email
          };
        } else {
          swal("Неверный ИД пользователя", "ИД не найден!", "warning");
          this.$router.push({ name: "home" });
        }
      }
    },
  },
  created() {
    this.getUserFromParams();
  },
  watch: {
    $route(to, from) {
      // обрабатываем изменение параметров маршрута...
      if (this.$route.params.Pid == "0") {
        this.user = {
          id: null,
          name: null,
          surname: null,
          phone: null,
          email: null
        };
      } else {
        this.getUserFromParams();
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  .form-section .container
    max-width: 40rem

  .form
    text-align: left

  .disabled
    cursor: not-allowed

  .error-text
    color: #dc3545 !important
</style>
