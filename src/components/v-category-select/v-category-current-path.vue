<template>
    <h3>
        <span>当前选择:</span>
        <span
        class="currentLabels"
        v-if="current.length > 0"
        >
          <span
              v-for="(item, index) in current"
              :key="index"
              @click="currentItemSelect(item,index)"
          >
              <span
              class="currentLabels_name"
              :class="{
                  disabled: item.checkFlag === false,
                  active:
                  currentValueType === 'parent' &&
                  (index === current.length - 1)
              }"
              >
              {{ item.label }}
              <template v-if="index !== current.length - 1">
                  >
              </template>
              </span>
          </span>
          <span
              class="active"
              v-if="
              value && currentValueType === 'sub'
              "
          >
              >
              {{ label }}
          </span>
        </span>
        </h3>
</template>

<script>
import { SUB_TYPE } from './const'

export default {
  data () {
    return {}
  },
  props: {
    // 当下的组件选中值
    value: {
      type: String
    },
    // 当前的值类型
    currentValueType: {
      type: String
    },
    // 当前组件展示标签
    label: {
      type: String
    },
    // 当前组件的选中路径数组
    current: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /** 选中路径中的一个节点,如果允许选中才可以触发后续事件，checkFlag标识是否可以选中
     *  如果当前是最后一个则也不需要触发后续事件，比如请求面板数据等
    */
    currentItemSelect (item, index) {
      if (item.checkFlag && item.valueType !== SUB_TYPE) {
        const isLast = this.currentValueType === SUB_TYPE ? (this.current && this.current.length === index) : (this.current && this.current.length - 1 === index)
        if (!isLast) {
          const fireItem = {
            label: item.label,
            value: item.value,
            type: item.valueType
          }
          this.$emit('pathNodeSelect', fireItem)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.currentLabels {
  font-size: 14px;
  color: #767676;
  .currentLabels_name {
    cursor: pointer;
    &:hover {
      color: #66b1ff;
    }
  }
  .disabled {
    pointer-events: none;
    cursor: default !important;
    opacity: 0.6;
    &:hover {
      pointer-events: none;
      cursor: default !important;
      opacity: 0.6;
    }
  }
  span.active {
    color: #66b1ff;
    cursor: pointer;
  }
}
</style>
