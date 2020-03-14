<template>
	<div>
		<UserInfo></UserInfo>
		<Qyinfo></Qyinfo>
	</div>
</template>
<script>
	import UserInfo from "./components/UserInfo"
	import Qyinfo from "./components/QyInfo"
	export default {
		components:{
			UserInfo,Qyinfo
		},
		data() {
			return {
				
			}
		},
		created() {
			this.$store.dispatch('infoData/getSelect', {});
			// this.$store.dispatch('infoData/getCity', {});
		}
		
	}
</script>

<style>
</style>
