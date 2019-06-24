<template>
 <div class="left main-sidebar">
	<div class="sidebar-inner leftscroll">
		<div id="sidebar-menu">
							<ul>
					<li class="submenu">
						<router-link to="account"><i class="fa fa-fw fa-bars"></i><span> Dashboard </span> </router-link>
					</li>
					<li class="submenu">
						<a href="javascript:void(0)"><i class="fa fa-fw fa-table"></i> <span>Lawyers</span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><router-link to="all_lawyers">All Lawyers</router-link></li>
								
							</ul>
					</li>
					<li class="submenu">
						<a class="" href="#"><i class="fa fa-fw fa-table"></i> <span>Clients</span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><router-link to="all_clients">All Clients</router-link></li>
							</ul>
					</li>
					<li class="submenu">
						<a class="" href="#"><i class="fa fa-fw fa-table"></i> <span>Cases</span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><router-link to="all_cases">All Cases</router-link></li>
								<li><router-link to="add_case">Add Case</router-link></li>
							</ul>
					</li>
					
					<!--li class="submenu">
						<a class="active subdrop" href="#"><i class="fa fa-fw fa-table"></i> <span> Email Templates </span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="display: block;">
								<li><a href="">All Email Templates</a></li>
								
							</ul>
					</li>
					
					<li class="submenu">
						<a class="" href="#"><i class="fa fa-fw fa-table"></i> <span> Cases </span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><a href="">All Cases</a></li>
								<li><a href="">Request Invoices</a></li>
								<li><a href="">All Activites</a></li>
								<li><a href="">All Invoices</a></li>
								<li><a href="">All Activities Type</a></li>
							</ul>
					</li-->
					
					<li class="submenu">
						<a href="#" class=""><i class="fa fa-fw fa-table"></i> <span> Settings </span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><router-link to="update_password">Change Password</router-link></li>
								<li></li>
							</ul>
					</li>
			</ul>
			<div class="clearfix"></div>
		</div>
		<div class="clearfix"></div>
	</div>
</div>
</template>
<script>
	export default {
	  //name: 'Home',
	  data () {
		return {
		  msg: 'Welcome to Your Vue.js App'
		}
	  }
	}
</script>
