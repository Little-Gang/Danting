/*
 * @Author: ChenYu QiaoGang
 * @Date: 2018-01-24 15:32:30 
 * @Last Modified by: QiaoGang
 * @Last Modified time: 2018-04-03 10:17:55
 */
<template>
  <div>
    <el-form>
      <el-form-item label="专业">
        <el-input v-model="form.subject"></el-input>
      </el-form-item>
      <el-form-item label="年级">
        <el-input v-model="form.grade"></el-input>
      </el-form-item>
      <el-button type="primary" @click="findClass(form)">查询</el-button>
      <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="primary" @click="dialogByExcel = true">批量导入</el-button>
      <el-dialog :visible.sync="dialogByExcel">
        <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="filetrans" :file-list="fileList" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器</el-button>
        </el-upload>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogByExcel = false">取 消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="新增班级" :visible.sync="dialogFormVisible">
        <el-form :model="addform">
          <el-form-item label="名称" :label-width="formLabelWidth">
            <el-input v-model="addform.className" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年级" :label-width="formLabelWidth">
            <el-input v-model="addform.grade" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业" :label-width="formLabelWidth">
            <el-input v-model="addform.subject" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click='submitaddClass(addform)'>确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" width="180" align="left">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.classId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>名称: {{ scope.row.name }}</p>
            <p>code: {{ scope.row.monitorCode }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editFormVisible = true;editData(scope.row)">编辑</el-button>
          <el-dialog title="修改班级" :visible.sync="editFormVisible">
            <el-form :model="editform">
              <el-form-item label="班级id" :label-width="formLabelWidth">
                <el-input v-model="editform.classId" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="editform.className" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editFormVisible = false">取 消</el-button>
              <el-button type="primary" @click='changeClass(editform)'>确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="delClass(scope.row.classId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small layout="total,prev, pager, next" :total="this.total" :page-size="5" @current-change="changepage">
    </el-pagination>
  </div>
</template>
<script>
import {
  selectClass,
  addClass,
  delateClass,
  editClass,
  addClassesByEx
} from '../../api/manage-page';
export default {
  data() {
    return {
      dialogFormVisible: false,
      editFormVisible: false,
      dialogByExcel: false,
      formLabelWidth: '120px',
      fileList: [],
      total: 0,
      currentPage: '',
      pagesize: '',
      totalPages: '',
      numberOfElements: '',
      subject: '', //查询接口要调用的参数
      page: '', //查询接口要调用的参数
      size: '', //查询接口要调用的参数
      grade: '', //查询接口要调用的参数
      classid: '',
      tableData: [],
      // 查询班级表单
      form: {
        subject: '',
        grade: '',
        page: '',
        size: 5
      },
      form2: {
        file: ''
      },
      // 增加班级表单
      addform: {
        subject: '',
        grade: '',
        className: ''
      },
      //编辑班级表单
      editform: {
        subject: '',
        grade: '',
        className: '',
        classId: ''
      }
    };
  },
  methods: {
    //查询班级方法
    findClass(formName) {
      console.log(this.currentPage);
      this.subject = formName.subject;
      this.grade = formName.grade;
      this.size = formName.size;
      this.page = formName.page;
      selectClass(this.page, this.size, this.grade, this.subject)
        .then(data => {
          if (data.success) {
            this.tableData = data.data.content;
            this.totalPages = data.data.totalPages;
            this.form.page = data.data.number;
            this.currentPage = this.form.page + 1;
            this.total = data.data.totalElements;
          } else {
            // alert(data.message);
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    upload() {
      addClassesByEx(this.form2.file)
        .then(data => {
          if (data.success) {
            alert(data.message);
            console.log(data.message);
          } else {
            alert(data.message);
            console.log(data.message);
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
    },
    //换页调用方法
    changepage(val) {
      this.page = val - 1;
      this.form.page = this.page;
      selectClass(this.page, this.size, this.grade, this.subject)
        .then(data => {
          if (data.success) {
            this.tableData = data.data.content;
            console.log(this.tableData);
          } else {
            // alert(data.message);
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 编辑dialog时候数据转移方法
    editData(data) {
      console.log(data);
      this.editform.classId = data.classId;
      this.editform.className = data.name;
    },
    //提交增加班级信息方法
    submitaddClass(formName) {
      addClass(formName)
        .then(data => {
          if (data.success) {
            this.dialogFormVisible = false;
            console.log(data.message);
            // alert(data.message);
          } else {
            console.log(data.message);
            // alert(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除班级方法
    delClass(id) {
      console.log(id);
      delateClass(id)
        .then(data => {
          if (data.success) {
            alert(data.message);
          } else {
            alert(data.message);
            console.log(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //编辑班级方法
    changeClass(formName) {
      console.log(this.editform);
      editClass(formName)
        .then(data => {
          if (data.success) {
            this.editFormVisible = false;
            alert(data.message);
          } else {
            alert(data.message);
          }
        })
        .catch(error => {
          console.log(error);
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