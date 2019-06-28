<template>

 <div class="left main-sidebar">
	<div class="sidebar-inner leftscroll">
		<div id="sidebar-menu">
			<ul>
					<li class="submenu" >
						<router-link to="/account"><span> Dashboard </span> </router-link>
					</li>
					<li class="submenu">
						<a href="javascript:void(0)" class="menu"><span>Lawyers</span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><router-link to="/lawyers">All Lawyers</router-link></li>
								<li><router-link to="/lawyers/add">Add Lawyer</router-link></li>
						</ul>
					</li>
					<li class="submenu">
						<a href="javascript:void(0)" class="menu"><span>Clients</span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><router-link to="/clients">All Clients</router-link></li>
								<li><router-link to="clients/add">Add Client</router-link></li>
							</ul>
					</li>
					<li class="submenu">
						<a href="javascript:void(0)" class="menu"><span>Cases</span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><router-link to="/cases">All Cases</router-link></li>
								<li><router-link to="/cases/add">Add Case</router-link></li>
							</ul>
					</li>
					<li class="submenu">
						<a href="javascript:void(0)" class="menu"><span> Settings </span> <span class="menu-arrow"></span></a>
							<ul class="list-unstyled" style="">
								<li><router-link to="/settings/update_password">Change Password</router-link></li>
								<li><router-link to="/settings/profile">Profile</router-link></li>
							</ul>
					</li>
			</ul>
			<div class="clearfix"></div>
		</div>
		<div class="clearfix"></div>
	</div>
</div>
</template>
<script>
	export default {
	  data () {
		return {
		 
		}
	},
	mounted() {
      $('.submenu').on('click', (evt) => {
          if(!$(evt.target).hasClass("subdrop")) {
		  // hide any open menus and remove all other classes
          $("ul",$(evt.target).parents("ul:first")).slideUp(350);
          $("a",$(evt.target).parents("ul:first")).removeClass("subdrop active");
          
		  // open our new menu and add the open class
          $(evt.target).next("ul").slideDown(350);
          $(evt.target).addClass("subdrop active");
          $(evt.target.nextElementSibling).css('display','block');
      
        }else if($(evt.target).hasClass("subdrop")) {
          $(evt.target).removeClass("subdrop active");
          $(evt.target).next("ul").slideUp(350);
 
        }
      });
   }
         
	}
</script>
