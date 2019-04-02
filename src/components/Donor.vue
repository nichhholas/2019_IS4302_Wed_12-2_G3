<template>
  <div>
    <h2>Donor Page</h2>
    <p> Thank you for registering with us. Please refer to below for more information on our fundraising event and how you can donate. </p>
    <div class="event">
    <h3><strong>Current Event</strong></h3>
    <img src="../assets/NKF.jpg" alt ="photo of NKF">
    <p class="para">Cillum proident ut mollit occaecat nostrud ad aliquip dolor. 
      Reprehenderit incididunt et excepteur ex esse fugiat adipisicing veniam eu ut aute fugiat est. Tempor et sint officia magna commodo dolore voluptate ex deserunt ad culpa. Elit fugiat occaecat consectetur tempor eiusmod occaecat occaecat officia ut. Reprehenderit dolore ullamco ad enim Lorem et id aliqua et aliquip nostrud. 
      Commodo enim veniam elit anim. Elit velit sint Lorem nisi cillum irure mollit aute eiusmod sit consectetur do. Ea id tempor velit sunt adipisicing enim eiusmod excepteur nisi cillum consectetur magna. Esse reprehenderit proident aute culpa eiusmod veniam id deserunt cupidatat anim mollit. Reprehenderit Lorem eu dolore Lorem et eu excepteur voluptate laborum enim cillum officia ea magna. Lorem consequat nisi amet eu sunt pariatur do elit anim duis deserunt reprehenderit elit.</p>
    <h4>Current Fundraising goal</h4>
    <b-progress :max="max" height="2rem" :striped="'striped'">
      <b-progress-bar :value="value" :striped="'striped'">
        Progress: <strong>{{ value }} / {{ max }}</strong>
      </b-progress-bar>
    </b-progress><br>
    </div>
    <br>
    <h4>Record Your Donation</h4>
    <input v-model="amount">
    <button @click="makeDonation(amount)"> Donate </button><br><br>
    <h4>Total Donations Made</h4>
    <p>{{calculateDonations}} </p>
    <br>

    <!-- start of collapsible -->
    <div role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button href="#" v-b-toggle.accordion-1 variant="info">My Donations</b-button>
      </b-card-header>
      <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
        <b-card-body>

          <!-- Donation Records Collapsible Buttons -->
        <b-button v-b-toggle.collapse-1-inner class="m-1">Pending</b-button>
        <b-button v-b-toggle.collapse-2-inner class="m-1">Confirmed</b-button>
        <b-button v-b-toggle.collapse-3-inner class="m-1">Rejected</b-button>

        <b-collapse id="collapse-1-inner" class="mt-2">
            <b-card-text>
                <u><h4> Pending Donations </h4></u>
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
                  <tr v-for="row in this.pendingDonations" :key="row.transactionId">
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
                <u><h4> Confirmed Donations </h4></u>
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
                  <tr v-for="row in this.ownDonations" :key="row.transactionId">
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
                <u><h4> Rejected Donations </h4></u>
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
                  <tr v-for="row in this.rejectedDonations" :key="row.transactionId">
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

  </div>

  <!-- end of collapsible -->

    <br><br>

    <div class="wrapper"><br>
      <!-- <button>Donate</button><br><br> -->
      <button @click="logout" >Log Out</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Donor", //this is the name of the component
  data() {
    return {
        id: this.$route.params.id,
        ownDonations: [],
        rejectedDonations: [],
        pendingDonations:[],
        max: 10000,
        value: 750,
        amount: 0,
        treasury: null,
      bankStatements: null,
      financialRecord:null,
      myDonation: [
        { date: "1/1/19", Amount: 100 },
        { date: "1/2/19", Amount: 100 }
      ]
    };
  },
  mounted(){
    this.fetchTreasury();
    this.fetchOwnDonations();
    this.fetchRejected();
    this.fetchBankStatements();
    this.fetchPendingDonations();
    this.fetchFinancialRecord();
  },
  methods:{
    makeDonation(amount){
        console.log(amount);
        const url = "http://localhost:3002/api/org.acme.charity.Donate";
        var documentID_num = 'D' +Math.floor((Math.random() * 99999) + 10000).toString();
        axios.post(url,{"amount":amount, "documentID": documentID_num}).then(function(status){ 
            if(status.status == 200){
                alert("Your donation of $"+amount+ " has been recorded, please wait for confirmation from the Treasury, before it is reflected in 'View Donations'");
            }
        }).catch(function(error){
            alert("An error occurred, your donation was not recorded");
        });
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
    },
    async fetchOwnDonations(){
      var url = "http://localhost:3001/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Successful%22%2C%22creator%22%3A%22resource%3Aorg.acme.charity.Donor%23"+this.id+"%22%7D%7D"
      await fetch(url)
      .then(response => response.json())
      .then((data)=>(
          this.ownDonations = data
          ))
        this.showOwnDonations = true;
    },
    async fetchRejected(){
      var url = "http://localhost:3001/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Denied%22%2C%20%22creator%22%3A%22resource%3Aorg.acme.charity.Donor%23"+this.id+"%22%7D%7D"
      await fetch(url)
      .then(response => response.json())
      .then((data)=>(
          this.rejectedDonations = data
          ))
    },
    async fetchPendingDonations(){
      var url = "http://localhost:3001/api/org.acme.charity.FinancialRecord?filter=%7B%22where%22%3A%7B%22status%22%3A%22Pending%22%2C%20%22creator%22%3A%22resource%3Aorg.acme.charity.Donor%23"+this.id+"%22%7D%7D"
      await fetch(url)
      .then(response => response.json())
      .then((data)=>(
          this.pendingDonations = data
          ))
    },
    showDonation: function(){
      document.getElementById("donationTable").style.display="inline-table";
    },
    logout: function() {
      //console.log("pushed")
      this.$router.push({ name: "Login" });
    },
    async fetchTreasury(){
      console.log("fetch treasury");
      await fetch("http://localhost:3001/api/org.acme.charity.Treasury")
      .then(response => response.json())
      .then((data)=>(
          this.treasury = data
          ))
      this.value = this.treasury[0]["funds"];
      console.log(this.treasury[0]);
    }
  },
  computed: {
    calculateDonations: function() {
      var sum =0;
      console.log(this.ownDonations.length);
      for (var i=0; i< this.ownDonations.length; i++) {
        // console.log(sum)
        sum = sum + this.ownDonations[i].amount;
      }
      return sum;
      console.log(sum)
    }
  }
};
</script>
<style>
h2,
h3 {
  text-align: center;
}

.wrapper {
  text-align: center;
}

.myDonation {
  display: none;
}

.allTxn {
  display: none;
}

.para{
  text-align:center;
  padding: 50px;
  margin-left: 50px;
  margin-right: 50px;
}

.event{
  border-style: solid;
  margin-left: 50px;
  margin-right: 50px;
}
</style>