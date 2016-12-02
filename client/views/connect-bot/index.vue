<style src='./style.pcss'></style>
<template lang="pug">

#connect-bot
  .turn-on-bot(:style='{ height: height }')
    .turn-on-bot__close(@click='closePage'): i.ic-close
    .section
      .column-desktop-50.header(v-if="showTitleSlider")
        h1.accept Подключение бота
      .column-desktop-50.column-desktop-right(v-if="showTitleSlider")
        img(src="./directbot.png").logo
        p.paragraph.enter-screen
          span.bold Безопасность вашего Instagram #[br] профиля очень важна для нас! #[br]
          span.light Поэтому мы не храним пароль #[br] профиля и используем его только #[br] при подключения бота
        p.paragraph.enter-code-screen(v-if="false")
          span.bold Пожалуйста, #[br] введите 6-ти значный код, #[br]
          span.light высланный на email или телефон, #[br] указанные при регистрации #[br] профиля
          span.bold  {username}
          span.light  в Instаgram
        p.paragraph.code-accept(v-if="false")
          span.bold Код подтвержден #[br]
          span.light Нажмите Подключить бота еще раз
      .column-desktop-50
        .bottom-container(:class='{"opened-key-board":!showTitleSlider}')
          .input-container
            .input.name
              i.ic-insta-name
              input(type='text',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorLogin} ',
                @focus='onFocusLogin',
                @keydown.enter='sendSMS()',
                v-on:blur="blurInput",
                v-model='login',
                :placeholder='placeholder')
              .input__clear-btn(
                v-if='login',
                @click='login = ""')
                i.ic-close.clear
            .input.phone(id="pass-inp",)
              i.ic-pass
              input(type='tel',
                autocomplete="off",
                autocorrect="off",
                autocapitalize="off",
                spellcheck="false",
                :class=' {error: errorPhone} ',
                @focus='onFocusPhone',
                @keydown.enter='sendSMS()',
                v-on:blur="blurInput",
                v-model='phone',
                placeholder='Введите пароль от Instagram')
              .input__clear-btn(
                v-if='phone',
                @click='phone = ""')
                i.ic-close.clear
            .input(id="code", v-if="false")
              i.ic-code
              input(
                placeholder='Введите код')
          .btn-container
            button.btn.btn_primary.__orange.__xl.fast__big__btn.btn_fixed-bottom(
              @click='sendSMS') ПОДКЛЮЧИТЬ БОТА
            .link-container.new-sms(v-if="false")
              a.link-bottom(href='#',
                @click.prevent='onClickLink')
                | Прислать новый смс
</template>

<script type='text/babel'>

</script>
