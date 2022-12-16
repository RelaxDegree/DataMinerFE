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
            <el-form ref="form" :model="form" label-width="80px" :inline="true">
              <el-form-item label="导入文件">
                <el-upload
                  class="upload-demo"
                  drag
                  :on-success="readCsv"
                  action="https://jsonplaceholder.typicode.com/posts/"
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
              <el-form-item label="算法选择">
                <el-radio-group v-model="form.algorithm">
                  <el-radio label="Apriori"></el-radio>
                  <el-radio label="FP-growth"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="支持度">
                <el-input v-model="form.support" placeholder="请输入支持度"></el-input>
              </el-form-item>
              <el-form-item label="置信度">
                <el-input v-model="form.confident" placeholder="请输入置信度"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </div>
      <el-button style="margin-top: 12px;margin-left: 20%" type="primary"  @click="next">下一步</el-button>
      </div>

      <div v-if="active==1">
        <template>
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
              <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="thing"
              label="事务项"
              width="800">
            </el-table-column>

          </el-table>
        </template>
        <el-button style="margin-top: 12px;margin-left: 20%" type="primary"  @click="next">下一步</el-button>
      </div>
      <div v-if="active==2">
        <template>
          <el-table
            :data="tableResult"
            style="width: 100%"
            :default-sort="{prop: 'lift', order: 'descending'}"
            >
            <el-table-column
              prop="id"
              label="id"
              width="50">
            </el-table-column>
            <el-table-column
              prop="frontSet"
              label="前项"
              width="150">
            </el-table-column>
            <el-table-column
              prop="latter"
              label="后项"
              width="150">
            </el-table-column>
            <el-table-column
              prop="lift"
              label="提升度"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="cos"
              label="IS度量"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="confidence"
              label="全局置信"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop="kulczynski"
              label="库尔钦斯基度量"
              sortable
              width="150">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-main>
    <el-aside width="200px"></el-aside>
  </el-container>
  
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',

  data() {
      return {
        fileTemp: null,
        active : 0,
        form: {
          fileName: '',
          algorithm: '',
          fileType: '',
          support : '',
          confident : '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [],
        tableResult : [],
      };
    },
    methods: {
      //读取数据
      readCsv(responce, file) {
        console.log(file.name)
        this.form.fileName = file.name
      },
      onSubmit() {
        console.log('submit!');
      },
      next() {
        if (this.active == 0)
        {
          // console.log(this.form.algorithm)
          if (this.form.fileType == '' || this.form.support == '' || this.form.confident == '' ||
              this.algorithm == '')
          {
              this.open3("没有填全")
              return;
          }
          let that = this
          this.$axios.get('http://127.0.0.1:8000/process/', {
          params: {
            fileName : this.form.fileName,
            support : this.form.support, 
            confident : this.form.confident,
            alg : this.form.algorithm,
          }
        })
        .then(function (response) {
          console.log(response.data)
          var table = response.data.data.tabledata
          var len = table['size']
          for (var i = 0 ; i < len; i ++)
          {
            var lst = ""
            for (var j in table[i])
            {
              if (j !== '')
                lst = lst + " " + table[i][j]
            }
            // console.log(lst)
            // console.log(this)
            that.tableData.unshift({thing : lst})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
          
        }
        
        if (this.active == 1)
        {
          let that = this
          this.$axios.get('http://127.0.0.1:8000/result/', {
          params: {
          }
        })
        .then(function (response) {
          console.log(response.data)
          var table = response.data.data.patternAccess
          var len = table.length
          for (var i = 0 ; i < len; i ++)
          {
            var frontSet = ""
            var latter = ""
            var cos, lift, confidence, kulczynski
            for (var j in table[i]['front'])
            {
              if (j !== '')
              frontSet = frontSet + " " + table[i]['front'][j]
            }
            // console.log(front)
            for (j in table[i]['latter'])
            {
              if (j !== '')
              latter = latter + " " + table[i]['latter'][j]
            }
            lift = table[i]['lift']
            cos = table[i]['cosine']
            confidence = table[i]['allConfidenced']
            kulczynski = table[i]['kulczynski']
            // console.log(lst)
            // console.log(this)
            that.tableResult.unshift({'frontSet' : frontSet, 'latter' : latter, 'kulczynski' : kulczynski,
          'lift' : lift, 'cos' : cos, 'confidence' : confidence})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
