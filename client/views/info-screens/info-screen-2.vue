<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description._2

    | ВЫ ИЛИ ЛЮБОЙ ВАШ СОТРУДНИК#[br]
    | СМОЖЕТЕ НЕ ТОЛЬКО КОНТРОЛИРОВАТЬ#[br.desktop]
    | ЗАКАЗЫ,#[br.mobile] НО И СОВМЕСТНО ОТВЕЧАТЬ#[br.desktop]
    | КЛИЕНТАМ НЕ ОТКРЫВАЯ INSTAGRAM#[br.desktop]

</template>

<style lang="postcss">
@import 'style/vars/vars.pcss';

.info-screen .description._2 {

  padding-top: 30%;
  @media (--mobile) {
    padding-top: 60%;
  }

}
</style>
