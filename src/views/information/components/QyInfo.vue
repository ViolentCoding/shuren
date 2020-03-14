<template>
	<div class="qy-info">
		<el-card v-if="editqsinfo" class="box-card">
		  <div slot="header" class="clearfix ">
		    <span class="title">编辑企业资料</span>
		  </div>
		  <div class="body" v-if="editBaseInfo">
		     <el-form ref="gsform" :model="info" :rules="rules" label-width="80px" class="form">
				 <el-form-item label="公司名称" prop="enterpriseName">
				    <el-input v-model="info.enterpriseName"></el-input>
				 </el-form-item>
				 <el-form-item label="行业类别" prop="industry">
				      <el-select v-model="info.industry" placeholder="请选择">
				           <el-option v-for="item in select.industryTypes" :key="item.id" :label="item.industry" :value="item.id"></el-option>
				         </el-select>	
				 </el-form-item>
				 <el-form-item label="企业规模" prop="scale">
				      <el-select v-model="info.scale" placeholder="请选择">
				           <el-option v-for="item in select.enterpriseScales" :key="item.id" :label="item.scale" :value="item.id"></el-option>
				         </el-select>
				 </el-form-item>
				 <el-form-item label="公司性质" prop="nature">
				      <el-select v-model="info.nature" placeholder="请选择">
				           <el-option v-for="item in select.companyNatures" :key="item.id" :label="item.nature" :value="item.id"></el-option>
				         </el-select>
				 </el-form-item>
				 <el-form-item label="公司电话" prop="companyPlane">
				    <el-input v-model="info.companyPlane"></el-input>
				 </el-form-item>
				 <el-form-item label="所在地区" prop="area">
					<el-cascader v-model="info.codearea" :options="cityOptions"></el-cascader>
				 </el-form-item>
				 <el-form-item label="详细地址">
				    <el-input v-model="info.address"></el-input>
				 </el-form-item>
				 <el-form-item label="企业描述" prop="remark">
				    <el-input  type="textarea" v-model="info.remark"></el-input>
				 </el-form-item>
				 <div style="text-align: right;margin: 20px 0 30px;">
					 <el-button v-show="info.state!=0" class="btn" size="small"  @click="toggleStatus">取消</el-button>
					 <el-button class="btn" type="primary" size="small" @click="saveGsinfo">提交</el-button>
				 </div>
			 </el-form>
			 <div class="logo-box">
				 <el-upload class="warp"
				   :action="uploadUrl"
				   :show-file-list="false"
				   :accept="'image/*'"
				   :on-success="handleLogoSuccess"
				   :before-upload="beforeAvatarUpload">
				   <img class="logo" v-if="info.logo!=null&&info.logo!=''"  :src="info.logo">
				   <img class="logo" v-else  :src="defaultImg" alt="">
				 </el-upload>
				 <p>上传企业LOGO</p>
			 </div>
		  </div>
		  
		  <div class="body" v-else>
		     <el-form ref="rzform" :model="info" :rules="rules" label-width="80px" class="form">
		  				 <el-form-item label="公司名称">
		  					 <span>{{info.enterpriseName}}</span>
		  				 </el-form-item>
		  				 
		  				 <el-form-item label="营业执照" prop="busnissImg">
		  				   <el-upload class="yz-box"
		  				     :action="uploadUrl"
		  				     :show-file-list="false"
		  				     :accept="'image/*'"
		  				     :on-success="handleImgSuccess"
		  				     :before-upload="beforeAvatarUpload">
		  				     <img class="defultyz" v-if="info.busnissImg!=null&&info.busnissImg!=''"  :src="info.busnissImg">
		  				     <img class="defultyz" v-else  :src="defaultyyzz">
		  				   </el-upload>
		  				 </el-form-item>
		  				 <div style="text-align: right;margin: 20px 0 30px;">
		  					 <el-button class="btn" size="small" @click="toggleEditInfo">取消</el-button>
		  					 <el-button class="btn" type="primary" size="small" @click="renzheng">去认证</el-button>
		  				 </div>
		  			 </el-form>
		  			 <div class="right-con">
		  				 <div class="article">
		  					 <h5> 企业认证审核标准</h5>
		  					<p>1,所填企业名称必须与营业执照上企业名称一致</p>
		  					<p>2,营业执照需清晰且在有效期内</p>
		  					<p>3,全国企业信息公示系统上可查询且信息一致</p>
		  					<p>4,如已办理三证合一，需提供最新的有统一社会信用代码的营业执照</p>
		  				 </div>
		  			 </div>
		  </div>
		</el-card>
		
		<el-card v-else class="box-card">
		  <div slot="header" class="clearfix">
		    <span class="title">企业资料</span>
		   <el-button type="primary" class="card-btn btn" @click="toggleStatus">编辑</el-button>
		  </div>
		  <div class="body">
			  <div class="showqs">
			  <img class="logoimg" v-if="info.logo!=null&&info.logo!=''"  :src="info.logo">
			  <img class="logoimg" v-else  :src="defaultImg" alt="">
			 <div class="name-box"> 
				 <span class="name">{{info.enterpriseName}}</span> 
			 </div>
			 <p><span>{{formatnature(info.nature)}}</span>
			 <span>{{formatscale(info.scale)}}</span>
			 <span>{{formatindustry(info.industry)}}</span></p>
			 <p>
				 <span>公司电话:{{info.companyPlane}}</span>
				 <span>地址:{{info.area}}{{info.address}}</span>
			 </p>
			 <div class="introduce">
				 <pre>{{info.remark}}</pre>
			 </div>
		  </div>
		  </div>
		</el-card>
	</div>
		
