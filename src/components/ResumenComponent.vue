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
			class="info col-sm-12 col-md-8 col-lg-6 mt-2 mb-4 pb-2 pt-4"
		>

			<h4>Pasajero {{index}}</h4>
			<div class="info-data">
				<p><span>Nombres: </span>{{infoReserva[index-1].nombre}}</p>
				<p><span>Apellidos: </span>{{infoReserva[index-1].apellido}}</p>
				<p><span>Documento: </span>{{infoReserva[index-1].documento}}</p>
				<p><span>Fecha de nacimiento: </span>{{infoReserva[index-1].fecha_nacimiento}}</p>
				<p><span>Telefono: </span>{{infoReserva[index-1].telefono}}</p>
				<p><span>Puesto: </span>{{infoReserva[index-1].puesto}}</p>
				<p><span>Origen: </span>{{infoReserva[index-1].trayecto.origen}}</p>
				<p><span>Destino: </span>{{ infoReserva[index-1].trayecto.destino }}</p>
				<p><span>Fecha: </span>{{ infoReserva[index-1].trayecto.fecha }}</p>
				<p><span>Hora: </span>{{ infoReserva[index-1].trayecto.hora }}</p>
				<p><span>Precio: </span>{{ infoReserva[index-1].trayecto.precio }}</p>
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

	export default {
		data() {
			return {
				reserva: [],
				infoReserva: [],
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
		padding-left: 40px;
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
</style>