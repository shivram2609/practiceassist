<template>
 <div class="container-fluid">
                <div class="dasboard">
                    <h2>Dashboard</h2>
                </div>   <div class="row">   
                            <div class="col-md-5 offset-md-1">
                                    <div class="notifications">
                                        <div class="calender-notification">
                                            <span><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                        </div>
                                <h3>Calendar Notifications</h3>
                                <p>Next Hearing Date:<span> 4-04-2019</span></p>
                            </div>
                        </div>
                        <div class="col-md-5">
                                <div class="notifications date-creations">
                                    <div class="calender-notification">
                                        <span><i class="fa fa-file-text-o" aria-hidden="true"></i></span>
                                    </div>
                            <h3>Invoice Notifications</h3>
                            <p>Invoice Name:<span> lawyerscarsdoc</span></p>
                            <p>Created Date:<span> 4-04-2019</span></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                	 <div class="col-md-10 offset-md-1">
                        <div class="doc-notification">
                            <h3><i class="fa fa-file-text-o" aria-hidden="true"></i> Document Notifications</h3>
                            <ul>
                                <li>Document Name:<span> lawyerscarsdoc</span></li>
                                <li>Created By:<span> Lawyer askwasi</span></li>
                                <li>Created Date:<span> 4-04-2019</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
			<!-- END container-fluid -->
</template>
<script>
	export default {
	  //name: 'Account',
	  data () {
		return {
		  msg: 'Welcome to Your Vue.js App'
		}
	  }
	}
</script>
