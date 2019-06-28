<template>
<!-- top bar navigation -->
	<div class="headerbar" id="top-navbar">
		<!-- LOGO -->
        <div class="headerbar-left">
			<a href="#" class="logo"><img alt="Logo" src="../../assets/img/logo.png" /></a>
       <a href="#" class="logo1"><img alt="Logo" src="../../assets/img/logo1.png" /></a>
        </div>

        <nav class="navbar-custom">
                    <ul class="list-inline float-right mb-0">
						<li class="list-inline-item dropdown notif">
                            <a class="nav-link dropdown-toggle arrow-none" href="#">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                            </a>
                        </li>
                        
						<li class="list-inline-item dropdown notif">
							
							<b-navbar variant="faded" type="light">	
								<b-nav-item-dropdown right>  
									<template slot="button-content"><i class="fa fa-fw fa-bell-o"></i><span class="notif-bullet">0</span></template>
									<!--b-dropdown-item to="#" class="dropdown-item noti-title"><h5><small><span class="label label-danger pull-xs-right">5</span>Allerts</small></h5></b-dropdown-item>
									<b-dropdown-item to="#"> <div class="notify-icon bg-faded">
                                        <img src="../../assets/img/admin.png" alt="img" class="rounded-circle img-fluid">
                                    </div>
                                    <p class="notify-details">
                                        <b>John Doe</b>
                                        <span>User registration</span>
                                        <small class="text-muted">3 minutes ago</small>
                                    </p></b-dropdown-item>
									
                                    <b-dropdown-item>View All Allerts</b-dropdown-item-->
								</b-nav-item-dropdown>
							</b-navbar>
                         
                        </li>
                          
                        <li class="list-inline-item dropdown notif user-login nav-user">
  
                          <b-navbar variant="faded" type="light">
							<b-nav-item-dropdown right>  
								<template slot="button-content"><img src="../../assets/img/admin.png" alt="Profile image" class="avatar-rounded">
								   <span>{{userName}} </span></template>
								 <b-dropdown-item to="#"><h5 class="text-overflow"><small>Hello, {{userName}} </small> </h5></b-dropdown-item>
								 <b-dropdown-item to="/settings/profile"> <i class="fa fa-user"></i> <span>Profile</span></b-dropdown-item>
								 <b-dropdown-item to="#"> <i class="fa fa-power-off"></i> <span @click="logout" >Logout</span></b-dropdown-item>   
							</b-nav-item-dropdown>
						  </b-navbar>
                        </li>

                    </ul>

                    <ul class="list-inline menu-left mb-0">
                        <li class="float-left">
                            <button class="button-menu-mobile open-left">
								<i class="fa fa-fw fa-bars"></i>
                            </button>
                        </li>                        
                    </ul>

        </nav>
	</div>
</template>
<script>
export default {
 data() {
  return {
   isScrolled: false,
   userName: ''
  }
 },
 mounted() {
  var app = this;
  var getUser = JSON.parse(localStorage.getItem('user'));
  app.userName = getUser.name;
  
  window.addEventListener('scroll', this.updateScroll);
 },
 methods: {
  updateScroll() {
   this.isScrolled = window.scrollY > document.getElementById('top-navbar').clientHeight;
  },

  logout: function() {
   this.$notify({
    text: "You have been logout successfully.",
    type: 'success',
    duration: 1000,
    speed: 3000
   });
   window.localStorage.clear();
   this.$router.push('/login');


  }
 }

}
</script>
