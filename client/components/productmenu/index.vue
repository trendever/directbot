<style src='./menu.pcss'></style>
<template lang="pug">
.header__menu(v-if="isMobile && notFromUser")
 .header__menu-icon(@click.stop='menuOpened = !menuOpened', v-show="showBullets && isSelfProduct")
  i.ic-menu_bullets
 .header__menu-links.bubble.bubble--arrow.bubble--arrow-ne(v-if="menuOpened")
  a.header__menu-link.text-delete(@click.stop="") Удалить

</template>

<script>
  import listen from 'event-listener';
  import { targetClass } from 'root/utils';
  import settings from 'root/settings';

  import { mapGetters } from 'vuex';

  export default{
    data(){
      return {
        menuOpened: false,
        showBullets: true
      }
    },
    created(){
      
      this.outerClose = listen(document.body, 'click',(e)=>{
        targetClass(e, 'menu-cnt', ()=>{
          if(this.menuOpened) {
             this.menuOpened = false;
          }
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
    computed:{
      ...mapGetters([
        'getOpenedProduct',
        'getAuthUser'
      ]),
      isSelfProduct(){
        if(this.getAuthUser.supplier_of !== null){
          return this.getAuthUser.supplier_of[0] === this.getOpenedProduct.supplier_id;
        }
        return false;
      },
      notFromUser(){
        if (window.entryPoint == "user"){
          return false;
        }
        return true
      },
    }
  }
</script>
