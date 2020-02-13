<template>
	<div class="heartBeat">
		<h1 style="margin-bottom: 20px;">心跳配置</h1>
		<my-table :titles='tableTitle' :tableData='tableData' :operate='true' style="max-width: 1500px;" flag='heartBeat'
		 @editTable='editTable'></my-table>
	</div>
</template>

<script>
	import myTable from '../components/myTable'

	export default {
		name: 'heartBeat',
		components: {
			myTable
		},
		data() {
			return {
				tableTitle: [{
					prop: "id",
					label: "id"
				}, {
					prop: "describe",
					label: "名称"
				}, {
					prop: "group",
					label: "所属分组"
				}, {
					prop: "second",
					label: "心跳间隔秒数"
				}, {
					prop: "status",
					label: "当前状态"
				}],
				tableData: []
			}
		},
		created() {
			this.getTableList();
		},
		methods: {
			getTableList() {
				this.$http.taskList().then((res) => {
					console.log(res);
					if (res.errorcode == 0) {
						this.tableData = res.data;
					} else {
						this.$message.error(res.msg);
					}
				}).catch((err) => {
					console.log(err)
				});
			},
			editTable(row) {
				console.log(row);
				let state = row.status == '已停止'? 'start':'stop';
				let name = row.status == '已停止'? '启用':'终止';
				this.$confirm('确认'+name+'<span style="color:#E6A23C;margin:0 10px">'+row.describe+'</span>'+'心跳保持?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					dangerouslyUseHTMLString: true
				}).then(() => {
					this.$http.taskControl({
						id:row.id,
						cmd:state
					}).then((res) => {
						console.log(res);
						if (res.errorcode == 0) {
							this.getTableList();
							this.$message.success(name+'成功');
						} else {
							this.$message.error(res.msg);
						}
					}).catch((err) => {
						console.log(err)
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
		}
	}
</script>

<style>
</style>
