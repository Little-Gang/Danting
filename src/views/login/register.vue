//createdBy QiaoGang 2017-1-19
<template>
  <div class="page-signin">
    <el-container>
      <p class="pagetitle">学生作业管理系统</p>
      <el-main class="login-main">
        <div class="login-card">
          <p class="formtitle">修改密码</p>
          <el-form ref="changeForm" status-icon :model="changeForm" :rules="rules">
            <el-form-item prop="userCode">
              <el-input class="elinput" auto-complete="off" placeholder="请输入账号" v-model="changeForm.userCode" clearable></el-input>
              <el-button type="text" @click="submitUsercode('changeForm')">获取验证码</el-button>
            </el-form-item>
            <el-form-item prop="validationCode	">
              <el-input class="elinput" auto-complete="off" placeholder="请输入验证码" type="text" v-model="changeForm.validationCode" clearable></el-input><br>
            </el-form-item>
            <el-button type="primart" @click="submitForm('changeForm')">确认修改</el-button><br>
            <router-link to="/">
              <el-button type="text">返回登录</el-button>
            </router-link>
          </el-form>
        </div>
      </el-main>
      <el-footer class="login-footer"></el-footer>
    </el-container>
  </div>
</template>
<script>
import { userChangepass } from '../../api/register-page';
import { getChecknum } from '../../api/register-page';
export default {
  name: 'register',
  data() {
    var checkJobid = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空，您输入有误'));
      } else {
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('验证码不能为空，您输入有误'));
      }else{
        callback();
      }
    };
    return {
      changeForm: {
        userCode:'',
        validationCode:''
      },
      rules: {
        userCode: [{ validator: checkJobid, trigger: 'blur' }],
        validationCode	: [{ validator: checkPass, trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      //valid是字段检验有效判断返回true和false
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.changeForm)
          userChangepass(this.changeForm)
            .then(data => {
              console.log(data);
              if (data.data.result) {
                this.$router.push('/index')
              } else {
                alert(data.data.msg)
              }
            }).catch(error => {
              console.log(error)
            })
        }else{
          console.log('输入验证有误');
          alert('输入验证未通过');
        }
      });
    },
    submitUsercode(formName){
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('开始传用户名给后台');
          getChecknum(this.changeForm.userCode).then(data => {
            console.log(data);
            if (data.data.result) {
              alert(data.data.msg);
            } else {
              alert(data.data.msg);              
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          alert('输入有误!')
        }
      })
    }
  }
};
</script>
<style>
.page-signin {
  background-color: #303437;
  height: 100%;
}
.login-main {
  background-color: #303437;
  line-height: 50px;
  align-self: center;
}
.login-footer {
  background-color: #303437;
}
.login-title {
  font-family: sans-serif;
  color: white;
  font-size: 55px;
}
.pagetitle {
  font-family: sans-serif;
  color: white;
  font-size: 55px;
  width: 500px;
  align-self: center;
}
.login-card {
  background-color: white;
  height: 350px;
  width: 400px;
  border-radius: 25px 25px 25px 25px;
}
.id {
  background-color: bisque;
}
.elinput {
  max-width: 200px;
  line-height: 20px;
}
.formtitle {
  height: 50px;
  width: 250px;
  text-align: left;
  padding: 20px 0px 0px 50px;
  font-size: 20px;
}
.el-button {
  width: 200px;
}
.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 65px;
}
</style>