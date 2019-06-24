<template>
	<div class="container-fluid">
				
        <div class="col-md-11">
            <div class="card">
					<div class="card-header">
						<h3>Add Case</h3>
					</div>
					<div class="card-body">
						<form  class="register-from needs-validation" novalidate @submit="addLawyer">
				
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input id="name" type="text"  class="form-control" name="title">
                               
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Description</label>

                            <div class="col-md-6">
                                <textarea  placeholder="add multiple lines"></textarea>
                                 <div class="invalid-feedback text-left">Please enter case description.</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Select Client</label>

                            <div class="col-md-6">
                                <select >
								  <option disabled value="">Please select one</option>
								  <option>A</option>
								  <option>B</option>
								  <option>C</option>
								</select>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Select Lawyer</label>

                            <div class="col-md-6">
                                 <select >
								  <option disabled value="">Please select one</option>
								  <option>A</option>
								  <option>B</option>
								  <option>C</option>
								</select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Case Date</label>

                            <div class="col-md-6">
                                <input  type="text" name="date" value="">
                                 <div class="invalid-feedback text-left">Please enter case description.</div>
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
				title: ''
				},
				submitStatus: false
		}
	},
	
	//Validations
	 validations: {
	  user: {
	   title: {
	    required,
	    minLength: minLength(6),
	    maxLength: maxLength(50)

	  }
	}

	 },
	
	methods: {
		addLawyer: function(e){
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
					app.$router.push('all_lawyers');
					
				}).catch(function (resp) {
					app.$notify({text: resp.message,type: 'error',duration:1000,speed:3000});
				});
				
			}
			
		}
		
		}
	
}

</script>
