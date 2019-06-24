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
						<th>Date</th>
						
						<th colspan="3"> ACTION </th>
					  </tr>	

					  <tr v-for="cases, index in caseList">
						<td>{{cases.id}}</td>
						<td>{{cases.title}}</td>
						<td>{{cases.description}}</td>
						<td><router-link :to="{path:'edit_lawyer',query:{id:cases.id}}">Edit</router-link></td>
						<td><span style="cursor:pointer;" @click="deleteCase(cases.id , index)">Delete</span> | 
						<span v-if="cases.status == true" style="cursor:pointer;" @click="updateStatus(cases.id , index)">De-actived</span>
						<span v-else style="cursor:pointer;" @click="updateStatus(cases.id , index)">Active</span></td>
					</tr>
			
				
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
			deleteId: {}
		}
	},
	created(){
				this.getAllLawyers();
			},
	methods: {
		deleteUser: function(e) {
				event.preventDefault();
				var app = this;
				app.deleteId = {did : e }
				if(confirm("Do you really want to delete?")) {
				app.axios.post('/api/user/delete_user',app.deleteId)
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
					app.caseList = resp.data.response;
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
