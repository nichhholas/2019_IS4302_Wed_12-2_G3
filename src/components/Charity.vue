<template>
<div>
    <h2>Charity Page</h2>
    <br>
    <button v-on:click="goToWithdrawal()">Withdrawal</button>
    <button v-on:click="goToDistribute()">Distribution</button>
    <br><br>

    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button href="#" v-b-toggle.accordion-2 variant="info">All Blockchain Transactions</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>

          <!--Blockchain Transactions Collapsible Buttons -->
        <b-button v-b-toggle.collapse-1-inner class="m-1">Financial Transactions</b-button>
        <b-button v-b-toggle.collapse-2-inner class="m-1">Bank Transactions</b-button>

        <b-collapse id="collapse-1-inner" class="mt-2">
            <b-card-text>
              <u><h4>Financial Transactions</h4></u>
              <p>Current status of Donations by Donors and Withdrawals by Charity Organisations, that is verified by the Treasury</p>
              <p>'Pending' shows Donations/Withdrawals that has been identified by the Treasury</p>
              <p>'Successful' and 'Denied' shows Donations/Withdrawals that has been verified by the Treasury</p>
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
                    <tr v-for="row in this.financialRecord" :key="row.transactionId">
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
            <u><h4>Bank Transactions</h4></u>
            <p>Current status of Distributions to Beneficiaries by Charity Organisations</p> 
            <p>'Pending' shows Distributions that has been identified by the Treasury</p>
            <p>'Successful' and 'Denied' shows Distributions that has been verified by the Treasury</p>
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
                    <tr v-for="row in this.bankStatements" :key="row.transactionId">
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
    <br>

    <button @click="logout" >Log Out</button>
</div>
</template>

<script>
import router from '@/router/index.js'

export default {
  name: "Charity", //this is the name of the component,
  data(){
    return{
      id:this.$route.params.id,
      bankStatements: null,
      financialRecord:null,
    }
  },
  mounted() {
    this.fetchBankStatements();
    this.fetchFinancialRecord();
  },
  methods: {
    goToWithdrawal(){
      this.$router.replace({ name: 'Withdrawal', params: { id: this.id}});
    },
    goToDistribute(){
      this.$router.replace({ name: 'Distribute', params: { id: this.id}});
    },
    logout: function() {
      //console.log("pushed")
      this.$router.push({ name: "Login" });
    },
    async fetchBankStatements(){
      console.log("fetch bank statements");
      await fetch("http://localhost:3003/api/org.acme.charity.BankStatement")
      .then(response => response.json())
      .then((data)=>(
          this.bankStatements = data
          ))
    },
    async fetchFinancialRecord(){
      console.log("fetch bank statements");
      await fetch("http://localhost:3003/api/org.acme.charity.FinancialRecord")
      .then(response => response.json())
      .then((data)=>(
          this.financialRecord = data
          ))
    }
  },

}
</script>
<style></style>