<template>
	<div>
		<notifications animation-type="velocity" position="bottom right" />
		<Header></Header>
		<slot/>
		<Footer></Footer>
	</div>
</template>
<script>
import '@/assets/css/bootstrap.min.css';
import '@/assets/css/style.css';
import '@/assets/css/owl.theme.default.min.css';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  //name: 'Frontend',
  components: {
	Header, Footer
  }
}
</script>


