<template>
<div>
  <h2>Beneficiary Page</h2>
  <br>
  <h3> Total Payouts </h3>
  <p>{{calculateDistributions}} </p>
  <h3> My Payout </h3>
      <table id="payout" class="center" v-if="showPayouts">
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
        <tr v-for="row in this.myPayouts" :key="row.transactionId">
          <td>{{row.documentID}}</td>
          <td>{{row.beneficiary}}</td>
          <td>{{row.treasury}}</td>
          <td>{{row.amount}}</td>
          <td>{{row.status}}</td>
        </tr>
      </tbody>
    </table><br>

  <v-btn depressed small colour='primary' @click="goWeb"> Report </v-btn>
  <!-- <h3>Transaction Log</h3>
  <body>
    <table id="firstTable" class="center">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>From</th>
          <th>To</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>{{row.date}}</td>
          <td>{{row.Amount}}</td>
          <td>{{row.From}}</td>
          <td>{{row.To}}</td>
        </tr>
      </tbody>
    </table>
  </body> -->
  <br>
  <br>
  <v-btn depressed small colour='primary' @click="returnToLogin">Log Out</v-btn>
</div>
</template>



<script>
/*eslint-disable */
export default {
  name: "Beneficiary", //this is the name of the component
  data() {
    return {
      rows: [
        { date: "1/1/19", Amount: 100, From: "OCBC", To: "Shan" },
        { date: "1/2/19", Amount: 100, From: "OCBC", To: "Nic" }
      ],
      myPayout: [
        {date:"10/3/19" , Amount:500}
      ],
      id: this.$route.params.id,
      showPayouts: false,
      myPayouts: []
    };
  },
  mounted(){
    this.getPayout();
  },
  computed: {
    calculateDistributions: function() {
      var sum =0;
      console.log(this.myPayouts.length);
      for (var i=0; i< this.myPayouts.length; i++) {
        // console.log(sum)
        sum = sum + this.myPayouts[i].amount;
      }
      return sum;
      console.log(sum)
    }
  },
  methods: {
    returnToLogin: function() {
      //console.log("pushed")
      this.$router.push({ name: "Login" });
    },
    async getPayout(){
      var url = "http://localhost:3001/api/org.acme.charity.BankStatement?filter=%7B%22where%22%3A%7B%22beneficiary%22%3A%22resource%3Aorg.acme.charity.Beneficiary%23"+this.id+"%22%2C%22status%22%3A%22Successful%22%7D%7D"
      await fetch(url)
      .then(response => response.json())
      .then((data)=>(
          this.myPayouts = data
          ))
        this.showPayouts = true;
    },
    goWeb: function(){
      window.open('https://www.nkfs.org/about-nkf/contact-us/')
    }
  }
};
</script>
<style>
table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px 10px 0 10px;
}

table.center {
  margin-left: auto;
  margin-right: auto;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: rgb(96, 97, 109);
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: rgb(179, 180, 187);
}
</style>
