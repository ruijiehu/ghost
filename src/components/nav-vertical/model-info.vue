<style>
.model-info .el-form-item__label {
  font-weight: bold;
}
</style>
<template>
  <div class="model-info">
    <el-dialog
      class="info-view"
      title="用户信息"
      :close-on-click-modal="false"
      :visible.sync="display"
      top="5%"
      :before-close="onClose"
    >
      <el-form :model.sync="userInfo" label-width="100px">
        <el-form-item label="用户名">
          <span>{{ userInfo && userInfo.username }}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{ userInfo && userInfo.nickName }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'model-info',
  props: ['display', 'userInfo'],
  methods: {
    onClose () {
      this.$emit('close')
    }
  }
}
</script>
