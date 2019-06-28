<template>
	<div class="container-fluid">
				
        <div class="col-md-11">
            <div class="card">
					<div class="card-header">
		
					</div>
					<div class="card-body">
						<form  enctype="multipart/form-data" class="register-from needs-validation" novalidate @submit="updateProfile">
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input id="name" type="text" v-model="user.name" class="form-control" name="name" value="">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                            <div class="col-md-6">
                                <input id="email" type="email" readOnly v-model="user.email" class="form-control" name="email" value="">
                            </div>
                        </div>
                        <!--div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Profile Image</label>
                            <div class="col-md-6">
                                <input id="file" type="file" @change="onFileChange" class="form-control" name="image">
                            </div>
                        </div-->
                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
						<button class="btn btn-primary" type="submit">Update</button>
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
 //name: 'ForgotPassword',
 data() {
  return {
   user: {
    name: '',
    email: '',
    image: ''
   },
   submitStatus: false,
  }
 },

 //Validations
 validations: {
  user: {
   name: {
    required
   }
  }

 },
mounted(){
	var app = this;
	app.getUserData();
},
 methods: {
  //get onFileChange
  onFileChange: function(e) {
    var files = e.target.files;
     var image = new Image();
      var reader = new FileReader();
      var vm = this;

      //~ reader.onload = (e) => {
        //~ vm.image = e.target.result;
      //~ };
      //~ console.log(vm.image );
      //~ reader.readAsDataURL(file);
  },
  //get user data	 
  getUserData: function() {
	var app = this;
	var getUser = JSON.parse(localStorage.getItem('user'));
	app.user.name = getUser.name;
	app.user.email = getUser.email;  
  },
  //update profile
  updateProfile: function(e) {
   event.preventDefault();
   var app = this;
   if (app.$v.$invalid) {
    app.submitStatus = true
    return;
   }
   var getCode = localStorage.getItem('jwt');
   app.user.user_token = getCode;

   app.axios.post('/api/user/update_password', app.user)
    .then(function(resp) {
     if (resp.data.status === true) {
		 	
	  localStorage.setItem('user', JSON.stringify(resp.data.response));
	  app.$router.go()
      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 2000
      });
     } else {
		 console.log('resp.data.response');
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
