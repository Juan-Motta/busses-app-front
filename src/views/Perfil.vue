<template>
	<div class="profile">
		<h2>Mi Cuenta</h2>
		<div class="row mt-4">
			<div class="col-sm-12 col-md-3 mb-4 sidebar">
				<p @click="toInfoPersonal">Información Personal</p>
				<p @click="toReservas">Reservas</p>
			</div>
			<div class="col-sm-12 col-md-9 borde">
				<router-view />
			</div>
		</div>
	</div>
</template>

<script>

	import PersonalInfo from './PersonalInfo.vue'
	import ReservasPersonales from './ReservasPersonales.vue'

	export default {
		name: 'Perfil',
		components: {
			PersonalInfo,
			ReservasPersonales
		},
		methods: {
			toInfoPersonal() {
				this.$router.push({ name: 'PersonalInfo' })
			},
			toReservas() {
				this.$router.push({ name: 'ReservasPersonales' })
			}
		}

	}
</script>

<style>
	.sidebar {
		background-color: #f8f8f8;
		border-radius: 5px;
		padding-top: 40px;
		padding-bottom: 20px;
		display: block;
	}
	.sidebar p {
		cursor: pointer;
		text-decoration: none;
		color: black;
		margin-bottom: 30px;
		margin-left: 20px;
		margin-right: 20px;
		font-size: 20px;
		border-radius: 5px;
		padding: 10px 20px;
	}
	.sidebar p:hover {
		background-color: #8b30e8;
		color: white;
	}
	.profile {
		margin-bottom: 50px;
	}
</style>