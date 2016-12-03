<style src='./style.pcss'></style>
<template lang="pug">

#chat-list

  .chat-list-cnt(v-if='isDoneLead')

    header-component(:title='getTitle', :left-btn-show='false')

      .header__nav(slot='center-content')

        .header__nav__i.header__text(
          :class='{_active: getLeadTab === "customer"}',
          @click='$store.dispatch("setTab","customer")',
          v-if="getLeadTab === 'customer'")
          span Чаты с продавцами

        .header__nav__i.header__text(
          :class='{_active: getLeadTab === "seller"}',
          @click='$store.dispatch("setTab", "seller")',
          v-if="getLeadTab === 'seller'")
          span Чаты с покупателями

    .section.top.bottom
      .section__content
        .chat-list(v-bind:style="styleObject", ref="chatList")
          chat-list-item(v-for='lead in sortedList', :lead='lead', :key="lead.id", ref="item")
    //-template(v-if='!leadsArray.length && !directbot')
      .chat-list-cnt-is-empty(v-if="getLeadTab === 'customer'")
        .chat-list-cnt-is-empty__container Нет чатов,#[br]
        span  потому что ты пока ничего #[br] не покупаешь
      .chat-list-cnt-is-empty(v-if="getLeadTab === 'seller'")
        .chat-list-cnt-is-empty__container Нет чатов,#[br]
        span  ... потому что ты пока ничего #[br] не продаешь
      .chat-list-cnt-is-empty__banner(v-if="!leadsArray.length && getLeadTab === 'customer'") Нажми Купить&nbsp
        span под товаром #[br]или&nbsp
        span.want напиши @wantit&nbsp
        span под постом в Instagram, #[br] и здесь появится шопинг-чат
      .chat-list-cnt-is-empty__banner.sell(v-if="!leadsArray.length && getLeadTab === 'seller'")
        span Напиши&nbsp
        span.want
          | "Покупай по комментарию @wantit&nbsp" #[br(v-if="isMobile")]
        span
          | #[br(v-if="isMobile")] под товарами в своем instagram,
          | #[br] чтобы продавать и видеть здесь покупателей
        .how-to-sell-btn.chat-btn( v-link="{name: 'info-instructions-1'}") Как начать продавать?

    //- D I R E C T  B O T
    //-template(v-if='!leadsArray.length && directbot')
      button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom.turn-on-bot-btn(v-link="{ name: 'turn-on-bot' }") ПОДКЛЮЧИТЬ БОТА
      .chat-list-cnt-is-empty__banner.directbot-banner
        span
          | После подключения бота, здесь будет #[br]
          | список чатов с покупателями как в #[br]
        span.want
          | Instagram Direct

      .chat-list-cnt-is-empty
        .chat-list-cnt-is-empty__container Нет чатов,#[br]
        span  ... потому что ты пока ничего #[br] не продаешь
        
  .directbot-navbar(v-if="isMobile")
    navbar-component(current='chat')
  .directbot-right-nav
    right-nav-component(current="chat")

  scroll-top
  //-app-loader.list-loader(v-if="!needLoadLeads")



</template>

