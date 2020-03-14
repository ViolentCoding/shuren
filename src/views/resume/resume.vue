
<!--
 * @Author: 赵新朋
 * @Date: 2020-03-11 17:13:47
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-14 19:13:23
 * @Description
 -->
<template>
  <div class="resumeBox">
    <div class="searchBox">
      <div class="searchconBox">
        <el-input v-model="search.keywords" placeholder="请输入内容" class="input-with-select" size="medium">
          <el-select slot="prepend" v-model="value" filterable placeholder="请选择">
            <el-option
              v-for="(item,index) in cityList"
              :key="index"
              :label="item"
              :value="item"
              style="width:120px"
            />
          </el-select>
          <el-button slot="append" type="primary" icon="el-icon-search" @click="searchbtn">搜索</el-button>
        </el-input>
      </div>

      <el-card class="box-card" :body-style="{ display: 'flex' }">
        <div>
          <h4>学历要求</h4>
          <div style="display:flex">
            <el-select v-model="value" clearable placeholder="请选择" style="width:140px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="value" clearable placeholder="请选择" style="width:140px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div>
          <h4>期望薪资</h4>
          <div style="display:flex">
            <el-select v-model="value" clearable placeholder="请选择" style="width:140px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="value" clearable placeholder="请选择" style="width:140px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div>
          <h4>工作年限</h4>
          <div style="display:flex">
            <el-select v-model="value" clearable placeholder="请选择" style="width:140px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="value" clearable placeholder="请选择" style="width:140px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div>
          <h4>年龄要求</h4>
          <div style="display:flex">
            <el-select v-model="value" clearable placeholder="请选择" style="width:140px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select v-model="value" clearable placeholder="请选择" style="width:140px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </el-card>
    </div>
    <div class="topcardBox">
      <p>购买的简历</p>
      <p>收藏的简历</p>
    </div>
    <div v-for="(o, index) in recomList" :key="index" class="resume-cardbox" @click="cardInfo(index)">
      <el-row>
        <el-col>
          <el-card :body-style="{ padding: '0px',position:'relative'}">
            <div class="contentcardbox">
              <div class="avtar">
                <img src="@/assets/images/avtar.png" class="image">
              </div>
              <div style="padding: 20px;">
                <span>{{ o.name }} · {{ o.position }}</span>
                <div class="bottom clearfix">
                    <p>{{ o.age }}岁 丨 本科 丨 {{ o.salaryExpectation }}年经验</p>
                    <p>期望薪资：{{ o.salaryExpectation }}/月</p>
                    <p style="color:#9ab734">职能评分：{{ o.sum }}分</p>
                </div>
                </div>
                <div style="padding:20px 80px;">
                  <div class="bottom clearfix">
                    <p>{{ o.age }}岁 丨 本科 丨 {{ o.salaryExpectation }}年经验</p>
                    <p>期望薪资：{{ o.salaryExpectation }}/月</p>
                    <p style="color:#9ab734">职能评分：{{ o.sum }}分</p>
                  </div>
            </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="block">
      <el-pagination
        :current-page="pageNo"
        :page-sizes="[9]"
        :page-size="9"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
     <el-dialog :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        :visible.sync="innerVisible1"
        append-to-body
        center
      >
        <div slot="title" class="dialog-title">
          <h2>购买简历</h2>
          <p style="color:#9ab734">提示：购买的简历会保存在您的简历库中</p>
        </div>
        <div class="diaconbox">
          <h3 style="textAlign:center">需要支付</h3>
          <p style="textAlign:center;color:#9ab734;lineHeight:45px;">
            <b style="fontSize:28px">1</b>&nbsp;&nbsp;个简历币
          </p>
          <div class="resumeBox" style="display:flex">
            <div style="border:1px solid #9ab734;width:120px;height:140px;marginLeft:50px;">
              <p style="textAlign:center;lineHeight:30px;">剩余简历币</p>
              <p style="textAlign:center;marginTop:20px;color:#9ab734;">
                <b style="fontSize:28px">20</b>&nbsp;&nbsp;个
              </p>
            </div>
            <div style="margin:auto">
              <el-button type="primary">立即充值</el-button>
              <p>简历币不足无法支付</p>
            </div>
          </div>
          <span slot="footer" class="dialog-footer" style="paddingLeft:250px;">
            <el-button @click="innerVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="pay()">确 定</el-button>
          </span>
        </div>
      </el-dialog>
      <el-dialog
        width="30%"
        :visible.sync="innerVisible2"
        append-to-body
        center
      >
        <div slot="title" class="dialog-title">
          <h2>购买成功</h2>
          <p style="color:#9ab734">提示：购买的简历会保存在您的简历库中</p>
        </div>
        <div class="diaconbox">
          <h3 style="textAlign:center">王倩明</h3>
          <p style="textAlign:center;color:#9ab734;lineHeight:45px;">
            18919194502
          </p>
          <span slot="footer" class="dialog-footer" style="paddingLeft:30px;color:#9ab734;">
            <i class="el-icon-service">&nbsp;&nbsp;在线咨询</i>
          </span>
        </div>
      </el-dialog>
      <div class="heardUser">
        <img src="@/assets/images/avtar.png" alt="" style="border:1px solid #c3c3c3">
        <div class="heardCenter">
          <ul class="userinfo">
            <li>
              <i class="el-icon-user-solid">&nbsp;{{ user.name }}</i>
            </li>
            <li>
              <i class="el-icon-potato-strips">&nbsp;{{ user.age }}岁</i>
            </li>
            <li>
              <i class="el-icon-suitcase">&nbsp;{{ user.jobtime }}年</i>
            </li>
            <li>
              <i class="el-icon-school">&nbsp;{{ user.education }}</i>
            </li>
            <li>
              <i class="el-icon-s-custom">&nbsp;{{ user.workState }}</i>
            </li>
          </ul>
          <p>本人是一名工作七年的全栈开发工程师，沟通能力强，对技术精益求精，为人谦虚。</p>
          <ul class="userinfo">
            <li style="width:150px">{{ user.position }}</li>
            <li>行业不限</li>
            <li>{{ user.salaryExpectation }}</li>
          </ul>
        </div>
        <div class="heardRight">
          <h2>{{ user.sum }}</h2>
          <p>树人招聘职能评分</p>
        </div>
      </div>
      <div class="content">
        <div class="contentJob">
          <h2>工作经历</h2>
          <div v-for="(item,index) in user.uexperiences" :key="index" class="jobBox">
            <p>
              <b>{{ item.company }}</b> 丨
              <b>{{ item.position }}</b>
            </p>
            <p><b>内容:</b>&nbsp;&nbsp;{{ item.remark }}</p>
          </div>
        </div>
        <div class="contentexp">
          <h2>项目经验</h2>
          <div v-for="(item,index) in user.uexProjects" :key="index">
            <p>
              <b>{{ item.prjName }}</b>
            </p>
            <p>
              <b>项目描述:</b>
              &nbsp;&nbsp;{{ item.describe }}</p>
            <p>
              <b>个人职责:</b>
              &nbsp;&nbsp;{{ item.remark }}</p>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <span style="padding-right:400px" @click="favorite()"><i v-show="keep1" class="el-icon-star-off"> 收藏简历 </i> <i v-show="keep2" class="el-icon-star-on"> 取消收藏 </i>  </span>
        <el-button @click="outerVisible = false">帮我招聘</el-button>
        <el-button type="primary" @click="innerVisible1 = true">查看联系方式</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import { getInfo } from '@/api/search'
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      search: {
        keywords: '',
        pageNo: 1,
        pageSize: 9,
        area: ''
      },
      value: '',
	  cityList: [],
      currentPage4: 1,
      recomList: [],
      outerVisible: false,
      innerVisible1: false,
      innerVisible2: false,
      pageNo: 1,
      pageSize: 9,
      historyList: [],
      user: {
      },
      keep1: true,
      keep2: false,
      keeplist1: '2',
      keeplist2: '0',
      companyId: '',
      userInfoId: '',
      shoucState: '',
      total: 0,
      pageNo: 1,
      pageSize: 9
    }
  },
  created() {
    this.queryData()
  },
  methods: {
   queryData() {
      getInfo().then(response => {
        console.log(response)
        this.cityList = response.result.sysCities
        this.recomList = response.result.page.records
        this.total = response.result.page.total
        this.recomList.forEach(item => {
          switch (item.salaryExpectation) {
            case 1 :item.salaryExpectation = '4k以下'; break
            case 2 :item.salaryExpectation = '4k-6k'; break
            case 3 :item.salaryExpectation = '6k-8k'; break
            case 4 :item.salaryExpectation = '8k-10k'; break
            case 5 :item.salaryExpectation = '10k-12k'; break
            case 6 :item.salaryExpectation = '12k-15k'; break
            case 7 :item.salaryExpectation = '15k以上'; break
            default :item.salaryExpectation = '面议'; break
          }
        })
      })
    },
    del() {
      this.historyList = []
    },
    open() {
      this.$confirm('您还没有认证, 是否认证?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$router.push('/info')
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '认证成功后，可以获取更多招聘信息'
        })
      })
    },
    searchbtn() {
      const arr = this.historyList
      arr.push(this.search.keywords)
      const newarr = []
      for (let i = 0; i < arr.length; i++) {
        if (newarr.indexOf(arr[i]) === -1) {
          newarr.push(arr[i])
        }
        this.historyList = newarr
      }
      this.search.area = this.value
      this.$store.dispatch('search/searchform', this.search).then((response) => {
        this.recomList = []
        this.recomList = response.result.page.records
        this.total = response.result.page.total
        this.recomList.forEach(item => {
          switch (item.salaryExpectation) {
            case 1 :item.salaryExpectation = '4k以下'; break
            case 2 :item.salaryExpectation = '4k-6k'; break
            case 3 :item.salaryExpectation = '6k-8k'; break
            case 4 :item.salaryExpectation = '8k-10k'; break
            case 5 :item.salaryExpectation = '10k-12k'; break
            case 6 :item.salaryExpectation = '12k-15k'; break
            case 7 :item.salaryExpectation = '15k以上'; break
            default :item.salaryExpectation = '面议'; break
          }
        })
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pageNo = val
      request.post('resume/userInfo/search', {
        pageNo: val,
        pageSize: this.pageSize
      }).then(response => {
        this.recomList = response.result.page.records
        this.total = response.result.page.total
        this.recomList.forEach(item => {
          switch (item.salaryExpectation) {
            case 1 :item.salaryExpectation = '4k以下'; break
            case 2 :item.salaryExpectation = '4k-6k'; break
            case 3 :item.salaryExpectation = '6k-8k'; break
            case 4 :item.salaryExpectation = '8k-10k'; break
            case 5 :item.salaryExpectation = '10k-12k'; break
            case 6 :item.salaryExpectation = '12k-15k'; break
            case 7 :item.salaryExpectation = '15k以上'; break
            default :item.salaryExpectation = '面议'; break
          }
        })
      })
    },
    cardInfo(index) {
      this.userInfoId = this.recomList[index].id
      this.companyId = window.sessionStorage.getItem('id')
      const state = window.sessionStorage.getItem('state')
      if (state === '2') {
        this.outerVisible = true
        request.post('/resume/userInfo/getInfo', {
          userInfoId: this.userInfoId,
          companyId: this.companyId
        }).then(res => {
          this.user = res.result.userInfo
          this.shoucState = res.result.shoucState
          if (this.shoucState == '0') {
            this.keep1 = true
            this.keep2 = false
          } else {
            this.keep1 = false
            this.keep2 = true
          }
          switch (this.user.education) {
            case '0' :this.user.education = '大专'; break
            case '1' :this.user.education = '本科'; break
            case '2' :this.user.education = '硕士'; break
            case '3' :this.user.education = '博士'; break
            case '4' :this.user.education = '其它'; break
          }
          switch (this.user.workState) {
            case '0' :this.user.workState = '在职'; break
            case '1' :this.user.workState = '离职'; break
          }
          switch (this.user.salaryExpectation) {
            case 1 :this.user.salaryExpectation = '4k以下'; break
            case 2 :this.user.salaryExpectation = '4k-6k'; break
            case 3 :this.user.salaryExpectation = '6k-8k'; break
            case 4 :this.user.salaryExpectation = '8k-10k'; break
            case 5 :this.user.salaryExpectation = '10k-12k'; break
            case 6 :this.user.salaryExpectation = '12k-15k'; break
            case 7 :this.user.salaryExpectation = '15k以上'; break
            default :this.user.salaryExpectation = '面议'; break
          }
          console.log(this.user)
        })
      } else {
        this.open()
      }
    },
    favorite() {
      let state = 0
      if (this.keep1 === true) {
        state = 2
      } else if (this.keep2 === true) {
        state = 0
      }
      request.post('companyInfo/sysCompanyUserinfo', {
        userInfoId: this.userInfoId,
        companyId: this.companyId,
        state: state
      }).then(res => {
        if (res.msg == '收藏成功') {
          this.keep2 = true
          this.keep1 = false
          this.$message({
            type: 'success',
            message: '收藏成功,收藏的简历会保存在您的简历库中'
          })
        } else if (res.msg == '取消收藏成功') {
          this.keep1 = true
          this.keep2 = false
          this.$message({
            type: 'warning',
            message: '您已取消收藏，该简历会从您的简历库中删除'
          })
        }
      })
    },
    pay() {
      this.innerVisible1 = false
      this.innerVisible2 = true
    }
  }
}

