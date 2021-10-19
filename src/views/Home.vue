<template>
	<div>
		<div class="container">
			<Navbar />
			<Search />
			<Description />
		</div>
		<Footer />
	</div>
</template>

<script>

	import Navbar from '../components/Navbar.vue'
	import Search from '../components/Search.vue'
	import Description from '../components/Description.vue'
	import Footer from '../components/Footer.vue'

	export default {
		name: 'Home',
		components: {
			Navbar,
			Search,
			Description,
			Footer
		}
	}
</script>
