<template>
	<div class="sidebar">	
			<el-row class="menu_page">
				<el-col>
					<el-menu 
						mode="vertical" 
						class="el-menu-vertical-demo" 
						:collapse="collapse" 
						router
						:default-active="$route.path"						
						>
						<div class="wrapper" ref="wrapper">
							<Menu :items='items'/>
						</div>
					</el-menu>
				</el-col>	
			</el-row>		
	</div>
</template>

<script>
import Menu from "./Menu";
export default {
  name: "LeftMenu",
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-pie-chart",
          name: "概览",
          path: "/about"
        },      
        {
          icon: "el-icon-service",
          name: "融合通讯",
          path: "communication",
          children: [           
            {
              path: "/videoMonitor",
              name: "监控"
            },
            {
              path: "/meeting",
              name: "会议"
            },
			{
			  path: "/voiceCall",
			  name: "语音呼叫"
			},
			{
			  path: "/phone",
			  name: "电话"
			},
            {
              path: "/fax",
              name: "传真"
            },
			{
			  path: "/sms",
			  name: "短信"
			},
			
          ]
        }, 
	    {
	      icon: "el-icon-s-grid",
	      name: "系统配置",
	      path: "/system"
	    },
	    {
	      icon: "el-icon-position",
	      name: "心跳配置",
	      path: "/heartBeat"
	    },
      ],
    };
  },
  components: {
    Menu
  },
  /* watch:{
	  $route(){
		  console.log(this.$route.path);
	  }	  
  }, */
  methods:{
		/* initScroll() {
			this.scroll = new Bscroll(this.$refs.wrapper, {
			})
		} */
	},
	mounted() {
		/* this.$nextTick(() => {
			this.initScroll()
		}) */
	},
  created() {
	   /* this.nowPath = this.$route.path;
	   console.log(this.$route); */
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    /* bus.$on("collapse", msg => {
      this.collapse = msg;
    }); */
  }
};
</script>
<style scoped>
	/* .menu_page {
		position: fixed;
		top: 71px;
		left: 0;
		min-height: 100%;
		background-color: #324057;
		z-index: 99;	
	}
	.sidebar {
		position: relative;
		overflow: hidden;
	}
	.wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		min-height: 500px;
		overflow: hidden;
	}
	.sidebar::-webkit-scrollbar {
		width: 0;
	}

	.sidebar-el-menu:not(.el-menu--collapse) {
		width: 250px;
	}

	.el-menu {
		border: none;
		z-index: 9999;
	}

	.fa-margin {
		margin-right: 5px;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 180px;
		min-height: 400px;
	}

	.el-menu-vertical-demo {
		width: 49px;
	}

	.el-submenu .el-menu-item {
		min-width: 180px;
	}

	.hiddenDropdown,
	.hiddenDropname {
		display: none;
	}

	a {
		text-decoration: none;
	} */
</style>