</script>
<style lang='scss'>
  .searchBox{
      .input-with-select .el-input-group__prepend {
        background-color: #fff;
      }
      .el-select .el-input {
        width: 130px;
      }
    .item {
        width: 100px !important;
        margin-bottom: 18px;
      }
       .text {
    font-size: 14px;
  }
  .el-input-group__append{
	background-color: #9ab734 !important;
	color:#fff;
  }
  .searchconBox{
	  .el-input__inner{
		height:50px !important;
		line-height: 50px;
	}
  }
  }
</style>
<style lang='scss' scoped>
	.resumeBox{
		width: 70vw;
		margin:0 auto;
		.topcardBox{
			width: 300px;
			height: 50px;
			display: flex;
			margin:20px 0;
			box-shadow: 0 0 10px 0 #c3c3c3;
			p{
				padding:0;
				width: 150px;
				height: 100%;
				font-size: 14px;
				line-height: 50px;
				text-align: center;
				margin:0;
			}
			p:nth-child(1){
				background-color: #9ab734;
			}
		}
		.resume-cardbox{
			margin:0 auto;
			.recom{
				width: 50px;
				position: absolute;
				left:0;
				top: 0;
			}
			.time {
				font-size: 13px;
				color: #999;
				}
			.avtar{
				width: 100px;
				height:140px;
			}
			.bottom {
			margin-top: 13px;
			line-height: 12px;
			p{
				font-size: 14px;
			}
			}

			.button {
			padding: 0;
			float: right;
			}

			.image {
			width: 100px;
			height: 100%;
			display: block;
			}
			}
			.contentcardbox{
				display: flex;
				padding:28px;
			}
			.block{
				float: right;
      }
      .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-col{
	margin-bottom:20px;
  }
  .box-card{
	margin-top: 20px;
	div{
		width: 17vw;
	}
  }
  }
  	.cardbox{
      width:100%;
      display: flex;
      flex-flow:row wrap;
      margin:0 auto;
      .elcard{
        margin:0.6vw;
      }
			.recom{
				width: 50px;
				position: absolute;
				left:0;
				top: 0;
			}
			.time {
				font-size: 13px;
				color: #999;
				}
			.avtar{
				width: 100px;
				height:140px;
			}
			.bottom {
			margin-top: 13px;
			line-height: 12px;
			p{
				font-size: 14px;
			}
			}

			.button {
			padding: 0;
			float: right;
			}

			.image {
			width: 100px;
			height: 100%;
			display: block;
			}
			}
			.contentcardbox{
				display: flex;
				padding:28px;
			}
			.block{
				float: right;
      }
      .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-col{
	margin:0 20px 20px;
  }
  .heardUser{
    display: flex;
    img{
      width: 120px;
      height: 150px;
    }
    .heardCenter{
      .userinfo{
        margin-left: 5px;
        padding-left:10px;
        display: flex;
        li{
          list-style: none;
          width: 80px;
          margin: 10px;
        }

      }
      p{
        padding-left: 20px;
        padding-right: 20px;
        margin-bottom:20px;
      }
    }
  }
  .heardRight{
    margin:auto;
    border:1px solid #c3c3c3;
    height: 80px;
    width: 160px;
    h2{
      color: #9ab734;
      text-align: center;
    }
    p{
      text-align: center;
      line-height: 8px;
    }
  }
  .contentJob,.contentexp{
    p{
      line-height: 28px;
      padding: 0 20px;
    }
  }
</style>
