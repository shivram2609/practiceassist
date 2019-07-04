<template>
	<div class="container-fluid">
                <div class="add-client">
                <div class="add-clients-view text-center">
                    <h2>Add <span>Client</span></h2>
                </div>   
                    <div class="col-md-8 offset-md-2">
                        <form  class="register-from needs-validation" novalidate @submit="addClient">
							<div class="form-group">
							  <label for="usr">Name:</label>
							  <input id="name" type="text" placeholder="Name" v-model="$v.user.name.$model" :class="{'is-invalid': $v.user.name.$error || submitStatus == true}" class="form-control" name="name" value="">
                                <div  class="invalid-feedback text-left" v-if="!$v.user.name.required">Please enter user name.</div>
                                <div class="invalid-feedback text-left" v-if="!$v.user.name.minLength">Name must have at least {{ $v.user.name.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.name.maxLength">Name must have at max {{ $v.user.name.$params.maxLength.max }} characters.</div>
							</div>
							<div class="form-group">
							  <label for="usr">Name:</label>
							   <input id="email" type="email" placeholder="Email" :class="{'is-invalid': $v.user.email.$error || submitStatus == true}" v-model="$v.user.email.$model" class="form-control" name="email" value="">
                                 <div class="invalid-feedback text-left" v-if="!$v.user.email.required">Please enter email.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.email">Please enter valid email.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.minLength">Email must have at least {{ $v.user.email.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.maxLength">Email must have at max {{ $v.user.email.$params.maxLength.max }} characters.</div>
							</div>
							
							<div class="form-group">
							  <label for="pwd">Password:</label>
							  <input id="password" type="password" placeholder="Password" :class="{'is-invalid': $v.user.password.$error || submitStatus == true}" v-model="$v.user.password.$model" class="form-control" name="password">
							   <!--i class="fa fa-eye-slash" aria-hidden="true"></i-->
                               <div class="invalid-feedback text-left" v-if="!$v.user.password.required">Please enter password.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.password.minLength">Password must have at least {{ $v.user.password.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.password.maxLength">Password must have at max {{ $v.user.password.$params.maxLength.max }} characters.</div>
							</div>
					
							<div class="form-group">
							  <label for="pwd">Confirm Password:</label>
							   <input id="confirmPassword" placeholder="Confirm Password" type="password" :class="{'is-invalid': $v.user.confirmPassword.$error || submitStatus == true}" v-model="$v.user.confirmPassword.$model" class="form-control" name="confirmPassword">
							    <!--i class="fa fa-eye-slash" aria-hidden="true"></i-->
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
 data() {
  return {
   user: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: 2,
    company: ''
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

 methods: {
  addClient: function(e) {
   event.preventDefault();

   var app = this;
   app.submitStatus = false

   if (app.$v.$invalid) {
    app.submitStatus = true;
    return;
   }

   if (!app.$v.$invalid) {

    app.axios.post('/api/users/register', app.user)
     .then(function(resp) {

      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 3000
      });
       if (resp.data.status == true) {
	      app.$router.push('/clients');
	     }else{
			 return;
		 }
      

     }).catch(function(resp) {
      app.$notify({
       text: resp.message,
       type: 'error',
       duration: 1000,
       speed: 3000
      });
     });

   }

  }

 }

}
</script>

