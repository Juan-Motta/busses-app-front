<template>
	<div class="">
		<h2>Mi informción personal</h2>

		<div class="row">
			<div class="col-12 mt-3">
				<b-table
					stacked
					borderless
					:fields="personalFields"
					:items="[personalInfo]"
				></b-table>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				personalInfo: {},
				personalFields: [
					{ key: 'id', label: 'id' },
					{ key: 'username', label: 'Nombre de usuario' },
					{ key: 'email', label: 'Correo electronico' },
					{ key: 'name', label: 'Nombre' },
					{ key: 'last_name', label: 'Apellido' },
					{ key: 'document', label: 'Documento' },
					{ key: 'birth', label: 'Fecha de nacimiento' },
					{ key: 'phone', label: 'Telefono' },
					{ key: 'is_active', label: 'Cuenta Activa' },
					{ key: 'is_staff', label: 'Cuenta Administrador' },
				]
			}
		},
		created() {
			this.personalInfo = this.$store.getters.getUserData
		}
	}
</script>

<style>
</style>