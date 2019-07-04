<template>
	<div>
	<section class="login-sec">
		<div class="container">
			<div class="row">
				<div class="col-md-8 offset-md-2">
				   <div class="login-page">
						<h3>Email Confirmation</h3>
						<div class="login-form">
							<h2 v-if="successMessage">{{successMessage}}</h2>
							<br>
					   </div>
               </div>
            </div>
        </div>
    </div>
</section>
	</div>
</template>

<script>

export default {
 //name: 'ConfirmEmail',
 data() {
  return {
   confirmEmail: '',
   successMessage: '',
   errorMessage: '',
  }
 },
 mounted() {

  var app = this;
  app.confirmEmail = {
   confirm_token: this.$route.query.confirm_token
  }
  app.axios.post('/api/users/confirm_email', app.confirmEmail)
   .then(function(resp) {
    if (resp.data.status == true) {
     app.successMessage = resp.data.messages.join();
    } else {
     app.successMessage = resp.data.messages.join();
    }
   }).catch(function(resp) {

    app.successMessage = resp.data.message;
   });
 }

}
</script>