<script type='text/babel'>

  //import appLoader from 'base/loader/loader';
  import listen from 'event-listener';
  import * as leads from 'services/leads';
  import * as messages from 'services/message';

  import store from 'root/store';

  import { mapGetters, mapActions } from 'vuex';
  import ScrollTop from 'components/scroll-top';


  import HeaderComponent from 'components/header/index.vue';
  import NavbarComponent from 'components/navbar/navbar.vue';
  import RightNavComponent from 'components/right-nav';

  import ChatListItem from './chat-list-item.vue';

  export default {
    components: {
      //appLoader,
      ScrollTop,
      RightNavComponent,
      HeaderComponent,
      NavbarComponent,
      ChatListItem

    },
    data(){
      return {
        needLoadLeads: true,
        styleObject: {
          pointerEvents: 'auto'
        },
        currentPan: 0
      }
    },
    created(){

      if(this.isAuthUserSupplier) {

        store.dispatch('setTab', "seller")

      } else {

        store.dispatch('setTab', "customer")
      }

    },

    mounted(){

      if (this.isFake){

        window.fakeAuth = {text: "чтобы просматривать список чатов", data: "" }

        store.dispatch('setCallbackOnSuccessAuth', () => {

          this.$router.push({name: 'chat_list'})

        })

        this.$router.push( { name: 'signup' } );

      }

      if ( this.isAuth ) {

        this.scrollListener = listen( window , 'scroll', (() => {

          let timerId = null;

          return () => {

            if ( timerId !== null ) {

              clearTimeout( timerId );

            }

            this.styleObject.pointerEvents = 'none';

            timerId = setTimeout( () => {

              this.styleObject.pointerEvents = 'auto';

            }, 200 );

            store.dispatch('setScrollLeads', {

              scrollTop: document.body.scrollTop,
              scrollHeight: document.body.scrollHeight

            });

            if ( this.needLoadLeads ) {

              const full_scroll = document.body.scrollHeight;
              const diff_scroll = full_scroll - document.body.scrollTop;

              if ( diff_scroll < 2500 ) {

                this.needLoadLeads = false;

                store.dispatch('loadLeads').then( () => {

                  this.needLoadLeads = true;

                } );

              }

            }

          }

        })() );

        leads.onEvent( this.onEvent );

        this.run();

      } else {
        this.$router.push( { name: 'signup' } );
      }
    },
    beforeDestroy(){
      if ( this.isAuth ) {
        store.dispatch('leadClose');
        leads.offEvent( this.onEvent );
      }
      if (this.scrollListener){
        this.scrollListener.remove();
      }
    },

    computed:{
      ...mapGetters([

        //user
        'isAuth',
        'isFake',
        'isAuthUserSupplier',
        //leads
        'getLeads',
        'getLeadTab',
        'getIsTab',
        'getTitle',
        'isEmptyLeads',
        'isDoneLead',
        'getLeadsLengthList',
        'getScroll',
        'getHasMore'
      ]),

      sortedList(){
        return this.leadsArray.slice( 0, this.getLeadsLengthList ).sort((a,b)=>{
          return b.updated_at - a.updated_at;
        })
      },

      leadsArray(){
        //проверка на удаленные лиды
        if(this.$store.state.leads.tab === 'customer') {
          let leads = this.getLeads.filter(item=>{
            return !(item.cancel_reason === 2) && !(item.cancel_reason === 1);
          });

          return leads;
        }

        if(this.$store.state.leads.tab === 'seller') {

          let leads = this.getLeads.filter(item=>{
            return !(item.cancel_reason === 2) && !(item.cancel_reason === 1);
          });

          return leads;
        }
      }
    },
    events: {

      'closeDeleteLead'(){

        this.$broadcast('closeDelete');

      }
    },
    methods: {
      //Добавление нового лида в нужную вкладку
      onEvent(data){
        if (data.response_map.event === "PROGRESS"){
          let lead_id = data.response_map.lead;
          return leads
              .get({lead_id})
              .then((data)=>{
                let lead = data.lead
                this.$store.state.leads.seller.unshift(lead)
              });
        }
      },
      run(){

        this.runLoadingLeads().then( () => {

          const { scrollTop } = this.getScroll;

            this.restoreScroll()

        } )

      },

      restoreScroll(){

        return new Promise( ( resolve ) => {

          const add = ( targetHeight ) => {

            const { scrollTop } = this.getScroll;

            /**
             * Магическое 1000 это кол-во px после scrollTop;
             * */

            if ( targetHeight < ( scrollTop + 1000 ) ) {

                store.dispatch('loadLeads').then( () => {

                  setTimeout(()=>{

                    this.$nextTick( () => {

                      add( document.body.scrollHeight );

                    } );

                  },1)

                } )

            } else {

              window.scrollTo(0, scrollTop);

              resolve();

            }

          };

          this.$nextTick( () => {

            add( document.body.scrollHeight );

          } );

        } );

      },
      runLoadingLeads(){

        return new Promise( ( resolve ) => {

        /*  const add = ( scrollHeight ) => {

            if ( document.body.offsetHeight >= scrollHeight ) {

              store.dispatch('loadLeads').then( () => {

                if ( this.getHasMore ) {

                  this.$nextTick( () => {

                    add( document.body.offsetHeight );

                  } );

                } else {

                  resolve()

                }

              } )

            } else {

              resolve();

            }

          };

          this.$nextTick( () => {

            add( document.body.scrollHeight )

          } );*/
          resolve()

        } );

      },

    },

    watch: {
      getLeadTab(){

        this.run();

      }

    }
  }
</script>
