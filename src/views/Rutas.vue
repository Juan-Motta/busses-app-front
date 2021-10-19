<template>
	<div>
		<div class="container">
			<NavbarComponent />
			<h1>Nuestras Rutas</h1>
		</div>
		<FooterComponent />
	</div>
</template>

<script>

	import NavbarComponent from '../components/NavbarComponent.vue'
	import FooterComponent from '../components/FooterComponent.vue'

	export default {
		name: 'Rutas',
		components: {
			NavbarComponent,
			FooterComponent
		}
	}
</script>