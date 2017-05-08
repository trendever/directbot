<style src='./menu.pcss'></style>
<template lang="pug">
.product-menu(v-if="notFromUser")

  i.ic-menu_bullets(@click.stop='openMenu', v-show="showBullets")

  menu-sample.product-menu(:opened="menuOpened", v-on:close="menuOpened = false")
    .item
      .text.clip_copy Копировать ссылку
    .item(@click.stop="showPopup = true", v-if="isSelfProduct" )
      .text.__txt-red Удалить
    .item
      .text.__txt-blue Отмена

  native-popup.del-popup(:show-popup="showPopup")
    .title-text.title-font Осторожно!
    .main-text Подтвердите удаление
    .button-text
      span(@click.stop="deleteProduct") OK
      span(@click.stop="showPopup = false, menuOpened = false") Отмена


  //-Старый вариант
    .header__menu(v-if="isMobile && notFromUser")
      .header__menu-icon(@click.stop='openMenu', v-show="showBullets")
        i.ic-menu_bullets
      .header__menu-links.bubble.bubble--arrow.bubble--arrow-ne(v-if="menuOpened")
        a.header__menu-link.text-regular.clip_copy Копировать ссылку
        a.header__menu-link.text-delete(@click.stop="showPopup = true", v-if="isSelfProduct" ) Удалить
        a.header__menu-link.text-cancel Отмена


</template>

<script>
  import clipboard from 'clipboard';
  import * as productService from 'services/products';
  import nativePopup from 'components/popup/native';
  import listen from 'event-listener';
  import { targetClass } from 'root/utils';
  import settings from 'root/settings';
  import menuSample from 'components/menu/menu-sample';

  import { mapGetters } from 'vuex';

  export default{
    components: {nativePopup, menuSample},
    data(){
      return {
        showPopup: false,
        menuOpened: false,
        showBullets: true,
        showCopyMessage: false
      }
    },
    created(){

      this.outerClose = listen(document.body, 'click',(e)=>{
        targetClass(e, 'menu-cnt', ()=>{
          if(this.menuOpened) this.menuOpened = false;
          if(this.showPopup) this.showPopup = false;

        });

      })
      if(window.matchMedia('(max-width: 750px)').matches) {
        this.scrollListen = listen(window,'scroll',()=>{
          this.showBullets = document.body.scrollTop < 82;

        });
      }
    },
    beforeDestroy(){
      if(this.scrollListen) this.scrollListen.remove();
      if (this.copy) this.copy.destroy();
      this.outerClose.remove();
    },
    methods: {
      openMenu(){
        this.clipboardLogic();
        this.menuOpened = true;
      },

      clipboardLogic(){

        if (this.copy) return;

        let source = this.isTrendever ? 'trendever.com' : 'directbot.io'

        let link = `https://${source}/product/${this.$route.params.id}`;

        this.copy =  new clipboard('.clip_copy', {
            text(trigger){
              return link;
            }
        })
        this.copy.on('success',()=>{


          let text = `${link} скопирована для вставки.`;

        	if(this.isIos){
						alert(text)
						return;
        	}

          window.eventHub.$emit('copy-product-link', text)
          this.showCopyMessage = true;

        })

      },
      deleteProduct(){
        productService.deleteProduct(+this.getOpenedProduct.id).then(()=> {
          this.$router.push({name: 'profile', query: { product: this.getOpenedProduct.id }});
        })
      }
    },
    computed:{
      ...mapGetters([
        'getOpenedProduct',
        'getAuthUser',
        'isSelfProduct'
      ]),
      notFromUser(){
        if (window.entryPoint == "user"){
          return false;
        }
        return true
      },
    }
  }
</script>

<style lang="postcss">
@import 'style/vars/vars.pcss';

.product-menu {

  @media (--overtablet) {
    i{
      display: inline-block;
      position: absolute 1px * * 77%;
      color: $color__brand;
      transform: rotate(90deg);
      padding: 10px;
      width: 50px;
    }
    #menu-sample {
      left: 64%;
    }
  }

  @media (--tabletandless){
    i{
      display: inline-block;
      position: absolute 88px 15px * *;
      color: #b2b2b2;
      transform: rotate(90deg) translateY(4%);
      padding: 20px;
    }
  }
}


</style>
