<template>
  <div>
    <el-container>

    
    <el-aside width="200px"></el-aside>
    <el-main width="200px">
      <el-steps :active="active" simple finish-status="success">
        <el-step title="导入文件"  icon="el-icon-document">
            <p>111</p>
          
        </el-step>
        <el-step title="数据预处理"  icon="el-icon-edit"></el-step>
        <el-step title="关联规则挖掘"  icon="el-icon-picture"></el-step>
      </el-steps>
      
      <div><p></p></div>
      <div v-if="active==0">
 
        <div style="width: 60%;margin-left: 20%" class="app-container">
 
          <template>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="导入文件">
                <el-upload
                  class="upload-demo"
                  drag
                  :on-success="readCsv"
                  action=""
                  :multiple="false"
                  >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
              </el-form-item>
              <el-form-item label="文件类型">
                <el-radio-group v-model="form.fileType">
                  <el-radio label="文本类型"></el-radio>
                  <el-radio label="数据库类型"></el-radio>
                </el-radio-group>
              </el-form-item>
              
            </el-form>
          </template>
        </div>
      <el-button style="margin-top: 12px;margin-left: 20%" type="primary"  @click="next">下一步</el-button>
      </div>
      <div v-if="active==1 && form.fileType == '数据库类型' ">
 
        <div style="width: 60%;margin-left: 20%" class="app-container">
 
          <template>
            <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort="{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
  </el-table>
          </template>
        </div>
      <el-button style="margin-top: 12px;margin-left: 20%" type="primary"  @click="next">下一步</el-button>
      </div>
    </el-main>
    <el-aside width="200px"></el-aside>
  </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
      return {
        fileTemp: null,
        active : 0,
        form: {
          name: '',
          region: '',
          fileType: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
    },
    methods: {
      //读取数据
      readCsv(file) {
        console.log(file)
      },


      onSubmit() {
        console.log('submit!');
      },
      next() {
        if (this.active == 0)
        {
          if (this.form.fileType == '')
          {
              this.open3("请选择上传的文件类型")
              return;
          }
        }
        if (this.active++ > 2) this.active = 0;
        // console.log(this.active)

      },
      formatter(row) {
        return row.address;
      },
      open1() {
        this.$message({
          showClose: true,
          message: '这是一条消息提示'
        });
      },

      open2() {
        this.$message({
          showClose: true,
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      },

      open3(test) {
        this.$message({
          showClose: true,
          message: test,
          type: 'warning'
        });
      },

      open4() {
        this.$message({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'error'
        });

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
