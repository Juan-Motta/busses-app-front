<template>
	<div>
		<div>
			<b-modal
				id="modal"
				centered
				hide-footer
				hide-header
			>
				<div class="col-sm-12 col-md-12 formulario">
					<form @submit.prevent="login">
						<h2 class="row form-title mb-5">Ingreso</h2>
						<div class="row align-items-start form-group">
							<label
								for="username"
								class="row"
							>Usuario:</label>
							<b-form-input
								placeholder="Ingrese su nombre de usuario"
								id="username"
								v-model="username"
							></b-form-input>
						</div>

						<div class="row align-items-start form-group">
							<label
								for="password"
								class="row"
							>Contraseña:</label>
							<b-form-input
								placeholder="Ingrese su contraseña"
								type="password"
								id="password"
								v-model="password"
							></b-form-input>
						</div>

						<input
							type="submit"
							value="Entrar"
							class="btn mt-3"
						>

					</form>
				</div>
			</b-modal>
		</div>
		<h2>Nuestros Viajes</h2>
		<div class="row mb-5 mt-5">
			<div class="col-sm-12 col-md-3 formulario">
				<form @submit.prevent="buscarViaje">
					<h4 class="row align-self-start form-title">Filtra tu viaje</h4>
					<div class="row align-items-start form-group">
						<label
							for="origen"
							class="row"
						>Origen:</label>
						<b-form-input
							placeholder="Ingrese el origen del viaje"
							list="origen-list"
							id="origen"
							v-model="origen"
						></b-form-input>
						<datalist id="origen-list">
							<option
								v-for="ciudad in ciudades"
								:key="ciudad"
							>{{ ciudad }}</option>
						</datalist>
						<div
							v-if="error.origen"
							class="error"
						>{{ error.origen }}</div>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="destino"
							class="row"
						>Destino:</label>
						<b-form-input
							placeholder="Ingrese el destino del viaje"
							list="destino-list"
							type="text"
							id="destino"
							v-model="destino"
						></b-form-input>
						<datalist id="destino-list">
							<option
								v-for="ciudad in ciudades"
								:key="ciudad"
							>{{ ciudad }}</option>
						</datalist>
						<div
							v-if="error.destino"
							class="error"
						>{{ error.destino }}</div>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="fecha"
							class="row align-self-start"
						>Fecha:</label>
						<b-form-input
							type="date"
							id="fecha"
							v-model="fecha"
						></b-form-input>
						<div
							v-if="error.fecha"
							class="error"
						>{{ error.fecha }}</div>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="pasajeros"
							class="row align-self-start"
						>Pasajeros:</label>
						<b-form-input
							placeholder="Ingrese el numero de pasajeros"
							min="0"
							type="number"
							id="pasajeros"
							v-model="pasajeros"
						></b-form-input>
						<div
							v-if="error.pasajeros"
							class="error"
						>{{ error.pasajeros }}</div>
					</div>

					<input
						type="submit"
						value="Filtrar"
						class="btn mt-3"
					>

				</form>
			</div>
			<div class="col-sm-12 col-md-8 offset-md-1 viajes">
				<h4 class="mb-5">Viajes encontrados</h4>
				<div v-if="viajes.length > 0">
					<div
						v-for="viaje in viajes"
						:key="viaje.id"
						class="row viaje"
						@click="selectedViaje(viaje)"
					>
						<div class="row viaje-title">
							<p>
								<b-icon-geo-alt-fill> &nbsp; </b-icon-geo-alt-fill> {{ viaje.origen}} &nbsp; <b-icon-arrow-right></b-icon-arrow-right> &nbsp; {{ viaje.destino}}
							</p>
							<p>
								<b-icon-calendar-check-fill></b-icon-calendar-check-fill> &nbsp; {{ getFormatedDate(viaje.fecha) }}
							</p>
							<p>
								<b-icon-clock-fill></b-icon-clock-fill> &nbsp; {{ viaje.hora }}
							</p>
							<p>
								<b-icon-cash></b-icon-cash> &nbsp; {{ formatNumber(viaje.precio) }} COP
							</p>

						</div>
					</div>
				</div>
				<div v-else>
					<div class="row viaje">
						<div class="row viaje-title">
							<p>
								No se ha encontrado ningun viaje
							</p>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>

</template>

