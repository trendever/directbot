<template lang="pug">
li.flex-item 
	div.photo {{product}}
</template>

<script>
export default {
	props: ['product']
}
</script>