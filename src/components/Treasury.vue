
<template>
    <div id='App'>
        <h1>Verify Records Page</h1>

    <h2> Treasury Info</h2>
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
        <br>

    <!-- start of collapsible -->
    <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button href="#" v-b-toggle.accordion-1 variant="info">Pending Transactions</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>
            
        <!-- Pending Records Collapsible Buttons -->
        <b-button v-b-toggle.collapse-1-inner class="m-1">Pending Donation Records</b-button>
        <b-button v-b-toggle.collapse-2-inner class="m-1">Pending Withdrawal Records</b-button>
        <b-button v-b-toggle.collapse-3-inner class="m-1">Pending Bank Statements</b-button>

        <!-- Pending Records Collapsible Informations -->
        <b-collapse id="collapse-1-inner" class="mt-2">
            <b-card-text>
        <u><h4> Pending Donation Records </h4></u>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>From</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in pendingDonationRecords" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.creator}}</td>
            <td>{{row.type}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            <td>
            <v-btn small v-if="row.status=='Pending'" v-on:click="confirmFinancialRecord('Successful',row.documentID)"> Confirm </v-btn>
            <v-btn small v-if="row.status=='Pending'" v-on:click="confirmFinancialRecord('Denied',row.documentID)"> Reject </v-btn>
            </td>
            </tr>
        </tbody>
        </table>
          </b-card-text>
        </b-collapse>

        <b-collapse id="collapse-2-inner" class="mt-2">
        <b-card-text>
        <u><h4> Pending Withdrawal Records </h4></u>
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
            <tr v-for="row in pendingWithdrawalRecords" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.type}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            <td>
            <v-btn small v-on:click="confirmFinancialRecord('Successful',row.documentID)"> Confirm </v-btn>
            <v-btn small v-on:click="confirmFinancialRecord('Denied',row.documentID)"> Reject </v-btn>
            </td>
            </tr>
        </tbody>
        </table>
        </b-card-text>
        </b-collapse>

        <b-collapse id="collapse-3-inner" class="mt-2">
        <b-card-text>
        <u><h4> Pending Bank Statements </h4></u>
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
            <tr v-for="row in pendingBankStatements" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.beneficiary}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            <td>
            <v-btn small v-on:click="confirmBankStatement('Successful',row.documentID)"> Confirm </v-btn>
            <v-btn small v-on:click="confirmBankStatement('Denied',row.documentID)"> Reject </v-btn>
            </td>
            </tr>
        </tbody>
        </table>
        <br></b-card-text>
        </b-collapse>

        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button href="#" v-b-toggle.accordion-2 variant="info">Confirmed Transactions</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>

            <!-- Pending Records Collapsible Buttons -->
            <b-button v-b-toggle.collapse-1-inner class="m-1">Confirmed Donation Records</b-button>
            <b-button v-b-toggle.collapse-2-inner class="m-1">Confirmed Withdrawal Records</b-button>
            <b-button v-b-toggle.collapse-3-inner class="m-1">Confirmed Bank Statements</b-button>

            <b-collapse id="collapse-1-inner" class="mt-2">
                <b-card-text>
        <u><h4> Confirmed Donation Records </h4></u>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in confirmedDonationRecords" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.type}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            </tr>
        </tbody>
        </table>
        </b-card-text>
            </b-collapse>

            <b-collapse id="collapse-2-inner" class="mt-2">
                <b-card-text>
        <u><h4> Confirmed Withdrawal Records </h4></u>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in confirmedWithdrawalRecords" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.type}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            </tr>
        </tbody>
        </table>
        </b-card-text>
            </b-collapse>

            <b-collapse id="collapse-3-inner" class="mt-2">
                <b-card-text>
        <u><h4> Confirmed Bank Statements </h4></u>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Beneficiary</th>
            <th>Amount</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in confirmedBankStatements" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.beneficiary}}</td>
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

