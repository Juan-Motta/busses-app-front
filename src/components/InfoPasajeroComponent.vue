
<template>
	<div class="row justify-content-center">

		<div>
			<b-modal
				id="modal"
				hide-footer
				hide-header
			>
				<div class="d-block text-center">
					<h4>Todos los campos deben ser validos</h4>
				</div>
				<div class="button-modal">
					<b-button
						class="mt-3"
						block
						@click="closeModal"
					>Cerrar</b-button>

				</div>
			</b-modal>
		</div>

		<div class="col-sm-12 col-md-6 col-lg-5 mt-1">
			<form @submit.prevent="register">
				<div
					v-for="index in pasajeros"
					:key="index"
					class="mt-2 mb-5"
				>
					<div class="mb-3">
						<h3>Informacion del Pasajero {{ index }}</h3>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="nombres"
							class="row mt-2 mb-2"
						>Nombre:</label>
						<b-form-input
							placeholder="Ingrese el nombre del pasajero"
							id="nombres"
							v-model="person[String(index-1)].name"
						></b-form-input>
						<div
							v-if="error[String(index-1)].name"
							class="error"
						>{{error[String(index-1)].name}}</div>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="apellidos"
							class="row mt-2 mb-2"
						>Apellido:</label>
						<b-form-input
							placeholder="Ingrese el apellido del pasajero"
							id="apellidos"
							v-model="person[String(index-1)].last_name"
						></b-form-input>
						<div
							v-if="error[String(index-1)].last_name"
							class="error"
						>{{error[String(index-1)].last_name}}</div>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="documento"
							class="row mt-2 mb-2"
						>Documento:</label>
						<b-form-input
							placeholder="Ingrese el documento del pasajero"
							id="documento"
							v-model="person[String(index-1)].document"
						></b-form-input>
						<div
							v-if="error[String(index-1)].document"
							class="error"
						>{{error[String(index-1)].document}}</div>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="birth"
							class="row mt-2 mb-2"
						>Fecha de nacimiento:</label>
						<b-form-input
							placeholder="Ingrese la fecha de nacimiento del pasajero"
							type="date"
							id="birth"
							v-model="person[String(index-1)].birth"
						></b-form-input>
						<div
							v-if="error[String(index-1)].birth"
							class="error"
						>{{error[String(index-1)].birth}}</div>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="telefono"
							class="row mb-2 mt-2"
						>Telefono:</label>
						<b-form-input
							placeholder="Ingrese el telefono del pasajero"
							id="telefono"
							v-model="person[String(index-1)].phone"
						></b-form-input>
						<div
							v-if="error[String(index-1)].phone"
							class="error"
						>{{error[String(index-1)].phone}}</div>
					</div>

					<div class="row align-items-start form-group">
						<label
							for="puesto"
							class="row align-self-start mb-2 mt-2"
						>Puesto:</label>
						<b-form-input
							placeholder="Ingrese el puesto del pasajeros"
							min="0"
							type="number"
							id="puesto"
							v-model="person[String(index-1)].chair"
						></b-form-input>
						<div
							v-if="error[String(index-1)].chair"
							class="error"
						>{{error[String(index-1)].chair}}</div>
					</div>

				</div>
				<input
					type="submit"
					value="Registrar todos"
					class="btn mb-5"
				>
			</form>
		</div>
	</div>

</template>

