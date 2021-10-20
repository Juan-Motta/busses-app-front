<template>
	<div>
		<div class="container">
			<NavbarComponent />
			<ViajesComponent />
		</div>
		<FooterComponent />
	</div>
</template>

<script>

	import NavbarComponent from '../components/NavbarComponent.vue'
	import ViajesComponent from '../components/ViajesComponent.vue'
	import FooterComponent from '../components/FooterComponent.vue'

	export default {
		name: 'Viajes',
		components: {
			NavbarComponent,
			FooterComponent,
			ViajesComponent
		}
	}
</script>