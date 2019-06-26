<template>
	<div class="container-fluid">
				
        <div class="col-md-11">
            <div class="card">
					<div class="card-header">
						<h3>Edit Case</h3>
					</div>
					<div class="card-body">
						<form  class="register-from needs-validation" novalidate @submit="updateCase">
				
                        <div class="form-group row">
                            <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                            <div class="col-md-6">
                                <input id="name" type="text"  :class="{'is-invalid': $v.user.title.$error || submitStatus == true}" v-model="$v.user.title.$model" class="form-control" name="title">
                                <div  class="invalid-feedback text-left" v-if="!$v.user.title.required">Please enter case title.</div>
                                <div class="invalid-feedback text-left" v-if="!$v.user.title.minLength">Name must have at least {{ $v.user.title.$params.minLength.min }} characters.</div>
								<div class="invalid-feedback text-left" v-if="!$v.user.title.maxLength">Name must have at max {{ $v.user.title.$params.maxLength.max }} characters.</div>
                               
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Description</label>

                            <div class="col-md-6">
                                <textarea class="form-control" :class="{'is-invalid': $v.user.description.$error || submitStatus == true}" v-model="$v.user.description.$model"  placeholder="add multiple lines"></textarea>
                                 <div  class="invalid-feedback text-left" v-if="!$v.user.description.required">Please enter description.</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">Select Client</label>

                            <div class="col-md-6" >
                                <select class="form-control" :class="{'is-invalid': $v.user.client_id.$error || submitStatus == true}" v-model="$v.user.client_id.$model">
								  <option disabled value="">Please select one</option>
								 <template v-for="client, index in allClientsLists">
									  <option  :value="client.id">{{client.name}}</option>
								  </template>
								</select>
								 <div  class="invalid-feedback text-left" v-if="!$v.user.description.required">Please enter client.</div>
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Select Lawyer</label>

                            <div class="col-md-6">
                                 <select multiple class="form-control" :class="{'is-invalid': $v.user.lawyer_id.$error || submitStatus == true}" v-model="$v.user.lawyer_id.$model">
								  <option disabled value="">Please select one</option>
								 <template v-for="lawyer, index in allLawyersLists">
									  <option  :value="lawyer.id">{{lawyer.name}}</option>
								  </template>
								</select>
								 <div  class="invalid-feedback text-left" v-if="!$v.user.description.required">Please enter lawyer One or Multiple.</div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">Case Date</label>

                            <div class="col-md-6">
                               <date-picker v-model="$v.user.case_time.$model" :config="options"></date-picker>
                            </div>
                        </div>
                        
                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
						<button class="btn btn-primary" type="submit">Update</button>
						<router-link class="btn btn-primary" to="all_cases">Back</router-link>
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
    lawyer_id: [],
    case_time: new Date()
   },
   options: {
    format: 'YYYY/MM/DD h:mm:ss',
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
   }).catch(function(resp) {
    console.log(resp);
   });

  app.getAllClients();
  app.getAllLawyers();

 },

 methods: {
  updateCase: function(e) {
   event.preventDefault();

   var app = this;

   if (!app.$v.$invalid) {

    app.axios.post('/api/case/update_case', app.user)
     .then(function(resp) {
      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 3000
      });
      app.$router.push('all_cases');
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
