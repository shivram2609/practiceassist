<template>
 <div class="container-fluid">
	 <div class="row">
									<div class="col-xl-12">
											<div class="breadcrumb-holder">
													<h1 class="main-title float-left">Dashboard</h1>
													<ol class="breadcrumb float-right">
														<li class="breadcrumb-item">Home</li>
														<li class="breadcrumb-item active">Dashboard</li>
													</ol>
													<div class="clearfix"></div>
											</div>
									</div>
						</div>
						<div class="alert alert-warning" role="alert">
							<h4 class="alert-heading"></h4>
							<p>Next Hearing Date () </p>
						</div>
							<div class="row">
									<div class="col-xs-12 col-md-6 col-lg-6 col-xl-3">
											<div class="card-box noradius noborder bg-default">
													<i class="fa fa-file-text-o float-right text-white"></i>
													<h6 class="text-white text-uppercase m-b-20">Cases</h6>
													<h1 class="m-b-20 text-white counter">0</h1>
													<span class="text-white">0 New Cases</span>
											</div>
									</div>

									<div class="col-xs-12 col-md-6 col-lg-6 col-xl-3">
											<div class="card-box noradius noborder bg-warning">
													<i class="fa fa-bar-chart float-right text-white"></i>
													<h6 class="text-white text-uppercase m-b-20">Lawyers</h6>
													<h1 class="m-b-20 text-white counter">0</h1>
													<span class="text-white">0 New Lawyers</span>
											</div>
									</div>

									<div class="col-xs-12 col-md-6 col-lg-6 col-xl-3">
											<div class="card-box noradius noborder bg-info">
													<i class="fa fa-user-o float-right text-white"></i>
													<h6 class="text-white text-uppercase m-b-20">Clients</h6>
													<h1 class="m-b-20 text-white counter">0</h1>
													<span class="text-white">0 New Clients</span>
											</div>
									</div>

									<div class="col-xs-12 col-md-6 col-lg-6 col-xl-3">
											<div class="card-box noradius noborder bg-danger">
													<i class="fa fa-bell-o float-right text-white"></i>
													<h6 class="text-white text-uppercase m-b-20">Completed cases</h6>
													<h1 class="m-b-20 text-white counter">0</h1>
											</div>
									</div>
									<div class="col-xs-12 col-md-6 col-lg-6 col-xl-3">
											<div class="card-box noradius noborder bg-danger">
													<i class="fa fa-bell-o float-right text-white"></i>
													<h6 class="text-white text-uppercase m-b-20">Pending cases</h6>
													<h1 class="m-b-20 text-white counter">0</h1>
											</div>
									</div>
							</div>
	 
</div>
</template>
<script>
	export default {
	  //name: 'Account',
	  data () {
		return {
		  msg: 'Welcome to Your Vue.js App'
		}
	  }
	}
</script>
