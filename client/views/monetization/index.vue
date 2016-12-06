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
      .monetization__btn.first(@click="dealType = 'month-type'")
       button(:class="{make__choice: dealType === 'month-type'}")
         span.bold 1390
           i.ic-rub
         span.bold  ЗА 7 ДНЕЙ #[br]
         span.light 5940
           i.ic-rub
         span.light  ЦЕНА В МЕСЯЦ
      .monetization__btn(@click="dealType = 'percent-type'")
       button(:class="{make__choice: dealType === 'percent-type'}")
         span.bold 4990
           i.ic-rub
         span.bold  ЗА 30 ДНЕЙ #[br]
         span.light САМЫЙ ПОПУЛЯРНЫЙ ТАРИФ
      .monetization__btn(@click="dealType = 'percent-type'")
        button(:class="{make__choice: dealType === 'percent-type'}")
          span.bold 8990
            i.ic-rub
          span.bold  ЗА 90 ДНЕЙ #[br]
          span.light 2990
            i.ic-rub
          span.light  ЦЕНА В МЕСЯЦ
      .monetization__zero-days-link(v-if="false")
        a(href="#") У меня есть вопросы
      .monetization__accept-btn(:class="{ dark__yellow: getUseDays === 0 && !dealType}")

       button(v-if="getUseDays !== 0 && !dealType", @click="closePage") ПОКА НЕ УВЕРЕН
       button(v-if="getUseDays === 0 || dealType", @click="accept") ПОДТВЕРДИТЬ

</template>

<script>

export default {
  data(){
    return {
      dealType: ''
    }
  },
  computed: {

    getUseDays(){
      return 0;
      //return this.$store.getters.getUseDays;
    }

  },
  methods:{
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
