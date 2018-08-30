/*
 * @Author: QiaoGang 
 * @Date: 2018-01-25 09:57:42 
 * @Last Modified by: QiaoGang
 * @Last Modified time: 2018-04-27 15:23:19
*/
<template>
  <div>
    <el-form class="assignWorkform" ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="作业名称" prop="assignmentName">
        <el-input class="workName" v-model="form.assignmentName" placeholder="请输入作业名称"></el-input>
      </el-form-item>
      <el-form-item label="发布对象" prop="selectClass">
        <el-select class="selectObject" v-model="form.className" value-key="code" placeholder="请选择被通知班级">
          <el-option v-for="item in classes" :key="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="截止时间" prop="finishTime">
        <el-date-picker class="dataPicker" type="date" placeholder="选择日期" v-model="form.finishTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="作业内容" prop="content">
        <el-input class="content" type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="附件">
        <el-upload class="upload-demo" ref="upload" action="" :on-change="filetrans" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">发布</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { subWorkform } from '../../api/assignWork-page';
import { subWorkfile } from '../../api/assignWork-page';
import { getSelectclass } from '../../api/assignWork-page';
export default {
  data() {
    var checkEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('此栏不能为空，您输入有误'));
      } else {
        callback();
      }
    };
    return {
      form: {
        assignmentName: '',
        className: '',
        finishTime: '',
        content: '',
        createBy: ''
      },
      classes: [],
      fileList: [],
      form2: '',
      rules: {
        assignmentName: [{ validator: checkEmpty, trigger: 'blur' }],
        selectClass: [{ validator: checkEmpty, trigger: 'blur' }],
        finishTime: [{ validator: checkEmpty, trigger: 'blur' }],
        content: [{ validator: checkEmpty, trigger: 'blur' }]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          subWorkform(this.form)
            .then(data => {
              if (data.success) {
                console.log(data);
                subWorkfile(this.form2, data.data.assignmentId)
                  .then(data => {
                    if (data.success) {
                      alert(data.message);
                      console.log(data.message + 'file');
                    } else {
                      alert(data.message);
                      console.log(data.message);
                    }
                  })
                  .catch(error => {
                    console.log(error);
                  });
                console.log(data.message + 'work');
              } else {
                console.log(data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log('error!');
        }
      });
    },
    filetrans(file, fileList) {
      let data = new FormData();
      data.append('file', file.raw);
      this.form2 = data;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
  created() {
    var newuserInfo = localStorage.getItem('userInfo'); //从本地取得用户信息并转换为json形式
    var userinfo = JSON.parse(newuserInfo);
    this.form.createBy = userinfo.data.userEO.userCode;
    console.log(userinfo);
    console.log(userinfo.data.userEO.userCode);
    getSelectclass(userinfo.data.userEO.userCode)
      .then(data => {
        if (data.success) {
          this.classes = data.data;
          console.log(this.classes);
        } else {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
.workName {
  width: 70%;
  float: center;
}
.el-button {
  text-align: center;
}
.selectObject {
  float: center;
  width: 70%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 70%;
}
.dataPicker {
  width: 70%;
  float: center;
}
.content {
  padding: 0%;
  width: 70%;
  float: center;
}
.assignWorkform {
  line-height: 30px;
}
</style>