<template>
<!--template v-if="notFound">
<tr><td colspan="4" style="text-align:center">{{notFound}}</td></tr>
</template>
<template v-else>
<tr v-for="cases, index in caseList">
<td>{{cases.id}}</td>
<td>{{cases.title}}</td>
<td>{{cases.description}}</td>
<td><router-link :to="{path:'/cases/edit',query:{id:cases.id}}">Edit</router-link> |
<span style="cursor:pointer;" @click="deleteCase(cases.id , index)">Delete</span> |
<span style="cursor:pointer;" @click="archiveCase(cases.id , index)">Archive</span-->
<div class="container-fluid">
	<div class="layer-client">
		<div class="all-cases-view">
			<h2>All <span>Cases</span></h2>
		</div>
		<div class="row">
			<div class="col-md-8 offset-md-2">
			
				<div class="all-client-tabs">
					
		
					<b-tabs>
					  <b-tab title="Active Cases">
						<b-card-text>
							<div id="active-cases" class="tab-pane fade active show">
								<div class="layer-name">
									<div id="accordion" class="accordion">
										<b-card no-body class="mb-1" v-for="user, index in caseList">
											  <b-card-header header-tag="header" class="p-1 card-header collapsed" role="tab">
												<b-button block href="#" v-b-toggle="'accordion-' + index" variant="custom-info" class="card-title">
												<p>{{user.title}}</p>
												<router-link class="pull-right" :to="{path:'/cases/edit',query:{id:user.id}}">Edit</router-link>
												<span class="pull-right" @click="deleteCase(user.id , index)">Delete</span>
												<span class="pull-right" @click="archiveCase(user.id , index)">Archive</span>
												</b-button>
											  </b-card-header>
						
												<b-collapse :id="'accordion-'+ index" visible accordion="my-accordion" role="tabpanel">
													<b-card-body class="background-change">
													  <b-card-text>
														
														  <p>{{user.description}}</p>
														  <h3>Hearing  Date &amp; Time</h3>
														  <ul class="check-date-time">
																<li><a href="#"><span><i class="fa fa-clock-o" aria-hidden="true"></i></span>11:00 PM</a>
																</li>
																<li><a href="#"><span><i class="fa fa-calendar" aria-hidden="true"></i></span>8-4-2019</a>
																</li>
															</ul>
															<div class="view-detail-btn">
																<button type="button" class="btn btn-primary">View Details</button>
															</div>
													  </b-card-text>
													</b-card-body>
												  </b-collapse>
											</b-card>
									</div>
								</div>
							</div>
							
						</b-card-text>
					  </b-tab>

					  <b-tab no-body title="Archived Cases">
						<b-card-text>
							<div id="active-cases" class="tab-pane fade active show">
								<div class="layer-name">
									<div id="accordion" class="accordion">
										<b-card no-body class="mb-1" v-for="user, index in caseList">
											  <b-card-header header-tag="header" class="p-1 card-header collapsed" role="tab">
												<b-button block href="#" v-b-toggle="'accordion-' + index" variant="custom-info" class="card-title">
												<p>{{user.title}}</p>
												</b-button>
											  </b-card-header>
						
												<b-collapse :id="'accordion-'+ index" visible accordion="my-accordion" role="tabpanel">
													<b-card-body class="background-change">
													  <b-card-text>
														
														  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
														  <h3>Hearing  Date &amp; Time</h3>
														  <ul class="check-date-time">
																<li><a href="#"><span><i class="fa fa-clock-o" aria-hidden="true"></i></span>11:00 PM</a>
																</li>
																<li><a href="#"><span><i class="fa fa-calendar" aria-hidden="true"></i></span>8-4-2019</a>
																</li>
															</ul>
															<div class="view-detail-btn">
																<button type="button" class="btn btn-primary">View Details</button>
															</div>
													  </b-card-text>
													</b-card-body>
												  </b-collapse>
											</b-card>
									</div>
								</div>
							</div>
						</b-card-text>
					  </b-tab>
					</b-tabs>
					
									
				</div>
			</div>
		</div>
	</div>
</div>
<!-- END container-fluid -->
  
</template>
<script>
export default {
 data() {
  return {

   company_code: {},
   caseList: {},
   deleteId: {},
   notFound: ''
  }
 },
 created() {
  this.getAllLawyers();
 },
 methods: {
  //delete case
  deleteCase: function(e) {
   event.preventDefault();
   var app = this;
   app.deleteId = {
    did: e
   }
   if (confirm("Do you really want to delete?")) {
    app.axios.post('/api/case/delete_case', app.deleteId)
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
  //archived case
  archiveCase: function(e) {
   event.preventDefault();
   var app = this;
   app.deleteId = {
    did: e
   }
   if (confirm("Do you really want to go?")) {
    app.axios.post('/api/case/archive_case', app.deleteId)
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
  	//getAllLawyers
  getAllLawyers(data) {
   var app = this;
   app.axios.get('/api/case/caselist')
    .then(function(resp) {

     if (resp.data.status == true) {
      app.caseList = resp.data.response;
     } else {
      app.notFound = resp.data.messages.join();
     }

    }).catch(function(resp) {});

  },
  //updateStatus
  updateStatus: function(e) {
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

