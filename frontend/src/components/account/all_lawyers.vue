<template>
	<div class="container-fluid">
				
        <div class="col-md-11">
            <div class="card">
					<div class="card-header">
						<router-link to="add_lawyer" class="btn btn-primary">Add Lawyer</router-link>
					</div>
					<div class="card-body">
						 <table class="Marchant-table table table-bordered " width="100%">
					  <tr>		
						<th>S.no</th>
						<th>Name</th>
						<th>Email</th>
						<th>Date</th>
						
						<th colspan="3"> ACTION </th>
					  </tr>	

					  <tr v-for="user, index in userList">
						<td>{{user.id}}</td>
						<td>{{user.name}}</td>
						<td>{{user.email}}</td>
						<td><router-link :to="{path:'edit_lawyer',query:{id:user.id}}">Edit</router-link></td>
						<td><span style="cursor:pointer;" @click="deleteUser(user.id , index)">Delete</span> | 
						<span v-if="user.status == true" style="cursor:pointer;" @click="updateStatus(user.id , index)">De-actived</span>
						<span v-else style="cursor:pointer;" @click="updateStatus(user.id , index)">Active</span></td>
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
			userList: {},
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
			var getCode = JSON.parse(localStorage.getItem('user'));
			app.company_code = {cCode : getCode.company_code, type: 2};
			app.axios.post('/api/user/userlist',app.company_code)
				.then(function (resp) {
					app.userList = resp.data.response;
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
