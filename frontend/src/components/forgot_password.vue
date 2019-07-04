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
							<input type="email" :class="{'is-invalid': $v.user.email.$error || submitStatus == true }" class="form-control"  id="userEmail" v-model.trim="$v.user.email.$model" placeholder="Email">
						   <div class="invalid-feedback text-left" v-if="!$v.user.email.required">Please enter email.</div>
							<div class="invalid-feedback text-left" v-if="!$v.user.email.email">Please enter valid email.</div>
							<div class="invalid-feedback text-left" v-if="!$v.user.email.minLength">Email must have at least {{ $v.user.email.$params.minLength.min }} characters.</div>
							<div class="invalid-feedback text-left" v-if="!$v.user.email.maxLength">Email must have at max {{ $v.user.email.$params.maxLength.max }} characters.</div>
						</div>
					</div>
					
					<div class="form-group">
						<button class="btn btn-primary" type="submit">Submit</button>
					</div>
					<div class="no-account">
						
						<h4>Back to <router-link to="login"><span>Login</span></router-link></h4>
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
import {
 required,
 minLength,
 maxLength,
 sameAs,
 email
} from 'vuelidate/lib/validators'
export default {
 //name: 'ForgotPassword',
 data() {
  return {
   user: {
    email: ''
   },
   submitStatus: false,
  }
 },
 validations: {
  user: {
   email: {
    required,
    email,
    minLength: minLength(5),
    maxLength: maxLength(50)

   }

  }

 },
 methods: {
  forgotForm: function(e) {
   event.preventDefault();
   var app = this;

   if (app.$v.$invalid) {
    app.submitStatus = true
    return;
   }

   app.axios.post('api/user/forgot_password', app.user)
    .then(function(resp) {
     app.$notify({
      text: resp.data.messages.join(),
      type: resp.data.status ? 'success' : 'error',
      duration: 1000,
      speed: 2000
     });
    }).catch(function(resp) {
     app.$notify({
      text: resp.data.messages.join(),
      type: 'error',
      duration: 1000,
      speed: 2000
     });
    });

  }
 }

}
</script>
