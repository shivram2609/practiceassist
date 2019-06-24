<template>
	<div>
		<section class="login-sec">
		<div class="container">
			<div class="row">
				<div class="col-md-8 offset-md-2">
				   <div class="login-page">
					   <h3>Log in</h3>
							<div class="login-form">
								
								<form :class="{'was-validated': $v.$invalid && submitStatus }" class="register-from needs-validation" novalidate @submit="loginForm">
									
									<div class="col-md-8 offset-md-2" :class="{ 'was-validated': $v.user.email.$dirty}">
										<div class="form-group">
											<label for="validationCustom01">email</label>
											<input type="email" name="email" class="form-control" required id="validationCustom01" v-model.trim="$v.user.email.$model" placeholder="Email">
										<div class="invalid-feedback text-left">Please enter valid email.</div>
										</div>
									</div>
									<div class="col-md-8 offset-md-2" :class="{ 'was-validated': $v.user.password.$dirty}">
										<div class="form-group">
											<label for="validationCustom02">password</label>
											<input type="password" name="password" class="form-control" required id="validationCustom02" v-model.trim="$v.user.password.$model" placeholder="Password">
											<div class="invalid-feedback text-left">Please enter password.</div>
										</div>
									</div>
									<div class="form-group">
										<button class="btn btn-primary" type="submit">Login</button>
									</div>
									  <!--div class="social-link">
										<h4>Or Login Using</h4>
										<ul>
												<li><a href="#"><a href="#" class="icon-button facebook"><i class="fab fa-google"></i><span></span></a></a></li>
											<li><a href="#" class="icon-button twitter"><i class="fab fa-linkedin-in"></i><span></span></a></li>
										</ul>
									</div-->
									<div class="no-account">
										<h4>Dont’t have an account? <router-link to="register"><span>Sign Up</span></router-link></h4>
										<router-link to="/forgot_password">Forgot Password?</router-link>
									</div>
									
								</form>
				           </div>
               </div>
            </div>
        </div>
    </div>
</section>
	</div>
</template>

<script>
import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'

export default {
	
 data() {
  return {
   user: {
    email: '',
    password: ''
   },
   submitStatus: false,
   errors: null
  }
 },

 //Validations
 validations: {
  user: {
   email: {
    required
   },
   password: {
    required
   }

  }

 },

 //methods
 methods: {
  loginForm: function(e) {
   event.preventDefault();
   var app = this;
   app.submitStatus = true
   if (app.$v.$invalid) {
    app.submitStatus = true
    return;
   }
   app.axios.post('api/user/login', app.user)
   .then(function(resp){

	   app.$notify({text: resp.data.messages.join(),type: resp.data.status ? 'success' : 'error',duration:1000,speed:2000});	
	   if(resp.data.status === true) {
		localStorage.setItem('user',JSON.stringify(resp.data.response.user))
		localStorage.setItem('jwt',resp.data.response.token)

		if (localStorage.getItem('jwt') != null){
			app.$emit('loggedIn');
			
			if(app.$route.params.nextUrl != null){
				app.$router.push(this.$route.params.nextUrl)
			} else {
				app.$router.go()
				app.$router.push('account');
			
				
			}
		}
	   }
	  // app.$router.push("/account");
   }).catch(function(resp){
	  // app.$notify({text: resp.message,type:'error',duration:1000,speed:2000});
	   app.$notify({text: resp.data.messages.join(),type: 'error' , duration:1000,speed:2000});	
   });

   
  },
  
 }


}
</script>
