<template>
	<div>
		<h1>Resumen de la reserva</h1>
		<ResumenComponent />
	</div>
</template>

<script>

	import ResumenComponent from '../components/ResumenComponent.vue'

	export default {
		name: 'Reserva',
		components: {
			ResumenComponent
		}
	}
</script>