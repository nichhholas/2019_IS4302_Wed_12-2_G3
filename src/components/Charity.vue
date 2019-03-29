<template>
<div>
    <h2>Charity Page</h2>
    <br>
    <button v-on:click="goToWithdrawal()">Withdrawal</button>
    <button v-on:click="goToDistribute()">Distribution</button>
    <br><br>
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
    }
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
    }
  },

}
</script>
<style></style>