<template>
	<div class="row align-items-center mt mb">
		<div class="col-7 d-none d-md-block">
			<b-img
				:src="require('../assets/map.svg')"
				alt="Map"
				fluid
			></b-img>
		</div>
		<div class="col-sm-12 col-md-5  formulario">
			<form @submit.prevent="buscarViaje">
				<h2 class="row align-self-start form-title">Planea tu viaje</h2>
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
					value="Buscar"
					class="btn mt-3"
				>

			</form>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'
	import moment from 'moment-timezone'

	export default {
		data() {
			return {
				origen: '',
				destino: '',
				fecha: '',
				pasajeros: '',
				ciudades: [],
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
			buscarViaje() {
				console.log(this.validations());
			},
			getTrayectos() {
				axios.get("https://overidebusapp.herokuapp.com/api/trayectos/")
					.then(res => {
						this.trayectos = res.data
						this.getCiudades()
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
			validations() {
				const data = {
					origen: this.origen,
					destino: this.destino,
					fecha: this.fecha,
					pasajeros: this.pasajeros,
				}

				for (const value in data) {
					this.isValidData = true
					if (!data[value]) {
						this.isValidData = false
					}
				}

				return data
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
		}
	}
</script>

<style scoped>
	.borde {
		border: 1px solid black;
	}

	.img-fluid {
		max-width: 60%;
	}

	.mt {
		margin-top: 70px !important;
	}

	.mb {
		margin-bottom: 70px !important;
	}

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
</style>