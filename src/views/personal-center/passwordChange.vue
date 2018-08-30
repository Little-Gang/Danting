/*
 * @Author: QiaoGang 
 * @Date: 2018-01-23 17:16:44 
 * @Last Modified by: QiaoGang
 * @Last Modified time: 2018-04-25 17:10:22
 */
<template>
  <div>
    <el-form ref="changepassForm" status-icon :model="changepassForm" :rules="rules">
      <el-form-item prop="oldPassword">
        <el-input class="elinput" auto-complete="off" placeholder="请输入旧密码" type="password" v-model="changepassForm.oldPassword" clearable></el-input><br>
      </el-form-item>
      <el-form-item prop="newPassword">
        <el-input class="elinput" auto-complete="off" placeholder="请输入新密码" type="password" v-model="changepassForm.newPassword" clearable></el-input><br>
      </el-form-item>
      <el-form-item prop="rePassword">
        <el-input class="elinput" auto-complete="off" placeholder="请再次输入新密码" type="password" v-model="changepassForm.rePassword" clearable></el-input><br>
      </el-form-item>
      <el-button type="primart" @click="submitForm('changepassForm')">确认修改</el-button><br>
    </el-form>
  </div>
</template>
<script>
import { userChangepass } from '../../api/personalInfo-page';
export default {
  data() {
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
    var checkPass2 = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('密码不能为空，您输入有误'));
      }
      setTimeout(() => {
        if (value.length < 6) {
          callback(new Error('密码不能低于六位，位数：' + value.length));
        } else {
          if (value == this.changepassForm.oldPassword) {
            callback(new Error('新旧密码不能一致'));
          } else {
            callback();
          }
        }
      }, 500);
    };
    var checknewPass = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('密码不能为空，您输入有误'));
      }
      setTimeout(() => {
        if (value !== this.changepassForm.newPassword) {
          callback(new Error('两次密码不一致,请重新输入'));
        } else {
          callback();
        }
      }, 500);
    };
    var newuserInfo = localStorage.getItem('userInfo'); //从本地取得用户信息并转换为json形式
    var userinfo = JSON.parse(newuserInfo);
    return {
      changepassForm: {
        userCode: userinfo.data.userEO.userCode,
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [{ validator: checkPass, trigger: 'blur,change' }],
        newPassword: [{ validator: checkPass2, trigger: 'blur,change' }],
        rePassword: [{ validator: checknewPass, trigger: 'blur,change' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          userChangepass(this.changepassForm)
            .then(data => {
              if (data.success) {
                alert(data.data.msg);
              } else {
                alert(data.data.msg);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log('输入验证有误');
          alert('输入验证未通过');
        }
      });
    }
  }
};
</script>
<style>
.el-button{
  text-align: center;
}
</style>