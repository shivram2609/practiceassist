<template>

      
 
 <div class="container-fluid">
	<div class="add-cases">
		<div class="add-new-cases text-center">
			<h2>Add New Case</h2>
		</div>
		<div class="col-lg-8 offset-lg-2">
			<form class="register-from needs-validation" novalidate @submit="addCase">
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
						
								  <select class="btn btn-primary dropdown-toggle form-control" :class="{'is-invalid': $v.user.client.$error || submitStatus == true}" v-model="$v.user.client.$model">
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
								  <select multiple class="btn btn-primary dropdown-toggle form-control" :class="{'is-invalid': $v.user.lawyer.$error || submitStatus == true}" v-model="$v.user.lawyer.$model">
								  <option disabled value="">Select Lawyer</option>
								  <template v-for="lawyer, index in allLawyersLists">
									  <option  :value="lawyer.id">{{lawyer.name}}</option>
								  </template>
								</select>
								 <div  class="invalid-feedback text-left" v-if="!$v.user.description.required">Please enter lawyer One or Multiple.</div>
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
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</form>
		</div>
	</div>
</div>
<!-- END container-fluid -->
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
	    client: '',
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
	   client: {
	    required

	   },
	   lawyer: {
	    required

	   },
	   case_time: {
	    required

	   }
	  }

	 },
	 mounted() {
	  //get all client by firm
	  var app = this;
	  app.getAllClients();
	  app.getAllLawyers();
	 },

	 methods: {
	  addCase: function(e) {
	   event.preventDefault();

	   var app = this;
	   app.submitStatus = false

	   if (app.$v.$invalid) {
	    app.submitStatus = true;
	    return;
	   }

	   if (!app.$v.$invalid) {
	    app.axios.post('/api/cases/create', app.user)
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

	   }

	  },

	  getAllClients: function() {

	   var app = this;
	 
	   var params = {  type: 2 };
	   app.axios.get('/api/users', {params: params})
	    .then(function(resp) {
	     if (resp.data.status == true) {
			 console.log(resp.data.response.users);
	      app.allClientsLists = resp.data.response.users;
	     }

	    }).catch(function(resp) {});
	  },
	  getAllLawyers: function() {

	   var app = this;
	 var params = {  type: 1  };
	   app.axios.get('/api/users', {params: params})
	    .then(function(resp) {
	     if (resp.data.status == true) {
	      app.allLawyersLists = resp.data.response.users;
	     }

	    }).catch(function(resp) {});
	  }


	 }

	}

</script>