<script>

	import axios from 'axios'
	import { isLoged } from '../helpers/LoginHelper'

	export default {
		data() {
			return {
				idTrayecto: null,
				pasajeros: null,
				puestos: [],
				person: [],
				error: [],
			}
		},
		methods: {
			closeModal() {

			},
			register() {

			},
			getChairs() {
				/* Metodo encargado de devolver una lista con las sillas ocupadas en el trayecto */
				this.credentialsRefresh()
					.then(res => {
						this.puestos = res
					})
					.catch(err => {
						console.log(err);
					})
			},
			validateName(name, index) {
				/* Metodo encargado de validar los campos del nombre del formulario */

				if (!name) {
					this.error[index].name = 'El nombre no puede estar en blanco'
				} else {
					this.error[index].name = null
				}
			},
			validateLastName(lastName, index) {
				/* Metodo encargado de validar los campos del apellido del formulario */

				if (!lastName) {
					this.error[index].last_name = 'El apellido no puede estar en blanco'
				} else {
					this.error[index].last_name = null
				}
			},
			validateDocument(document, index) {
				/* Metodo encargado de validar los campos del documento del formulario */

				if (!document) {
					this.error[index].document = 'El documento no puede estar en blanco'
				} else {
					this.error[index].document = null
				}
			},
			validateBirth(birth, index) {
				/* Metodo encargado de validar los campos de la fecha de nacimiento del formulario */

				if (!birth) {
					this.error[index].birth = 'La fecha de nacimiento no puede estar en blanco'
				} else {
					this.error[index].birth = null
				}
			},
			validatePhone(phone, index) {
				/* Metodo encargado de validar los campos del telefono del formulario */

				if (!phone) {
					this.error[index].phone = 'El telefono no puede estar en blanco'
				} else {
					this.error[index].phone = null
				}
			},
			validateChair(chair, index) {
				/* Metodo encargado de validar los campos de la silla del formulario */

				if (!chair) {
					this.error[index].chair = 'La silla no puede estar en blanco'
				} else if (this.puestos.includes(Number(chair))) {
					this.error[index].chair = 'La silla ya se encuentra ocupada'
				} else {
					this.error[index].chair = null
				}
			},
			credentialsRefresh() {
				/* Metodo encargado de refrescar las credenciales de usuario, devuelve una promesa */
				return new Promise((resolve, reject) => {
					isLoged()
						.then(() => {
							resolve(this.getReservas())
						})
						.catch(() => {
							reject({ status: false, message: 'Error del servidor al refrescar las credenciales' })
						})
				})
			},
			getReservas() {
				/* Metodo encargado de obtener todas las reservas del servidor mediante una peticion HTTP, devuelve una promesa */
				return new Promise((resolve, reject) => {
					const token = localStorage.getItem('access')
					const config = {
						headers: { Authorization: `Bearer ${token}` }
					}
					axios.get('https://overidebusapp.herokuapp.com/api/reservas/', config)
						.then(res => {
							const reservasFiltradas = this.filtrarReservasById(res.data)
							const chairs = this.getChairsBasedOnReservas(reservasFiltradas)
							resolve(chairs)
						})
						.catch(() => {
							reject({ status: false, message: 'Error del servidor' })
						})
				})
			},
			filtrarReservasById(reservas) {
				/* Metodo encargado de filtrar las reservas por el id indicado del trayecto, devuelve un array */
				return reservas.filter(reserva => reserva.trayecto.id === this.idTrayecto)
			},
			getChairsBasedOnReservas(reservas) {
				/* Metodo encargado de filtrar la lista de objetos de reserva devolviendo una lista con los puestos asociados a cada reserva */
				return reservas.map(reserva => {
					return (reserva.puesto)
				})
			}
		},
		watch: {
			person: {
				deep: true,
				handler(after) {
					after.map((value, index) => {

						this.person[index].name = value.name
						this.validateName(value.name, index)

						this.person[index].last_name = value.last_name
						this.validateLastName(value.last_name, index)

						this.person[index].document = value.document
						this.validateDocument(value.document, index)

						this.person[index].birth = value.birth
						this.validateBirth(value.birth, index)

						this.person[index].phone = value.phone
						this.validatePhone(value.phone, index)

						this.person[index].chair = value.chair
						this.validateChair(value.chair, index)
					})
				}
			}
		},
		created() {
			// Obtiene el numero de pasajeros desde los parametros del router
			this.pasajeros = this.$route.params.pasajeros
			// Obtiene el id del trayecto de los parametros del router
			this.idTrayecto = this.$route.params.id
			// Inicializa el objeto que contendra la informacion de los pasajeros y los errores
			for (let i = 0; i < this.pasajeros; i++) {
				this.person = [...this.person, {
					name: null,
					last_name: null,
					document: null,
					birth: null,
					phone: null,
					chair: null
				}]
				this.error = [...this.error, {
					name: null,
					last_name: null,
					document: null,
					birth: null,
					phone: null,
					chair: null
				}]
			}
			// Retorna las sillas ocupadas del trayecto
			this.getChairs()
		}
	}
</script>

<style scoped>
	.btn {
		background-color: #8b30e8;
		color: white;
		font-weight: bold;
		padding: 3px 20px;
	}

	.button-modal {
		display: flex;
		justify-content: center;
	}

	.error {
		color: red;
		text-align: left;
		margin-top: 3px;
	}
</style>