<template>
	<div>
		<h1>Informacion de la reserva</h1>
		<ReservaInfoComponent />
		<InfoPasajeroComponent />
	</div>
</template>

<script>

	import ReservaInfoComponent from '../components/ReservaInfoComponent.vue'
	import InfoPasajeroComponent from '../components/InfoPasajeroComponent.vue'

	export default {
		name: 'Reserva',
		components: {
			ReservaInfoComponent,
			InfoPasajeroComponent
		}
	}
</script>