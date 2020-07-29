<template>
  <div class="myownStyle">
    <el-row class="container">
      <el-col :span="24" class="header">
        <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
          <div style="fontSize:20px;color:#000;color:#ffffff;background: #297aff;">云点播管理平台</div>
        </el-col>
        <el-col :span="4" class="userinfo">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner">
              <img src="../assets/download.jpg" /> {{sysUserName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item @click.native="goLinkCenter">个人中心</el-dropdown-item> -->
              <!-- <el-dropdown-item>设置</el-dropdown-item> -->
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-col>
      <el-col :span="24" class="main">
        <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router>
            <!-- 一级菜单 -->
            <template v-for="item in  $router.options.routes" v-if="!item.hidden">
              <el-submenu v-if="item.children && item.children.length" :index="item.path" :key="item.path" style="text-align: left;">
                <template slot="title">
                  <i :class="item.icon" style="margin-right: 10px;margin-left: 10px;"></i>
                  <span>{{item.name}}</span>
                </template>

                <!-- 二级菜单 -->
                <template v-for="itemChild in item.children" v-if="!itemChild.hidden">
                  <el-submenu v-if="itemChild.children && itemChild.children.length" :index="itemChild.path" :key="itemChild.path">
                    <template slot="title">
                      <i :class="itemChild.icon"></i>
                      <span style="margin-left:20px;">{{itemChild.name}}</span>
                    </template>

                    <!-- 三级菜单 -->
                    <el-menu-item v-for="itemChild_Child in itemChild.children" :index="itemChild_Child.path" :key="itemChild_Child.path" v-if="!itemChild_Child.hidden">
                      <i :class="itemChild_Child.icon"></i>
                      <span slot="title">{{itemChild_Child.name}}</span>
                    </el-menu-item>
                  </el-submenu>

                  <el-menu-item v-else :index="itemChild.path" :key="itemChild.path">
                    <i :class="itemChild.icon"></i>
                    <span slot="title" style="margin-left:20px;">{{itemChild.name}}</span>
                  </el-menu-item>
                </template>
              </el-submenu>

              <el-menu-item v-else :index="item.path" :key="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
          <!--导航菜单-->
          <!-- <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed" >
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf" v-bind:key="index">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" v-bind:key="index"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
          </el-menu>-->
        </aside>
        <section class="content-container">
          <div class="grid-content bg-purple-light" style="width: 95%;margin: 0 auto;">
            <!-- <el-col :span="24" class="breadcrumb-container">
              <strong class="title">{{$route.name}}</strong>
            </el-col>-->
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { refresh_state_admin } from "../servers/api";
import { fail } from "assert";

export default {
  data() {
    return {
      sysName: "PTFS后台管理",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      yureData:[]
    };
  },
  mounted() {
    var user = this.$cookies.get("adminuser");
    if (user) {
      // user = JSON.parse(user);
      this.sysUserName = user || "";
    }
    // if (this.$cookies.get("id")) {
    //   this.$router.push({
    //     path: "/user"
    //   });
    // }
   //this.queryInfo();
  },
  methods: {
    queryInfo() {
     
 
        //this.queryWarmupInfo();
         var _this = this;
        setInterval(() => {
               if (localStorage.getItem("WarmParam")) {
                    
          setTimeout(_this.queryWarmupInfo(), 0);
               }
       
        }, 20000);
      
    },
    //
    queryWarmupInfo() {
      let localparam = JSON.parse(localStorage.getItem("WarmParam"));
    this.yureData=localparam.url_name
  

      if(localparam.url_name.length!=0){
           let param = new Object();

      param.buser_id = localparam.buser_id;
      param.end_time = 0;
      param.order = 1;
      param.page = 0;
      param.refresh_type = -1;
      param.start_time = 0;
      param.state = -1;
      param.url = "";
      refresh_state_admin(param)
        .then(res => {
          let tempName = [];
          tempName = localparam.url_name;
          let temp = res.data.result;

          // debugger
          let resSussess = [];
          let resFail = [];
          let resProcessing = [];
          for (var k = 0; k < tempName.length; k++) {
            for (var i = 0; i < temp.length; i++) {
              if (temp[i].url_name == tempName[k]) {
                if (temp[i].state == 1) {
                  resSussess.push(temp[i].url_name)
                } else if (temp[i].state == 3) {
                  resFail.push(temp[i].url_name)
                } else if (temp[i].state == 0) {
                  resProcessing.push(temp[i].url_name)
                }
              }
            }
          }
          //     let test1=["杨国栋1","杨国栋3","杨国栋2"]
          // let test2=["杨国栋1"]
          // console.log(this.setdatas(test1,test2))
          // console.log(resSussess);
          // console.log(resFail);
          // console.log(resProcessing);
          if (resSussess.length!=0) {
            this.$notify({
              title: "预热成功",
              message: resSussess,
              type: "success",
            });
                 //  let temparr1=localparam.url_name
                 
            let temparr2=this.setdatas(this.yureData,resSussess)
            this.yureData=temparr2
            // let localparam1 = JSON.parse(localStorage.getItem("WarmParam"))
            //   localparam1.url_name=temparr2
            //   localStorage.setItem("WarmParam",JSON.stringify(localparam1) )

          }
          if (resFail.length!=0) {
            this.$notify({
              title: "预热失败",
              message: resFail,
              type: "error",
              offset: 100,
            });
            let temparr1=localparam.url_name
        

            let temparr2=this.setdatas(this.yureData,resFail)
             console.log(temparr2)
                         this.yureData=temparr2




           
          }
     
          if (resProcessing.length!=0) {
            // this.$notify({
            //   title: "预热中",
            //   message: resProcessing,
            //   type: "info",
            //   offset: 200,
            // });
            let temparr1=localparam.url_name
            let temparr2=this.setdatas(temparr1,resProcessing)
            console.log(this.yureData)
                       let localparam1 = JSON.parse(localStorage.getItem("WarmParam"))
              localparam1.url_name=this.yureData
            localStorage.setItem("WarmParam",JSON.stringify(localparam1) )
          }
      
          
          
        })
        .catch(error => {
          console.log(error)
        });

      }
   
    },
    setdatas(a,b) {
      return a.filter(function(item){
        return b.indexOf(item)==-1
      })
    
    },
    onSubmit() {},
    handleopen() {},
    handleclose() {},
    goLinkCenter() {
      this.$router.push({
        path: "/user_center",
      });
    },
    handleselect: function(a, b) {},
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          sessionStorage.removeItem("user");
          sessionStorage.removeItem("id");
          _this.$cookies.remove("adminuser");
          _this.$cookies.remove("adminid");
          _this.$cookies.remove("clouduser");
          localStorage.clear();
          // _this.$cookies.set("adminuser", "", 0);
          // _this.$cookies.set("adminid", "", 0);
          _this.$router.push("/");
        })
        .catch(error => {
          console.log(error);
        });
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
  },
};
</script>

<style scoped lang="scss">
// @import "../assets/css/style/newstyle";
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  .header {
    height: 60px;
    line-height: 60px;
    //	background: $color-primary;
    color: #000;
    background: #297aff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: #eef1924d;
      border-right-width: 1px;
      border-right-style: solid;
      background: #ffffff;
      img {
        width: auto;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 230px;
      background: #297aff;
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    // background: #324057;
    position: absolute;
    top: 60px;
    bottom: 0px;
    // overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
      .el-menu {
        height: 100%;
        text-align: center;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
      //margin-top: -60px;
    }
    .content-container {
      // background: #f1f2f7;
      //flex: 1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
      // overflow-y: scroll;
      //padding: 20px;
      .breadcrumb-container {
        //margin-bottom: 15px;
        float: none !important;
        .title {
          width: 200px;
          float: left;
          color: #ffffff;
          text-align: left;
          font-size: 22px;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        // background-color: #272731;
        box-sizing: border-box;
        // color: #ffffff;
      }
    }
  }
}

el-submenu {
  text-align: center;
}
</style>