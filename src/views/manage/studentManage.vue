/*
 * @Author: QiaoGang 
 * @Date: 2018-01-24 15:33:04 
 * @Last Modified by: QiaoGang
 * @Last Modified time: 2018-04-25 16:44:21
 */
<template>
  <div>
    <el-form>
      <el-form-item label="姓名">
        <el-input v-model="selectForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户代码">
        <el-input v-model="selectForm.userCode"></el-input>
      </el-form-item>
      <el-button type="primary" @click="findStudent(selectForm)">查询</el-button>
      <el-button type="primary" @click="dialogaddFormVisible = true">新增</el-button>
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
      <el-dialog title="新增学生" :visible.sync="dialogaddFormVisible">
        <el-form :model="addform">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="addform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户代码" :label-width="formLabelWidth">
            <el-input v-model="addform.usercode" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="addform.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="班级" :label-width="formLabelWidth">
            <el-input v-model="addform.className" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="addform.sex" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="addform.phone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="addform.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="addform.address" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogaddFormVisible = false">取 消</el-button>
          <el-button type="primary" @click='submitaddStudent()'>确 定</el-button>
        </div>
      </el-dialog>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户代码" width="180" align="left">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>年龄: {{ scope.row.age }}</p>
            <p>性别: {{ scope.row.sex }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="电话" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.className }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editFormVisible = true;editData(scope.row)">编辑</el-button>
          <el-dialog title="修改教师信息" :visible.sync="editFormVisible">
            <el-form :model="editform">
              <el-form-item label="用户代码" :label-width="formLabelWidth">
                <el-input v-model="editform.userCode" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="editform.name" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-input v-model="editform.sex" auto-complete="off" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="年龄" :label-width="formLabelWidth">
                <el-input v-model="editform.age" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="班级" :label-width="formLabelWidth">
                <el-input v-model="editform.className" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="editform.phone" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="editform.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="editform.address" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editFormVisible = false">取 消</el-button>
              <el-button type="primary" @click='changeStudent(editform)'>确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" type="danger" @click="delStudent(scope.row.userCode)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small layout="total,prev, pager, next" :total="this.total" :page-size="5" @current-change="changepage">
    </el-pagination>
  </div>
</template>
<script>
import {
  delateStudent,
  selectStudent,
  addStudent,
  editStudent,
  addStudentsByEx,
  getNextUserId
} from '../../api/manage-page';
export default {
  data() {
    return {
      formLabelWidth: '120px',
      dialogaddFormVisible: false,
      dialogByExcel: false,
      editFormVisible: false,
      fileList: [],
      tableData: [], //数据存放集
      currentPage: '', //当前页
      total: 0, //总数据条数
      page: '', //总页数
      //查询所用的表单
      selectForm: {
        name: '',
        roleId: '3',
        userCode: '',
        page: '',
        size: '5'
      },
      form2: {
        file: ''
      },
      //新增表单
      addform: {
        name: '',
        userCode: '',
        age: '',
        email: '',
        address: '',
        phone: '',
        sex: '',
        className: ''
      },
      //编辑所用表单
      editform: {
        userCode: '',
        name: '',
        sex: '',
        age: '',
        phone: '',
        email: '',
        address: '',
        className: ''
      }
    };
  },
  methods: {
    //按条件查询学生方法
    findStudent(formName) {
      selectStudent(formName)
        .then(data => {
          if (data.success) {
            this.tableData = data.data.content;
            this.total = data.data.totalElements;
            // alert(data.message);
          } else {
            // alert(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    upload() {
      addStudentsByEx(this.form2.file)
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
    },
    //添加学生方法
    submitaddStudent() {
      getNextUserId()
        .then(data => {
          if (data.success) {
            this.addform.userCode = data.data;
            console.log(this.addform)
            addStudent(this.addform)
              .then(data => {
                if (data.success) {
                  this.dialogaddFormVisible = false;
                  alert(data.message);
                } else {
                  alert(data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            alert('usercode获取失败');
          }
        })
        .catch(error => {
          console.log(error);
        });
      // addStudent(this.addform)
      //   .then(data => {
      //     if (data.success) {
      //       this.dialogaddFormVisible = false;
      //       alert(data.message);
      //     } else {
      //       alert(data.message);
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    //修改学生信息方法
    changeStudent(formName) {
      editStudent(formName)
        .then(data => {
          if (data.success) {
            this.editFormVisible = false;
            // alert(data.message);
          } else {
            // alert(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除学生方法
    delStudent(userCode) {
      delateStudent(userCode)
        .then(data => {
          if (data.success) {
            selectStudent(this.selectForm)
              .then(data => {
                if (data.success) {
                  this.tableData = data.data.content;
                  this.total = data.data.totalElements;
                  // alert(data.message);
                } else {
                  // alert(data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
            // alert(data.message);
          } else {
            // alert(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //页码改变时调用的方法
    changepage(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.page = val - 1;
      this.selectForm.page = this.page;
      selectStudent(this.selectForm)
        .then(data => {
          if (data.success) {
            this.tableData = data.data.content;
            this.total = data.data.totalElements;
            // alert(data.message);
          } else {
            // alert(data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //打开编辑dialog时候数据的转移方法
    editData(data) {
      console.log(data);
      this.editform.userCode = data.userCode;
      this.editform.name = data.name;
      this.editform.sex = data.sex;
      this.editform.age = data.age;
      this.editform.phone = data.phone;
      this.editform.email = data.email;
      this.editform.address = data.address;
      this.editform.className = data.className;
    }
  }
};
</script>
<style>
.el-button{
  text-align: center;
}
</style>