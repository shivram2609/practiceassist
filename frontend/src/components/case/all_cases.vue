<template>

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
									<div v-if="caseList.cases.length > 0">
										<b-card no-body class="mb-1" v-for="user, index in caseList.cases">
											  <b-card-header header-tag="header" class="p-1 card-header collapsed" role="tab">
												<b-button block href="#" v-b-toggle="'accordion-' + index" variant="custom-info" class="card-title">
												<p>{{user.title}}</p>
												<router-link class="pull-right" :to="{path:'/cases/edit',query:{id:user.id}}">Edit</router-link>
												<span class="pull-right" @click="deleteCase(user.id , index)">Delete</span>
												<span class="pull-right" @click="archiveCase(user.id , index)">Archive</span>
												</b-button>
											  </b-card-header>
						
												<b-collapse :id="'accordion-'+ index" accordion="my-accordion" role="tabpanel">
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
											<div v-else>
											<b-alert show variant="warning" class="text-center">No record found!</b-alert>
											</div>
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
										<div v-if="caseList.archived.length > 0">
										<b-card no-body class="mb-1" v-for="user, index in caseList.archived">
											  <b-card-header header-tag="header" class="p-1 card-header collapsed" role="tab">
												<b-button block href="#" v-b-toggle="'accordion-' + index" variant="custom-info" class="card-title">
												<p>{{user.title}}</p>
												</b-button>
											  </b-card-header>
												<b-collapse :id="'accordion-'+ index" accordion="my-accordion" role="tabpanel">
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
											<div v-else>
											<b-alert show variant="warning" class="text-center">No record found!</b-alert>
											</div>
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
   caseList: '',
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
    app.axios.post('/api/cases/destroy', app.deleteId)
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
    app.axios.post('/api/cases/archive_case', app.deleteId)
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
   app.axios.get('/api/cases')
    .then(function(resp) {
      app.caseList = resp.data.response;
    }).catch(function(resp) {});

  },


 }
}

</script>
<style>
a.btn.btn-custom-info {
    background-color: #012b58;
    color: #fff;
}
</style>

