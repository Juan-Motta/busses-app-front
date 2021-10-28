<template>
	<div class="reservas">

		<div>
			<b-modal
				id="delete-modal"
				hide-footer
				hide-header
			>
				<div class="d-block text-center">
					<h4>¿Está seguro que desea eliminar su reserva?</h4>
				</div>
				<div class="button-modal">
					<b-button
						class="mt-3 btn-modal btn-delete"
						block
						@click="acceptButtonModal"
					>Sí</b-button>
					<b-button
						class="mt-3 btn-modal btn-edit"
						block
						@click="rejectButtonModal"
					>No</b-button>

				</div>
			</b-modal>
		</div>

		<div>
			<b-modal
				id="edit-modal"
				hide-footer
				hide-header
			>
				<div class="col-12 mt-1 form-container">
					<form
						@submit.prevent="modifyButtonModal"
						autocomplete="off"
					>

						<div class="mb-3">
							<h3 class="text-center">Información de la reserva</h3>
						</div>

						<div class="row align-items-start form-group">
							<label
								for="nombres"
								class="row mt-2 mb-2"
							>Nombre:</label>
							<b-form-input
								placeholder="Ingrese el nombre del pasajero"
								id="nombres"
								v-model="person.nombre"
								autocomplete="nope"
							></b-form-input>
						</div>

						<div class="row align-items-start form-group">
							<label
								for="apellidos"
								class="row mt-2 mb-2"
							>Apellido:</label>
							<b-form-input
								placeholder="Ingrese el apellido del pasajero"
								id="apellidos"
								v-model="person.apellido"
								autocomplete="nope"
							></b-form-input>
						</div>

						<div class="row align-items-start form-group">
							<label
								for="documento"
								class="row mt-2 mb-2"
							>Documento:</label>
							<b-form-input
								placeholder="Ingrese el documento del pasajero"
								id="documento"
								v-model="person.documento"
								autocomplete="nope"
							></b-form-input>
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
								v-model="person.fecha_nacimiento"
								autocomplete="nope"
							></b-form-input>
						</div>

						<div class="row align-items-start form-group">
							<label
								for="telefono"
								class="row mb-2 mt-2"
							>Telefono:</label>
							<b-form-input
								placeholder="Ingrese el telefono del pasajero"
								id="telefono"
								v-model="person.telefono"
								autocomplete="nope"
							></b-form-input>
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
								v-model="person.puesto"
								autocomplete="nope"
							></b-form-input>
						</div>

						<div class="btn-container">
							<input
								type="submit"
								value="Modificar"
								class="btn mt-4 mb-3"
							>
						</div>
					</form>
				</div>
			</b-modal>
		</div>

		<h2>Mis Reservas</h2>

		<div class="row">
			<div class="col">
				<b-table
					striped
					hover
					:items="reservas"
					:fields="fields"
				>
					<template #cell(editar)="row">
						<button
							class="btn-edit"
							@click="handlerClickEdit(row.item)"
						>
							<b-icon-pencil-fill></b-icon-pencil-fill>
						</button>
					</template>
					<template #cell(borrar)="row">
						<button
							class="btn-delete"
							@click="handlerClickDelete(row.item.id)"
						>
							<b-icon-trash-fill></b-icon-trash-fill>
						</button>
					</template>
				</b-table>
			</div>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'
	import { isLoged } from '../helpers/LoginHelper.js'

	export default {
		data() {
			return {
				reservas: [],
				fields: [
					{ key: 'nombre', label: 'Nombre' },
					{ key: 'apellido', label: 'Apellido' },
					{ key: 'trayecto.origen', label: 'Origen' },
					{ key: 'trayecto.destino', label: 'Destino' },
					{ key: 'trayecto.fecha', label: 'Fecha' },
					{ key: 'trayecto.hora', label: 'Hora' },
					'editar',
					'borrar'
				],
				id: null,
				person: null
			}
		},
		methods: {
			getReservas() {
				isLoged()
					.then(() => {
						const token = localStorage.getItem('access')
						const config = {
							headers: { Authorization: `Bearer ${token}` }
						}
						axios.get(`https://overidebusapp.herokuapp.com/api/reservas/`, config)
							.then(res => {
								const idUsuario = this.$store.getters.getId
								this.reservas = res.data.filter(reserva => reserva.usuario.id === idUsuario)
							})
					})
			},
			handlerClickEdit(info) {
				this.id = info.id
				this.person = {
					nombre: info.nombre,
					apellido: info.apellido,
					documento: info.documento,
					fecha_nacimiento: info.fecha_nacimiento,
					telefono: info.telefono,
					puesto: info.puesto,
					trayecto: info.trayecto.id,
					usuario: info.usuario.id,
				}
				this.$bvModal.show('edit-modal')
			},
			handlerClickDelete(id) {
				this.id = id
				this.$bvModal.show('delete-modal')
			},
			acceptButtonModal() {
				const id = this.id
				const token = localStorage.getItem('access')
				const config = {
					headers: { Authorization: `Bearer ${token}` }
				}
				isLoged()
					.then(() => {
						axios.delete(`https://overidebusapp.herokuapp.com/api/reservas/${id}`, config).then(res => {
							this.$bvModal.hide('delete-modal')
							this.id = null
							this.getReservas()
						})
					})
					.catch(err => {
						console.log(err.response);
					})
			},
			rejectButtonModal() {
				this.$bvModal.hide('delete-modal')
			},
			modifyButtonModal() {
				const id = this.id
				const token = localStorage.getItem('access')
				const config = {
					headers: { Authorization: `Bearer ${token}` }
				}
				const body = {
					nombre: this.person.nombre,
					apellido: this.person.apellido,
					documento: this.person.documento,
					fecha_nacimiento: this.person.fecha_nacimiento,
					telefono: this.person.telefono,
					puesto: this.person.puesto,
					usuario: this.person.usuario,
					trayecto: this.person.trayecto
				}
				isLoged()
					.then(() => {
						axios.put(`https://overidebusapp.herokuapp.com/api/reservas/${id}`, body, config).then(res => {
							this.$bvModal.hide('edit-modal')
							this.id = null
							this.getReservas()
						})
					})
					.catch(err => {
						console.log(err.response);
					})
			}
		},
		created() {
			this.getReservas()
			this.person = {
				nombre: null,
				apellido: null,
				documento: null,
				fecha_nacimiento: null,
				telefono: null,
				puesto: null,
				trayecto: null,
				usuario: null
			}
		}
	}
</script>

<style scoped>
	.btn-edit {
		border: none;
		background-color: #4284f5;
		color: white;
		border-radius: 5px;
	}

	.btn-delete {
		border: none;
		background-color: #f35832;
		color: white;
		border-radius: 5px;
	}

	.button-modal {
		display: flex;
		justify-content: space-evenly;
	}

	.btn-modal {
		padding-left: 20px;
		padding-right: 20px;
	}

	.form-container {
		padding-left: 30px;
		padding-right: 30px;
	}

	.btn {
		background-color: #8b30e8;
		color: white;
		font-weight: bold;
		padding: 3px 20px;
	}

	.btn-container {
		display: flex;
		justify-content: center;
	}
</style>