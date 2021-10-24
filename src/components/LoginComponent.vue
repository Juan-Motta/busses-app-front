<template>
	<div class="container">
		<div class="row mt-5 mb-5 login">
			<div class="col-7 mt-5 mb-5 d-none d-md-block">
				<b-img
					:src="require('../assets/login.svg')"
					alt="Map"
					fluid
				></b-img>
			</div>
			<div class="col-sm-12 col-md-5 formulario">
				<form @submit.prevent="login">
					<h2 class="row align-self-start form-title mb-5">Ingreso</h2>
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
		</div>
	</div>
</template>

<script>

	import { isLoged } from '../helpers/LoginHelper'

	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				isLoged(this.username, this.password)
				this.$router.push({ name: 'Home' })
			}
		}
	}
</script>

<style scoped>
	.login .img-fluid {
		max-width: 60%;
	}

	.login h2 {
		font-weight: bold;
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