<template lang="pug">
.chat-list-i(@click="goToChat",
            ref="chatItem")

  template(v-if="isVisible")
    .chat-list-i-photo(v-if="!showDelete")
      template(v-if="isHelpProduct")
        //-img(src="./img/chats_inactive.svg")
        img(:src="getOpponentAvatar")
      template(v-if="isMonetizationProduct")
        img(src="./img/money-icon.png")
      template(v-if="noProducts")
        img(:src="getOpponentAvatar")
      template(v-else)
        img(:src='getPhoto()')

    .chat-list-i-body

      .body-title {{ title }}

      .body-status-time
        .body-status(:class="statusColor") {{ status }}
        .body-time {{ dataTime }}

      .body-last-msg
        p
          b(v-if="showAnotherName")
            | {{recentMessage.user_name=='trendevercom'?'':recentMessage.user_name + ":" }}
          span(v-html="recentMessage.message")
        .body-notify(v-if='unreadCount')
          span {{ unreadCount }}
    .chat-list-i-delete(:class="{'open-delete': showDelete}", @click.stop="deleteChat") Удалить

</template>

<script type='text/babel'>
import listen from 'event-listener';

import { urlThumbnail } from 'root/utils';

import { formatPastTime } from 'views/chat/utils';

import * as leadsService from 'services/leads';

import Hammer from 'hammerjs';

import { mapGetters } from 'vuex';

import config from 'root/../config'

export default {
  data(){
    return {
      showDelete: false,
      isVisible: true
    };
  },
  props: {
    lead: {
      type: Object,
      required: true
    }
  },
  created(){

    this.$on('closeDelete', ()=>{
      if(this.showDelete) this.showDelete = false;
    })

  },

  mounted(){

    new Hammer(this.$refs.chatItem,{ touchAction: 'auto'})

    .on('swipeleft',()=>{

      this.$emit('closeDeleteLead');
      this.showDelete = true;

    })

    .on('swiperight',()=>{

      this.showDelete = false;

    });

  },
  methods: {

    goToChat(){

      let parentRefs = this.$parent.$refs.item;

      let item = parentRefs.find(item=>{
        return item.showDelete === true;
      })

      if(item) {
        item.showDelete = false;
        return;
      }


      if(this.showDelete) {
        this.showDelete = false;
        return;
      }

      this.$router.push({name: "chat", params: { id: this.lead.id }} )

    },
    deleteChat(){


        let cancel_reason = this.getLeadTab === "customer" ? 2 : 1;

        leadsService.setEvent(this.lead.id,'CANCEL', cancel_reason)

        .then(()=> {
          if(this.getLeadTab === "customer") {

            let customerLeads = this.$store.state.leads.customer;
            let lead = customerLeads.filter(item=>{
              return item.id === this.lead.id;

            })

            let idx = customerLeads.indexOf(lead[0]);

            customerLeads.splice(idx,1);

          }

          if(this.getLeadTab === "seller") {

            let sellerLeads = this.$store.state.leads.seller;
            let lead = sellerLeads.filter(item=>{
              return item.id === this.lead.id;

            })

            let idx = sellerLeads.indexOf(lead[0]);

            sellerLeads.splice(idx,1);

          }

        });

    },

    getPhoto() {
      if ( Array.isArray( this.lead.products ) ) {

        if ( this.lead.products.length > 0 ) {

          //console.log(this.lead.products)
          

          const { instagram_images } = this.lead.products[ 0 ];

          if ( Array.isArray( instagram_images ) ) {

            const result = instagram_images.find( ( img ) => img.name == "S_square" ).url;

            if ( typeof result === 'undefined' ) {

              return null;

            }

            return result;

          }

        }

      } else {
        return this.getAuthUser.id == this.lead.customer.id ? 
          this.lead.shop.instagram_avatar_url || this.lead.shop.avatar_url 
          :
          null || this.customer.avatar_url
      }

    }
  },
  computed: {
    ...mapGetters([
      'getNotifyCountList',
      'getLastMessage',
      'getLeadTab',
      'getAuthUser'
    ]),
    showAnotherName(){
      if(this.recentMessage.user_name){
        return this.recentMessage.user_name.length > 0
      } 
    },
    noProducts(){
      return !(Array.isArray( this.lead.products ) && this.lead.products.length > 0)
    },
    getOpponentAvatar(){
     return this.lead.shop.instagram_avatar_url || ""
    },
    isHelpProduct(){
      if ( Array.isArray( this.lead.products ) && this.lead.products.length > 0) {
        if (this.lead.products[0].code == this.lead.products[0].mentioned_id + "_help") {
            return true;
        }
      }
      return false;
    },
    isMonetizationProduct(){
      if ( Array.isArray( this.lead.products ) && this.lead.products.length > 0) {
        if (this.lead.products[0].id === config.monetization_help_id){
            return true;
        }
      }
      return false;
    },
    unreadCount(){

      return this.getNotifyCountList[ this.lead.id ];

    },

    recentMessage(){
      const msgObj = this.getLastMessage[ this.lead.id ];
      if ( msgObj && msgObj.message) {
        msgObj.message = msgObj.message.replace(/₽/g, '&nbsp;<i class="ic-currency-rub"></i> ');

        let s = this.$store.state.leads.seller.length
        let u = this.getAuthUser
        let shopName = this.lead.shop.instagram_username

        if (u.supplier_of == null && u.seller_of == null && !s) {
          let name = u.instagram_username || u.name
          if(name != msgObj.user_name && msgObj.user_name != shopName) {
            msgObj.user_name = `${shopName} (${msgObj.user_name})`
          }
        }

        console.log(`${shopName} (${msgObj.user_name})`)

        return msgObj;

      }
      return {
        message: '',
        user_name: '',
      }
    },
    statusColor(){
      switch(this.status){
        case 'Подтвержден': return '__green'
          break;
        case 'Новый': return '__red'
          break;
        case 'Отменен': return '__grey'
          break;
        case 'На доставке': return '__blue'
          break;
        case 'Выполнен': return '__grey'
          break;
        case 'В процессе': return '__yellow'
      }
    },
    status(){
      let status = leadsService.getStatus( this.lead.status );
      if(status) return status.name
    },
    dataTime(){
      if ( this.lead.chat !== null ) {
        return formatPastTime( this.lead.updated_at_ago );
      }
    },
    title(){
      if ( this.lead.chat !== null ) {

        let customer_name = this.lead.chat.members.find( ( { user_id } ) => this.lead.customer_id === user_id ).name;
        let shopname = this.lead.shop.instagram_username;

        if( this.lead.user_role === leadsService.USER_ROLES.CUSTOMER.key ) return shopname;
        if (this.lead.user_role === leadsService.USER_ROLES.SUPPLIER.key ) return customer_name;
        if (customer_name.indexOf("customer_") >= 0){
          customer_name = customer_name.replace("customer_","client")
        }

        return `${customer_name} (${shopname})`
      }
    }
  },
}
</script>
