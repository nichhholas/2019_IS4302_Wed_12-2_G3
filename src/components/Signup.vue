<template>
  <div class="sign-up">
      <p> Let's create a new account</p><br>
      <input type="text" placeholder="Email" class="form-box"><br>
      <input type="password" placeholder="password" class="form-box"><br>
      <button> Sign Up </button><br>
      <span>Or Return to <router-link to="/"> Login page</router-link></span>


  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style scoped>
.sign-up {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}

.form-box {
    margin-top: 25px;
    border-radius: 5px;
    border: solid 2px

}
</style>