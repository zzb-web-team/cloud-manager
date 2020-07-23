<template>
  <div class="Login">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <div class="title">云点播后台管理系统</div>
      <p style="text-align: left;margin: -10px 0 30px 0;color: #A9A9A9;">Welcome欢迎登录</p>
      <div style="border-bottom: 2px solid #ccc;padding: 10px 0;margin:20px 0;">
        <el-form-item prop="account" style="display:flex; margin-bottom: 0;" class="log_input">
          <img
            src="../assets/img/user.png"
            alt
            style="width:10%;display: inline-block; vertical-align: middle;"
          />
          <el-input
            type="text"
            v-model="ruleForm2.account"
            auto-complete="off"
            placeholder="请输入账号"
            class="login-form-input"
          ></el-input>
        </el-form-item>
      </div>
      <div style="border-bottom: 2px solid #ccc;padding: 10px 0;margin:20px 0;">
        <el-form-item prop="checkPass" style="display:flex; margin-bottom: 0;" class="log_input">
          <img
            src="../assets/img/pwd.png"
            alt
            style="width:10%;display: inline-block; vertical-align: middle;"
          />
          <el-input
            type="password"
            v-model="ruleForm2.checkPass"
            auto-complete="off"
            placeholder="请输入密码"
            class="login-form-input"
          ></el-input>
        </el-form-item>
      </div>

      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          round
          style="width:100%;margin-top:50px;"
          size="medium"
          @click.native.prevent="handleSubmit2"
        >登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
    <el-dialog title="谷歌验证" :visible.sync="recodecisbity" width="20%" customClass="recustomWidth" :show-close="false"  class="dialogactive">
			<el-form ref="ruleFormre" >
			
				<el-form-item prop="name" style="    display: flex;justify-content: center;">
					<el-input v-model="yzmcode" autocomplete="off" placeholder="验证码" maxlength="6"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer"   style="    display: flex;justify-content: center;">
				<el-button @click="nohand('ruleFormre')">取 消</el-button>
				<el-button type="primary" @click.native.prevent="rehandle">确 定</el-button>
			</div>
		</el-dialog>
  </div>
  
</template>

<script>
import { requestLoginOwn,qrcode,check_login } from "../servers/api";

//import NProgress from 'nprogress'
export default {
  data() {
    return {
      token:"",
      yzmcode:"",
      recodecisbity:false,
      logining: false,
      ruleForm2: {
        account: "",
        checkPass: ""
      },
      rules2: {
        account: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
          //{ validator: validaePass }
        ],
        checkPass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  mounted() {
    if (this.$cookies.get("adminid")) {
      this.$router.push({
        path: "/user"
      });
    }
  },
  methods: {
    //登陆校验code
    rehandle(){
      let param={

      }
      param.token=this.token
      param.code=this.yzmcode
      check_login(param).then(data=>{
        if(data.status==0){
                  sessionStorage.setItem("id", JSON.stringify(data.usermsg.id));
              sessionStorage.setItem("id", JSON.stringify(data.usermsg.username));
               data.usermsg.google=data.google
               data.usermsg.lvmsg=data.lvmsg
              this.$cookies.set("clouduser", JSON.stringify(data.usermsg), 7 * 24 * 60 * 60);
              this.$cookies.set("adminuser", data.usermsg.username, 7 * 24 * 60 * 60);
              this.$cookies.set("adminid", data.usermsg.id, 7 * 24 * 60 * 60);
              this.$router.push({
                path: "/user"
              });

        }
        else{
               this.$message({
                message: data.msg,
                type: "error"
              });

        }
      }).catch(error=>{

      })
    },
    //取消
    nohand(){
      this.recodecisbity=false
    },
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          };
          // this.$router.push({
          //   path: "/user"
          // });
          requestLoginOwn(loginParams).then(data => {
            this.logining = false;
            if(data.status==0){
                     sessionStorage.setItem("id", JSON.stringify(data.msg.id));
              sessionStorage.setItem("id", JSON.stringify(data.msg.username));
              data.msg.google=data.google
              data.msg.lvmsg=data.lvmsg
              this.$cookies.set("clouduser", JSON.stringify(data.msg), 7 * 24 * 60 * 60);
              this.$cookies.set("adminuser", data.msg.username, 7 * 24 * 60 * 60);
              this.$cookies.set("adminid", data.msg.id, 7 * 24 * 60 * 60);
              this.$router.push({
                path: "/user"
              });
            }
            else if(data.status==1){
              this.recodecisbity=true
              this.token=data.token
            }else if(data.status !==0){
                 this.$message({
                message: data.msg,
                type: "error"
              });
            }

            // if (data.status !== 0) {
            //   this.$message({
            //     message: data.msg,
            //     type: "error"
            //   });
            // } else {
            //   sessionStorage.setItem("id", JSON.stringify(data.msg.id));
            //   sessionStorage.setItem("id", JSON.stringify(data.msg.username));
            //   console.log( JSON.stringify(data.msg))
            //   this.$cookies.set("clouduser", JSON.stringify(data.msg), 7 * 24 * 60 * 60);
            //   this.$cookies.set("adminuser", data.msg.username, 7 * 24 * 60 * 60);
            //   this.$cookies.set("adminid", data.msg.id, 7 * 24 * 60 * 60);
            //   this.$router.push({
            //     path: "/user"
            //   });
            // }
          });
        } else {
          console.log("error !!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.Login {
  .dialogactive{
  
    .el-dialog{
      padding-right: 0px;
    }

  }
  background: url(../assets/img/login.png);
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  .el-form {
    .el-form-item {
      .el-form-item__content {
        width: 100%;
      }
    }
  }
}

.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  background-clip: padding-box;
  margin: auto;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  position: fixed;
  top: 50%;
  margin-top: -242px;
  right: 15%;
  width: 394px;
  height: 484px;

  .title {
    width: 394px;
    text-align: left;
    height: 92px;
    font-size: 34px;
    font-family: Alibaba PuHuiTi;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 92px;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
