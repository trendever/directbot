<template lang="pug">
trendever-hero(
  :title="title",
  :social-links="['directbot','directbot','directbot']",
  :directbot-hero="true"
).directbot-top

  brand-menu
    template(slot="desktop-view")
      //-img(src="../img/directbot-logo-txt.svg" onclick="window.open('https://www.trendever.com')")
      .land__top-btn(@click="$router.push({name: 'auth'})") ВХОД
      .land__top-btn(@click="goTrendever") ПОКУПАТЕЛЯМ
      .land__top-btn(@click="goDressBlogger") БЛОГЕРАМ
      .land__top-btn(@click="$parent.showArticles") ОТЗЫВЫ
      //-a.land__top-btn(@click="showPhone") КОЛЛ-ЦЕНТР

  //i.ic-logo_directbot_txt

</template>

<script>
import trendeverHero from 'views/list/trendever-hero'
import brandMenu from 'components/menu/brand-menu'

export default {
  components:{trendeverHero,brandMenu},
  methods:{
    goTrendever(){
      window.open('https://www.trendever.com')
    },
    goDressBlogger(){
      window.open('https://www.trendever.com/dressblogger')
    },
    showPhone(){
      window.eventHub.$emit('popup-show-phone', '+79854107012')
    }
  },
  data () {
    return {
      title:`
        Автоматизация работы
        <br />
        с клиентами и блогерами
        <br />
        в Instagram
      `
    };
  }
};
</script>

<style lang="postcss">
.directbot-top {
  #brand-menu {
    position: absolute 0 0 * *;
    z-index: 200;
  }

  a.s-vkontakte {
    display: none;
  }

  h1.first {
    .wrap-title {
      margin-top: 90px;
      @media screen and (max-height:900px){
        margin-top: 80px;
        transform: translateY(-70px);
      }
    }
  }
  .social-icons {
    top: 315px !important;
    @media screen and (max-height:900px){
      transform: translateY(-70px);
    }

  }
}
</style>
