<style src='./menu.pcss'></style>
<template lang="pug">

.header__menu(v-if="isMobile && notFromUser")
 .header__menu-icon(@click.stop='menuOpened = !menuOpened', v-show="showBullets && isSelfProduct")
  i.ic-menu_bullets
 .header__menu-links.bubble.bubble--arrow.bubble--arrow-ne(v-if="menuOpened")
  a.header__menu-link.text-regular(@click.stop="copy") Копировать ссылку
  a.header__menu-link.text-delete(@click.stop="showPopup = true") Удалить
  a.header__menu-link.text-cancel Отмена

  native-popup.del-popup(:show-popup="showPopup")
    .title-text.title-font Осторожно!
    .main-text Подтвердите удаление
    .button-text(v-on:click.stop="showCopyMessage = false")
      span(@click.stop="deleteProduct") OK
      span(@click.stop="showPopup = false, menuOpened = false") Отмена

</template>

<script>

  import * as productService from 'services/products';
  import nativePopup from 'components/popup/native';
  import listen from 'event-listener';
  import { targetClass } from 'root/utils';
  import settings from 'root/settings';

  import { mapGetters } from 'vuex';

  export default{
    components: {nativePopup},
    data(){
      return {
        showPopup: false,
        menuOpened: false,
        showBullets: true
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
          this.showBullets = document.body.scrollTop > 85 ? false : true;

        });
      }
    },
    beforeDestroy(){
      if(this.scrollListen) {
        this.scrollListen.remove();
      }
      this.outerClose.remove();
    },
    methods: {
      copy(){
        window.eventHub.$emit('copy-text', 'https://www.directbot.io/product/' + this.$route.params.id)
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
