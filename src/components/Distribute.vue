<template>
  <div id="app">
    <h3>Make Distribution</h3>
    <input v-model="amount" size="25" placeholder="Amount" class="form-box"><br>
    <input v-model="beneficiary" size="25" placeholder="Beneficiary ID" class="form-box"><br>
    <v-btn depressed small colour='primary' v-on:click="makeDistribution(amount,beneficiary)"> Distribute </v-btn> <br><br>

    <h3>Total Distributions</h3>
    <p>{{calculateDistributions}}</p>

    <!-- start of collapsible -->
    <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button href="#" v-b-toggle.accordion-1 variant="info">My Distributions</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>

          <!-- Withdrawal Records Collapsible Buttons -->
        <b-button v-b-toggle.collapse-1-inner class="m-1">Pending</b-button>
        <b-button v-b-toggle.collapse-2-inner class="m-1">Confirmed</b-button>
        <b-button v-b-toggle.collapse-3-inner class="m-1">Rejected</b-button>

        <b-collapse id="collapse-1-inner" class="mt-2">
          <b-card-text>
            <u><h4> Pending Distributions </h4></u>
            <table id="firstTable" class="center"> 
              <thead>
                <tr>
                  <th>DocumentID</th>
                  <th>To</th>
                  <th>Treasury</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.pendingDistributions" :key="row.transactionId">
                  <td>{{row.documentID}}</td>
                  <td>{{row.beneficiary}}</td>
                  <td>{{row.treasury}}</td>
                  <td>{{row.amount}}</td>
                  <td>{{row.status}}</td>
                </tr>
              </tbody>
            </table>
          </b-card-text>
        </b-collapse>

        <b-collapse id="collapse-2-inner" class="mt-2">
          <b-card-text>
            <u><h4> Confirmed Distributions </h4></u>
            <table id="firstTable" class="center"> 
              <thead>
                <tr>
                  <th>DocumentID</th>
                  <th>To</th>
                  <th>Treasury</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.confirmedDistributions" :key="row.transactionId">
                  <td>{{row.documentID}}</td>
                  <td>{{row.beneficiary}}</td>
                  <td>{{row.treasury}}</td>
                  <td>{{row.amount}}</td>
                  <td>{{row.status}}</td>
                </tr>
              </tbody>
            </table>
          </b-card-text>
        </b-collapse>

        <b-collapse id="collapse-3-inner" class="mt-2">
          <b-card-text>
            <u><h4> Rejected Distributions </h4></u>
            <table id="firstTable" class="center"> 
              <thead>
                <tr>
                  <th>DocumentID</th>
                  <th>To</th>
                  <th>Treasury</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in this.rejectedDistributions" :key="row.transactionId">
                  <td>{{row.documentID}}</td>
                  <td>{{row.beneficiary}}</td>
                  <td>{{row.treasury}}</td>
                  <td>{{row.amount}}</td>
                  <td>{{row.status}}</td>
                </tr>
              </tbody>
            </table>
          </b-card-text>
        </b-collapse>

        </b-card-body>
      </b-collapse>
    </b-card>

  </div>

    <br>
    <v-btn depressed small colour='primary' v-on:click="goToCharity()">Back</v-btn>
    <v-btn depressed small colour='primary' @click="logout" >Log Out</v-btn>

  </div>
</template>

<script>

import axios from "axios"
import router from '@/router/index.js'

export default {
  name: 'Distribute',
  data() {
    return{
        amount: null,
        confirmedDistributions: [],
        showDistributions: false,
        id: this.$route.params.id,
        showRejectedDistributions: false,
        rejectedDistributions: [],
        pendingDistributions: [],
        beneficiary: null,
    }
  },
  mounted() {
    this.fetchDistributions();
    this.fetchRejected();
    this.fetchPending();
  },
  computed: {
    calculateDistributions: function() {
      var sum =0;
      console.log(this.confirmedDistributions.length);
      for (var i=0; i< this.confirmedDistributions.length; i++) {
        // console.log(sum)
        sum = sum + this.confirmedDistributions[i].amount;
      }
      return sum;
      console.log(sum)
    }
  },
  methods:{

    async makeDistribution(amount, beneficiary){
        console.log(beneficiary);
        const url = "http://localhost:3002/api/org.acme.charity.Distribute";
        console.log("org.acme.charity.Beneficiary#"+beneficiary);
        var documentID_num = 'B' +Math.floor((Math.random() * 99999) + 10000).toString();
        await axios.post(url,{"amount":amount, "documentID": documentID_num,"beneficiary": "org.acme.charity.Beneficiary#"+beneficiary}).then(function(status){ 
            if(status.status == 200){
                alert("Your distribution of $"+amount+ " to beneficiary "+beneficiary+" has been recorded, please wait for confirmation from the Treasury, before it is reflected in 'View Distributions'");
            }
        }).catch(function(error){
            alert("An error occurred, your distribution was not recorded");
        });
    },
    async fetchDistributions(){
      console.log("fetch distributions");
      await fetch("http://localhost:3002/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22status%22%3A%22Successful%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.confirmedDistributions = data
          ))
    },
    async fetchRejected(){
      console.log("fetch rejected distributions");
      await fetch("http://localhost:3002/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22status%22%3A%22Denied%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.rejectedDistributions = data
          ))
    },

    async fetchPending(){
      console.log("fetch rejected distributions");
      await fetch("http://localhost:3002/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22status%22%3A%22Pending%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.pendingDistributions = data
          ))
    },

    goToCharity(){
      this.$router.replace({ name: 'Charity', params: { id: this.id}});
    },
    logout: function() {
      //console.log("pushed")
      this.$router.push({ name: "Login" });
    }
  }
}
</script>

<style>
h3{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form-box {
    margin-top: 25px;
    border-radius: 5px;
    border: solid 2px

}

/* button {
  margin-top: 20px;
  width: 0px;
  cursor: pointer;
} */
</style>
