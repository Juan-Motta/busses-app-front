<template>
	<div>
		<SearchComponent />
		<DescriptionComponent />
	</div>
</template>

<script>


	import SearchComponent from '../components/SearchComponent.vue'
	import DescriptionComponent from '../components/DescriptionComponent.vue'


	export default {
		name: 'Home',
		components: {
			SearchComponent,
			DescriptionComponent,

		}
	}
</script>
