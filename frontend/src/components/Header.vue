<template>
    <header>
        <nav :class="{scrolled: isScrolled }" class="navbar navbar-expand-lg custom-navbar navbar-fixed-top" id="top-navbar">
                <div class="container">
               <router-link to="/"> <img class="navbar-brand" src="../assets/img/logo.png" id="logo_custom"></router-link>
                   <button class="navbar-toggler navbar-toggler-right custom-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                      <i class="fa fa-bars"></i>
                   </button>
                     <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                         <ul class="navbar-nav justify-content-end">
							
							<li class="nav-item">
								<router-link to="/" class="nav-link">Home</router-link>
							</li>  
							<!--li class="nav-item">
								<a class="nav-link" href="#">Pricing</a>
							</li-->  
							<li class="nav-item">
								<a class="nav-link" href="#">Testimonials</a>
							</li> 
							<li class="nav-item">
								<a class="nav-link" href="#">Contact us</a>
							</li> 
							<li class="nav-item">
								<router-link to="login" class="nav-link">Login</router-link>
							</li> 
							<li class="nav-item">
								<router-link to="register" class="nav-link">Sign Up</router-link>
							</li> 
                         </ul>
                     </div>
                 </div>  
    </nav>
  
</header>

	
</template>

<script>

export default {
  data () {
    return {
		isScrolled: false
    }
  },
  mounted(){  
	window.addEventListener('scroll', this.updateScroll);
  },
  methods: {
    updateScroll() {
		this.isScrolled = window.scrollY > document.getElementById('top-navbar').clientHeight;
	}
  }
  
}
</script>