</template>
<script>
	import {  regionData, CodeToText, TextToCode } from 'element-china-area-data'
	import { mapState } from 'vuex'
	import img from "@/assets/img/add.png"
	import yyzz from "@/assets/img/add-yyzz.png"
	export default {
		data() {
			return {
				defaultImg:img,
				cityOptions:regionData,
				defaultyyzz:yyzz,
				editBaseInfo:true
			}
		},

		computed: mapState({
			info: state => state.infoData.info,
			rules: state => state.infoData.rules,
			editqsinfo: state => state.infoData.editqsinfo,
			select: state => state.infoData.select,
			
			uploadUrl(){
			  let baseUrl = sessionStorage.getItem("baseUrl")+"companyInfo/fileupload"
			  return  baseUrl
			},
			cityList(){
				return this.$store.state.infoData.cityList
			}
		}),
		created() {
			if (this.info.state=="0") {
				this.$store.commit('infoData/set_editqsinfo', true)
			} else{
				this.$store.commit('infoData/set_editqsinfo', false)
			}
		},
		methods:{
			formatnature(val){
				let text = ""
				this.select.companyNatures.forEach(item=>{
					if(val ==item.id){
						text = item.nature
						return 
					}
				})
				return text;
			},
			formatscale(val){
				let text = ""
				this.select.enterpriseScales.forEach(item=>{
					if(val ==item.id){
						text = item.scale
						return 
					}
				})
				return text;
			},
			formatindustry(val){
				let text = ""
				this.select.industryTypes.forEach(item=>{
					if(val ==item.id){
						text = item.industry
						return 
					}
				})
				return text;
			},
			renzheng(){
				let _this = this;
				_this.$refs.rzform.validate((valid) => {
					  if (valid) {
						_this.$store.dispatch('infoData/renzheng',{
							id:_this.info.id,
							busnissImg:_this.info.busnissImg,
							
						}).then((res)=>{
							_this.$message.success('已提交认证，请等待后台审核!');
							_this.toggleEditInfo();
							_this.$store.dispatch('infoData/getInfo');
						})	 
					  } else {
						console.log('error submit!!');
						return false;
					  }
					});
			},
			textformate(arr){
				let textstr = CodeToText[arr[0]]+","+CodeToText[arr[1]]+","+CodeToText[arr[2]];
				return textstr
			},
			saveGsinfo(){
				let _this = this;
				_this.$refs.gsform.validate((valid) => {
					  if (valid) {
						
						_this.$store.dispatch('infoData/updateInfo',{
							id:_this.info.id,
							enterpriseName:_this.info.enterpriseName,
							industry:_this.info.industry,
							scale:_this.info.scale,
							nature:_this.info.nature,
							companyPlane:_this.info.companyPlane,
							area:_this.textformate(_this.info.codearea),
							address:_this.info.address,
							logo:_this.info.logo,
							remark:_this.info.remark,
							
						}).then((res)=>{
							_this.$message.success('保存成功!');
							if(_this.info.state==1||_this.info.state==1 ){
								
							}
							_this.$store.dispatch('infoData/getInfo').then(res=>{
								_this.toggleStatus()
								_this.toggleEditInfo();
							});
						})
					  } else {
						console.log('error submit!!');
						return false;
					  }
					});
			},
			 handleLogoSuccess(res, file) {
				   this.info.logo = sessionStorage.getItem("baseUrl")+"/contactloads/"+res;
			  },
			  handleImgSuccess(res, file) {
				   this.info.busnissImg = sessionStorage.getItem("baseUrl")+"/contactloads/"+res;
			   },
			  beforeAvatarUpload(file) {
				const isIMG = /(jpe?g|png|gif)$/i.test(file.type);
				const isLt3M = file.size / 1024 / 1024 < 3;
		
				if (!isIMG) {
				  this.$message.error('上传图片只能是 JPG,PNG,Gif 格式!');
				}
				if (!isLt3M) {
				  this.$message.error('上传图片大小不能超过 3MB!');
				}
				return isIMG && isLt3M;
			  },
			toggleStatus(){
				//
				this.editBaseInfo = true;  //该参数有问题
				this.$store.commit('infoData/set_editqsinfo', (!(this.editqsinfo)))
			},
			toggleEditInfo(){
				this.editBaseInfo = !this.editBaseInfo
			}
		}
	}
