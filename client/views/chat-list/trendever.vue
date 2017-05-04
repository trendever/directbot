<style src='./style.pcss'></style>
<style lang="postcss">
@import 'style/vars/vars.pcss';
#chat-list {
  .header-title {
      position: absolute 0 * * 0;
      height: 100%;
      line-height: 50px;
      font-size: $font__medium;
      font-family:$font__family__semibold;
      color: white;
      margin-left: 200px;
  }
}
</style>
<template lang="pug">

#chat-list

  .chat-list-cnt(v-if='isDoneLead')

    header-component(:title='getTitle', :left-btn-show='false')
      .header-title(slot="left-content") Контакты
      .header__nav(slot='center-content')

        .header__nav__i.header__text(
          :class='{_active: getLeadTab === "customer"}',
          @click='$store.dispatch("setTab","customer")')
          span с продавцами

        .header__nav__i.header__text(
          :class='{_active: getLeadTab === "seller"}',
          @click='$store.dispatch("setTab", "seller")')
          span с покупателями

    .section.top.bottom
      .section__content
        .chat-list(v-bind:style="styleObject", ref="chatList")
          .space-block(:style="{height:spaceBlock+'px'}")
          chat-list-item(
            v-for='lead, index in leadsArray',
            :lead='lead',
            :key="lead.id",
            ref="item",
            :class="{'scrl-down': index === downCount - 1,'scrl-top':index === 0 }")
          .visible-block(ref="visibleBlock")

      //-.chat-list-cnt-is-empty__banner.directbot-banner(
        v-if="!botActivity && getBannerInfo.indexOf('chat-banner') === -1", :class="{'turn-bottom': sortedList.length}")

        i.ic-close(@click="$store.dispatch('closeStat', 'chat-banner')")
        span
          | После подключения оператора, #[br(v-if="!isMobile")] здесь будет #[br(v-if="isMobile")]
          | список чатов с покупателями как в #[br]
        span.want
          | Instagram Direct

      //-.chat-list-cnt-is-empty(v-if="!sortedList.length")
        .chat-list-cnt-is-empty__container Нет чатов,#[br]
        span
          | потому что мы не #[br]
          | видим ваших заказов! #[br]
          a.link-err(@click="openSupport") Это ошибка

      //-template(v-if="!botActivity")
        connect-button(v-if="!sortedList.length")

  //-.directbot-navbar(v-if="isMobile && isAuth")
    navbar-component(current='chat')
  //-.directbot-right-nav
    right-nav-component(current="chat")
  .block-click(@click="resetBlock")
    scroll-top
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
        //
        lastScroll: 0,
        currentScroll: 0,
        downCount: 15

      }
    },
    created(){
      this.spaceBlock = this.$store.state.leads.scrollLogic[this.getLeadTab].spaceBlock;
    },
    beforeDestroy(){
      this.leadsArray = []
    },
    mounted(){

      if (this.isFake){

        window.fakeAuth = {text: "чтобы просматривать список чатов", data: "" }

        store.dispatch('setCallbackOnSuccessAuth', () => {

          this.$router.push({name: 'chat_list'})

        })

        this.$router.push( { name: 'auth' } );

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

              if (this.$refs.visibleBlock.getBoundingClientRect().bottom <= window.innerHeight ) {

                this.needLoadLeads = false;

                store.dispatch('loadLeads').then( () => {

                  this.needLoadLeads = true;

                } );

              }

            }

            this.optimizeChange();

          }

        })() );

        leads.onEvent( this.onEvent );

      } else {
        this.$router.push( { name: 'auth' } );
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

      leadsArray(){

        function removeCancelLeads(item){
          return !(item.cancel_reason === 2) && !(item.cancel_reason === 1);
        }

        let leads = [];

        if(this.getLeadTab === 'customer') {
          leads = this.getLeads.filter(removeCancelLeads);
        }

        if(this.getLeadTab === 'seller') {
          leads = this.getLeads.filter(removeCancelLeads);
        }

        let { idStart, idEnd } = this.$store.state.leads.scrollLogic[this.getLeadTab];

        return leads.slice(idStart, idEnd).sort((a,b)=>b.updated_at - a.updated_at);


      },
      spaceBlock(){

        return this.$store.state.leads.scrollLogic[this.getLeadTab].spaceBlock;

      }

    },
    methods: {

      resetBlock() {
        let tab = this.$store.state.leads.scrollLogic[this.getLeadTab];
        tab.idStart=0;
        tab.idEnd=30;
        tab.spaceBlock = 0;
      },

      optimizeChange(){

        let scrollPoint = document.body.scrollTop;
        this.currentScroll = scrollPoint;

        let stateLeads = this.$store.state.leads;
        let idStart = stateLeads.scrollLogic[this.getLeadTab].idStart;
        let tab = stateLeads.scrollLogic[this.getLeadTab];
        if(this.lastScroll < this.currentScroll){
          let target = document.querySelector('.scrl-down');
          if(target && target.getBoundingClientRect().bottom <= 0 && this.getLeads.length > 20){
              tab.idStart += this.downCount;
              tab.idEnd += this.downCount;
              tab.spaceBlock  += (this.downCount) * target.offsetHeight
          }
          colorLog('scrollDown')
          this.lastScroll = scrollPoint
        }

        if(this.lastScroll > this.currentScroll){
          let target = document.querySelector('.scrl-top');
          if(target && target.getBoundingClientRect().top >= 0 && idStart > 0){
            tab.idStart -= this.downCount;
            tab.idEnd -= this.downCount;
            tab.spaceBlock -= (this.downCount) * target.offsetHeight;
          }
          if(target.getBoundingClientRect().bottom >= target.offsetHeight && idStart <= 0){
            tab.spaceBlock = 0;
          }
          colorLog('scrollUp')
          this.lastScroll = scrollPoint;

        }

        tab.scroll = scrollPoint;


        // this.$refs.item.forEach( item => {

        //   let rect = item.$el.getBoundingClientRect();

        //   if(rect.bottom < 0){

        //     stateLeads.scrollLogic[this.getLeadTab].idStart += this.downCount;
        //     stateLeads.scrollLogic[this.getLeadTab].idEnd += this.downCount;
        //     stateLeads.scrollLogic[this.getLeadTab].spaceBlock += rect.height;

        //   }
        //   if(rect.top > window.innerHeight){

        //     stateLeads.scrollLogic[this.getLeadTab].idStart -= this.downCount;
        //     stateLeads.scrollLogic[this.getLeadTab].idEnd -= this.downCount;
        //     stateLeads.scrollLogic[this.getLeadTab].spaceBlock = rect.height;
        //   }

        //   colorLog(item.isVisible)

        // })

      },

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
      }
    },

    watch: {
      getLeadTab(){
        this.$nextTick(()=>{
          document.body.scrollTop = this.$store.state.leads.scrollLogic[this.getLeadTab].scroll;
        })
      }
    }
  }
</script>
<style lang="postcss">
</style>
