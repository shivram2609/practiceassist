<template>
	
	
 <div class="container-fluid">
	<div class="add-cases">
		<div class="add-new-cases text-center">
			<h2>Add New Case BY Lawyer</h2>
		</div>
		<div class="col-lg-8 offset-lg-2">
			<form class="register-from needs-validation" novalidate @submit="updateCase">
				<div class="row">
					<div class="col-lg-12">
						<div class="form-group no-label">
							<label for="usr">Name:</label>
							 <input id="name" placeholder="Name" type="text"  :class="{'is-invalid': $v.user.title.$error || submitStatus == true}" v-model="$v.user.title.$model" class="form-control" name="title">
                                <div  class="invalid-feedback text-left" v-if="!$v.user.title.required">Please enter case title.</div>
                                <div class="invalid-feedback text-left" v-if="!$v.user.title.minLength">Name must have at least {{ $v.user.title.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.title.maxLength">Name must have at max {{ $v.user.title.$params.maxLength.max }} characters.</div>
						</div>
					</div>
					<div class="col-lg-12">
						<div class="form-group no-label">
							<label for="comment">Comment:</label>
							<textarea class="form-control" :class="{'is-invalid': $v.user.description.$error || submitStatus == true}" v-model="$v.user.description.$model"  placeholder="Description"></textarea>
                                 <div  class="invalid-feedback text-left" v-if="!$v.user.description.required">Please enter description.</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-6">
						<div class="select-client">
							<label for="comment">Select Client</label>
							<div class="dropdown">
								  <select class="btn btn-primary dropdown-toggle form-control" :class="{'is-invalid': $v.user.client_id.$error || submitStatus == true}" v-model="$v.user.client_id.$model">
								  <option disabled value="">Select Client</option>
								  <template v-for="client, index in allClientsLists">
									  <option  :value="client.id">{{client.name}}</option>
								  </template>
								  
								</select>
								 <div  class="invalid-feedback text-left" v-if="!$v.user.description.required">Please enter client.</div>
							</div>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="select-client">
							<label for="comment">Select Lawyer</label>
							<div class="dropdown">
						
								  <select multiple class="btn btn-primary dropdown-toggle form-control" v-model="user.lawyer">
								  <option disabled value="">Select Lawyer</option>
								  <template v-for="lawyers, index in allLawyersLists">
									  <option  :value="lawyers.id">{{lawyers.name}}</option>
								  </template>
								</select>
		
							</div>
						</div>
					</div>
					<div class="col-lg-6">
						<div class="form-group select-client">
							<label for="usr">Case Date</label>
							<date-picker v-model="$v.user.case_time.$model" :config="options"></date-picker>
					
						</div>
					</div>
			
				
				</div>
				<div class="save-btn text-center">
					<button type="submit" class="btn btn-primary">Update</button>
						<router-link class="btn btn-primary" to="/cases">Back</router-link>
				</div>
			</form>
		</div>
	</div>
</div>


</template>
<script>
import {
 required,
 minLength,
 maxLength
} from 'vuelidate/lib/validators'
import 'bootstrap/dist/css/bootstrap.css';

import datePicker from 'vue-bootstrap-datetimepicker';

import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
export default {
 components: {
  datePicker
 },
 data() {
  return {
   user: {
    title: '',
    description: '',
    client_id: '',
    lawyer: [],
    case_time: new Date()
   },
   options: {
    format: 'YYYY-MM-DD h:mm:ss',
    useCurrent: false,
    showClear: true,
    showClose: true,
   },
   submitStatus: false,
   allLawyersLists: '',
   allClientsLists: '',
  }
 },

 //Validations
 validations: {
  user: {
   title: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(50)

   },
   description: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(50)

   },
   client_id: {
    required

   },
   lawyer_id: {
    required

   },
   case_time: {
    required

   }
  }

 },

 mounted() {
  var app = this;
  app.userId = {
   uid: this.$route.query.id
  }
  app.axios.post('/api/case/edit_case', app.userId)
   .then(function(resp) {
   app.user = resp.data.response;
   resp.data.response.lawyer.forEach(function(key, value){
    app.user.lawyer[value] = key.id; 
})
   }).catch(function(resp) {
    
   });

  app.getAllClients();
  app.getAllLawyers();

 },

 methods: {
  updateCase: function(e) {
   event.preventDefault();

   var app = this;
   
    app.axios.post('/api/case/update_case', app.user)
     .then(function(resp) {
      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 3000
      });
      app.$router.push('/cases');
     }).catch(function(resp) {
      app.$notify({
       text: resp.message,
       type: 'error',
       duration: 1000,
       speed: 3000
      });
     });

   

  },

  getAllClients: function() {

   var app = this;
   var getCode = JSON.parse(localStorage.getItem('user'));
   app.company_code = {
    cCode: getCode.company_code,
    type: 3
   };
   app.axios.post('/api/user/userlist', app.company_code)
    .then(function(resp) {
     if (resp.data.status == true) {
      app.allClientsLists = resp.data.response;
     }

    }).catch(function(resp) {});
  },
  
  getAllLawyers: function() {
   var app = this;
   var getCode = JSON.parse(localStorage.getItem('user'));
   app.company_code = {
    cCode: getCode.company_code,
    type: 2
   };
   app.axios.post('/api/user/userlist', app.company_code)
    .then(function(resp) {
     if (resp.data.status == true) {
      app.allLawyersLists = resp.data.response;
     }

    }).catch(function(resp) {});
  }

 }

}

</script>
