<template>
	<div class="qy-info">
		<el-card v-if="true" class="box-card">
		  <div slot="header" class="clearfix ">
		    <span class="title">编辑企业资料</span>
		  </div>
		  <div class="body">	
		     <el-form ref="form" :model="info" label-width="80px" class="form">
				 <el-form-item label="公司名称">
				    <el-input v-model="info.name"></el-input>
				 </el-form-item>
				 <el-form-item label="行业类别">
				      <el-select v-model="info.type" placeholder="请选择">
				           <el-option v-for="item in select.industryTypes" :key="item.id" :label="item.industry" :value="item.id"></el-option>
				         </el-select>	
				 </el-form-item>
				 <el-form-item label="企业规模">
				      <el-select v-model="info.num" placeholder="请选择">
				           <el-option v-for="item in select.enterpriseScales" :key="item.id" :label="item.scale" :value="item.id"></el-option>
				         </el-select>
				 </el-form-item>
				 <el-form-item label="公司性质">
				      <el-select v-model="info.classify" placeholder="请选择">
				           <el-option v-for="item in select.companyNatures" :key="item.id" :label="item.nature" :value="item.id"></el-option>
				         </el-select>
				 </el-form-item>
				 <el-form-item label="公司电话">
				    <el-input v-model="info.phone"></el-input>
				 </el-form-item>
				 <el-form-item label="所在地区">
				      <el-select v-model="info.address" placeholder="请选择">
				           <el-option label="西安" value="1"></el-option>
				           <el-option label="郑州" value="2"></el-option>
				         </el-select>
				 </el-form-item>
				 <el-form-item label="详细地址">
				    <el-input v-model="info.detailAaddress"></el-input>
				 </el-form-item>
				 <div style="text-align: right;margin: 20px 0 30px;">
					 <el-button class="btn" size="small">取消</el-button>
					 <el-button class="btn" type="primary" size="small">提交</el-button>
				 </div>
			 </el-form>
			 <div class="logo-box">
				 <el-upload class="warp"
				   :action="uploadUrl"
				   :show-file-list="false"
				   :accept="'image/*'"
				   :on-success="handleAvatarSuccess"
				   :before-upload="beforeAvatarUpload">
				   <img class="logo"  :src="info.img" >
				 </el-upload>
				 <p>上传企业LOGO</p>
			 </div>
		  </div>
		</el-card>
		<el-card v-if="true" class="box-card">
		  <div slot="header" class="clearfix">
		    <span class="title">企业资料</span>
		   <el-button type="primary" class="card-btn btn">保 存</el-button>
		  </div>
		  <div class="body">
		     <img class="userimg" :src="info.img" alt="">
			 <div class="name-box"> 
				 <span class="name">{{}}</span> 
				 <span class="tip"></span>
			 </div>
			 <p><span></span><span></span><span></span></p>
			 <p>
				 <span>座机:{{}}</span>
				 <span>地址:</span>
			 </p>
			 <div class="introduce">
				 <pre> 童年的光阴是美好的，但是却转瞬即逝。
				 一转眼我的那几个玩伴，有两个去了城里上学，另一个参加了工作，
				 我也被我父母送到了城里读书。从此我们彼此很少见面，只是到了年底，或是暑假，才能彼此见面。见面时没有了彼此的打闹，没有了那么多的话语，
				 只是说说彼此所处的境遇，说说外面各自的见闻，然后就是一起看看电视而已……</pre>
			 </div>
		  </div>
		</el-card>
	</div>
		
</template>
<script>
	import { mapState } from 'vuex'
	import img from "@/assets/img/add.png"
	export default {
		data() {
			return {
				showInfo:false,
				editphone:false,
				editemail:false,
				info:{
					isAuth:false,
					img:"" || img ,
					name:"陕西康德曼有限公司",
					phone:"12345678901",
					type:"",
					classify:"",
					address:"",
					num:"",
					email:"213451@163.com",
					detailAaddress:"曲江会议中心"
				},
			}
		},
		computed:({
			uploadUrl(){
			  let baseUrl = sessionStorage.getItem("baseUrl")+"companyInfo/fileupload"
			  return  baseUrl
			},
			select(){
				return this.$store.state.infoData.select
			},
			cityList(){
				return this.$store.state.infoData.cityList
			}
		}),
		mounted() {
			console.log(this.select)
		},
		methods:{
			 handleAvatarSuccess(res, file) {
				  // this.info.img = sessionStorage.getItem("baseUrl")+res;
			      this.info.img = URL.createObjectURL(file.raw);
			  },
			  beforeAvatarUpload(file) {
				  console.log(file.type)
				const isIMG = /(jpe?g|png|gif)$/i.test(file.type);
				console.log(isIMG)
				const isLt3M = file.size / 1024 / 1024 < 3;
		
				if (!isIMG) {
				  this.$message.error('上传头像图片只能是 JPG,PNG,Gif 格式!');
				}
				if (!isLt3M) {
				  this.$message.error('上传头像图片大小不能超过 3MB!');
				}
				return isIMG && isLt3M;
			  },
			toggleStatus(){
				this.showInfo = !(this.showInfo)
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
	}
</style>
<style lang="scss" scoped="scoped">
	.qy-info{
		.box-card{
			.form{
				float: left;
				width: 450px;
			}
			.logo-box{
				float: right;
				margin-right: 50px;
				.logo{
					width:170px ;
					height: 170px;
					border-radius: 50%;
					object-fit: cover;	
				}
				p{
					text-align: center;
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
