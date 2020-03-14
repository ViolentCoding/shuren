<template>
	<div class="currency">
		<el-card class="box-card">
			<div class="card-con">
				<div class="left">
					<div >充值</div>
					<div class="jlb"><span>50</span>个简历币</div>
					<div class="tip">简历币是用于查看简历详情，一个简历币查看一份简历全部信息。</div>
				</div>
				<div class="right">
					<el-button type="primary">充值简历币</el-button>
				</div>
			</div>
		</el-card>
		<el-card class="box-card">
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			    <el-tab-pane label="全部" name="first">
					<el-table
					    :data="tableData"
					    style="width: 100%">
						<el-table-column label="名称">
							<template slot-scope="scope">
							   购买简历
							</template>
						</el-table-column>
					    <el-table-column
					      label="日期"
					      width="180">
					      <template slot-scope="scope">
					        <i class="el-icon-time"></i>
					        <span style="margin-left: 10px">{{ scope.row.date }}</span>
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="姓名"
					      width="180">
					      <template slot-scope="scope">
					        <el-popover trigger="hover" placement="top">
					          <p>姓名: {{ scope.row.name }}</p>
					          <p>住址: {{ scope.row.address }}</p>
					          <div slot="reference" class="name-wrapper">
					            <el-tag size="medium">{{ scope.row.name }}</el-tag>
					          </div>
					        </el-popover>
					      </template>
					    </el-table-column>
					    <el-table-column label="操作">
					      <template slot-scope="scope">
					        <el-button
					          size="mini"
					          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button
					          size="mini"
					          type="danger"
					          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					      </template>
					    </el-table-column>
					  </el-table>
					  
					  <el-pagination
					    background
					    layout="prev, pager, next"
					    :total="1000">
					  </el-pagination>
				</el-tab-pane>
			    <el-tab-pane label="消费记录" name="second">
					<el-table
					    :data="tableData"
					    style="width: 100%">
						<el-table-column label="名称">
							<template slot-scope="scope">
							   购买简历
							</template>
						</el-table-column>
					    <el-table-column
					      label="日期"
					      width="180">
					      <template slot-scope="scope">
					        <i class="el-icon-time"></i>
					        <span style="margin-left: 10px">{{ scope.row.date }}</span>
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="姓名"
					      width="180">
					      <template slot-scope="scope">
					        <el-popover trigger="hover" placement="top">
					          <p>姓名: {{ scope.row.name }}</p>
					          <p>住址: {{ scope.row.address }}</p>
					          <div slot="reference" class="name-wrapper">
					            <el-tag size="medium">{{ scope.row.name }}</el-tag>
					          </div>
					        </el-popover>
					      </template>
					    </el-table-column>
					    <el-table-column label="操作">
					      <template slot-scope="scope">
					        <el-button
					          size="mini"
					          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button
					          size="mini"
					          type="danger"
					          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					      </template>
					    </el-table-column>
					  </el-table>
					  <el-pagination
					    background
					    layout="prev, pager, next"
					    :total="1000">
					  </el-pagination>
				</el-tab-pane>
			    <el-tab-pane label="充值记录" name="third">
					<el-table
					    :data="tableData"
					    style="width: 100%">
						<el-table-column label="名称">
							<template slot-scope="scope">
							   购买简历
							</template>
						</el-table-column>
					    <el-table-column
					      label="日期"
					      width="180">
					      <template slot-scope="scope">
					        <i class="el-icon-time"></i>
					        <span style="margin-left: 10px">{{ scope.row.date }}</span>
					      </template>
					    </el-table-column>
					    <el-table-column
					      label="姓名"
					      width="180">
					      <template slot-scope="scope">
					        <el-popover trigger="hover" placement="top">
					          <p>姓名: {{ scope.row.name }}</p>
					          <p>住址: {{ scope.row.address }}</p>
					          <div slot="reference" class="name-wrapper">
					            <el-tag size="medium">{{ scope.row.name }}</el-tag>
					          </div>
					        </el-popover>
					      </template>
					    </el-table-column>
					    <el-table-column label="操作">
					      <template slot-scope="scope">
					        <el-button
					          size="mini"
					          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					        <el-button
					          size="mini"
					          type="danger"
					          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					      </template>
					    </el-table-column>
					  </el-table>
					  <el-pagination
					    background
					    layout="prev, pager, next"
					    :total="1000">
					  </el-pagination>
				</el-tab-pane>
			  </el-tabs>
			
		</el-card>
	</div>
</template>
<script>
	
	export default {
		
		data() {
			return {
				activeName: 'first',
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
			}
		},
		created() {
			this.$store.dispatch('currency/getList',{	
				"id":"30",
				"state":"1",
				"pageNumber":"1",
				"pageSize":10
				}
			);
		},
		methods:{
			 handleClick(tab, event) {
			        console.log(tab, event);
			      },
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		}
		
	}
</script>
<style lang="scss">
	.currency{
		.el-pagination{
			text-align: right;
			margin-top: 15px;
		}
	}
	
</style>
<style lang="scss" scoped="scoped">
	.currency{
		.box-card{
			margin-bottom: 20px;
			.card-con{
				display: flex;	
				justify-content: center;
				align-items: center;
				.left{	
					flex: 1;
					border-right: 1px solid #ddd;
					font-size: 15px;
					line-height: 1.5;
					.jlb{
						height: 60px;
						line-height: 60px;
						color: #9AB734;
						span{
							font-size: 30px;
						}
					}
					.tip{
						color: #999;
					}
				}
				.right{
					text-align: center;
					width:250px ;
				}
			}
			
		}
	}
</style>
