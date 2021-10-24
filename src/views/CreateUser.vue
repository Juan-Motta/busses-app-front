<template>
	<div>
		<RegisterComponent />
	</div>
</template>

<script>

	import RegisterComponent from '../components/RegisterComponent.vue'

	export default {
		name: 'CreateUser',
		components: {
			RegisterComponent,
		}
	}
</script>