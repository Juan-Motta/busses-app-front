<template>
	<div>
		<div class="container">
			<NavbarComponent />
			<SearchComponent />
			<DescriptionComponent />
		</div>
		<FooterComponent />
	</div>
</template>

<script>

	import NavbarComponent from '../components/NavbarComponent.vue'
	import SearchComponent from '../components/SearchComponent.vue'
	import DescriptionComponent from '../components/DescriptionComponent.vue'
	import FooterComponent from '../components/FooterComponent.vue'

	export default {
		name: 'Home',
		components: {
			NavbarComponent,
			SearchComponent,
			DescriptionComponent,
			FooterComponent
		}
	}
</script>
