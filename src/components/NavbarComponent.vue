<template>
	<div class="row navbar">
		<div class="col-sm-12 col-md-8 ">
			<div class="row">
				<div class="col-sm-12 col-md-3 col-lg-3 mt-3  navbar-title">
					<span>
						<router-link :to="{ name: 'Home'}">OVERIDE</router-link>
					</span>
				</div>
				<div class="col-sm-12 col-md-3 col-lg-2 mt-3 navbar-route">
					<span>
						<router-link :to="{ name: 'Home'}">Inicio</router-link>
					</span>
				</div>
				<div class="col-sm-12 col-md-3 col-lg-2 mt-3 navbar-route">
					<span>
						<router-link :to="{ name: 'Rutas'}">Rutas</router-link>
					</span>
				</div>
				<div class="col-sm-12 col-md-3 col-lg-2 mt-3 navbar-route">
					<span>
						<router-link :to="{ name: 'About'}">Nosotros</router-link>
					</span>
				</div>
			</div>
		</div>
		<div class="col-sm-12 col-md-4 ">
			<div class="row">
				<div class="col-sm-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2 navbar-button mt-3">
					<router-link :to="{ name: 'Login'}">Iniciar Sesion</router-link>
				</div>
				<div class="col-sm-12 col-md-5 col-lg-4 offset-md-1 offset-lg-2 navbar-button mt-3">
					<router-link :to="{ name: 'CreateUser'}">Registro</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.borde {
		border: 1px solid black;
	}
	.navbar {
		margin: 15px 0;
	}

	.navbar-title {
		font-size: 30px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.navbar-title span a {
		text-decoration: none;
		color: black;
	}

	.navbar-route {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.navbar-route span {
		cursor: pointer;
	}

	.navbar-route span a {
		text-decoration: none;
		color: black;
	}

	.navbar-button {
		font-weight: bold;
		color: white;
		background-color: #8b30e8;
		border-radius: 5px;
		padding: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.navbar-button a {
		text-decoration: none;
		color: white;
	}
</style>