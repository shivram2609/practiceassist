<template>
	<!--div class="container-fluid">
						<td><router-link :to="{path:'lawyers/edit',query:{id:user.id}}">Edit</router-link> | <span style="cursor:pointer;" @click="deleteUser(user.id , index)">Delete</span> | 
						<span v-if="user.status == true" style="cursor:pointer;" @click="updateStatus(user.id , index)">Deactived</span>
						<span v-else style="cursor:pointer;" @click="updateStatus(user.id , index)">Active</span></td>
    </div-->
<div class="container-fluid">
	<div class="layer-client">
		<div class="all-clients-view">
			<h2>All Lawyers</h2>
		</div>
		<div class="col-md-12">
			<div class="row add-class">
			 <form method="post" class="row">
				<div class="sort-by">
					<div class="select">
						<span class="arr"></span>
						<b-form-select v-model="user.selected" class="mb-3">
						  <option class="sorting-list" disabled :value="null">Select</option>
						  <option class="sorting-list" value="name">Name</option>
						  <!--option class="sorting-list" value="case">Case Name</option>
						  <option class="sorting-list" value="date">Next Hearing Date</option-->
						</b-form-select>
					</div>
				</div>
				<div class=" all-client-search">
					<div class="input-group">
						<input type="text" v-model="user.search" class="form-control" name="x" placeholder="Search here"> <span class="input-group-btn">
						<button class="btn btn-default" type="button" @click="onChangeValue()"><i class="fa fa-search"></i></button></span>
					</div>
				</div>
				<template v-if="getClear == true"><span @click="getAll()" class="btn btn-primary">Clear</span></template>
			</form>
			</div>
		</div>
		<div class="col-md-8 offset-md-2">
			<div class="layer-name">
				
				<div id="accordion" class="accordion">
					<div class="mb-0">
					
						<template v-if="notFount">
							<b-alert show variant="warning" class="text-center">{{notFount}}</b-alert>
						</template>
						<template v-else>
					
							<b-card no-body class="mb-1" v-for="user, index in userList" v-bind:index="user.id">
							  <b-card-header header-tag="header" class="p-1 card-header collapsed" role="tab">
								<b-button block href="#" v-b-toggle="'accordion-' + index" variant="custom-info" class="card-title">
								<div class="user-icon-img">
									<img src="img/user-icon.png">
								</div>
								<p>Lawyer Name:<span> {{user.name}}</span></p>
								<router-link class="pull-right" :to="{path:'lawyers/edit',query:{id:user.id}}">Edit</router-link> 
								<span class="pull-right" @click="deleteUser(user.id , index)">Delete</span>
								</b-button>
							  </b-card-header>
								<b-collapse  :id="'accordion-'+ index"   accordion="my-accordion" role="tabpanel">
									
									<b-card-body class="background-change">
									  <b-card-text>
										  <div class="client-img"><img src="img/client-img-icon.png" class="img-fluid"></div>
									  </b-card-text>
									  <b-card-text>
										<ul class="client-name-tittle">
											<li><a href="#">Lawyer Name:<span> {{user.name}}</span></a></li>
											<li><a href="#">Case Tilte:<span v-if="user.case"> {{user.case.title}}</span></a></li>
											<li><a href="#">Case Description:<span v-if="user.case"> {{user.case.description}}</span></a></li>
									   </ul>
									   <ul class="client-activities">
											<li><a href="#">All Activities</a></li>
											<li><a href="#">All Cases</a></li>
											<li><a href="#">All Invoices </a></li>
											<li><a href="#">Calendar</a></li>
									   </ul>
									  </b-card-text>
									</b-card-body>
									
							  </b-collapse>
							</b-card>
							
						</template>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
export default {
 data() {
  return {
   getClear: false,
   types: {},
   userList: {},
   deleteId: {},
   notFount: '',
   user: {
	   selected: null,
	   search: '',
	   company: '',
	   type:2
	   }
  }
 },
 created() {
  this.getAllLawyers();
 },
 mounted() {
	 var app = this;
	 if(app.$route.query.search) {
	  app.user.search = app.$route.query.search;
	  app.user.selected = app.$route.query.select;
	  app.onChangeValue(app.user);
  }
 },
 methods: {
  deleteUser: function(e) {
   event.preventDefault();
   var app = this;
   app.deleteId = {
    did: e
   }
   if (confirm("Do you really want to delete?")) {
    app.axios.post('/api/users/destroy', app.deleteId)
     .then(function(resp) {
      app.getAllLawyers();
      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 3000
      });

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
  getAllLawyers(data) {
   var app = this;
   //var getCode = JSON.parse(localStorage.getItem('user'));
   
   var params = {  type: 1 };
   app.axios.get('/api/users/', {params: params})
    .then(function(resp) {
     if (resp.data.response.users.length > 0) { 
	
      app.userList = resp.data.response.users;
     } else {
      app.notFount = 'No record found!';
     }
    }).catch(function(resp) {});

  },
  updateStatus: function(e) {
   event.preventDefault();
   var app = this;
   var statusCode = {
    status: e
   }
   if (confirm("Do you really want to update?")) {
    app.axios.post('/api/users/update_status', statusCode)
     .then(function(resp) {
      app.getAllLawyers();
      app.$notify({
       text: resp.data.messages.join(),
       type: resp.data.status ? 'success' : 'error',
       duration: 1000,
       speed: 3000
      });

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
  //onchange get value
  onChangeValue: function(users) { 
   var app = this;
   var userData = '';
   if(users) {
	    userData = users;
   }else {
	   userData = app.user;
   }
   app.$router.push({query : {search:app.user.search, select:  app.user.selected} });
   app.getClear = true;
   app.axios.post('/api/users/filter_record', userData)
     .then(function(resp) {
		  if (resp.data.status == true) {
		  app.notFount = '';
	      app.userList = resp.data.response;
	     }else{
		  app.notFount = resp.data.messages.join();
		 }
     }).catch(function(resp) {
      app.$notify({
       text: resp.message,
       type: 'error',
       duration: 1000,
       speed: 3000
      });
     });
  },
  getAll: function() {
	  var app =this;
	  app.user = {selected: null , search: ''}
	  app.$router.push('/lawyers');
	  app.getClear = false;
	  app.notFount = '';
	  app.getAllLawyers();
  }
 }
}
</script>
<style>
a.btn.btn-custom-info {
    background-color: #012b58;
    color: #fff;
}
 .collapsed > .when-opened,
    :not(.collapsed) > .when-closed {
        display: none;
    }

</style>
