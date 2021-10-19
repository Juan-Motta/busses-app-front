<template>
	<div>
		<div class="container">
			<NavbarComponent />
			<LoginComponent />
		</div>
		<FooterComponent />
	</div>
</template>

<script>

	import NavbarComponent from '../components/NavbarComponent.vue'
	import LoginComponent from '../components/LoginComponent.vue'
	import FooterComponent from '../components/FooterComponent.vue'

	export default {
		name: 'Login',
		components: {
			NavbarComponent,
			LoginComponent,
			FooterComponent
		}
	}
</script>