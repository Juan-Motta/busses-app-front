<template>
	<div>
		<div class="container">
			<NavbarComponent />
		</div>
		<FooterComponent />
	</div>
</template>

<script>

	import NavbarComponent from '../components/NavbarComponent.vue'
	import FooterComponent from '../components/FooterComponent.vue'

	export default {
		name: 'Viajes',
		components: {
			NavbarComponent,
			FooterComponent
		}
	}
</script>