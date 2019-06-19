<template>
    
<div class="headerbar" id="top-navbar">
		<!-- LOGO -->
        <div class="headerbar-left">
			<a href="http://127.0.0.1:8000/admin/dashboard" class="logo"><img alt="Logo" src="../../assets/img/logo.png"> <span></span></a>
        </div>
        <nav class="navbar-custom">
                    <ul class="list-inline float-right mb-0">
                       <li class="list-inline-item dropdown notif">
                            <a class="nav-link dropdown-toggle nav-user" data-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                <small>Hello, Ramnish  </small>  <img src="../../assets/img/twenty-fur-hour.png" alt="Profile image" class="avatar-rounded">
                            </a>
                             
                        </li>
                        <li class="text-right"><span @click="logout" style="cursor:pointer;">Logout</span></li>
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
  data () {
    return {
		isScrolled: false,
    }
  },
  mounted(){  
	window.addEventListener('scroll', this.updateScroll);
  },
  methods: {
	  
    updateScroll() {
		this.isScrolled = window.scrollY > document.getElementById('top-navbar').clientHeight;
	},
	
	logout:function(){
			this.$notify({text:"You have been logout successfully.",type: 'success' ,duration:1000,speed:3000});
		window.localStorage.clear(); 
		this.$router.push('/login');
	
		
	}
  }
  
}
</script>
