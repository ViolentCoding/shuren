<template>
	<div class="userinfo">
		<div v-if="showInfo" class="item">
			<div class="left">
				<img class="userimg" :src="userinfo.img" alt="">
				<div class="text">
					<p class="name">{{userinfo.name}}</p>
					<p>{{userinfo.phone}}</p>
					<p>{{userinfo.email}}</p>
				</div>
			</div>
			<div class="right">
				<el-button type="primary" class="btn" @click="toggleStatus">编 辑</el-button>
			</div>
		</div>
		<div v-else class="item">
			<div class="left">
				<el-upload class="userimg"
				  action="https://jsonplaceholder.typicode.com/posts/"
				  :show-file-list="false"
				  :on-success="handleAvatarSuccess"
				  :before-upload="beforeAvatarUpload">
				  <img  :src="userinfo.img" >
				</el-upload>
				<div class="text">
					<p >
						 <span class="label">昵&emsp;&emsp;称:</span>
						<el-input class="name" size="small" v-model="userinfo.name" placeholder="请输入昵称"></el-input>
						
						</p>
					<p>
						<span class="label">手机号码:</span>{{userinfo.phone}}
						<a class="link" href="javascript:;">修改</a>
					</p>
					<p>
						<span class="label">企业邮箱:</span>{{userinfo.email}}
						<a class="link" href="javascript:;">修改</a>
					</p>
				</div>
			</div>
			<div class="right">
				<el-button type="" class="btn" @click="toggleStatus">取 消</el-button>
				<el-button type="primary" class="btn">保 存</el-button>
			</div>
		</div>
		
	</div>
		
</template>
<script>

	import img from "@/assets/img/img.jpg"
	export default {
		data() {
			return {
				showInfo:false,
				editphone:false,
				editemail:false,
				userinfo:{ 
					img:"" || img ,
					name:"哈哈哈",
					phone:"12345678901",
					email:"213451@163.com"
				}
			}
		},
		methods:{
			 handleAvatarSuccess(res, file) {
			        this.imageUrl = URL.createObjectURL(file.raw);
			  },
			  beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
		
				if (!isJPG) {
				  this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			  },
			toggleStatus(){
				this.showInfo = !(this.showInfo)
			}
		}
	}
</script>
<style lang="scss">
	.userinfo{
	  p{margin: 0;padding: 0;}
	  .el-input__inner{
	  	color:#9AB734;
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
						width: auto;
						height: 32px;
						line-height: 32px;
						font-size: 16px;
						margin-bottom: 10px;
						color:$mainC !important;
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
