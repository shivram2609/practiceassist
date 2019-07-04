<template>
<div class="container-fluid">
	<div class="add-cases changepassword">
		<div class="add-new-cases text-center">
			<h2>Change Password</h2>
		</div>
		<div class="col-md-8 offset-md-2">
			<div class="changepassword">
				<form class="register-from needs-validation" @submit="resetForm">
					<div class="form-group no-label">
						<label for="usr">Current Password:</label>
						<input type="password" :class="{'is-invalid': $v.user.current_password.$error || submitStatus == true}" class="form-control" id="userCurrentPassword" v-model.trim="$v.user.current_password.$model" placeholder="Current Password" ><i class="fa fa-eye-slash" aria-hidden="true"></i>		
						<div class="invalid-feedback text-left" v-if="!$v.user.current_password.required">Please enter current password.</div>
										
					</div>
					<div class="form-group no-label">
						<label for="pwd">New Password:</label>
						<input type="password" :class="{'is-invalid': $v.user.password.$error || submitStatus == true}" class="form-control" id="userPassword" v-model.trim="$v.user.password.$model" placeholder="Password "><i class="fa fa-eye-slash" aria-hidden="true"></i>
						<div class="invalid-feedback text-left" v-if="!$v.user.password.required">Please enter password.</div>
						<div class="invalid-feedback text-left" v-if="!$v.user.password.minLength">Password must have at least {{ $v.user.password.$params.minLength.min }} characters.</div>
						<div class="invalid-feedback text-left" v-if="!$v.user.password.maxLength">Password must have at max {{ $v.user.password.$params.maxLength.max }} characters.</div>
					</div>
					<div class="form-group no-label">
						<label for="pwd">Confirm Password:</label>
						<input type="password" :class="{'is-invalid': $v.user.confirmPassword.$error || submitStatus == true}" class="form-control" id="userConfirmPassword" v-model.trim="$v.user.confirmPassword.$model" placeholder="Confirm password "><i class="fa fa-eye-slash" aria-hidden="true"></i>		
						<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.required">Please enter confirm password.</div>
						<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.minLength">Password must have at least {{ $v.user.confirmPassword.$params.minLength.min }} characters.</div>
						<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.maxLength">Password must have at max {{ $v.user.confirmPassword.$params.maxLength.max }} characters.</div>
						<div class="invalid-feedback text-left small "  v-if="!$v.user.confirmPassword.sameAsPassword">Confirm password must be identical.</div>
					</div>
					<div class="save-btn text-center">
						<button type="submit" class="btn btn-primary">Save</button>
					</div>
				</form>
			</div>
		</div>
	</div>
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
    current_password: '',
    password: '',
    confirmPassword: '',
    user_token: ''
   },
   submitStatus: false,
  }
 },

 //Validations
 validations: {
  user: {
   current_password: {
    required
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

 methods: {
  resetForm: function(e) {
   event.preventDefault();
   var app = this;
   if (app.$v.$invalid) {
    app.submitStatus = true
    return;
   }
   var getCode = localStorage.getItem('jwt');
   app.user.user_token = getCode;
   app.axios.post('/api/users/profile_update', app.user)
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
