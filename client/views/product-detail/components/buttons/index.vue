<template>
<div v-if="loaded || !$store.getters.isAuth">
  <div class="buttons" :class="{'glued-btns': isMobile && !isSelfProduct}" v-if="!isSelfProduct">
    <div class="tags-buttons">
      <button class="buy_btn" @click="buy">КУПИТЬ</button>
    </div>
  </div>
  <!-- <div class="find-bloger" v-if="isSelfProduct" @click="buyServiceProduct">Найти блогера</div> -->
</div>

</template>

<style src="./style.pcss" scoped lang="postcss"></style>

<script type="text/babel">
  import { mapGetters } from 'vuex';
  let config = { service_product_id: 7833 };

  export default {
    data(){
      return {
        loaded: false
      }
    },
    created(){
      this.loaded = true;
      this.$on('isAuthProduct',()=>{
        this.loaded = true;
      });
    },
    methods:{

      buyServiceProduct(){

        let productId = config.service_product_id === null ? 7833 : config.service_product_id;

        this.$store.dispatch('createLead',productId)
          .then(
            ( lead ) => {
              if ( lead !== undefined && lead !== null ) {
                this.$router.push( { name: 'chat', params: { id: lead.id } } )
              }
            }
          )
          .catch(
            ( error ) => {
              if ( error === leads.ERROR_CODES.UNATHORIZED ) {
                this.$router.push( { name: 'signup' } )
              }
            }
          )
      }
    },
    computed: {
      ...mapGetters([
        'isSelfProduct'
      ]),

      text(){

        return (this.isLiked) ? 'СОХРАНЕНО' : 'СОХРАНИТЬ';

      }

    },
    props: {
      isLiked: {
        type: Boolean,
        default: false
      },
      supplierAvailable: {
        type: Boolean,
        default: false
      },
      productId: {
        type: Number,
        default: 0
      },
      like: {
        type: Function,
        default: () => {

        }
      },
      buy: {
        type: Function,
        default: () => {

        }
      },
      buyPromoProduct: {
        type: Function,
        default: () => {

        }
      }
    }
  }
</script>
