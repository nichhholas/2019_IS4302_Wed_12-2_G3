<template>
  <div>
    <h2>Donor Page</h2>
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
    <h4>My Donations</h4> 
    <!-- {{ownDonations}} -->
    <button @click="fetchOwnDonations"> Show Donations </button><br>
    <table id="firstTable" class="center" v-if="showOwnDonations">
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
    <br>
    <h4>All Rejected Donations</h4>
    <button @click="fetchRejected()"> Show Rejected Donations </button><br>
    <table id="firstTable" class="center" v-if="showRejectedDonations">
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
    <br><br>

    <h4>All Transactions</h4>
    <button @click="fetchDistributions"> Show Transactions </button><br>
    <table id="allTxn" class="allTxn">
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
        ownDonations: null,
        showOwnDonations: false,
        max: 10000,
        value: 750,
        amount: 0,
        treasury: null,
      distributions: null,
      myDonation: [
        { date: "1/1/19", Amount: 100 },
        { date: "1/2/19", Amount: 100 }
      ]
    };
  },
  mounted(){
    this.fetchTreasury();
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
    async fetchDistributions(){
      console.log("fetch distributions");
      await fetch("http://localhost:3002/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22status%22%3A%22Successful%22%7D%7D")
      .then(response => response.json())
      .then((data)=>(
          this.distributions = data
          ))
      this.showTxn();
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
        this.showRejectedDonations = true;
    },
    showDonation: function(){
      document.getElementById("donationTable").style.display="inline-table";
    },
    showTxn: function(){
      document.getElementById("allTxn").style.display="inline-table";
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