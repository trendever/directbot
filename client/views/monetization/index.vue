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
        a(href="#") У меня есть вопросы
      .monetization__accept-btn(:class="{ dark__yellow: getUseDays === 0 && !dealType}")

       button(v-if="selectedPlan === 0") ПОКА НЕ УВЕРЕН
       button(v-else) ПОДТВЕРДИТЬ

</template>

<script>
import * as monetization from 'services/monetization';


export default {
  data(){
    monetization.plans_list().then((data)=>{
      console.log("monetization")
      this.plans = data.plans;
      console.log(this.plans)
    });
    return {
      dealType: '',
      plans: [],
      selectedPlan: 0
    }
  },
  computed: {
    getUseDays(){
      return 0;
      //return this.$store.getters.getUseDays;
    }
  },
  methods:{
    selectPlan(plan_id){
      this.selectedPlan = (this.selectedPlan === plan_id) ? 0 : plan_id;
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
