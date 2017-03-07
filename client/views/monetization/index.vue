<style src="./style.pcss"></style>
<template lang="pug" src="./template.pug"></template>

<script>
import config from 'root/../config';
import * as monetization from 'services/monetization';
import {createPayment} from 'services/card';
import { mapGetters } from 'vuex';

export default {
  data(){
    monetization.plans_list().then((data)=>{
      this.plans = data.plans;
      data.plans.forEach((plan)=>{
        this.plansAmmounts[plan.id] = plan.subscription_price;
      });
    });
    return {
      dealType: '',
      plans: [],
      plansAmmounts: [],
      selectedPlan: 0,
      selectedAmmount: 0
    }
  },
  computed: {
    getUseDays(){
      return 0;
      //return this.$store.getters.getUseDays;
    },
    ...mapGetters([
      'monetizationDays'
    ])
  },
  methods:{
    parse(val){
      return JSON.parse(val);
    },
    replace(val){
      return val.replace(/-rubble-/g, '<i class="ic-currency-rub"></i>')
    },
    getHelp(){
      this.$store
        .dispatch('createLead', config.monetization_help_id)
        .then(
            ( lead ) => {
              if ( lead !== undefined && lead !== null ) {
                this.$router.push( { name: 'fake_chat', params: { payed: "none" }, query:{last: 'monetization'} } )
              }
            }
          )
    },
    selectPlan(plan_id){
      this.selectedPlan = (this.selectedPlan === plan_id) ? 0 : plan_id;
    },
    getPlan(){
      monetization.coins_offers().then((data)=>{
        let selectedAmmount = this.plansAmmounts[this.selectedPlan];
        let offer = data.offers.find((offer) => offer.price === selectedAmmount);
        monetization.buy_coins(offer.id,"payture_ewallet","test").then((result)=>{
          this.pay(result.order_id);
        });
      });
    },
    pay(order_id){
      this.$store
        .dispatch('createLead', config.monetization_help_id).then(() => {
          createPayment({id: order_id,lead_id: 0}).then((result)=>{
            let redirect_url = result.redirect_url;
            window.location = redirect_url;
          });
        });
    },
    closePage(){
      if(window.history.length > 3){
        window.history.back();
        return;
      }
      this.$router.go({name: 'home'})
    },
    accept(){
      if(!this.dealType){
        return;
      }
      alert('Подтверждаю');
    }
  }
}
</script>
