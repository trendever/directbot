<style src="./info-screen.pcss"></style>
<template lang="pug">
.info-screen
  .description
    .centered

      | Большинство ботов #[br]
      | совершают в Instagram #[br]
      | такие действия как  #[br]
      | массовый лайкинг или
      | массовая подписка, что  #[br]
      | является спам активностью.#[br]
      | Наш бот наполовину человек,#[br]
      | и его действия ничем не#[br]
      | отличаются от обычных#[br]

</template>
<style lang="postcss">

@import 'style/vars/vars.pcss';

.description .centered {
  @media (--mobile) {
    padding-top: 25%;
  }

  padding-top: 15%;

}

</style>
