<template>
	<div class="container-fluid">
				
        <div class="col-md-11">
            <div class="card">
					<div class="card-header">
		
					</div>
					<div class="card-body">
						<form  class="register-from needs-validation" novalidate @submit="updateLawyer">
				
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input id="name" type="text" v-model="$v.user.name.$model" :class="{'is-invalid': $v.user.name.$error}" class="form-control" name="name" value="">
                                <div  class="invalid-feedback text-left" v-if="!$v.user.name.required">Please enter user name.</div>
                                <div class="invalid-feedback text-left" v-if="!$v.user.name.minLength">Name must have at least {{ $v.user.name.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.name.maxLength">Name must have at max {{ $v.user.name.$params.maxLength.max }} characters.</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                            <div class="col-md-6">
                                <input id="email" type="email" readOnly :class="{'is-invalid': $v.user.email.$error}" v-model="$v.user.email.$model" class="form-control" name="email" value="">
                                 <div class="invalid-feedback text-left" v-if="!$v.user.email.required">Please enter email.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.email">Please enter valid email.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.minLength">Email must have at least {{ $v.user.email.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.email.maxLength">Email must have at max {{ $v.user.email.$params.maxLength.max }} characters.</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                            <div class="col-md-6">
                                <input id="password" type="password" :class="{'is-invalid': $v.user.password.$error	}" v-model="$v.user.password.$model" class="form-control" name="password">
                               <div class="invalid-feedback text-left" v-if="!$v.user.password.required">Please enter password.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.password.minLength">Password must have at least {{ $v.user.password.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.password.maxLength">Password must have at max {{ $v.user.password.$params.maxLength.max }} characters.</div>
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
						<button class="btn btn-primary" type="submit">Update</button>
						<router-link class="btn btn-primary" to="all_lawyers">Back</router-link>
                            </div>
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
    uid: ''

   },
   userId: ''
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
    minLength: minLength(6),
    maxLength: maxLength(20)
   }
  }

 },
 mounted() {
  var app = this;
  app.userId = {
   uid: this.$route.query.id
  }

  app.axios.post('/api/user/edit_user', app.userId)
   .then(function(resp) {

    app.user = resp.data.response;
    app.user.password = '';

   }).catch(function(resp) {
    console.log(resp);
   });

 },
 methods: {
  updateLawyer: function(e) {
   event.preventDefault();

   var app = this;

   if (!app.$v.$invalid) {



    app.axios.post('/api/user/update_user', app.user)
     .then(function(resp) {

      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 3000
      });
      app.$router.push('all_lawyers');
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
