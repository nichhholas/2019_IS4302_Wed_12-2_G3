<template>
  <div class="sign-up">
      <p> Let's create a new account</p><br>
      <input type="text" placeholder="Email" v-model="new_account.memberID" class="form-box"><br>
      <input type="password" placeholder="password" v-model="new_account.password" class="form-box"><br>
      <v-btn v-on:click="createUser()"> Sign Up </v-btn><br>
      <a> {{register_response}} </a>
      <span><router-link to="/"> Login page</router-link></span>


  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      new_account:{},
      register_response: '',
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
    createUser(){
      console.log("Hello?")
      let uri = 'http://localhost:3000/Signup';
      console.log(uri);
      console.log(this.new_account.password);
      this.new_account.role = 'Donor';
      console.log(this.new_account.role);
      this.axios.post(uri, this.new_account).then((response) => {
        console.log("here?")
        console.log(response);
        console.log(response["data"]);
        if (response["data"] == "memberID has been taken"){
          this.register_response = 'memberID has been taken. Please select another'
          this.$router.push({name: 'Signup'})
        }else{
          // register(this.new_account.memberID);
          this.register_response = 'Account has been successfully created. Head over to the'
        }
      })
    }
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