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
				</div>

				<div class="row align-items-start form-group">
					<label
						for="fecha"
						class="row align-self-start"
					>Fecha:</label>
					<b-form-input
						type="date"
						id="fecha"
					></b-form-input>
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
					></b-form-input>
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

	export default {
		data() {
			return {
				origen: '',
				destino: '',
				ciudades: Object.freeze(['BOGOTA'])
			}
		},
		methods: {
			buscarViaje() {
				console.log(this.origen);
			}
		},
		watch: {
			origen() {

			}
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
</style>