<script>

	import axios from 'axios'
	import moment from 'moment-timezone'

	import { isLoged } from '../helpers/LoginHelper'


	export default {
		data() {
			return {
				username: '',
				password: '',
				destino: '',
				origen: '',
				fecha: '',
				pasajeros: 0,
				ciudades: [],
				viajes: [],
				trayectos: [],
				error: {
					origen: '',
					destino: '',
					fecha: '',
					pasajeros: '',
				},
				isValidData: false
			}
		},
		methods: {
			getViajes() {
				axios.get('https://overidebusapp.herokuapp.com/api/trayectos/')
					.then(res => {
						this.viajes = res.data.filter(viaje => {
							if (viaje.origen === this.origen && viaje.destino === this.destino && this.isValidDate(viaje.fecha)) {
								return viaje
							}
						})
					})
			},
			isValidDate(fecha) {
				//Hora actual
				const time = moment().tz('America/Bogota').format("HH:mm:ss").split(":")
				//Hora actual en segundos
				const seconds = ((Number(time[0]) * 60) + Number(time[1])) * 60 + Number(time[2])
				//Tiempo en segundos a las 0:00 del dia actual
				const now = moment().tz('America/Bogota').unix() - seconds
				//Tiempo en segundos de la fecha seleccionada
				const selectedTime = moment(fecha).unix()
				if (selectedTime >= now) {
					return true
				} {
					return false
				}
			},
			getTrayectos() {
				axios.get("https://overidebusapp.herokuapp.com/api/trayectos/")
					.then(res => {
						this.trayectos = res.data
						this.getCiudades()
						this.destino = this.$route.params.destino;
						this.origen = this.$route.params.origen;
						this.fecha = this.$route.params.fecha;
						this.pasajeros = this.$route.params.pasajeros;
					})
					.catch(err => {
						this.getTrayectos()
					})
			},
			getCiudades() {
				const ciudadesDestino = this.trayectos.map(data => {
					return data.destino
				})
				const ciudadesOrigen = this.trayectos.map(data => {
					return data.origen
				})
				const ciudades = [...ciudadesDestino, ...ciudadesOrigen]
				const ciudadesSinRepetir = ciudades.filter((item, index) => {
					return ciudades.indexOf(item) === index;
				})
				this.ciudades = Object.freeze(ciudadesSinRepetir)
			},
			getFormatedDate(date) {
				const dateFormated = moment(date).lang('es').format('dddd MMMM DD YYYY').split(" ")
				dateFormated[0] = this.capitalizarPrimeraLetra(dateFormated[0])
				dateFormated[1] = this.capitalizarPrimeraLetra(dateFormated[1])
				return `${dateFormated[0]}, ${dateFormated[1]} ${dateFormated[2]} del ${dateFormated[3]}`
			},
			capitalizarPrimeraLetra(str) {
				return str.charAt(0).toUpperCase() + str.slice(1);
			},
			formatNumber(input) {
				return input
			},
			selectedViaje(viaje) {
				//TODO: Seleccionar viaje
				if (this.$store.getters.getIsLoged) {
					const viajeObj = {
						id: viaje.id ?? null,
						destino: viaje.destino ?? null,
						origen: viaje.origen ?? null,
						fecha: viaje.fecha ?? null,
						hora: viaje.hora ?? null,
						precio: viaje.precio ?? null,
						puestos: viaje.puestos ?? null,
						pasajeros: Number(this.pasajeros) ?? 1
					}
					this.$router.push({ name: 'Reserva', params: viajeObj })
				} else {
					this.$bvModal.show('modal')
				}
			},
			buscarViaje() {
				this.validations()
				if (this.isValidData) {
					this.getViajes()
				}
			},
			validations() {
				const errors = {
					origen: this.error.origen,
					destino: this.error.destino,
					fecha: this.error.fecha,
					pasajeros: this.error.pasajeros,
				}

				this.isValidData = true

				for (const err in errors) {
					if (errors[err]) {
						this.isValidData = false
					}
				}
			},
			login() {
				isLoged(this.username, this.password)
					.then(res => {
						console.log(res);
						this.$router.push({ name: 'Reserva' })
					})
					.catch(err => {
						console.log(err);
					})
			}
		},
		watch: {
			origen() {
				if (this.ciudades.includes(this.origen) && this.origen) {
					this.error.origen = ''
				} else {
					this.error.origen = 'La ciudad de origen no es valida o no esta disponible'
				}
			},
			destino() {
				if (this.ciudades.includes(this.origen) && this.destino) {
					this.error.destino = ''
				} else {
					this.error.destino = 'La ciudad de origen no es valida o no esta disponible'
				}
			},
			fecha() {
				const time = moment().tz('America/Bogota').format("HH:mm:ss").split(":")
				const seconds = ((Number(time[0]) * 60) + Number(time[1])) * 60 + Number(time[2])
				const now = moment().tz('America/Bogota').unix() - seconds
				const selectedTime = moment(this.fecha).unix()
				if (selectedTime >= now) {
					this.error.fecha = ''
				} else {
					this.error.fecha = 'La fecha seleccionada es invalida'
				}
			},
			pasajeros() {
				if (this.pasajeros > 0) {
					this.error.pasajeros = ''
				} else {
					this.error.pasajeros = 'El numero de pasajeros debe ser mayor a 0'
				}
			}
		},
		created() {
			this.getTrayectos()
			this.getViajes()
		},
	}
</script>

<style scoped>
	.formulario {
		background-color: #f8f8f8;
		padding: 30px 50px;
		border-radius: 5px;
	}

	.form-title {
		font-weight: bold;
		margin-bottom: 30px;
	}

	.form-group {
		margin-bottom: 15px;
	}

	.form-group label {
		margin-bottom: 15px;
		font-weight: bold;
	}

	.btn {
		background-color: #8b30e8;
		color: white;
		font-weight: bold;
		padding: 3px 20px;
	}

	.error {
		color: red;
		text-align: left;
		margin-top: 3px;
	}

	.viajes h4 {
		font-weight: bold;
		margin-top: 25px;
	}

	.viaje {
		background-color: #f8f8f8;
		padding: 15px 30px;
		border-radius: 5px;
		cursor: pointer;
		margin-bottom: 25px;
	}

	.viaje:hover {
		box-shadow: 0px 0px 15px 0px #8b30e8;
	}

	.viaje-title p:first-child {
		font-size: 20px;
	}

	.viaje-title p {
		text-align: left;
		font-weight: bold;
	}
</style>