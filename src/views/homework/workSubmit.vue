/*
 * @Author: QiaoGang 
 * @Date: 2018-01-24 14:25:11 
 * @Last Modified by: QiaoGang
 * @Last Modified time: 2018-04-03 10:20:12
*/
<template>
  <div>
    <el-form ref="form">
      <el-form-item label="教师名称">
        <el-input v-model="form.teacherName"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="selectClass">
        <el-select v-model="form.state" value-key="code" placeholder="请选择状态">
          <el-option v-for="item in states" :key="item.key" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间" prop="startTime">
        <el-date-picker class="dataPicker" type="date" placeholder="选择日期" v-model="form.createOnFrom"></el-date-picker>至
        <el-date-picker class="dataPicker" type="date" placeholder="选择日期" v-model="form.createOnTo"></el-date-picker>
      </el-form-item>
      <el-form-item label="截止时间" prop="finishTime">
        <el-date-picker class="dataPicker" type="date" placeholder="选择日期" v-model="form.finishTime"></el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="findWork(form)">查询</el-button>
    </el-form>
    <el-table :data="workList" style="width: 100%">
      <el-table-column label="作业名" width="180" align="left">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.assignmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布人" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.teacherName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state }}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止时间" width="180" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>发布时间: {{ scope.row.createOn }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.finishTime }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="分数" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editFormVisible = true;editData(scope.row)">查看</el-button>
          <el-dialog title="作业详情" :visible.sync="editFormVisible">
            <el-form :model="answerForm">
              <el-form-item label="作业内容" :label-width="formLabelWidth">
                <el-input v-model="workcontent" type="textarea" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="答案" :label-width="formLabelWidth">
                <el-input v-model="answerForm.answer" type="textarea" auto-complete="off"></el-input>
              </el-form-item>
              <el-button type="info" @click="download()">下载作业附件</el-button>
              <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="filetrans" :file-list="fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>
              </el-upload>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editFormVisible = false">取 消</el-button>
              <el-button type="primary" @click='submitAnform(answerForm)'>提交</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small layout="total,prev, pager, next" :total="this.total" :page-size="5" @current-change="changepage">
    </el-pagination>
  </div>
</template>
<script>
import {
  selectHomework,
  downloadFile,
  uploadFile,
  submitAnswer,
  viewDetail
} from '../../api/workSubmit-page';
export default {
  data() {
    return {
      formLabelWidth: '120px',
      editFormVisible: false,
      workcontent: '',
      page: '',
      currentPage: '',
      total: 0,
      fileList: [],
      states: [
        {
          key: 1,
          value: '已完成'
        },
        {
          key: 2,
          value: '未完成'
        }
      ],
      workList: [],
      form: {
        page: '',
        size: '5',
        studentCode: '',
        teacherName: '',
        state: '',
        createOnFrom: '',
        createOnTo: '',
        finishTime: ''
      },
      form2: {
        studentAssignmentId: '',
        file: ''
      },
      answerForm: {
        studentCode: '',
        assignmentId: '',
        answer: ''
      }
    };
  },
  created() {
    var newuserInfo = localStorage.getItem('userInfo'); //从本地取得用户信息并转换为json形式
    var userinfo = JSON.parse(newuserInfo);
    this.form.studentCode = userinfo.data.userEO.userCode;
    this.answerForm.studentCode = this.form.studentCode;
    console.log('这个学生code' + this.answerForm.studentCode);
  },
  methods: {
    //页码改变时调用的方法
    changepage(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.page = val - 1;
      this.form.page = this.page;
      selectHomework(this.form)
        .then(data => {
          if (data.success) {
            this.workList = data.data.content;
            this.total = data.data.totalElements;
            console.log(data.message);
          } else {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editData(data) {
      console.log(data);
      this.answerForm.assignmentId = data.assignmentId;
      this.form2.studentAssignmentId = data.studentAssignmentId;
      viewDetail(data.assignmentId)
        .then(data => {
          if (data.success) {
            console.log(data.message);
            this.workcontent = data.data.content;
          } else {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    findWork(formName) {
      console.log(formName);
      selectHomework(formName)
        .then(data => {
          if (data.success) {
            console.log(data);
            console.log(data.message);
            this.total = data.data.totalElements;
            this.workList = data.data.content;
            console.log(this.workList);
          } else {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitAnform(formName) {
      submitAnswer(this.answerForm)
        .then(data => {
          if (data.success) {
            this.editFormVisible = false;
            console.log(data.message);
          } else {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    download() {
      downloadFile(this.answerForm.assignmentId)
        .then(data => {
          window.open(
            'http://37.220.51.216:8080/StudentAssignmentController/downloadFile?assignmentId=' +
              this.answerForm.assignmentId,
            '_blank'
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    upload() {
      uploadFile(this.form2.file, this.form2.studentAssignmentId)
        .then(data => {
          if (data.success) {
            alert(data.message);
          } else {
            alert(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    filetrans(file, fileList) {
      let data = new FormData();
      data.append('file', file.raw);
      this.form2.file = data;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style>
.el-button{
  text-align: center;
}
</style>