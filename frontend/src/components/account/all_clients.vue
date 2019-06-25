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
						<th>Name</th>
						<th>Email</th>
						<th colspan="3"> ACTION </th>
					  </tr>	
					<template v-if="notFount">
						<tr><td colspan="5" style="text-align:center;">{{notFount}}</td> </tr>
					</template>
					<template v-else>
						 <tr v-for="user, index in userList">
						<td>{{user.id}}</td>
						<td>{{user.name}}</td>
						<td>{{user.email}}</td>
						<td><router-link :to="{path:'edit_client',query:{id:user.id}}">Edit</router-link></td>
						<td><span style="cursor:pointer;" @click="deleteUser(user.id, index)">Delete</span> | 
						<span v-if="user.status == true" style="cursor:pointer;" @click="updateStatus(user.id, index)">Deactived</span>
						<span v-else style="cursor:pointer;" @click="updateStatus(user.id)">Active</span></td>
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
			userList: {},
			deleteId: {},
			notFount: ''
		}
	},
	created(){
				this.getAllLawyers();
			},
	methods: {
		deleteUser: function(e, index) {
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
			app.company_code = {cCode : getCode.company_code, type: 3};
			app.axios.post('/api/user/userlist',app.company_code)
				.then(function (resp) {
					if(resp.data.status == true) {
						app.userList = resp.data.response;
						}else {
						app.notFount = resp.data.messages.join();
					}
					
				}).catch(function (resp) {
				});
			
			},
			updateStatus:function(e, index) {
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
