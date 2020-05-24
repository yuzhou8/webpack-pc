<template>
<div id="app">
	<router-view></router-view>
</div>
</template>

<script>
import { 
	ref,
	isRef,
	toRefs,
	reactive,
	computed,
	watch,
	provide,
	inject,
	onBeforeMount,
	onMounted,
	onBeforeUpdate,
	onUpdated,
	onBeforeUnmount,
	onUnmounted,
	onErrorCaptured 
} from '@vue/composition-api'

export default {
	name: 'app',
	setup(props,ctx){
		
	}
}

</script>

<style scoped lang='less'>

</style>