<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._2

    | проконсультирует покупателя,#[br]
    | узнает его желания и сверит#[br]
    | информацию о товаре#[br(v-if="isMobile")] с вашим#[br(v-if="!isMobile")]
    | сайтом или#[br(v-if="isMobile")] таблицей остатков#[br(v-if="!isMobile")]
    | товара.#[br(v-if="isMobile")] Спросит адрес доставки#[br]
    | или запишет в шоу-рум.

</template>

<style lang="postcss">
@import 'style/vars/vars.pcss';

.info-screen .description._2 {

  padding-top: 25%;
  @media (--mobile) {
    padding-top: 60%;
  }

}
</style>
