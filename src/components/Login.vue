<template>
  <div>
    <div class="login-for-beneficiaries">
      <h3>Sign in Page</h3>
      <input type="text" placeholder="Email">
      <br>
      <input type="password" placeholder="password">
      <br>
      <div class="text-center">
        <!--<div class="w-50">
          <b-form-select :options="options"></b-form-select>
        </div>-->
        <div class="form-group">
          <label for="sel1">Choose the type of participant you are:</label>
          <select class="form-control" id="sel1">
            <option value="Donor" selected="selected">Donor</option>
            <option value="Beneficiary">Beneficiary</option>
            <option value="Charity">Charity</option>
            <option value="Treasury">Treasury</option>
          </select>
          <button @click="loginB">Log in</button>
        </div>
      </div>
    </div>
    <br>
    <p> Or you can <router-link to="Signup"> an account now</router-link> </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    loginB: function() {
      //console.log("pushed")
      /* eslint-disable*/
      var e = document.getElementById("sel1");
      var choice = e.options[e.selectedIndex].value;
      console.log(choice);

      this.$router.push({ name: choice });
    },
    login() {
      let uri = "http://localhost:3000/";
      this.axios.post(uri, this.account).then(response => {
        console.log("login vue");
        console.log(response.data);
        if (
          response["data"] == "Wrong memberID" ||
          response["data"] == "Wrong Password"
        ) {
          //this.account = null;
          this.beneficiary_login_response = "Wrong memberID/Password";
          this.$router.push({ name: "Login" });
        } else {
          this.account = response.data;
          //this.$router.push({name: 'Beneficiary'})
          var e = document.getElementById("sel1");
          var choice = e.options[e.selectedIndex].value;
          console.log(choice);

          this.$router.push({ name: choice }); 
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 40px;
}

.form-group {
  width: 50%;
  margin: 0 auto;
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

.text-center {
  text-align: center;
  display: inline;
  width: 45%;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
</style>