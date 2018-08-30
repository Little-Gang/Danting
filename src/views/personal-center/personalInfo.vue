/*
 * @Author: QiaoGang 
 * @Date: 2018-01-23 17:19:26 
 * @Last Modified by: QiaoGang
 * @Last Modified time: 2018-04-25 15:26:18
 */
<template>
  <div>
    <el-form class="infoForm" ref="Form" :model="Form" :rules="rules">
      <el-form-item label="用户名">
        <el-input v-model="Form.userCode" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="Form.name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="Form.sex" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="Form.age" clearable></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="Form.phone" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="Form.email" clearable></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="Form.address" clearable></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm('Form')">修改</el-button>
    </el-form>
  </div>
</template>
<script>
import { userChangeinfo, getUserInfo } from '../../api/personalInfo-page';
export default {
  name: 'test',
  data() {
    var checkAge = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入年龄'));
      } else {
        if (value >= 1 || value <= 99) {
          callback();
        } else {
          callback(new Error('请输入正确年龄'));
        }
      }
    };
    var checkAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入地址'));
      } else {
        callback();
      }
    };
    var checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入邮箱'));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入电话号码'));
      } else {
        if (value.length < 7 || value.length > 11) {
          callback(new Error('请输入正确电话号码：' + value.length));
        } else {
          callback();
        }
      }
    };
    var newuserInfo = localStorage.getItem('userInfo'); //从本地取得用户信息并转换为json形式
    console.log('personalInfo页面的userinfo:' + newuserInfo);
    var userinfo = JSON.parse(newuserInfo);
    console.log(userinfo);
    console.log(userinfo.data.userEO.userCode);
    return {
      Form: {
        userCode: userinfo.data.userEO.userCode,
        name: userinfo.data.userEO.name,
        sex: userinfo.data.userEO.sex,
        age: userinfo.data.userEO.age,
        phone: userinfo.data.userEO.phone,
        email: userinfo.data.userEO.email,
        address: userinfo.data.userEO.address
      },
      rules: {
        age: [{ validator: checkAge, trigger: 'blur' }],
        phone: [{ validator: checkPhone, trigger: 'blur' }],
        email: [{ validator: checkEmail, trigger: 'blur' }],
        address: [{ validator: checkAddress, trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          userChangeinfo(this.Form)
            .then(data => {
              if (data.success) {
                console.log(data.message);
                getUserInfo(this.Form.userCode)
                  .then(data => {
                    var userData = JSON.stringify(data);
                    localStorage.setItem('userInfo', userData);
                    console.log(
                      'local存储test：' + localStorage.getItem('userInfo')
                    );
                  })
                  .catch(error => {
                    console.log(error);
                  });
                alert(data.message);
              } else {
                console.log(data.success);
                alert(data.message);
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
.infoFome {
  height: 100%;
  width: 50%;
}
.el-button{
  text-align: center;
}
</style>