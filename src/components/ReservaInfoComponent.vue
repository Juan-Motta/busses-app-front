<template>

	<div class="row justify-content-center mt-3 mb-4">
		<div class="row col-sm-12 col-md-6 info pt-4">
			<p>
				<b-icon-geo-alt-fill></b-icon-geo-alt-fill> &nbsp; {{ viaje.origen }} &nbsp; <b-icon-arrow-right></b-icon-arrow-right> &nbsp; {{ viaje.destino}}
			</p>
			<p>
				<b-icon-calendar-check-fill></b-icon-calendar-check-fill> &nbsp; {{ getFormatedDate(viaje.fecha) }}
			</p>
			<p>
				<b-icon-clock-fill></b-icon-clock-fill> &nbsp; {{ viaje.hora }}
			</p>
			<p>
				<b-icon-cash></b-icon-cash> &nbsp; {{ precioTotal }} COP
			</p>

		</div>

	</div>

</template>

<script>

	import moment from 'moment-timezone'

	export default {
		data() {
			return {
				viaje: {
					id: null,
					origen: null,
					destino: null,
					fecha: null,
					hora: null,
					precio: null,
					puestos: null,
					pasajeros: 1
				},

			}
		},
		computed: {
			precioTotal() {
				return this.viaje.pasajeros * this.viaje.precio
			}
		},
		methods: {
			getFormatedDate(date) {
				const dateFormated = moment(date).lang('es').format('dddd MMMM DD YYYY').split(" ")
				dateFormated[0] = this.capitalizarPrimeraLetra(dateFormated[0])
				dateFormated[1] = this.capitalizarPrimeraLetra(dateFormated[1])
				return `${dateFormated[0]}, ${dateFormated[1]} ${dateFormated[2]} del ${dateFormated[3]}`
			},
			formatNumber(input) {
				return input
			},
			capitalizarPrimeraLetra(str) {
				return str.charAt(0).toUpperCase() + str.slice(1);
			},
			calcularPrecioTotal() {
				return Number(this.viaje.precio) * Number(this.precio.pasajeros)
			}
		},
		created() {
			this.viaje = this.$route.params
		}
	}
</script>

<style scoped>
	.info {
		background-color: #f8f8f8;
	}

	.info p {
		font-weight: bold;
		font-size: 20px;
	}
</style>