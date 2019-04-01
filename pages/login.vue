<template>
  <div class="container bg-light-dark" v-if="!$store.state.authUser">
    <h1>LOGIN</h1>
    <form @submit.prevent="postLogin">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      <div class="form-group">
        <input v-model="formUsername" type="text" class="form-control" name="username" placeholder="Email">
      </div>
      <div class="form-group">
        <input v-model="formPassword" type="password" class="form-control" name="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-lg btn-light-blue font-weight-bold">LOGIN</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formError: null,
      formUsername: '',
      formPassword: ''
    }
  },
  methods: {
    async postLogin() {
      try {
        await this.$store.dispatch('login', {
          username: this.formUsername,
          password: this.formPassword
        })

        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
        this.$router.push('/')
      } catch (e) {
        this.formError = e.message
      }
    }
  }
}
</script>

<style>
.error {
  color: red;
}
.form-group {
  display: flex;
  margin-bottom: 1rem;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn-lg {
  width: 150px;
  padding: .5rem 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
}
.btn-light-blue {
  cursor: pointer;
  color: #fff;
  background-color: #395378;
  border-color: #395378;
}
.bg-light-dark {
  background: #f4f4f4;
}
.font-weight-bold {
  font-weight: 600;
}
</style>
