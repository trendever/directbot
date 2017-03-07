<template lang="pug">
.chat-list-i(@click="goToChat",
            ref="chatItem")

  template(v-if="isVisible")
    .chat-list-i-photo(v-if="!showDelete")
      img(:src='getPhoto()')

    .chat-list-i-body

      .body-title {{ title }}

      .body-status-time
        .body-status ( {{ status.toLowerCase() }} )
        .body-time {{ dataTime }}

      .body-last-msg
        p
          b(v-if="recentMessage.user_name.length > 0") {{recentMessage.user_name}}:
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

          const { instagram_images } = this.lead.products[ 0 ];

          if ( Array.isArray( instagram_images ) ) {

            const result = instagram_images.find( ( img ) => img.name == "S_square" ).url;

            if ( typeof result === 'undefined' ) {

              return null;

            }

            return result;

          }

        }

      }

      return null;

    }
  },
  computed: {
    ...mapGetters([
      'getNotifyCountList',
      'getLastMessage',
      'getLeadTab'
    ]),

    unreadCount(){

      return this.getNotifyCountList[ this.lead.id ];

    },
    recentMessage(){
      const msgObj = this.getLastMessage[ this.lead.id ];
      if ( msgObj ) {
        msgObj.message = msgObj.message.replace(/₽/g, '&nbsp;<i class="ic-currency-rub"></i> ');
        return msgObj;
      }
      return {
        message: '',
        user_name: '',
      }
    },
    status(){
      return leadsService.getStatus( this.lead.status ).name
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
