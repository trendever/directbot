<style src='./styles/chat-bar.pcss'></style>
<template lang="pug">
div
  //.loader-center(v-if="imgLoader"): app-loader
  menu-component(v-if='getShowMenu && !getShowStatusMenu')
    div.menu-items(slot='items', :class="{'directbot-color': directbot}")

      //-.menu_i(v-if='canCallCustomer', @click='callCustomer()')
        .menu_i_t Позвать покупателя в чат

      //-.menu_i(v-if='canCallSupplier', @click='callSupplier()')
        .menu_i_t Позвать магазин в чат

      .menu_i(v-if='notCustomer', @click.stop='setShowStatusMenu(true)')
        .menu_i_t Изменить статус заказа

      //-.menu_i(@click='openPayment()' v-if="noActivePayments")
        .menu_i_t Запросить деньги

      label(class='menu_i menu_i-send-file') Отправить фото
        input(type='file', hidden, @change='selectedFile')

      .menu_i(v-if='false')
        .menu_i_t Добавить шаблон
      .menu_i(@click='setShowMenu(false)')
        .menu_i_t(:class="{'directbot-color': directbot, '__txt-green': !directbot}") Отмена

  chat-menu-status( v-if='getShowStatusMenu')
  chat-menu-cancel( v-if='getShowCancelMenu')

</template>

<script type='text/babel'>
  import listen from 'event-listener';
  import store from 'root/store';

  import * as leads from 'services/leads';
  import * as service from 'services/chat';
  import { ratioFit, targetClass } from 'root/utils';
  import { mapActions, mapGetters } from 'vuex';
  import MenuComponent from 'components/menu/menu.vue';
  import ChatMenuStatus from './chat-menu-status.vue';
  import ChatMenuCancel from './chat-menu-cancel.vue';
  //import AppLoader from 'base/loader/loader';

  export default{
    data(){
      return {
        directbot: true,
        loadImg: false
      }
    },
    mounted(){

      this.outerCloseMenu = listen(document.body, 'click',(e)=>{

        targetClass(e, 'menu-cnt', ()=>{

          if(this.getShowMenu) {

             this.setShowMenu(false);
             this.setShowStatusMenu(false);
             this.setShowCancelMenu(false);
          }

        });

      })

    },
    beforeDestroy(){
      if(this.outerCloseMenu) {

        this.outerCloseMenu.remove();

      }
    },
    methods: {
      ...mapActions([
        //chat
        'setConversationImgLoader',
        'setShowMenu',
        'setShowStatusMenu',
        'setShowCancelMenu',
        'addPreLoadMessage',
        //user
        'setPayment'
      ]),
      openPayment(){
        this.setPayment({shopId: this.paymentShopId(),leadId: this.getLeadId});
        this.$router.push( { name: 'payment'} );
      },
      paymentShopId(){
        //если простой покупатель
        if(this.getCurrentMember.role === 1){
          return 0;
        }
        //если селлер или shop
        return this.getShopId;
      },
      selectedFile( { target } ){
        const MIME = target.files[ 0 ].type;
        const file = target.files[ 0 ];
        if ( MIME in { 'image/png': true, 'image/gif': true, 'image/jpg': true, 'image/jpeg': true } ) {

          this.setShowMenu( false );
          this.setConversationImgLoader(true);

          const reader = new FileReader();
          const image  = new Image();


          let { width, height } = ratioFit(image.width, image.height, 570, image.height);

          reader.addEventListener( 'loadend', () => {

            image.addEventListener("load",() => {

              let base64Prefix = `data:${MIME};base64,`;
  
              this.addPreLoadMessage({
                base64: reader.result.substr( base64Prefix.length, reader.result.length ),
                base64WithPrefix: reader.result,
                MIME: 'image/base64',
                width, 
                height
              });



              this.$nextTick( () => {

                window.scrollTo( 0, document.body.scrollHeight );

                this.$emit('goToBottom');

              } );

            });

            image.src = reader.result;


          } );

          reader.readAsDataURL( file );

        } else {

          alert(`Выберите картинку в формате: .png, .git, .jpg, .jpeg`);

        }

      },
      callCustomer() {
        service.callCustomer(this.getLeadId);
        this.setShowMenu(false);
      },
      callSupplier() {
        service.callSupplier(this.getLeadId);
        this.setShowMenu(false);
      }
    },

    computed: {

      ...mapGetters([
        //chat
        'getCustomerId',
        'imgLoader',
        'getShopId',
        'getCurrentMember',
        'getLeadId',
        'getShowMenu',
        'getShowStatusMenu',
        'getShowCancelMenu',
        'getInviteShop',
        'getInviteCustomer',
        'getAction',

      ]),

      noActivePayments(){
        console.log("NO ACTIVE")
        console.log(this.getAction !== 'pendingpayment');
        return this.getAction !== 'pendingpayment';
      },
      notCustomer(){
        return this.getCustomerId !== this.$store.state.user.myId;
      },
      canCallCustomer(){
        return this.getCustomerId !== this.$store.state.user.myId && this.getInviteCustomer;
      },
      canCallSupplier() {
        return this.getInviteShop;
      }
    },

    components: {
      //AppLoader,
      MenuComponent,
      ChatMenuStatus,
      ChatMenuCancel
    }

  }
</script>
