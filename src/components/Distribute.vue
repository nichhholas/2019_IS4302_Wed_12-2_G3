<template>
  <div id="app">
    <h3>Distribute</h3>
    <input v-model="amount" size="25" placeholder="Amount"><br>
    <input v-model="beneficiary" size="25" placeholder="Beneficiary ID"><br>
    <button v-on:click="makeDistribution(amount,this.beneficiary)"> Distribute </button> <br><br>
    <button v-on:click="fetchDistributions()">View Distributions</button>
    <br>
    <table id="firstTable" class="center" v-if="showDistributions"> 
    
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
        <tr v-for="row in this.distributions" :key="row.transactionId">
          <td>{{row.documentID}}</td>
          <td>{{row.beneficiary}}</td>
          <td>{{row.treasury}}</td>
          <td>{{row.amount}}</td>
          <td>{{row.status}}</td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>
    <button v-on:click="fetchRejected()">View Rejected Distributions</button>
    <br>
    <table id="firstTable" class="center" v-if="showRejectedDistributions"> 
    
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
  name: 'Distribute',
  data() {
    return{
        amount: null,
        distributions: null,
        showDistributions: false,
        id: this.$route.params.id,
        showRejectedDistributions: false,
        rejectedDistributions: null,
        beneficiary: null,
    }
  },
  components: {
  },
  methods:{

    async makeDistribution(amount, beneficiary){
        console.log(amount);
        const url = "http://localhost:3001/api/org.acme.charity.Distribute";
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
          this.distributions = data
          ))
        this.showDistributions=true;
    },
    async fetchRejected(){
      console.log("fetch rejected distributions");
      await fetch("http://localhost:3002/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22status%22%3A%22Denied%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.rejectedDistributions = data
          ))
        this.showRejectedDistributions=true;
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
