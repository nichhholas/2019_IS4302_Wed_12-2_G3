<template>
  <v-app light>
    <v-toolbar class="white">
      <v-toolbar-side-icon>
        <img :src="imageLink.logo" alt="Vuetify.js" height="15%" width="80%">
      </v-toolbar-side-icon>
      <p>Beta</p>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!--<v-btn flat>Blog</v-btn>-->
        <!--<v-btn flat class="pink lighten-3">Sign In</v-btn>-->
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax :src="imageLink.sub_main" height="600">
          <v-layout column align-center justify-center class="white--text">
            <!--<h1
              class="white--text mb-2 display-1 text-xs-center"
              style="font-weight: 900; text-shadow: 3px 2px #000000"
            >CHAinRITY</h1>
            <div
              class="white--text subheading mb-3 text-xs-center"
              style="font-weight: 900; text-shadow: 3px 2px #000000"
            >Creating a more transparent way to donate</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/pre-made-themes"
            >Creating a more transaprent way to donate</v-btn>-->
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout column wrap class="my-5" align-center>
          <img src="https://i.postimg.cc/Y9592WR4/LOGO.png">
          <h2> Creating a more Transparent way to donate to fundraising events </h2><br><br>
          <h3>Sign in Page</h3>
          <v-flex xs12 sm6 md3>
            <v-text-field label="Email" outline></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md3>
            <v-text-field label="Password" outline></v-text-field>
          </v-flex>
          
          <v-flex xs12 sm6 d-flex>
            <v-select :roles="roles" label="Roles" solo></v-select>
          </v-flex>
          <!--<input type="text" placeholder="Email">
          <input type="text" v-model= "account.memberID" placeholder="Email">
          <br>
          <input type="password" v-model= "account.password" placeholder="password">
          <br>
          <div class="form-group">
            <label for="sel1">Choose the type of participant you are:</label>
            <select class="form-control" id="sel1">
              <option value="Donor" selected="selected">Donor</option>
              <option value="Beneficiary">Beneficiary</option>
              <option value="Charity">Charity</option>
              <option value="Treasury">Treasury</option>
            </select>
            <button @click="loginB">Log in</button>
          </div>-->
             <v-btn color="info" @click="login">Login</v-btn>
                 <p> Or you can <router-link to="Signup"> an account now</router-link> </p>
        

          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">Transparent</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">All transactions are logged</div>
                    </v-card-title>
                    <v-card-text>
                      Using CHAinRITY, all the transactions between Donors, Charities, Treasury and the Beneficiaries
                      are recorded onto the blockchain. The transactions can be viewed with a simple click of a button.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">Accountable</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Treasuries approves transfers</div>
                    </v-card-title>
                    <v-card-text>
                      A treasury ,such as banks now would approve or reject transactions to ensure and legitimise all the transactions. This
                      can prevent siphoniing or misused of funds
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">Accurate</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Confirmation of funds</div>
                    </v-card-title>
                    <v-card-text>
                      In every step, the recipeint has to verify the transactions.
                      This can prevent situations where a beneficiary may have been accidentally left out of the distribution of funds
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12 class="text-xs-center">
            <div class="white--text ml-3">CHAinRITY 2019</div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      account: {

      },
      login_response: "",
      title: "CHAinRITY",
      imageLink: {
        sub_main:
          "https://www.runsociety.com/wp-content/uploads/2018/04/Run-and-Raisin-2018-Singapore-thumb-960x540.jpg",
        logo: "https://i.postimg.cc/Nf4HDdbp/logo-new.png",
        roles: ["Donor", "Beneficiary", "Charity", "Treasury"]
      }
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
      console.log("it's old")
      console.log(this.account.memberID);
      this.axios.post(uri, this.account).then(response => {
        console.log("login vue");
        console.log(response.data);
        if (
          response["data"] == "Wrong memberID" ||
          response["data"] == "Wrong Password"
        ) {
          //this.account = null;
          this.login_response = "Wrong memberID/Password";
          this.$router.push({ name: "Login" });
        } else if (response["data"] == "Wrong role") {
          this.login_response =
            "You do not have the permission to log in as a" +
            " " +
            this.account.role;
          this.$router.push({ name: "Login" });
        } else {
          this.account = response.data;
          console.log(choice);
          console.log("this.account.memberID");
          this.$router.push({
            name: choice,
            params: { id: this.account.memberID }
          });
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
<style scoped > .finedTitle {
  font-weight: 900;
  text-shadow: 2px 2px #000000;
}

.social-icon {
  font-size: 21px;
  color: white;
}
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
</style>