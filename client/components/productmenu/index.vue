<style src='./menu.pcss'></style>
<template lang="pug">
.product-menu(v-if="notFromUser")
  i.ic-menu_bullets(@click.stop='openMenu', v-show="showBullets")
  menu-sample.product(:opened="menuOpened", v-on:close="menuOpened = false")
    .item
      .text.clip_copy Копировать ссылку
    .item(@click.stop="openPopup", v-if="isSelfProduct" )
      .text.__txt-red Удалить
    .item
      .text.__txt-blue Отмена

</template>

<script>
  import clipboard from 'clipboard';
  import * as productService from 'services/products';
  import listen from 'event-listener';
  import { targetClass } from 'root/utils';
  import settings from 'root/settings';
  import menuSample from 'components/menu/menu-sample';

  import { mapGetters } from 'vuex';

  export default{
    components: { menuSample},
    data(){
      return {
        menuOpened: false,
        showBullets: true,
        showCopyMessage: false
      }
    },
    created(){
      window.eventHub.$on('action-delete-product',()=>{
        this.deleteProduct();
      })
      this.outerClose = listen(document.body, 'click',(e)=>{
        targetClass(e, 'menu-cnt', ()=>{
          if(this.menuOpened) this.menuOpened = false;
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
      openPopup(){
        window.eventHub.$emit('popup-delete-product')
      },
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

          window.eventHub.$emit('popup-clipboard', text)
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
    display: none;
    i{
      color: $color__brand;
      transform: rotate(90deg);
      padding: 10px;
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

  &.product-header {
    display: inline-block;
    #menu-sample {
      display: block;
      transform: translate(22px,2px);
    }

    @media (--overtablet){
      transform: translateX(-150px);
      display: inline-block;
      i {
        position: static;
      }
    }

    @media screen and (min-width: 1400px){
      transform: translateX(0px);
    }
  }
}


</style>
