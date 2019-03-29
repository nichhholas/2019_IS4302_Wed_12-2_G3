import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login.vue";
import Charity from "@/components/Charity.vue";
import Beneficiary from "@/components/Beneficiary.vue";
import Donor from "@/components/Donor.vue";
import Signup from "@/components/Signup.vue"
import Withdrawal from "@/components/Withdrawal.vue"
import Distribute from "@/components/Distribute.vue"
import Treasury from "@/components/Treasury.vue"



Vue.use(Router);

export default new Router({
  routes: [
    // below s the component added for the Home path
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/charity/:id",
      name: "Charity",
      component: Charity,
      props: true
    },
    {
      path: "/beneficiary/:id",
      name: "Beneficiary",
      component: Beneficiary,
      props: true
    },
    {
      path: "/donor/:id",
      name: "Donor",
      component: Donor,
      props: true
    },
    {
      path: "/Signup",
      name: "Signup",
      component: Signup 
    },
    {
      path: "/Withdrawal/:id",
      name: "Withdrawal",
      component: Withdrawal 
    },
    {
      path: "/Distribute/:id",
      name: "Distribute",
      component: Distribute 
    },
    {
      path: "/Treasury/:id",
      name: "Treasury",
      component: Treasury 
    }
  ]
});
