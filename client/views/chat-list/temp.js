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
          .space-block(:style="{ height: spaceBlock + 'px', position: 'relative' }")
          chat-list-item(
            v-for='lead, index in sortedList',
            :lead='lead',
            :key="lead.id",
            ref="item",
            :class="{'scrl-down': index === 6, 'scrl-top': index === 0 }")





      .chat-list-cnt-is-empty__banner.directbot-banner(
        v-if="!botActivity && getBannerInfo.indexOf('chat-banner') === -1", :class="{'turn-bottom': sortedList.length}")

        i.ic-close(@click="$store.dispatch('closeStat', 'chat-banner')")
        span
          | После подключения оператора, #[br(v-if="!isMobile")] здесь будет #[br(v-if="isMobile")]
          | список чатов с покупателями как в #[br]
        span.want
          | Instagram Direct

      .chat-list-cnt-is-empty(v-if="!sortedList.length")
        .chat-list-cnt-is-empty__container Нет чатов,#[br]
        span
          | потому что мы не #[br]
          | видим ваших заказов! #[br]
          a.link-err(@click="openSupport") Это ошибка

      template(v-if="!botActivity")
        connect-button(v-if="!sortedList.length")

  .directbot-navbar(v-if="isMobile && isAuth")
    navbar-component(current='chat')
  .directbot-right-nav
    right-nav-component(current="chat")

  //-scroll-top
  //-app-loader.list-loader(v-if="!needLoadLeads")



</template>

<script type='text/babel'>
  import config from 'root/../config';
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
  import ConnectButton from 'components/connect-button';

  import ChatListItem from './chat-list-item.vue';

  export default {
    components: {
      //appLoader,
      ScrollTop,
      RightNavComponent,
      HeaderComponent,
      NavbarComponent,
      ChatListItem,
      ConnectButton

    },
    data(){
      return {
        needLoadLeads: true,
        styleObject: {
          pointerEvents: 'auto'
        },
        currentPan: 0,


        //scroll two way
        lastScroll: 0,
        currentScroll: 0,
        spaceBlock: 0

      }
    },

    mounted(){

      this.spaceBlock = this.$store.state.leads.scrollLogic.seller.spaceBlock;

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

            //--------SCROLL LEADS------------------
            let stateLeads = this.$store.state.leads;
            let scrollPoint = document.body.scrollTop;
            let  { idStart }= this.scrollIds;

            this.currentScroll = scrollPoint;


            if(this.lastScroll < this.currentScroll){
              let target = document.querySelector('.scrl-down');
              if(target.getBoundingClientRect().bottom <= 0){
                this.spaceBlock += 7 * target.offsetHeight;
                stateLeads.scrollLogic.seller.idStart += 7;
                stateLeads.scrollLogic.seller.idEnd += 7;
                stateLeads.scrollLogic.seller.spaceBlock = this.spaceBlock;
              }
              colorLog('scrollDown')
              this.lastScroll = scrollPoint;
            }
            if(this.lastScroll > this.currentScroll){
              let target = document.querySelector('.scrl-top');
              if(target.getBoundingClientRect().top >= 0 && idStart > 0){
                this.spaceBlock -= 7 * target.offsetHeight;
                stateLeads.scrollLogic.seller.idStart -= 7;
                stateLeads.scrollLogic.seller.idEnd -= 7;
                stateLeads.scrollLogic.seller.spaceBlock = this.spaceBlock;
              }
              colorLog('scrollUp')
              this.lastScroll = scrollPoint;
            }
            //------------------------------------
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
        'getBannerInfo',
        'botActivity',
        //user
        'getAuthUser',
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
      scrollIds(){
        return this.$store.state.leads.scrollLogic.seller;
      },
      sortedList(){
        return this.leadsArray.slice( 0, this.getLeadsLengthList ).sort((a,b)=>{
          return b.updated_at - a.updated_at;
        })
      },

      leadsArray(){
        //проверка на удаленные лиды
        if(this.$store.state.leads.tab === 'customer') {

          // let leads = this.getLeads.filter(item=> {

          //   return !(item.cancel_reason === 2) && !(item.cancel_reason === 1);

          // });

          //только чаты с продавцами
          this.$store.dispatch('setTab', 'seller');

          return [];

        }

        if(this.$store.state.leads.tab === 'seller') {

          let leads = this.getLeads.filter( item => {

            return !(item.cancel_reason === 2) && !(item.cancel_reason === 1);

          });

          let { idStart, idEnd } = this.scrollIds;

          return leads.slice(idStart, idEnd);

        }
      }
    },
    events: {

      'closeDeleteLead'(){

        this.$broadcast('closeDelete');

      }
    },
    methods: {
      openSupport(){
        this.$store
          .dispatch('createLead',config.support_id || 37318)
          .then(lead=>this.$router.push({name:'chat', params:{id: lead.id}}))
      },
      //Добавление нового лида в нужную вкладку
      onEvent(data){
        if (data.response_map.event === "PROGRESS"){
          let lead_id = data.response_map.lead;
          return leads
              .get({lead_id})
              .then((data)=>{
                let lead = data.lead
                this.$store.state.leads.seller.unshift(lead)
                this.$store.state.leads.notify_count[lead.id] = 1
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