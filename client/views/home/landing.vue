<template lang="pug">

#landing
	who-need


</template>

<script>

import whoNeed from './parts/who-need';

export default {
	components:{whoNeed}
}


</script>

<style lang="postcss">

@import 'style/vars/vars.pcss';

#landing {
	min-height: 100%;
	background: url(./img/DirectBot_landing-desk_pattern.png)


}

</style>