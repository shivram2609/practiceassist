<template>
	<div>
		<section class="login-sec">
		<div class="container">
			<div class="row">
				<div class="col-md-8 offset-md-2">
				   <div class="login-page">
					   <h3>Forgot Password</h3>
							<div class="login-form">
								
								<form class="register-from needs-validation" @submit="forgotForm">
									
									<div class="col-md-8 offset-md-2" >
										<div class="form-group">
											<label for="validationCustom01">email</label>
											<input type="email" name="email" class="form-control" required id="validationCustom01" v-model="user.email" placeholder="Email">
										<div class="invalid-feedback text-left">Please enter valid email.</div>
										</div>
									</div>
									
									<div class="form-group">
										<button class="btn btn-primary" type="submit">Submit</button>
									</div>
									<div class="no-account">
										<h4><router-link to="login"><span>Login</span></router-link></h4>
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

export default {
 name: 'ForgotPassword',
 data() {
	 return {
		  user: {
				email: ''
			   },
			   submitStatus: false,
		}
	},
	
	methods: {
		forgotForm: function(e) {
			event.preventDefault();
			var app = this;
			app.axios.post('api/user/forgot_password', app.user)
			   .then(function(resp){
					 app.$notify({text: resp.data.messages.join(),type: resp.data.status ? 'success' : 'error',duration:1000,speed:2000});
			   }).catch(function(resp){
				   app.$notify({text: resp.data.messages.join(),type: 'error' , duration:1000,speed:2000});	
			   });

		}
	}
	 
}
</script>
