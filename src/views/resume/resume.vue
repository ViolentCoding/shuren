
<!--
 * @Author: 赵新朋
 * @Date: 2020-03-11 17:13:47
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-14 09:20:30
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
      </el-card>
    </div>
    <div class="topcardBox">
      <p>购买的简历</p>
      <p>收藏的简历</p>
    </div>
    <div v-for="(o, index) in recomList" :key="index" class="resume-cardbox" @click="outerVisible = true">
      <el-row>
        <el-col>
          <el-card :body-style="{ padding: '0px',position:'relative',width:'350px'}">
            <div class="contentcard">
              <div class="avtar">
                <img :src="o.img" class="image">
              </div>
              <div style="padding: 12px;">
                <span>{{ o.name }} · {{ o.position }}</span>
                <div class="bottom clearfix">
                  <p>{{ o.age }}岁·本科·{{ o.salaryExpectation }}年经验</p>
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
        :current-page="currentPage4"
        :page-sizes="[9, 12, 15, 18]"
        :page-size="9"
        :total="400"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      innerVisible: false,
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
      })
    },
    searchbtn() {
	  this.search.area = this.value
      this.$store.dispatch('search/searchform', this.search).then((response) => {
        this.recomList = []
        this.recomList = response.result.page.records
        console.log(this.recomList)
      }).catch(() => {
        this.loading = false
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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
			.contentcard{
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
</style>
