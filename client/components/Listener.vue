<template lang="pug">
#listener
</template>

<script type='text/babel'>

  import * as messages from 'services/message'
  import * as products from 'services/products'
  import * as leads from 'services/leads'

  import store from 'root/store';
  import { mapGetters } from 'vuex';

  export default {

    created() {

      this.onMessage     = this.onMessage.bind( this )
      this.onMessageRead = this.onMessageRead.bind( this )
      this.onProductNew  = this.onProductNew.bind( this )
      this.on            = this.on.bind( this )
      this.off           = this.off.bind( this )
      if ( this.isAuth ) {
        this.on()
      }
    },

    beforeDestroy(){
      this.off()
    },

    methods: {
      onProductNew( { response_map } ){
        //this.onProductNewProduct( response_map.object_list[ 0 ], true );
      },
      onMessage( data ) {
        store.dispatch('onMessagesLead', data );
        store.dispatch('onMessagesChat', data );

      },

      onMessageRead( data ) {
        store.dispatch('onMessageReadLead', data );
      },
      on() {
        store.dispatch('initLead').then( () => {
          messages.onMsg( this.onMessage )
          messages.onMsgRead( this.onMessageRead )
          products.onNew( this.onProductNew )
        } )
      },
      off() {
        messages.offMsg( this.onMessage )
        messages.offMsgRead( this.onMessageRead )
        products.offNew( this.onProductNew )
      }
    },
    computed: {
      ...mapGetters([
        'isAuth'
      ])
    },
    watch: {
      isAuth( isAuth ){
        isAuth ? this.on() : this.off()
      }
    },
    vuex: {
      actions: {
        //onProductNewProduct: product.setLike
      },

    },
  }
</script>
