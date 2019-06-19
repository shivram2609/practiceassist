<template>
 <div class="left main-sidebar">
	<div class="sidebar-inner leftscroll">
		<div id="sidebar-menu">
							<ul>
					<li class="submenu">
						<a class="" href="http://127.0.0.1:8000/admin/dashboard"><i class="fa fa-fw fa-bars"></i><span> Dashboard </span> </a>
					</li>
					<li class="submenu">
						<a class="" href="#"><i class="fa fa-fw fa-table"></i> <span>Lawyers</span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><a href="http://127.0.0.1:8000/admin/lawyer/2">All Lawyers</a></li>
								
							</ul>
					</li>
					<li class="submenu">
						<a class="" href="#"><i class="fa fa-fw fa-table"></i> <span>Clients</span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><a href="http://127.0.0.1:8000/admin/client/3">All Clients</a></li>
							</ul>
					</li>
					
					<li class="submenu">
						<a class="active subdrop" href="#"><i class="fa fa-fw fa-table"></i> <span> Email Templates </span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="display: block;">
								<li><a href="http://127.0.0.1:8000/admin/cmsemail">All Email Templates</a></li>
								<!--li><a href="http://127.0.0.1:8000/admin/cmsemail/add">Add Email Template</a></li-->
							</ul>
					</li>
					
					<li class="submenu">
						<a class="" href="#"><i class="fa fa-fw fa-table"></i> <span> Cases </span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><a href="http://127.0.0.1:8000/admin/cases">All Cases</a></li>
								<li><a href="http://127.0.0.1:8000/admin/cases/pending">Request Invoices</a></li>
								<li><a href="http://127.0.0.1:8000/admin/cases/activites">All Activites</a></li>
								<li><a href="http://127.0.0.1:8000/admin/cases/allinvoices">All Invoices</a></li>
								<li><a href="http://127.0.0.1:8000/admin/cases/allmemos">All Activities Type</a></li>
							</ul>
					</li>
					
					<li class="submenu">
						<a href="#" class=""><i class="fa fa-fw fa-table"></i> <span> Settings </span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><a href="http://127.0.0.1:8000/admin/profile">Edit Profile</a></li>
								<li><a href="http://127.0.0.1:8000/admin/changepassword">Change Password</a></li>
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
	  name: 'Home',
	  data () {
		return {
		  msg: 'Welcome to Your Vue.js App'
		}
	  }
	}
</script>
