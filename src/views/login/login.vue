//createdBy QiaoGang 2017-1-18
<template>
  <div class="page-signin">
    <el-container>
      <p class="pagetitle">学生作业管理系统</p>
      <div class="login-main">
        <div class="login-card">
          <p class="formtitle">用户登录</p>
          <el-form ref="form" status-icon :model="form" :rules="rules">
            <el-form-item prop="userCode">
              <el-input class="elinput" auto-complete="off" placeholder="请输入帐号" v-model="form.userCode" clearable></el-input><br>
            </el-form-item>
            <el-form-item prop="password">
              <el-input class="elinput" auto-complete="off" placeholder="请输入密码" type="password" v-model="form.password" clearable></el-input><br>
            </el-form-item>
            <el-button class="button" type="primart" @click="submitForm('form')">登录</el-button><br>
            <el-button class="button" type="primart" @click="toRegister()">修改密码</el-button><br>

            <!-- <router-link to="/register">
            修改密码
            </router-link> -->
          </el-form>
        </div>
      </div>
      <el-footer class="login-footer" style='height：0px;'></el-footer>
    </el-container>
  </div>
</template>

<script>
import { userLogin } from '../../api/login-page';
export default {
  name: 'signin',
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
        callback(new Error('密码不能为空，您输入有误'));
      }
      setTimeout(() => {
        if (value.length < 6) {
          callback(new Error('密码不能低于六位，位数：' + value.length));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      form: {
        userCode: '',
        password: ''
      },
      rules: {
        userCode: [{ validator: checkJobid, trigger: 'blur' }],
        password: [{ validator: checkPass, trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      //valid是字段检验有效判断返回true和false
      this.$refs[formName].validate(valid => {
        if (valid) {
          userLogin(this.form).then(data => {
            console.log(data);
            if (data.success) {
              var userData = JSON.stringify(data);
              localStorage.setItem('userInfo', userData);
              console.log('local存储：' + localStorage.getItem('userInfo'));
              var userpwd = JSON.stringify(this.form);
              localStorage.setItem('token', userpwd);
              console.log('local存储：' + localStorage.getItem('token'));
              this.$router.push('/firstView');
              console.log(data.message);
            } else {
              console.log(data.message);
              alert(data.message);
            }
          });
        } else {
          console.log('error submit!!');
          alert('error submit!!');
          return false;
        }
      });
    },
    toRegister() {
      this.$router.push({name: 'register'});
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
/* .login-footer {
  background-color: #303437!important;
} */
.el-footer {
 background-color: #303437!important;
}
.button {
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