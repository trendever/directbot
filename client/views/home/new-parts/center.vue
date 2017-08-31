  <template lang="pug">

.wrap-advert.center-landing

  .__title 
    | Зарегистрируйтесь#[br.mobile] и управляйте#[br.desktop]
    | продажами в Instagram#[br.mobile] с помощью Directbot
    //-| Полный доступ#[br.mobile] к функционалу#[br.desktop] CRM Directbot 
    //-|стоит от
  .advert-price
    .c-element
      //-span 590
      span.free БЕСПЛАТНО
      //-i.ic-rub
    //-p в месяц
  //-.advert-ps
    | *позвлоляет подключить до 5 менеджеров#[br.mobile] отдновременно

  slot(name="bottom")


</template>

<script>
export default {

  name: 'center',

  data () {
    return {

    };
  }
};
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';


.center-landing {
  margin: 40px 0;
  background: url(./img/collage_blue.png);
  font-size: 45px;
  padding-top: 170px;
  padding-bottom: 185px;
  font-size: $font__large;
  font-family: $font__family__semibold;
  background-size: cover;
  background-repeat: no-repeat;

  @media screen and (min-width: 1720px){
    padding-bottom: 240px;
  }

  @media (--overtablet){
    background-position: 50% 50%;
    margin-bottom: 0px;
    max-height: 650px;
  }
  @media (--tabletandless){
    margin-top: 45px;
    margin-bottom: 0px;
    font-size: calc($font__large + 5px);
    background-position: -970px 0px;
    .advert-price .c-element {
      display: block;
    }
  }

  .__title {
    font-size: $font__large;
    @media (--tabletandless){
      font-size: 60px;
    }
    @media (--overtablet){
      font-family: $font__family__light;
    }
  }

  span.free {
    @media (--overtablet) {
      font-size: 50px;
    }

    @media (--tabletandless) {
      font-size: 70px;
    }
  }
}
</style>
