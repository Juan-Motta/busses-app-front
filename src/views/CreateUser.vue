<template>
	<div>
		<div class="container">
			<NavbarComponent />
			<RegisterComponent />
		</div>
		<FooterComponent />
	</div>
</template>

<script>

	import NavbarComponent from '../components/NavbarComponent.vue'
	import RegisterComponent from '../components/RegisterComponent.vue'
	import FooterComponent from '../components/FooterComponent.vue'

	export default {
		name: 'CreateUser',
		components: {
			NavbarComponent,
			RegisterComponent,
			FooterComponent
		}
	}
</script>