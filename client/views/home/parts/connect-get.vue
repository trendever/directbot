  <template lang="pug">

#connect-get(v-if="toggleBtns")

  .landing-title  Подключайтесь сейчас#[br(v-if="isMobile")] и получите

  .skills-wrapper

    .info-box.one
      .skills-icon
        img(src="./img/lp_icons_7.png")
      .sub-title Личного #[br(v-if="!isMobile")] оператора
      .caption
        a.link-info(@click.stop="$parent.openPopup('is7')")
          | Личный оператор
          | на связи#[br(v-if="!isMobile")] с вашими клиентами
          | 7 дней в неделю.#[br(v-if="!isMobile")] В 10+ раз дешевле*

      .badge: span 10+ РАЗ#[br] ДЕШЕВЛЕ

    .info-box.two
      .skills-icon
        img(src="./img/lp_icons_8.png")
      .sub-title Адаптивный #[br(v-if="!isMobile")] интернет-магазин
      .caption
        a.link-info(@click.stop="$parent.openPopup('is8')")
          | Удобный интернет-магазин #[br(v-if="!isMobile")] с платежами #[br(v-if="isMobile")] и доставкой #[br(v-if="!isMobile")] до покупателя

      .badge: span МЕСЯЦ#[br] БЕСПЛАТНО


    .info-box.three
      .skills-icon
        img(src="./img/lp_icons_6.png")
      .sub-title Сервис рекламы#[br(v-if="!isMobile")] у блогеров
      .caption
        a.link-info(@click.stop="$parent.openPopup('is9')")
          | Сервис по подбору #[br(v-if="!isMobile")] и организации рекламы #[br(v-if="!isMobile")] через блогеров

      .badge: span ПЕРВЫЙ РАЗ#[br] БЕСПЛАТНО

  .tooltip
    p.tip
      | *из расчета средней зарплаты оператора 45 тыс.руб. #[br(v-if='isMobile')]
      | в месяц, и это только за 8-часовой день с выходными

</template>

<script>
export default {

  name: 'connect-get',

  data () {
    return {
      toggleBtns: false
    };
  },
  mounted(){
    window.eventHub.$on('toggle-landing-buttons',()=>{
      this.toggleBtns = true;
    })
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';
#connect-get {
  @media (--tabletandless){
    padding-bottom: 100px;
  }

  .info-box {
    position: relative;
    .badge {
      z-index: 150;
      position: absolute 0 10% * * ;
      size: 230px;
      background: $color__red;
      color: white;
      font-family: $font__family__semibold;
      font-size: 32px;
      border-radius: 50%;
      span {
        display: inline-block;
        position: relative;
        top:50%;
        transform: translateY(-50%);
      }

      @media screen and (min-width: 751px){
        transform: scale(.5) translate(70%, -40%);
      }
    }
  }



  .info-box.one {
    @media screen and (min-width: 1024px){
      .badge {
        top: -6px;
      }
    }
  }

  .tooltip {
    text-align: center;
    padding-bottom: 20px;
  }
}


</style>
