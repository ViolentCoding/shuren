<!--
 * @Author: 赵新朋
 * @Date: 2020-03-11 17:13:47
 * @LastEditors: 赵新朋
 * @LastEditTime: 2020-03-12 17:32:28
 * @Description
 -->
<template>
  <div class="contentBox">
    <div class="search">
      <el-input v-model="search.input3" placeholder="请输入内容" class="input-with-select" size="medium">
        <el-select slot="prepend" v-model="search.select" placeholder="请选择" size="medium">
          <p v-for="(item,index) in cityList" :key="index" style="width:120px" value="search.itme">
            <el-option :label="item" :value="index" />
          </p>
        </el-select>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchbtn">搜索</el-button>
      </el-input>
      <div class="notes">
        <p>热门搜索:</p>
        <ul>
          <li>java</li>
          <li>java</li>
          <li>java</li>
        </ul>
      </div>
      <el-card class="box-card" :body-style="{ display: 'flex' }">
        <div slot="header" class="clearfix">
          <span>历史搜索</span>
          <el-button style="float: right; padding: 3px 0" type="text">
            <img src="" alt="">
            删除记录
          </el-button>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ '列表内容 ' + o }}
        </div>
      </el-card>
    </div>
    <div class="topcard">
      <p>优秀推荐</p>
    </div>
    <div class="cardbox">
      <el-row>
        <el-col v-for="(o, index) in 9" :key="o" :span="7.5">
          <el-card :body-style="{ padding: '0px',position:'relative'}">
            <img src="@/assets/images/recom.png" alt="" class="recom">
            <div class="contentcard">
              <div class="avtar">
                <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              </div>
              <div style="padding: 12px;">
                <span>吴女士·美工</span>
                <div class="bottom clearfix">
                  <p>28岁·本科·五年经验</p>
                  <p>期望薪资：10K/月</p>
                  <p>职能评分：2310分</p>
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
  </div>
</template>

<script>
import { getInfo } from '@/api/search'
export default {
  data() {
    return {
      search: {
        input3: '',
        select: ''
      },
	  cityList: [],
	  currentPage4: 1
    }
  },
  created() {
    this.queryData()
  },
  methods: {
    queryData() {
      getInfo().then(response => {
        this.cityList = response.result
      })
    },
    searchbtn() {
      this.search.select = this.cityList[this.search.select]
      this.$store.dispatch('search/searchform', this.search).then(() => {

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
  .search{
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
  }
</style>
<style lang='scss'>
	.contentBox{
		width: 70vw;
		margin:0 auto;
		.search{
			.el-input__inner{
				height:50px !important;
				line-height: 50px;
      }
		}
		.notes{
			display: flex;
			padding-left:140px;
			p{
				color:#b2b2b2;
			}
			ul{
				display: flex;
				li{
					width: 100px;
					text-align: center;
					list-style: none;
					color:#9ab734;
				}
			}
		}
		.topcard{
			display: flex;
			justify-content: space-between;
			padding:0 40px;
			p{
				font-size: 14px;
			}
		}
		.cardbox{
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
	margin:0 36px 20px;
  }
	}
</style>
