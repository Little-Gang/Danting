/*
 * @Author: QiaoGang 
 * @Date: 2018-01-24 14:24:58 
 * @Last Modified by: QiaoGang
 * @Last Modified time: 2018-04-27 15:41:48
 */
<template>
  <div>
    <el-table :data="workListbytech" style="width: 100%">
      <el-table-column label="作业名" width="180" align="left">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.assignmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="dialogStudent = true;editData(scope.row)">详情</el-button>
          <el-dialog title="学生作业" :visible.sync="dialogStudent" center>
            <el-table :data="studentList" style="width: 100%">
              <el-table-column label="学生名" width="180" align="left">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.studentName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column label="操作" align="right">
                <template slot-scope="scope">
                  <el-button size="mini" @click="dialogWork = true;viewData(scope.row)">查看</el-button>
                  <el-dialog title="作业详情" :visible.sync="dialogWork" append-to-body>
                    <el-form :model="workForm">
                      <el-form-item label="作业内容" :label-width="formLabelWidth2">
                        <el-input type="textarea" v-model="workForm.content" auto-complete="off" :disabled="true"></el-input>
                      </el-form-item>
                      <el-form-item label="答案" :label-width="formLabelWidth2">
                        <el-input type="textarea" v-model="workForm.answer" auto-complete="off" :disabled="true"></el-input>
                      </el-form-item>
                      <el-form-item label="评分" :label-width="formLabelWidth2">
                        <el-input type="number" v-model="gradeForm.score" auto-complete="off"></el-input>
                      </el-form-item>
                      <el-button @click="downloadFile(workForm.fileName)">下载附件</el-button>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button type="primary" @click="submitScore()">确 定</el-button>
                      <el-button @click="dialogWork = false">取 消</el-button>
                    </div>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogStudent = false">取 消</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small layout="total,prev, pager, next" :total="this.total1" :page-size="5" @current-change="changepage1">
    </el-pagination>
  </div>
</template>
<script>
import {
  getListbytechid,
  downstudentFile,
  checkAssignment,
  getListbyworkid,
  gradeWork
} from '../../api/jobView-page';
export default {
  data() {
    return {
      formLabelWidth: '120px',
      formLabelWidth2: '100px',
      dialogStudent: false,
      dialogWork: false,
      studentList: [],
      workListbytech: [],
      currentPage1: '', //作业当前页
      total1: 0, //作业总数据条数
      page1: '', //作业总页数
      // currentPage2: '', //学生当前页
      // total2: 0, //学生总数据条数
      // page2: '', //学生总页数
      //老师信息表单
      form: {
        page: '',
        size: 5,
        teacherCode: ''
      },
      //学生作业信息表单
      studentForm: {
        page: '',
        size: 1000,
        assignmentId: ''
      },
      //作业详情表单
      workForm: {
        content: '',
        studentAssignmentId: '',
        answer: '',
        fileName: '',
        studentName: ''
      },
      //成绩表单
      gradeForm: {
        score: '',
        studentAssignmentId: ''
      }
    };
  },
  methods: {
    editData(data) {
      console.log(data);
      this.studentForm.assignmentId = data.assignmentId;
      getListbyworkid(
        this.studentForm.page,
        this.studentForm.size,
        this.studentForm.assignmentId
      )
        .then(data => {
          if (data.success) {
            console.log('根据作业id查找完成');
            this.studentList = data.data.content;
            this.total2 = data.data.totalElements;
          } else {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    viewData(data) {
      console.log(data);
      this.workForm.content = data.content;
      this.workForm.answer = data.answer;
      this.workForm.fileName = data.fileName;
      this.workForm.studentName = data.studentName;
      this.workForm.studentAssignmentId = data.studentAssignmentId;
      this.gradeForm.studentAssignmentId = data.studentAssignmentId;
    },
    submitScore() {
      gradeWork(this.gradeForm.score, this.gradeForm.studentAssignmentId)
        .then(data => {
          if (data.success) {
            this.dialogWork = false;
            console.log(data.message);
          } else {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadFile(fileName) {
      downstudentFile(fileName)
        .then(data => {
          window.open('http://37.220.51.216:8080/CheckAssignmentController/downloadFile?fileName='+fileName,'_blank')
         }
        )
        .catch(error => {
          console.log(error);
        });
    },
    //作业页码改变时调用的方法
    changepage1(val) {
      console.log(`当前页: ${val}`);
      this.currentPage1 = val;
      this.page1 = val - 1;
      this.form.page = this.page1;
      getListbytechid(this.form.page, this.form.size, this.form.teacherCode)
        .then(data => {
          if (data.success) {
            console.log('根据老师id查作业成功');
            this.workListbytech = data.data.content;
            this.total1 = data.data.totalElements;
          } else {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    //学生页码改变时调用的方法
    changepage2(val) {
      console.log(`当前页: ${val}`);
      this.currentPage2 = val;
      this.page2 = val - 1;
      this.studentForm.page = this.page2;
      getListbyworkid(
        this.studentForm.page,
        this.studentForm.size,
        this.studentForm.assignmentId
      )
        .then(data => {
          if (data.success) {
            console.log('根据作业id查找完成');
            this.studentList = data.data.content;
          } else {
            console.log(data.message);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  created() {
    var newuserInfo = localStorage.getItem('userInfo'); //从本地取得用户信息并转换为json形式
    var userinfo = JSON.parse(newuserInfo);
    this.form.teacherCode = userinfo.data.userEO.userCode;
    console.log('test');
    getListbytechid(this.form.page, this.form.size, this.form.teacherCode)
      .then(data => {
        if (data.success) {
          console.log('根据老师id查作业成功');
          this.total1 = data.data.totalElements;
          this.workListbytech = data.data.content;
        } else {
          console.log(data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
<style>
.el-button{
  text-align: center;
}
</style>