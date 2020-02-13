<template>
	<div class="system">
		<h1 style="margin-bottom: 20px;">系统配置</h1>
		<my-table :titles='tableTitle' :tableData='tableData' :operate='true' style="max-width: 1500px;" flag='system'
		 @editTable='editTable'></my-table>
		<!-- 修改的弹框 -->
		<my-dialog :flag='dialogTitle' :dialogVisible='dialogVisible' :dialogData='dialogData' @close='dialogVisible=false' @alterSystem='alterSystem'></my-dialog>
	</div>
</template>

<script>
	import myTable from '../components/myTable'
	import myDialog from '../components/myDialog'

	export default {
		name: 'system',
		components: {
			myTable,
			myDialog
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
					prop: "originValue",
					label: "当前配置"
				}, ],
				tableData: [],
				dialogTitle: '系统配置修改',
				dialogVisible: false,
				dialogData: ''
			}
		},
		created() {
			this.getTableList();
		},
		methods: {
			getTableList() {
				this.$http.getSysSetting().then((res) => {
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
				this.dialogVisible = true;
				if (row.type == 'select') {
					row.options = [];
					let obj = row.value;
					for (let key in obj) {
						row.options.push({
							label: key,
							value: obj[key]
						})
					}
					console.log(row.options);
				}
				this.dialogData = row;
			},
			alterSystem(id,value){
				console.log(id,value);
				this.$http.updateSysSetting({id,value}).then((res) => {
					console.log(res);
					if (res.errorcode == 0) {
						this.getTableList();
						this.dialogVisible = false;
						this.$message.success('修改成功');
					} else {
						this.$message.error(res.msg);
					}
				}).catch((err) => {
					console.log(err)
				});
			}
		}
	}
</script>

<style>
</style>
