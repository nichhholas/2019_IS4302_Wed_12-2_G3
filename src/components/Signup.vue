<template>
  <div class="sign-up">
      <p> Let's create a new account</p><br>
      <input type="text" placeholder="Email" v-model="id" class="form-box"><br>
      <input type="password" placeholder="password" v-model="password" class="form-box"><br>
      <v-btn v-on:click="register(this.id)"> Sign Up </v-btn><br>
      <span>Or Return to <router-link to="/"> Login page</router-link></span>


  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      id:null,
      password:null
    };
  },
  methods: {
    async register(id){
        console.log(id);
        const url = "http://localhost:3004/api/org.acme.charity.Donor";
        axios.post(url,{
          "$class": "org.acme.charity.Donor",
          "Id": id,
          "funds": 0
        }).then(function(status){ 
            if(status.status == 200){
                alert("Your account has been created");
            }
        }).catch(function(error){
            alert("An error occurred, your account was not created");
        });
    },
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