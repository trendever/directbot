<style src="./style.pcss"></style>
<template lang="pug">
.monetization
  .monetization__wrap
    i.ic-close(@click='closePage')
    .monetization__days-block
      .monetization__days-to-end(:class="{is__end: getUseDays === 0}") {{ getUseDays }}
      .monetization__text.end-txt
        | дня осталось до конца #[br] пробного периода
    .monetization__plans
      .monetization__text.bot
        | Выбор тарифного плана
      template(v-for="plan in plans")
        .monetization__btn(@click="selectPlan(plan.id)")
          button(:class="{make__choice: selectedPlan === plan.id}")
            span.bold {{plan.subscription_price}}
              i.ic-rub
            span.bold  ЗА {{plan.subscription_period}} ДНЕЙ #[br]
            div(v-html="plan.about")
      .monetization__zero-days-link
        a(@click="getHelp") У меня есть вопросы
      .monetization__accept-btn(:class="{ dark__yellow: getUseDays === 0 && !dealType}")

       button(v-if="selectedPlan === 0") ПОКА НЕ УВЕРЕН
       button(v-else @click="getPlan") ПОДТВЕРДИТЬ

</template>

<script>
import settings from 'root/settings';
import * as monetization from 'services/monetization';
import {createPayment} from 'services/card';


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
    }
  },
  methods:{
    getHelp(){
      this.$store
        .dispatch('createLead', settings.monetizationHelpID)
        .then(
            ( lead ) => {
              if ( lead !== undefined && lead !== null ) {
                this.$router.push( { name: 'chat', params: { id: lead.id } } )
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

        monetization.buy_coins(offer.id,"payture_ewallet").then((result)=>{
          this.pay(result.order_id);
        });
      });
    },
    pay(order_id){
      createPayment({id: order_id,lead_id: 0}).then((result)=>{
        let redirect_url = result.redirect_url;
        window.location = redirect_url;
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
