<template id="tableList">
<el-table :data="tableData" :header-cell-style="headerColor" :cell-style="cellStyle" stripe >
  <el-table-column v-for="(title,i) in titles" :key="i" :prop="title.prop" :width="title.width" :label="title.label" :class-name="title.prop" align='center'>
  </el-table-column>
  <el-table-column label="操作" v-if="operate" align="center" width="130">
    <template slot-scope="scope">
		<div v-if="flag == 'system'">
			<el-button type="primary" size="small" plain  @click="edit(scope.row)">修改配置</el-button>
		</div>
    </template>
  </el-table-column>
</el-table>
</template>
<script>
export default {
  name: 'tableList',
  props: ['tableData', 'titles', 'operate','flag'],
  data() {
    return {

    }
  },
  methods: {
    headerColor(row, rowIndex) {
      return 'background:	rgb(230, 230, 230);color:rgb(96, 98, 102)';
    },
    cellStyle(row, column, rowIndex, columnIndex) {
      if (row.column.className == 'status' && row.row.status == '成功') {
        return 'color:rgba(16,217,176,1)'
      } else if (row.column.className == 'status' && row.row.status == '失败') {
        return 'color:rgba(255,147,117,1)'
      }
    },
	edit(row){
		this.$emit('editTable', row);
	}

  }
}
</script>
<style >
.el-table th>.cell {
  text-align: center;
}

.el-table .cell {
  white-space: pre-line !important;
}
</style>