<b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button href="#" v-b-toggle.accordion-3 variant="info">Rejected Transactions</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>

            <!-- Pending Records Collapsible Buttons -->
            <b-button v-b-toggle.collapse-1-inner class="m-1">Rejected Donation Records</b-button>
            <b-button v-b-toggle.collapse-2-inner class="m-1">Rejected Withdrawal Records</b-button>
            <b-button v-b-toggle.collapse-3-inner class="m-1">Rejected Bank Statements</b-button>

            <b-collapse id="collapse-1-inner" class="mt-2">
                <b-card-text>
        <u><h4> Rejected Donation Records </h4></u>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in deniedDonationRecords" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.type}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            </tr>
        </tbody>
        </table>
        </b-card-text>
            </b-collapse>

            <b-collapse id="collapse-2-inner" class="mt-2">
                <b-card-text>
        <u><h4> Rejected Withdrawal Records </h4></u>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in deniedWithdrawalRecords" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.type}}</td>
            <td>{{row.amount}}</td>
            <td>{{row.status}}</td>
            </tr>
        </tbody>
        </table>
        </b-card-text>
            </b-collapse>

            <b-collapse id="collapse-3-inner" class="mt-2">
                <b-card-text>
        <u><h4> Rejected Bank Statements </h4></u>
        <table id="firstTable" class="center">
        <thead>
            <tr>
            <th>Document ID</th>
            <th>Beneficiary</th>
            <th>Amount</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in deniedBankStatements" :key="row.documentID">
            <td>{{row.documentID}}</td>
            <td>{{row.beneficiary}}</td>
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


        <br><br>
            <v-btn small @click="logout" >Log Out</v-btn>

    </div>
</template>

<script>
// eslint-disable-file no-use-before-define 

import axios from 'axios'
import router from '@/router/index.js'
export default {
    data() {
        return {
            pendingDonationRecords:{},
            confirmedDonationRecords:[],
            deniedDonationRecords:[],
            pendingWithdrawalRecords:[],
            confirmedWithdrawalRecords:[],
            deniedWithdrawalRecords:[],
            pendingBankStatements:{},
            confirmedBankStatements:[],
            deniedBankStatements:[],
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
    async fetchPendingDonationRecords(){
      console.log("fetch donation records");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Pending%22%2C%22type%22%3A%22Donation%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.pendingDonationRecords = data
          ))
    },
    async fetchConfirmedDonationRecords(){
      console.log("fetch confirmed financial records");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Successful%22%2C%22type%22%3A%22Donation%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.confirmedDonationRecords = data
          ))
    },

    async fetchRejectedDonationRecords(){
      console.log("fetch confirmed financial records");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Denied%22%2C%22type%22%3A%22Donation%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.deniedDonationRecords = data
          ))
    },

    async fetchConfirmedWithdrawalRecords(){
      console.log("fetch confirmed financial records");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Successful%22%2C%22type%22%3A%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.confirmedWithdrawalRecords = data
          ))
    },
    async fetchPendingWithdrawalRecords(){
      console.log("fetch withdrawal records");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Pending%22%2C%22type%22%3A%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.pendingWithdrawalRecords = data
          ))
    },

    async fetchRejectedWithdrawalRecords(){
      console.log("fetch withdrawal records");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Denied%22%2C%22type%22%3A%22Withdrawal%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.deniedWithdrawalRecords = data
          ))
    },

    async fetchPendingBankStatements(){
      console.log("fetch bank statements");
      await fetch("http://localhost:3003/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22status%22%3A%22Pending%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.pendingBankStatements = data
          ))
    },
    
    async fetchConfirmedBankStatements(){
      console.log("fetch bank statements");
      await fetch("http://localhost:3003/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22status%22%3A%22Successful%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.confirmedBankStatements = data
          ))
    },

    async fetchRejectedBankStatements(){
      console.log("fetch bank statements");
      await fetch("http://localhost:3003/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22status%22%3A%22Denied%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.deniedBankStatements = data
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
        this.fetchPendingDonationRecords();
        this.fetchConfirmedDonationRecords();
        this.fetchRejectedDonationRecords();
        this.fetchPendingWithdrawalRecords();
        this.fetchConfirmedWithdrawalRecords();
        this.fetchRejectedWithdrawalRecords();
        this.fetchPendingBankStatements();
        this.fetchConfirmedBankStatements();
        this.fetchRejectedBankStatements();
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