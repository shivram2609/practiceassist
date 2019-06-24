<template>
	<section class="login-sec">
		<div class="container">
			<div class="row">
				<div class="col-md-10 offset-md-1">
					<div class="register-firm">
						<h3>Register</h3>
							<form  class="register-from needs-validation" novalidate @submit="registerForm">
						<div class="layer-firms-changes">
							<div class="radio-btn">
								<label class="radio">Law Firm
								 
									<input type="radio" v-model="user.type" value="0" name="type"> <span class="checkround"></span>
								</label>
								<label class="radio"> Lawyer
									<input type="radio" v-model="user.type" value="1" name="type"> <span class="checkround"></span>
								</label>
								<label class="radio">Client
									<input type="radio" v-model="user.type" value="2" name="type"> <span class="checkround"></span>
								</label>
							</div>
						</div>
						<div class="login-form">
							
						
								<div class="row">
									<div class="form-group col-md-6">
										<label for="userName">Full Name</label>
										
										<template v-if="user.type == 0">
											<input required v-model.trim="$v.user.name.$model" :class="{'is-invalid': $v.user.name.$error || submitStatus == true}" class="form-control"  id="userName" placeholder="Firm Name">
										</template>
										<template v-else>
											<input required v-model.trim="$v.user.name.$model" :class="{'is-invalid': $v.user.name.$error || submitStatus == true}" class="form-control"  id="userName" placeholder="User Name">
										</template>
										
										<template v-if="user.type == 0">
											<div class="invalid-feedback text-left" v-if="!$v.user.name.required">Please enter firm name.</div>
										</template>
										<template v-else>
											<div  class="invalid-feedback text-left" v-if="!$v.user.name.required">Please enter user name.</div>
										</template>
										
										
										
											
										<div class="invalid-feedback text-left" v-if="!$v.user.name.minLength">Name must have at least {{ $v.user.name.$params.minLength.min }} characters.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.name.maxLength">Name must have at max {{ $v.user.name.$params.maxLength.max }} characters.</div>
									</div>
									<div class="form-group col-md-6">
										<label for="userEmail">Email</label>
										<input type="email" :class="{'is-invalid': $v.user.email.$error || submitStatus == true }" class="form-control" required id="userEmail" v-model.trim="$v.user.email.$model" placeholder="Email">
										
										<div class="invalid-feedback text-left" v-if="!$v.user.email.required">Please enter email.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.email.email">Please enter valid email.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.email.minLength">Email must have at least {{ $v.user.email.$params.minLength.min }} characters.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.email.maxLength">Email must have at max {{ $v.user.email.$params.maxLength.max }} characters.</div>
									</div>
									<div class="form-group col-md-6">
									
										<label for="userPassword">Password</label>
										<input type="password" :class="{'is-invalid': $v.user.password.$error || submitStatus == true}" class="form-control" required id="userPassword" v-model.trim="$v.user.password.$model" placeholder="Password ">
										
										<div class="invalid-feedback text-left" v-if="!$v.user.password.required">Please enter password.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.password.minLength">Password must have at least {{ $v.user.password.$params.minLength.min }} characters.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.password.maxLength">Password must have at max {{ $v.user.password.$params.maxLength.max }} characters.</div>
									</div>
									
									<div class="form-group col-md-6">
										<label for="userConfirmPassword">Confirm password</label>
										<input type="password" :class="{'is-invalid': $v.user.confirmPassword.$error || submitStatus == true}" class="form-control" required id="userConfirmPassword" v-model.trim="$v.user.confirmPassword.$model" placeholder="Confirm password ">
										
										<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.required">Please enter confirm password.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.minLength">Password must have at least {{ $v.user.confirmPassword.$params.minLength.min }} characters.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.maxLength">Password must have at max {{ $v.user.confirmPassword.$params.maxLength.max }} characters.</div>
										<div class="invalid-feedback text-left small "  v-if="!$v.user.confirmPassword.sameAsPassword">Confirm password must be identical.</div>
									</div>
									
									<div class="form-group col-md-12">
										<button class="btn btn-primary" type="submit">Register</button>
									</div>
									<!--div class="social-link col-md-12">
                                        <h4>Or Login Using</h4>
                                        <ul>
                                                <li><a href="#"><a href="#" class="icon-button facebook"><i class="fab fa-google"></i><span></span></a></a></li>
                                            <li><a href="#" class="icon-button twitter"><i class="fab fa-linkedin-in"></i><span></span></a></li>
                                        </ul>
                                    </div-->
									<div class="no-account col-md-12">
										<h4>Already have an account? <router-link to="login"><span>Login</span></router-link></h4>
									</div>
								</div>
							
						</div>
						</form>
					</div>
				</div>
			</div>
		</div>

	</section>
	
</template>

<script>
import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'


export default {
	data() {
	  return {
	   user: {
	    name: '',
	    email: '',
	    password: '',
	    confirmPassword: '',
	    type: 0
	   },
	    submitStatus: false
	  }
	 },
	 
	//Validations
	 validations: {
	  user: {
	   name: {
	    required,
	    minLength: minLength(5),
	    maxLength: maxLength(50)
	   },
	   email: {
	    required,
	    email,
	    minLength: minLength(5),
	    maxLength: maxLength(50)
	   },
	   password: {
	    required,
	    minLength: minLength(6),
	    maxLength: maxLength(20)
	   },
	   confirmPassword: {
		required,
	    sameAsPassword: sameAs('password'),
	    minLength: minLength(6),
	    maxLength: maxLength(20)
	   }
	  }

	 },
	 //methods
	 methods: {
	  registerForm: function(e) {
	   event.preventDefault();
	   var app = this;
	   let vm = this;
	   app.submitStatus = false
		   if (app.$v.$invalid) {
			app.submitStatus = true
			return;
		   }
		   
		   
	   if (!app.$v.$invalid) {
			app.axios.post('/api/user/register',app.user)
			.then(function (resp) {
		
				//app.user = {name: '' , email:'', password:'',sameAsPassword:''}
				
				app.$notify({text:resp.data.messages.join(),type: resp.data.status ? 'success' : 'error',duration:1000,speed:3000});
				
			}).catch(function (resp) {
				app.$notify({text: resp.message,type: 'error',duration:1000,speed:3000});
			});
	   }
	  }
	 }
	}
</script>
