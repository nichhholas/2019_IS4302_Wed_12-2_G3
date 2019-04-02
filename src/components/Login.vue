<template>
  <div>
    <div class="login-for-beneficiaries">
      <h3>Sign in Page</h3>
      <input type="text" v-model= "account.memberID" placeholder="Email">
      <br>
      <input type="password" v-model= "account.password" placeholder="password">
      <br>
      <a> {{login_response}}</a>
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
          <button @click="login">Log in</button>
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
    return { 
      account:{

      },
      login_response: ''
};
  },
  methods: {
    loginB: function() {
      //console.log("pushed")
      /* eslint-disable*/
      var e = document.getElementById("sel1");
      var choice = e.options[e.selectedIndex].value;
      console.log(choice);
      this.account.role = choice;
      //add the authentcation here
      

      this.$router.push({ name: choice });
    },
    login() {
      let uri = "http://localhost:3000/";
      var e = document.getElementById("sel1");
      var choice = e.options[e.selectedIndex].value;
      this.account.role = choice;
      console.log(this.account.role);
      console.log(this.account.memberID);
      this.axios.post(uri, this.account).then(response => {
        console.log("login vue");
        console.log(response.data);
        if (response["data"] == "Wrong memberID" || response["data"] == "Wrong Password") {
          //this.account = null;
          this.login_response = "Wrong memberID/Password";
          this.$router.push({ name: "Login" });
        }else if(response['data'] == "Wrong role"){
          this.login_response = 'You do not have the permission to log in as a' + ' ' + this.account.role;
          this.$router.push({ name: "Login" });
        }else {
          this.account = response.data;
          console.log(choice);
          this.$router.push({ name: choice, params: {id:this.account.memberID} }); 
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