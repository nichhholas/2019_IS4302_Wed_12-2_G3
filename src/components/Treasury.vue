
<template>
    <div id='App'>
        <h1>Verify Records Page</h1>
        <h3> Treasury Info</h3>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Treasury ID</th>
            <th>Funds Available</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in treasury" :key="row.Id">
            <td>{{row.Id}}</td>
            <td>{{row.funds}}</td>
            </tr>
        </tbody>
        </table>

        <h3> Donation Records </h3>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in donationRecords" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.type}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            <td>
            <button v-if="row.status=='Pending'" v-on:click="confirmFinancialRecord('Successful',row.documentID)"> Confirm </button>
            <button v-if="row.status=='Pending'" v-on:click="confirmFinancialRecord('Denied',row.documentID)"> Reject </button>
            </td>
            </tr>
        </tbody>
        </table>

        <h3> Withdrawal Records </h3>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in withdrawalRecords" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.type}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            <td>
            <button v-on:click="confirmFinancialRecord('Successful',row.documentID)"> Confirm </button>
            <button v-on:click="confirmFinancialRecord('Denied',row.documentID)"> Reject </button>
            </td>
            </tr>
        </tbody>
        </table>

        <h3> Bank Statements </h3>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Beneficiary</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in bankStatements" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.beneficiary}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            <td>
            <button v-on:click="confirmBankStatement('Successful',row.documentID)"> Confirm </button>
            <button v-on:click="confirmBankStatement('Denied',row.documentID)"> Reject </button>
            </td>
            </tr>
        </tbody>
        </table>
        <br><br>
            <button @click="logout" >Log Out</button>

    </div>
</template>

<script>
// eslint-disable-file no-use-before-define 

import axios from 'axios'
import router from '@/router/index.js'
export default {
    data() {
        return {
            donationRecords:{},
            withdrawalRecords:{},
            bankStatements:null,
            treasury: null
        }
    },
    methods: {
        logout: function() {
            //console.log("pushed")
            this.$router.push({ name: "Login" });
        },
        async confirmFinancialRecord(status, financialRecord){
        console.log(status);
        const url= "http://localhost:3003/api/org.acme.charity.ConfirmFinancialRecord";
        axios.post(url,{"status": status,"financialRecord": "org.acme.charity.FinancialRecord#"+financialRecord}).then(function(status){ 
            if(status.status == 200){
                alert("Your status confirmation of "+status+ " to financial record "+financialRecord+" has been recorded, and relevant amounts have been donated or withdrawn when required.");
            }
        }).catch(function(error){
            alert("An error occurred, your distribution was not recorded");
        });
    },
    
    async confirmBankStatement(status, bankStatement){
        console.log(status);
        const url= "http://localhost:3003/api/org.acme.charity.ConfirmBankStatement";
        axios.post(url,{"status": status,"bankStatement": "org.acme.charity.BankStatement#"+bankStatement}).then(function(status){ 
            if(status.status == 200){
                alert("Your status confirmation of "+status+ " to bank statement "+bankStatement+" has been recorded, and relevant amounts have been distributed when required.");
            }
        }).catch(function(error){
            alert("An error occurred, your distribution was not recorded");
        });
    },
    async fetchDonationRecords(){
      console.log("fetch donation records");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22type%22%3A%22Donation%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.donationRecords = data
          ))
    },
    async fetchWithdrawalRecords(){
      console.log("fetch withdrawal records");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22type%22%3A%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.withdrawalRecords = data
          ))
    },

    async fetchBankStatements(){
      console.log("fetch bank statements");
      await fetch("http://localhost:3003/api/org.acme.charity.BankStatement")
      .then(response => response.json())
      .then((data)=>(
          this.bankStatements = data
          ))
    },
    async fetchTreasury(){
      console.log("fetch treasury");
      await fetch("http://localhost:3003/api/org.acme.charity.Treasury")
      .then(response => response.json())
      .then((data)=>(
          this.treasury = data
          ))
    }
    },
    mounted: function() {
        console.log("mounted");
        this.fetchDonationRecords();
        this.fetchWithdrawalRecords();
        this.fetchBankStatements();
        this.fetchTreasury()
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