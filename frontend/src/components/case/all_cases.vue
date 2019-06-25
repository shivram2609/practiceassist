<template>
	<div class="container-fluid">
				
        <div class="col-md-11">
            <div class="card">
					<div class="card-header">
					</div>
					<div class="card-body">
						 <table class="Marchant-table table table-bordered " width="100%">
					  <tr>		
						<th>S.no</th>
						<th>Case Name</th>
						<th>Description</th>
						<th colspan="3"> ACTION </th>
					  </tr>	
		
					 <template v-if="notFound">
						<tr><td colspan="4" style="text-align:center">{{notFound}}</td></tr>
					</template>
					<template v-else>
						 <tr v-for="cases, index in caseList">
						<td>{{cases.id}}</td>
						<td>{{cases.title}}</td>
						<td>{{cases.description}}</td>
						<td><router-link :to="{path:'edit_case',query:{id:cases.id}}">Edit</router-link> |
						 <span style="cursor:pointer;" @click="deleteCase(cases.id , index)">Delete</span>
						</td>
					</tr>
					</template>
				
					</table>
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
			caseList: {},
			deleteId: {},
			notFound: ''
		}
	},
	created(){
				this.getAllLawyers();
			},
	methods: {
		deleteCase: function(e) {
				event.preventDefault();
				var app = this;
				app.deleteId = {did : e }
				if(confirm("Do you really want to delete?")) {
				app.axios.post('/api/case/delete_case',app.deleteId)
				.then(function (resp) {
					app.getAllLawyers();
					app.$notify({text:resp.data.messages.join(),type: resp.data.status ? 'success' : 'error',duration:1000,speed:3000});
					
				}).catch(function (resp) {
					app.$notify({text: resp.message,type: 'error',duration:1000,speed:3000});
				});
			}
				
		},
		getAllLawyers(data) {
			var app = this;
			app.axios.get('/api/case/caselist')
				.then(function (resp) {
				
					if(resp.data.status == true) {
						app.caseList = resp.data.response;
						}else {
						app.notFound = resp.data.messages.join();
					}
					
				}).catch(function (resp) {
				});
			
			},
			updateStatus:function(e) {
				event.preventDefault();
				var app = this;
				var statusCode = {status:e}
				if(confirm("Do you really want to update?")) {
				app.axios.post('/api/user/update_status',statusCode)
				.then(function (resp) {
					
					app.getAllLawyers();
					app.$notify({text:resp.data.messages.join(),type: resp.data.status ? 'success' : 'error',duration:1000,speed:3000});
					
				}).catch(function (resp) {
					app.$notify({text: resp.message,type: 'error',duration:1000,speed:3000});
				});
			}
			}
		
	}
}

</script>
