<template>
	<div class="userinfo">
		<div v-if="showInfo" class="item">
			<div class="left">
				<img v-if="info.contactImg!=null&&info.contactImg!=''" class="userimg" :src="info.contactImg" alt="">
				<img v-else class="userimg" :src="defaultImg" alt="">
				<div class="text">
					<p class="name">{{info.contactName}}</p>
					<p >{{info.contactTel}}</p>
					<p style="margin-top: 10px;" class="email">{{info.email}}</p>
					<p style="margin-top: 10px;">
						<span class="label">认证状态:</span>{{info.state | rzStatus}}
					</p>
				</div>
			</div>
			<div class="right">
				<el-button type="primary" class="btn" @click="toggleStatus">编 辑</el-button>
			</div>
		</div>
		<div v-else class="item">
			<div class="left">
				<el-upload class="userimg"
				  :action="uploadUrl"
				  :show-file-list="false"
				  :accept="'image/*'"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img v-if="info.contactImg!=null&&info.contactImg!=''" class="userimg" :src="info.contactImg" alt="">
				  <img v-else class="userimg" :src="defaultImg" alt="">
				</el-upload>
				<div class="text">
					<p >
						 <span class="label">昵&emsp;&emsp;称:</span>
						<el-input class="name" size="small" v-model.trim="info.contactName" placeholder="请输入昵称"></el-input>
						
						</p>
					<p >
						<span class="label">手机号码:</span>{{info.contactTel}}
						<!-- <a class="link" href="javascript:;">修改</a> -->
					</p>
					<p style="margin-top: 10px;">
						<span class="label">企业邮箱:</span>
						<el-input class="email" size="small" v-model="info.email" placeholder="请输入昵称"></el-input>
					</p>
					<p style="margin-top: 10px;">
						<span class="label">认证状态:</span>{{info.state | rzStatus}}
					</p>
				</div>
			</div>
			<div class="right">
				<el-button type="" class="btn" @click="toggleStatus">取 消</el-button>
				<el-button type="primary" class="btn" @click="save">保 存</el-button>
			</div>
		</div>
		
	</div>
		
</template>
<script>
	import { mapState } from 'vuex'
	import img from "@/assets/img/img.jpg"
	export default {
		data() {
			return {
				defaultImg:img,
				editphone:false,
			}
		},
		computed:mapState({
			uploadUrl(){
			  let baseUrl = sessionStorage.getItem("baseUrl")+"companyInfo/fileupload"
			  return  baseUrl
			},
			showInfo: state =>state.infoData.myinfoStatus,
			info: state =>state.infoData.info
		}),
		filters:{
		  rzStatus(value){
			  let str = ""
			  switch (Number(value)) {
			      case 0:
			          str = "未认证";
			          break;
			      case 1:
			          str = "认证中";
			           break;
			      case 2:
			          str = "已认证";
			           break;
			      case 3:
			          str = "未通过";
			           break;
			  } 
			  return str
		  }
		},
		created() {
			if (this.info.contactName==""|| this.info.contactName==null) {
				this.$store.commit('infoData/set_userinfo_status', true)
			} else{
				this.$store.commit('infoData/set_userinfo_status', false)
			}
		},
		methods:{
			save(){
				let _this = this;
				if (this.info.contactName=="" || this.info.contactName=="") {
					 this.$message.error('昵称不能为空');
					 return false
				}
				if (this.info.email=="" || this.info.email=="") {
					 this.$message.error('邮箱不能为空');
					 return false
				}
				this.$store.dispatch('infoData/updateInfo',{
					id:this.info.id,
					contactName:this.info.contactName,
					contactImg:this.info.contactImg,
					email:this.info.email
				}).then((res)=>{
					_this.$message.success('保存成功!');
					_this.$store.dispatch('infoData/getInfo');
				})										
			},
			handleAvatarSuccess(res, file) {
				this.info.contactImg = sessionStorage.getItem("baseUrl")+"/contactloads/"+res;
			     // this.info.contactImg = URL.createObjectURL(file.raw);
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
				this.$store.commit('infoData/set_userinfo_status', (!(this.showInfo)))
			}
		}
	}
</script>
<style lang="scss">
	.userinfo{
	  p{margin: 0;padding: 0;}
	  .name .el-input__inner{
	  	color:#9AB734;
	  }
	  .userimg .el-upload{
			  height: 100%;
			  width: 100%;
	  }	
	}
	
</style>
<style lang="scss" scoped="scoped">
	.userinfo{
		background: #fff;
		padding: 20px ;
		input{
			border: 1px solid #ddd;
		}
		margin-bottom: 20px;
		border-radius: 3px;
	    box-shadow: 0 0 10px #ddd;
	    $mainC:#9AB734;
	    .label{
	        font-size: 14px;
	        display: inline-block;
	        width: 70px;
	        white-space: pre-wrap;
	    }
		.userimg{
			box-sizing: border-box;
			height: 100px;
			width: 100px;
			border-radius: 50%;
			border:1px solid #ddd;
			margin-right: 40px ;
			overflow: hidden;
			object-fit: cover;
			img{
				height: 100px;
				width: 100px;
				object-fit: cover;
			}
		}
		.item{
			.btn{
				text-align: center;
				border-radius: 3px;
				margin:0 10px;
				width: 88px;
			}  
		   display: flex;
		   align-items: center;
		   justify-content: center;
		   .left{
			   display: flex;
			   flex: 1;
			   align-items: center;
				justify-content: left;
				border-right: 1px solid #ddd;
				.text{
					p{
						line-height: 30px;
					}
					font-size: 14px;
					.name{
						width: 220px;
						height: 32px;
						line-height: 32px;
						font-size: 18px;
						margin-bottom: 10px;
						color:$mainC !important;
					}
					.email{
						color: #666;
						width: 220px;
						height: 32px;
						line-height: 32px;
					}
					.link{
						color:$mainC;
						margin-left: 30px;
					}
				}
				
		   }
		   .right{
			width: 250px;
			text-align: right;
			
		   }
		}
	    
	}

</style>
