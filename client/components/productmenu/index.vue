<style src='./menu.pcss'></style>
<template lang="pug">

.header__menu(v-if="isMobile && notFromUser")
  .header__menu-icon(@click.stop='openMenu', v-show="showBullets")
    i.ic-menu_bullets
  .header__menu-links.bubble.bubble--arrow.bubble--arrow-ne(v-if="menuOpened")
    a.header__menu-link.text-regular.clip_copy Копировать ссылку
    a.header__menu-link.text-delete(@click.stop="showPopup = true", v-if="isSelfProduct" ) Удалить
    a.header__menu-link.text-cancel Отмена

  native-popup.del-popup(:show-popup="showPopup")
    .title-text.title-font Осторожно!
    .main-text Подтвердите удаление
    .button-text
      span(@click.stop="deleteProduct") OK
      span(@click.stop="showPopup = false, menuOpened = false") Отмена

</template>

<script>
  import clipboard from 'clipboard';
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
        let link = `https://directbot.io/product/${this.$route.params.id}`;

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
