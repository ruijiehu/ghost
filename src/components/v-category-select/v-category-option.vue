<template>
    <div
      :class="{
        'rg-item': true,
        active: isActive,
        single: isSingleLine
      }"
      @click.stop="itemSelect"
      v-text="label"
      >
    </div>
</template>

<script>
export default {
  name: 'v-category-option',
  data () {
    return {}
  },
  props: {
    // 是否选中
    isActive: {
      type: Boolean,
      default: false
    },
    // 标签内容
    label: {
      type: String,
      default: ''
    },
    isSingleLine: {
      type: Number,
      default: 0
    },
    // 值
    value: {
      type: String,
      default: ''
    },
    // 内容类型,如一个面板，上面可能是区域，下面是部门
    valueType: {
      type: String
    },
    // 是否块级排版，单独一行
    block: {
      type: Boolean,
      default: false
    },
    // 用层级来判断是否可以被触发请求
    regionDeptLevel: {
      type: String,
      default: ''
    },
    // 是否被禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 选项选中的值
    itemSelect () {
      if (this.disabled) return
      const item = {
        label: this.label,
        value: this.value,
        type: this.valueType,
        disabled: this.disabled,
        regionDeptLevel: this.regionDeptLevel
      }
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="less" scoped>
.rg-item {
    display: inline-block;
    border-radius: 2px;
    margin-right: 5px;
    color: #777;
    line-height: 20px;
    margin: 0;
    overflow: hidden;
    padding: 3px 10px;
    position: relative;
    text-align: left;
    white-space: nowrap;
    font-size: 14px;
    color: black;
    cursor : pointer;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    &.single{
      display: block;
      width: fit-content;
      margin-bottom: 6px;
    }
    &:hover{
      color: black;
      background-color: #F5F5F5;
    }
    &.active {
      background-color: #55A2E6;color: white;
    }
}
</style>
