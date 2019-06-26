<template>
	<div>
		<section class="login-sec">
		<div class="container">
			<div class="row">
				<div class="col-md-8 offset-md-2">
				   <div class="login-page">
					   <h3>Change Password</h3>
							<div class="login-form">
								
								<form class="register-from needs-validation" @submit="resetForm">
									
									<div class="form-group">
									
										<label for="userPassword">Password</label>
										<input type="password" :class="{'is-invalid': $v.user.password.$error || submitStatus == true}" class="form-control" id="userPassword" v-model.trim="$v.user.password.$model" placeholder="Password ">
										
										<div class="invalid-feedback text-left" v-if="!$v.user.password.required">Please enter password.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.password.minLength">Password must have at least {{ $v.user.password.$params.minLength.min }} characters.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.password.maxLength">Password must have at max {{ $v.user.password.$params.maxLength.max }} characters.</div>
									</div>
									
									<div class="form-group">
										<label for="userConfirmPassword">Confirm password</label>
										<input type="password" :class="{'is-invalid': $v.user.confirmPassword.$error || submitStatus == true}" class="form-control" id="userConfirmPassword" v-model.trim="$v.user.confirmPassword.$model" placeholder="Confirm password ">
										
										<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.required">Please enter confirm password.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.minLength">Password must have at least {{ $v.user.confirmPassword.$params.minLength.min }} characters.</div>
										<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.maxLength">Password must have at max {{ $v.user.confirmPassword.$params.maxLength.max }} characters.</div>
										<div class="invalid-feedback text-left small "  v-if="!$v.user.confirmPassword.sameAsPassword">Confirm password must be identical.</div>
									</div>
									
									<div class="form-group">
										<button class="btn btn-primary" type="submit">Update</button>
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
    password: '',
    confirmPassword: '',
    token_code: ''
   },
   submitStatus: false,
  }
 },

 //Validations
 validations: {
  user: {
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

 methods: {
  resetForm: function(e) {
   event.preventDefault();
   var app = this;
   if (app.$v.$invalid) {
    app.submitStatus = true
    return;
   }

   app.user.token_code = app.$route.query.reset_token;

   app.axios.post('api/user/change_password', app.user)
    .then(function(resp) {
     if (resp.data.status === true) {
      app.user = {
       password: '',
       confirmPassword: ''
      }
      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 2000
      });
     } else {
      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 2000
      });
     }
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
