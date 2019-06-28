<template>
<!--td><router-link :to="{path:'/clients/edit',query:{id:user.id}}">Edit</router-link></td>
<td><span style="cursor:pointer;" @click="deleteUser(user.id, index)">Delete</span> | 
<span v-if="user.status == true" style="cursor:pointer;" @click="updateStatus(user.id, index)">Deactived</span>
<span v-else style="cursor:pointer;" @click="updateStatus(user.id)">Active</span></td-->
<div class="container-fluid">
	<div class="layer-client">
		<div class="all-clients-view">
			<h2>All Clients</h2>
		</div>
		<div class="col-md-12">
			<div class="row add-class">
				<div class="sort-by">
					<div class="dropdown">
						<b-dropdown id="dropdown-1" text="Sort By" variant="primary">
							<b-dropdown-item>Name</b-dropdown-item>
							<b-dropdown-item>Case Name</b-dropdown-item>
							<b-dropdown-item>Next Hearing Date</b-dropdown-item>
						  </b-dropdown>
					</div>
				</div>
				<div class=" all-client-search">
					<div class="input-group">
						<input type="text" class="form-control" name="x" placeholder="Search here"> <span class="input-group-btn">
						<button class="btn btn-default" type="button"><i class="fa fa-search"></i></button></span>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-8 offset-md-2">
			<div class="layer-name">
				<div id="accordion" class="accordion">
					<div class="mb-0">
					
						<template v-if="notFount">
							<tr><td colspan="5" style="text-align:center;">{{notFount}}</td> </tr>
						</template>
						<template v-else>
							<b-card no-body class="mb-1" v-for="user, index in userList" v-bind:index="user.id">
							  <b-card-header header-tag="header" class="p-1 card-header collapsed" role="tab">
								<b-button block href="#" v-b-toggle="'accordion-' + index" variant="custom-info" class="card-title">
								<div class="user-icon-img">
									<img src="img/user-icon.png">
								</div>
								<p>Client Name:<span> {{user.name}}</span></p>
								</b-button>
							  </b-card-header>
							  
									
								<b-collapse visible :id="'accordion-'+ index"   accordion="my-accordion" role="tabpanel">
								<b-card-body class="background-change">
								  <b-card-text>
									  <div class="client-img"><img src="img/client-img-icon.png" class="img-fluid"></div>
								  </b-card-text>
								  <b-card-text>
									<ul class="client-name-tittle">
										<li><a href="#">Lawyer Name:<span> Kodwo</span></a></li>
										<li><a href="#">Case Tilte:<span> Property Settlement</span></a></li>
										<li><a href="#">Case Description:<span> A Property invoice the Property that the couple</span></a></li>
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

   company_code: {},
   userList: {},
   deleteId: {},
   notFount: ''
  }
 },
 created() {
  this.getAllLawyers();
 },
 methods: {
  deleteUser: function(e, index) {
   event.preventDefault();
   var app = this;
   app.deleteId = {
    did: e
   }
   if (confirm("Do you really want to delete?")) {
    app.axios.post('/api/user/delete_user', app.deleteId)
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
   var getCode = JSON.parse(localStorage.getItem('user'));
   app.company_code = {
    cCode: getCode.company_code,
    type: 3
   };
   app.axios.post('/api/user/userlist', app.company_code)
    .then(function(resp) {
     if (resp.data.status == true) {
      app.userList = resp.data.response;
     } else {
      app.notFount = resp.data.messages.join();
     }

    }).catch(function(resp) {});

  },
  updateStatus: function(e, index) {
   event.preventDefault();
   var app = this;
   var statusCode = {
    status: e
   }
   if (confirm("Do you really want to update?")) {
    app.axios.post('/api/user/update_status', statusCode)
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
  }

 }
}
</script>
<style>
a.btn.btn-custom-info {
    background-color: #012b58;
    color: #fff;
}
</style>
