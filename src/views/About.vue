<template>
	<div>
		<h1 class="mb-5">Acerca de Nostros</h1>

		<div class="col-sm-12 col-md-12 mb-5 text-container">
			<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima perferendis, tempore dicta nihil, quam earum cupiditate nesciunt debitis, quasi animi molestiae id ab aperiam doloremque aliquid quo aut quaerat totam.</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus minima aspernatur aperiam minus distinctio ex optio similique, culpa commodi excepturi illo dicta ab architecto odio in sed? Corporis, optio explicabo?</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque culpa explicabo sapiente iusto, ipsa earum quibusdam provident blanditiis, doloremque at placeat tempora! Id quas dolores tempore, maxime repellat optio numquam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laborum praesentium enim iusto! Voluptates quaerat dolorem ex quis nam quia nobis, in ea eligendi. Nesciunt quos atque labore quisquam? Recusandae! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum labore nobis obcaecati eum. Impedit repellendus earum magni laboriosam error laborum voluptas explicabo quidem modi, itaque nostrum eaque illum doloribus? Saepe?</p>
		</div>

		<div class="col-sm-12 col-md-12 mb-5 img-container">

			<b-img
				:src="require('../assets/explore.svg')"
				alt="Map"
				fluid
				center
				width='500'
			></b-img>

		</div>
	</div>
</template>

<script>
	export default {
		name: 'About',
		components: {
		}
	}
</script>

<style scoped>
	.text-container p {
		text-align: left;
	}
</style>