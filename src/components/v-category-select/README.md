```js
<v-category-select  placeholder="搜索部门名称"
  :valueType.sync="valueType"
  :fetchDrillData="fetchDrillData"
  :querySearch="querySearch"
  v-model="orgcode"
  @clear="clear"
  @change="deptChange"
  >
</v-category-select>
```
valueType.sync - 父子组件双向同步，类型值（代表该选中类型是`区域`或者`部门`）
fetchDrillData - 在组件的层级选择中不停会回调，调用数据接口
querySearch - 搜索框的远程搜索
v-model - 选中的值
@clear - 清除事件
@change - 触发变化事件