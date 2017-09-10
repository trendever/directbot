<style src="./style.pcss"></style>
<template lang="pug" src="./template.pug"></template>

<script>

import jquery from 'jquery';
import { declOfNum } from 'root/utils';

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
      selectedAmmount: 0,
      noPlanSelected: false,
      activePlan: '',
      activePlanName: '',
      activePlanAbout: '',
      fakeMonetizationCount: 0
    }
  },
  computed: {
    getUseDays(){
      return 0;
      //return this.$store.getters.getUseDays;
    },
    ...mapGetters([
      'monetizationDays'
    ]),
    daysCount(){
      return declOfNum(['день','дня',"дней" ])(this.monetizationDays);
    },
    activePlanObject(){
      return this.plans.find(i=>i.id==this.selectedPlan)
    },
  },
  watch:{
    selectedPlan(val){
      let p = this.plans.find(i=>i.id==val)
      if(p && p.about){
        this.activePlan = this.parse(p.about).adv
        this.activePlanName = this.changeName(p.name)
      }
      if(!val){
        this.activePlan=""
        this.activePlanName=""
      }
    }
  },
  methods:{
    getPlans(type){
       return this.plans
        .filter(i=>{
          if (i.about){
            return this.parse(i.about).tariff === type
          }
          return false
        })
        .sort((a,b)=>a.subscription_price - b.subscription_price )
    },
    fakeMonetization(){
      this.fakeMonetizationCount += 1;
      if (this.fakeMonetizationCount == 3){
        monetization.coins_offers().then((data)=>{
          let selectedAmmount = 10;
          let offer = data.offers.find((offer) => offer.price === selectedAmmount);

          monetization.setPendingMonetization({plan_id: 9,offer: offer,plan_name: "Low cost test"})

          monetization.buy_coins(
              offer.id,
              "payture_ewallet",
              window.location.hostname == "localhost" ? "test" : "directbot"
            ).then((result)=>{
              this.pay(result.order_id);
          });
        });
      }
    },
    changeName(val){
      return val.replace(/Р/g, '<i class="ic-currency-rub"></i>')
    },
    goProfile(){
      if(this.getUseDays == 0 && !this.selectedPlan){
        this.noPlanSelected = true;
        this.$nextTick(()=>{

          setTimeout(()=>{
            this.noPlanSelected=false
          },600)

        })

      } else {
        this.$router.push({name: 'home'})
      }

    },
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
    selectPlan(plan_id, event){
      this.selectedPlan = (this.selectedPlan === plan_id) ? 0 : plan_id;
      jquery(document.body).animate({scrollTop: jquery(event.target).offset().top },200)
    },
    getPlan(){
      monetization.coins_offers().then((data)=>{
        let selectedAmmount = this.plansAmmounts[this.selectedPlan];
        let offer = data.offers.find((offer) => offer.price === selectedAmmount);

        monetization.setPendingMonetization({plan_id: this.selectedPlan,offer: offer,plan_name: this.activePlanName})

        monetization.buy_coins(
            offer.id,
            "payture_ewallet",
            window.location.hostname == "localhost" ? "test" : "directbot"
          ).then((result)=>{
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
      this.$router.push({name: 'profile'})
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