</script>
<style lang="scss">
	.qy-info{
	  .clearfix:after {
	      clear: both
	    }
		.el-card__header{
			padding: 8px 20px;
		}
		.el-textarea__inner{
			min-height: 100px !important;
		}
		.yz-box{
			.el-upload{
				width: 100%;
				max-width: 400px;
				img{
					width: 100%;
				}
			}
		}
	}
</style>
<style lang="scss" scoped="scoped">
	.qy-info{
		.box-card{
			.body{
				display: flex;
				.form{
					flex: 1;
					min-width: 300px;
				}
				.logo-box{
					flex: 1;
					text-align: center;
					.logo{
						width:170px;
						height: 170px;
						border-radius: 50%;
						object-fit: cover;	
					}
					p{
						text-align: center;
					}
					
				}
				.right-con{
					flex: 1;
					
					.article{
						h5{
							font-weight: 400;
						}
						p{
							margin: 0.5rem;
						}
						background:#fcf5f5;
						margin-left: 40px;
						color: #999;
						padding: 10px 20px;
						font-size:0.875rem;
					}
				}
			}
			.showqs{
				font-size: 15px;
				.logoimg{
					float: left;
					height: 100px;
					width: 100px;
					border-radius: 50%;
					border: 1px sold #ddd;
					margin-right: 40px;
				}
				p{
					margin: 0;
					line-height: 30px;
					span{
						margin-right: 40px;
					}
				}
				.name-box{
					font-size:18px ;
					line-height: 40px;
					margin-bottom: 5px;
					color: #9AB734;
				}
				.introduce{
					margin-top: 10px;
					background: #fcf5f5;
					font-size: 14px;
					line-height: 30px;
					padding:15px 20px;
					pre{
						margin: 0;
					}
				}
			}
			.title{
				display: inline-block;
				line-height: 40px;
			}
			.card-btn{
				float: right;
			}
			.btn{
				width: 88px;
			}
		}
	}

</style>
