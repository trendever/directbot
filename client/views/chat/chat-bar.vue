<style src='./styles/chat-bar.pcss'></style>
<template lang="pug">
#chat-bar
  .chat-bar
    .chat-approve-btn.noaction(v-if='getAction === "approve" && getCurrentMember.role === 1', @click='approveChat($event)') ПОДТВЕРДИТЬ
    .chat-bar.section__content(v-if="getAction !== 'approve' && getAction !== 'pay' && getAction !== 'pendingpayment' ", id="inputbar")
      .chat-bar_menu-btn(@click.stop='openChatmenu', :class="{'directbot-color': directbot}")
        i.ic-chat_menu
      .chat-bar_input(ref="bar")
        textarea(placeholder='Введите сообщение',
                 v-model='txtMsg',
                 v-on:keyup="addPadding",
                 ref="inputMsg",
                 v-on:click="$refs.inputMsg.focus()",
                 @focus='focusInput',
                 @blur='blurInput($event)')
      .chat-bar_send-btn(v-on:mousedown='send($event)',
                         v-on:touchstart='send($event)',
                         :class='{"__active": !!txtMsg, "directbot-color": directbot}')
        i.ic-send-plane
      chat-menu(v-if="!isMobile")
  chat-menu(v-if="isMobile")

</template>

