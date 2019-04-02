<template>
  <div id="app">
    <h3>Withdrawal</h3>
    <input v-model="amount">
    <button v-on:click="makeWithdrawal(amount)"> Withdraw </button> <br><br>
    <button v-on:click="fetchWithdrawals()">View Withdrawals</button>
    <br>
    <table id="firstTable" class="center" v-if="showWithdrawals"> 
    
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
        <tr v-for="row in this.withdrawals" :key="row.transactionId">
          <td>{{row.type}}</td>
          <td>{{row.documentID}}</td>
          <td>{{row.creator}}</td>
          <td>{{row.treasury}}</td>
          <td>{{row.amount}}</td>
          <td>{{row.status}}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
    <button v-on:click="fetchRejected()">View Rejected Withdrawals</button> <br>
    <table id="firstTable" class="center" v-if="showRejectedWithdrawals"> 
    
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
        <tr v-for="row in this.withdrawals" :key="row.transactionId">
          <td>{{row.type}}</td>
          <td>{{row.documentID}}</td>
          <td>{{row.creator}}</td>
          <td>{{row.treasury}}</td>
          <td>{{row.amount}}</td>
          <td>{{row.status}}</td>
        </tr>
      </tbody>
    </table>
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
        withdrawals: null,
        showWithdrawals: false,
        rejectedWithdrawals: null,
        showRejectedWithdrawals: false,
        id: this.$route.params.id,
    }
  },
  components: {
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
    async fetchWithdrawals(){
      console.log("fetch withdrawals");
      await fetch("http://localhost:3002/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%20%22Successful%22%2C%20%22type%22%3A%20%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.withdrawals = data
          ))
        this.showWithdrawals=true;
    },
    async fetchRejected(){
      console.log("fetch rejected");
      await fetch("http://localhost:3002/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%20%22Denied%22%2C%20%22type%22%3A%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.rejectedWithdrawals = data
          ))
        this.showRejectedWithdrawals=true;
    },
    goToCharity(){
      this.$router.replace({ name: 'Charity', params: { id: this.id}});
    },
    logout: function() {
      //console.log("pushed")
      this.$router.push({ name: "Login" });
    }
  },
  mounted(){
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
