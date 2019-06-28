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

//import '@/assets/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@/assets/css/account/font-awesome.min.css';
import '@/assets/css/account/admin.css';

import '@/assets/js/jquery-3.4.1.min.js';
import '@/assets/js/popper.min.js';	
//import '@/assets/js/bootstrap.min.js';
import '@/assets/js/jquery.nicescroll.js';
import '@/assets/js/fastclick.js';
import '@/assets/js/detect.js';
//import '@/assets/js/pikeadmin.js';

export default {
  //name: 'Backend',
  components: {
	Header, Footer, Sidebar
  }
}
</script>


