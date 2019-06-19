<template>
		<div id="main">
			<notifications animation-type="velocity" position="bottom right" />
			<Header></Header>
			<Sidebar></Sidebar>
			<div class="py-4">
				<div class="content-page">
					<div class="content">
						<slot/>
					</div>
				</div>
			</div>
			<Footer></Footer>
		</div>
</template>
<script>

import Header from '@/components/account/Header.vue';
import Footer from '@/components/account/Footer.vue';
import Sidebar from '@/components/account/Sidebar.vue';

import '@/assets/css/bootstrap.min.css';
import '@/assets/css/account/style.css';
import '@/assets/css/account/font-awesome.min.css';
import '@/assets/js/jquery-3.3.1.min.js';
import '@/assets/js/jquery-ui.min.js';
import '@/assets/js/detect.js';
import '@/assets/js/fastclick.js';
import '@/assets/js/jquery.nicescroll.js';
import '@/assets/js/pikeadmin.js';

export default {
  name: 'Backend',
  components: {
	Header, Footer, Sidebar
  }
}
</script>


