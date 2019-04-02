<template>
  <div id="app">
    <h3>Withdrawal</h3>
    <input v-model="amount">
    <button v-on:click="makeWithdrawal(amount)"> Make Withdrawal </button> 
    <br><br>
    <h3>Total Withdrawals Made</h3>
    <p>{{calculateWithdrawals}} </p>

     <!-- start of collapsible -->
    <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button href="#" v-b-toggle.accordion-1 variant="info">My Withdrawals</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>

          <!-- Withdrawal Records Collapsible Buttons -->
        <b-button v-b-toggle.collapse-1-inner class="m-1">Pending</b-button>
        <b-button v-b-toggle.collapse-2-inner class="m-1">Confirmed</b-button>
        <b-button v-b-toggle.collapse-3-inner class="m-1">Rejected</b-button>

        <b-collapse id="collapse-1-inner" class="mt-2">
            <b-card-text>
                <u><h4> Pending Withdrawals </h4></u>
                <table id="firstTable" class="center">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>DocumentID</th>
                    <th>From</th>
                    <th>Treasury</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in this.pendingWithdrawals" :key="row.transactionId">
                    <td>{{row.type}}</td>
                    <td>{{row.documentID}}</td>
                    <td>{{row.creator}}</td>
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
                <u><h4> Confirmed Withdrawals </h4></u>
                <table id="firstTable" class="center">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>DocumentID</th>
                    <th>From</th>
                    <th>Treasury</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in this.confirmedWithdrawals" :key="row.transactionId">
                    <td>{{row.type}}</td>
                    <td>{{row.documentID}}</td>
                    <td>{{row.creator}}</td>
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
                <u><h4> Rejected Withdrawals </h4></u>
                <table id="firstTable" class="center">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>DocumentID</th>
                    <th>From</th>
                    <th>Treasury</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in this.rejectedWithdrawals" :key="row.transactionId">
                    <td>{{row.type}}</td>
                    <td>{{row.documentID}}</td>
                    <td>{{row.creator}}</td>
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

  <!-- end of collapsible -->

    <br>
    <br>

    <button v-on:click="goToCharity()">Back</button>
    <button @click="logout" >Log Out</button>
  </div>
</template>

<script>

import axios from "axios"
import router from '@/router/index.js'

export default {
  name: 'Withdrawal',
  data() {
    return{
        amount: 0,
        confirmedWithdrawals: [],
        rejectedWithdrawals: [],
        pendingWithdrawals:[],
        id: this.$route.params.id,
    }
  },
  components: {
  },
  mounted() {
    this.fetchConfirmedWithdrawals();
    this.fetchRejected();
    this.fetchPending();
  },
  computed: {
    calculateWithdrawals: function() {
      var sum =0;
      console.log(this.confirmedWithdrawals.length);
      for (var i=0; i< this.confirmedWithdrawals.length; i++) {
        // console.log(sum)
        sum = sum + this.confirmedWithdrawals[i].amount;
      }
      return sum;
      console.log(sum)
    }
  },
  methods:{
    makeWithdrawal(amount){
        console.log(amount);
        const url = "http://localhost:3001/api/org.acme.charity.Withdraw";
        var documentID_num = 'W' + Math.floor((Math.random() * 99999) + 10000).toString();
        axios.post(url,{"amount":amount, "documentID": documentID_num}).then(function(status){ 
            if(status.status == 200){
                alert("Your withdrawal of $"+amount+ " has been recorded, please wait for confirmation from the Treasury, before it is reflected in 'View Withdrawals'");
            }
        }).catch(function(error){
            alert("An error occurred, your donation was not recorded");
        });
    },
    async fetchConfirmedWithdrawals(){
      console.log("fetch withdrawals");
      await fetch("http://localhost:3002/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%20%22Successful%22%2C%20%22type%22%3A%20%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.confirmedWithdrawals = data
          ))
    },
    async fetchPending(){
      console.log("fetch rejected");
      await fetch("http://localhost:3002/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%20%22Pending%22%2C%20%22type%22%3A%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.pendingWithdrawals = data
          ))
    },
    async fetchRejected(){
      console.log("fetch rejected");
      await fetch("http://localhost:3002/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%20%22Denied%22%2C%20%22type%22%3A%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.rejectedWithdrawals = data
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

/* button {
  margin-top: 20px;
  width: 0px;
  cursor: pointer;
} */
</style>