<script type='text/babel'>

  import listen from 'event-listener'

  import store from 'root/store'

  import { mapActions, mapGetters } from 'vuex';

  import * as service from 'services/message'
  import * as leads from 'services/leads'
  import * as cardService from 'services/card';

  import ChatMenu from './chat-menu.vue'

  export default{
    data(){
      return {
        txtMsg: '',
        directbot: true,
        fakeRegCount: 0
      }
    },
    computed: {
      ...mapGetters([
        //user
        'isFake',
        'getUseDays',
        //chat
        'getAction',
        'getId',
        'getCurrentMember',
        'getShowMenu',
        'getStatus',
        'getShopName',
        'getLeadId'
      ])
    },

    mounted(){

      this.addPadding();

      this.scroll = document.body;

      if ( !window.browser.mobile ) {

        this.sendMessage = listen( window, 'keydown', ( event ) => {

          if ( !event.shiftKey && event.keyCode === 13 ) {

            this.send( event )

          }
          if ( event.shiftKey && event.keyCode === 13 ) {

            this.txtMsg = this.txtMsg;

          }

        } )

      }

      this.$nextTick(()=>{
        if(window.fakeUserRegistrationDone) this.approveChat();
      })

    },

    beforeDestroy() {

      if(this.$refs.inputMsg) {

        this.$refs.inputMsg.blur();

      }

      if ( this.scrollEvent ) {
        this.scrollEvent.remove()
      }
      if ( this.sendMessage ) {
        this.sendMessage.remove()
      }
    },
    methods: {
      ...mapActions([
        //auth
        'setCallbackOnSuccessAuth',
        //chat
        'setConversationAction',
        'createMessage',
        'setShowMenu',
        'setStatus'

      ]),

      addPadding(){

        this.$emit('addPadding', this.$refs.bar.offsetHeight)

      },
      openChatmenu(){

        this.setShowMenu(true);

      },
      normalizeScroll() {
        // Hard hack for ios jumping, why open keyboard
        if ( window.scrollY === 0 ) {
          return
        }

        if ( this.windowScrollY
          && this.windowScrollY.min !== window.scrollY
          && this.windowScrollY.msx !== window.scrollY ) {
          return window.scrollTo( 0, this.windowScrollY.last )
        }

        // Magic numbers
        // disabled autocomplete
        // var devices = [
        //   { min: 446, max: 510, diff: 19 }, // iphone 6 plus, 6s plus
        //   { min: 470, max: 536, diff: 20 }, // iphone 6, 6s
        //   { min: 548, max: 616, diff: 24 } // iphone 5, 4s
        // ]

        // enabled autocomplete
        var devices = [
          { min: 446, max: 510, diff: 19 }, // iphone 6 plus, 6s plus
          { min: 452, max: 536, diff: 20 }, // iphone 6, 6s
          { min: 530, max: 616, diff: 24 } // iphone 5, 4s
        ]

        if ( window.browser.iphone ) {

          for ( var item of devices ) {
            if ( window.scrollY === item.min ) {

              item.last          = item.min - item.diff
              this.windowScrollY = item
              return window.scrollTo( 0, item.last )

            } else if ( window.scrollY === item.max ) {

              item.last          = item.max - item.diff
              this.windowScrollY = item
              return window.scrollTo( 0, item.last )

            }
          }

        }
      },

      blurInput( event ){
        if ( window.browser.iphone ) {
          if ( this.scrollEvent ) {
            this.scrollEvent.remove()
          }
        }
        if (window.browser.androidapp) {
          document.getElementById('inputbar').classList.remove("inputon");
          document.getElementById('chatmessages').classList.remove("inputon");
          this.scroll.scrollTop = this.scroll.scrollHeight;
        }
      },

      focusInput(){
        if ( window.browser.iphone ) {
          this.normalizeScroll()
          this.scrollEvent = listen( window, 'scroll', this.normalizeScroll.bind( this ) )
        }
        if (window.browser.androidapp) {
          document.getElementById('inputbar').classList.add("inputon");
          document.getElementById('chatmessages').classList.add("inputon");
          this.scroll.scrollTop = this.scroll.scrollHeight;
        }
      },

      send ( event ) {

        if(!this.isMobile) this.$emit('addPadding', 57)

        else this.$emit('addPadding', 95)

        if(event) {

          event.stopPropagation()
          event.preventDefault()

        }

        const txtMsg = this.txtMsg.trim()
        if ( !txtMsg.length ) {
          return
        }

        this.txtMsg = ''

        const promise = this.createMessage({ conversation_id: this.getId, text:txtMsg, mime_type: 'text/plain' } )
        promise.then( () => {
          if (
            this.getStatus === leads.STATUSES.NEW.key &&
            this.getCurrentMember.role === leads.USER_ROLES.CUSTOMER.key
          ) {
            this.setStatus( 'PROGRESS', 'lead.state.changed' )
          }

          this.setConversationAction("base");

          let id = this.$route.params.id;



        } )

        promise.catch( ( { code, errData } ) => {
          this.txtMsg = txtMsg
          console.error( errData )

          // ToDo надо отображать, что сообщение не отправлено значком в сообщении
          alert( 'Ошибка. Сообщение не отправлено. Может нет интернета?' )

          console.error( new Error( 'Problem to send message' ), {
            extra: {
              errorMsg: errData,
              user: store.state.user
            }
          } )

        } )
      },
      approveChat(e){
        
        if (this.isFake && this.fakeAction === 'chat-product'){

          let id = this.$route.params.id;
          window.fakeAuth = {text: "чтобы не пропустить ответ от", data: this.getShopName}
          this.setCallbackOnSuccessAuth(()=>{
            window.fakeUserRegistrationDone = true;
            this.$router.push({name: 'chat', params: { id }})
          })

          this.$router.replace( { name: 'auth' } );
          return;

        }

        this.txtMsg = 'Привет;) да, подтверждаю!';

        if (e) e.target.hidden = true;

        this.send();

      }
    },

    watch: {
      txtMsg( msg ) {
        this.$nextTick( () => {
          let inputMsg          = this.$refs.inputMsg
          const textHeight      = window.matchMedia( '(max-width: 750px)' ).matches ? 58 : 32
          const inpHeight       = inputMsg.scrollHeight
          inputMsg.style.height = (msg ? (inpHeight <= textHeight) ? textHeight : inpHeight : textHeight) + 'px'
        } )

      }
    },

    components: {
      ChatMenu
    }
  }
</script>
