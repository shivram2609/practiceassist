<template>
	<div class="container-fluid">
				
        <div class="col-md-11">
            <div class="card">
					<div class="card-header">
						<router-link to="all_clients" class="btn btn-primary">View Clients</router-link>
					</div>
					<div class="card-body">
						<form  class="register-from needs-validation" novalidate @submit="addClient">
				
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input id="name" type="text" v-model="$v.user.name.$model" :class="{'is-invalid': $v.user.name.$error || submitStatus == true}" class="form-control" name="name" value="">
                                <div  class="invalid-feedback text-left" v-if="!$v.user.name.required">Please enter user name.</div>
                                <div class="invalid-feedback text-left" v-if="!$v.user.name.minLength">Name must have at least {{ $v.user.name.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.name.maxLength">Name must have at max {{ $v.user.name.$params.maxLength.max }} characters.</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" :class="{'is-invalid': $v.user.email.$error || submitStatus == true}" v-model="$v.user.email.$model" class="form-control" name="email" value="">
                                 <div class="invalid-feedback text-left" v-if="!$v.user.email.required">Please enter email.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.email">Please enter valid email.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.minLength">Email must have at least {{ $v.user.email.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.maxLength">Email must have at max {{ $v.user.email.$params.maxLength.max }} characters.</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" :class="{'is-invalid': $v.user.password.$error || submitStatus == true}" v-model="$v.user.password.$model" class="form-control" name="password">
                               <div class="invalid-feedback text-left" v-if="!$v.user.password.required">Please enter password.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.password.minLength">Password must have at least {{ $v.user.password.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.password.maxLength">Password must have at max {{ $v.user.password.$params.maxLength.max }} characters.</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                            <div class="col-md-6">
                                <input id="confirmPassword" type="password" :class="{'is-invalid': $v.user.confirmPassword.$error || submitStatus == true}" v-model="$v.user.confirmPassword.$model" class="form-control" name="confirmPassword">
                               <div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.required">Please enter confirm password.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.minLength">Password must have at least {{ $v.user.confirmPassword.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.confirmPassword.maxLength">Password must have at max {{ $v.user.confirmPassword.$params.maxLength.max }} characters.</div>
								<div class="invalid-feedback text-left small "  v-if="!$v.user.confirmPassword.sameAsPassword">Confirm password must be identical.</div>
					  
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
						<button class="btn btn-primary" type="submit">Register</button>
                            </div>
                        </div>
                    </form>
                    </div>
			</div>
        </div>
        
        
    </div>
  
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
				type: 3,
				company_code: ''
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
		addClient: function(e){
		   event.preventDefault();
		
			var app = this;
			app.submitStatus = false
		
			if(app.$v.$invalid){
				app.submitStatus = true;
				return;
			}
			
			if(!app.$v.$invalid) {
				var getCode = JSON.parse(localStorage.getItem('user'));
				if(getCode)
				{
					app.user.company_code = getCode.company_code;
				}
				
				app.axios.post('/api/user/register',app.user)
				.then(function (resp) {
					
					app.$notify({text:resp.data.messages.join(),type: resp.data.status ? 'success' : 'error',duration:1000,speed:3000});
					app.$router.push('all_clients');
					
				}).catch(function (resp) {
					app.$notify({text: resp.message,type: 'error',duration:1000,speed:3000});
				});
				
			}
			
		}
		
		}
	
}

</script>
