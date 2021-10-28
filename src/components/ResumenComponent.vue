<template>
	<div class="reserva">
		<div class="reserva-alert">
			<b-alert
				variant="success"
				show
				class="col-lg-6"
			>Reserva creada correctamente</b-alert>
		</div>

		<div
			v-for="index in numeroReservas"
			:key="index"
			class="info col-sm-12 col-md-10 col-lg-8 mt-2 mb-4 pb-2 pt-4"
		>

			<h4>Pasajero {{index}}</h4>
			<div class="info-data row">
				<div class="col-sm-12 col-md-6">
					<h4 class="text-center">Datos Personales</h4>
					<b-table
						stacked
						borderless
						:items="[infoReserva[index-1]]"
						:fields="personalFields"
					></b-table>
					<h4 class="text-center">Datos del Viaje</h4>

					<b-table
						borderless
						stacked
						:items="[infoReserva[index-1]]"
						:fields="travelFields"
					></b-table>

				</div>
				<div class="col-sm-12 col-md-6 text-center">
					<h4>Gracias por confiar en overide</h4>
					<p>A continuacion encontrara un codigo QR que le permitira acceder a la informacion sobre su reserva a su vez que le permitira abordar al vehiculo</p>
					<div class="mt-5 qrcode">
						<qrcode-vue
							value="#"
							size=200
							level="H"
						/>
					</div>

					<div>
						<button class="btn btn-pdf">Descargar PDF</button>
					</div>
				</div>
			</div>

		</div>

		<button
			class="btn"
			@click="volverInicio()"
		>Volver al inicio</button>

	</div>
</template>

<script>

	import axios from 'axios'
	import { isLoged } from '../helpers/LoginHelper.js'
	import QrcodeVue from 'qrcode.vue'

	export default {
		components: {
			QrcodeVue
		},
		data() {
			return {
				reserva: [],
				infoReserva: [],
				personalFields: [
					{ key: 'nombre', label: 'Nombre' },
					{ key: 'apellido', label: 'Apellido' },
					{ key: 'documento', label: 'Documento' },
					{ key: 'fecha_nacimiento', label: 'Fecha de nacimiento' },
					{ key: 'telefono', label: 'Telefono' },
				],
				travelFields: [
					{ key: 'puesto', label: 'Puesto' },
					{ key: 'trayecto.origen', label: 'Origen' },
					{ key: 'trayecto.destino', label: 'Destino' },
					{ key: 'trayecto.fecha', label: 'Fecha del viaje' },
					{ key: 'trayecto.hora', label: 'Hora del viaje' },
					{ key: 'trayecto.precio', label: 'Precio' },
				],
				numeroReservas: null
			}
		},
		methods: {
			getReservas() {
				Promise.all(
					this.reserva.map(value => this.getReservasFromServer(value.res.id)))
					.then(res => {
						this.infoReserva = res
					})

			},
			getReservasFromServer(id) {
				return new Promise((resolve, reject) => {
					const token = localStorage.getItem('access')
					const config = {
						headers: { Authorization: `Bearer ${token}` }
					}
					axios.get(`https://overidebusapp.herokuapp.com/api/reservas/${id}`, config)
						.then(res => {
							resolve(res.data)
						})
				})
			},
			volverInicio() {
				this.$router.push({ name: 'Home' })
			}
		},
		created() {
			this.reserva = this.$route.params.data
			this.numeroReservas = this.reserva.length
			isLoged()
				.then(() => {
					this.getReservas()
				})
			for (let i = 0; i < this.numeroReservas; i++) {
				this.infoReserva = [...this.infoReserva, {
					id: null,
					nombre: null,
					apellido: null,
					documento: null,
					fecha_nacimiento: null,
					telefono: null,
					puesto: null,
					trayecto: {
						destino: null,
						fecha: null,
						hora: null,
						id: null,
						origen: null,
						precio: null,
						puestos: null
					},
					usuario: {
						birth: null,
						document: null,
						email: null,
						is_active: null,
						is_staff: null,
						last_name: null,
						name: null,
						phone: null,
						username: null
					}
				}]
			}
		}
	}
</script>

<style>
	.reserva-alert {
		display: flex;
		justify-content: center;
	}
	.alert {
		color: green;
		font-size: 20px;
		font-weight: bold;
		margin-top: 30px;
		margin-bottom: 30px;
	}
	.info {
		background-color: #f8f8f8;
		margin: 0 auto;
		border-radius: 5px;
	}
	.info h4 {
		font-weight: bold;
		margin-bottom: 30px;
	}
	.info-data {
		text-align: left;
	}
	.info-data span {
		font-weight: bold;
	}
	.btn {
		background-color: #8b30e8;
		color: white;
		font-weight: bold;
		padding: 3px 20px;
		margin-top: 30px;
		margin-bottom: 50px;
	}
	.table {
		border-style: none;
	}

	.table tbody {
		border-style: none;
		padding-left: 30px;
		padding-right: 30px;
	}

	.info-data p,
	.info-data h4 {
		padding-left: 20px;
		padding-right: 30px;
	}
	.qrcode {
		margin-bottom: 30px;
	}
</style>