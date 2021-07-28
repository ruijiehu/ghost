<template>
    <div class="tabselector">
       <div class="rg-caller-container" ref="caller">
         <v-category-trigger
         :showText = "text"
         :value="value"
         :disabled="disabled"
         :minWidth="minWidth"
         :minHeight="minHeight"
         @clear="clear"
         :buttonTxtMaxWidth="buttonTxtMaxWidth"
         :isShow = "showDropDown"
         v-if="triggerMode==='full'"
         ></v-category-trigger>
         <v-category-trigger-simple
         v-else
         :showText = "text"
         :value="value"
         :disabled="disabled"
         :minWidth="minWidth"
         :minHeight="minHeight"
         @clear="clear"
         :buttonTxtMaxWidth="buttonTxtMaxWidth"
         :isShow = "showDropDown"
         ></v-category-trigger-simple>
       </div>
       <transition name="f22ade">
        <div class="rg-drop-down" v-show="showDropDown" @click.stop="handleDropDown(true)">
          <v-drop-down ref="drop"  :embed="true">
            <div class="drop-down-flatdrill-container">
              <div class="rg-header">
                <v-category-current-path
                :current="optionDatas.current"
                @pathNodeSelect="pathNodeSelect"
                :value="value"
                :currentValueType="currentValueType"
                :label="currentLabel"
                >

                </v-category-current-path>
              </div>
              <el-autocomplete
                value-key="label"
                class="inline-input"
                style="width:100%;padding: 5px;box-sizing: border-box;"
                v-model="searchKey"
                :fetch-suggestions="querySearch"
                :placeholder="placeholder"
                :trigger-on-focus="false"
                @select="searchSelect"
              ></el-autocomplete>
              <div
                class="drop-down-flatdrill-container--inner"
                v-loading="isLoading"
              >
                <template
                  v-if="
                    optionDatas.parent.length > 0 || optionDatas.sub.length > 0
                  "
                >
                  <div
                    class="rg-results-container category"
                    v-if="optionDatas.parent.length > 0"
                  >
                    <div class="rg-results">
                      <v-category-option
                        v-for="(item, index) in optionDatas.parent"
                        :key="index"
                        :region-dept-level="item.level"
                        :label="item.label"
                        :value="item.value"
                        :isActive="item.value === currentValue"
                        :disabled="item.disabled"
                        valueType="parent"
                        :isSingleLine="item.singleLine"
                        @select="pathNodeSelect"
                        >
                      </v-category-option>
                    </div>
                  </div>
                  <span class="divide" v-if="optionDatas.sub.length > 0"></span>
                  <div
                    class="rg-results-container"
                    v-if="optionDatas.sub.length > 0"
                  >
                    <div class="rg-results">
                      <v-category-option
                        v-for="(item, index) in optionDatas.sub"
                        :key="index"
                        :region-dept-level="item.level"
                        :label="item.label"
                        :value="item.value"
                        :isActive="item.value === currentValue"
                        valueType="sub"
                        :isSingleLine="item.singleLine"
                        @select="pathNodeSelect"
                        >
                      </v-category-option>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="empty">无匹配条目</div>
                </template>
              </div>
              <div class="action">
                <el-button type="info" size="mini" @click.stop="cancel()"
                  >&nbsp;取消&nbsp;
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click.stop="done()"
                >
                  &nbsp;确定 &nbsp;</el-button
                >
              </div>
            </div>
          </v-drop-down>
        </div>
      </transition>
    </div>
</template>

<script>
import dropDown from 'v-dropdown'
import _ from 'lodash'
import $ from 'jquery'
import VCategoryTrigger from './v-category-trigger'
import VCategoryTriggerSimple from './v-category-trigger-simple'
import VCategoryOption from './v-category-option'
import VCategoryCurrentPath from './v-category-current-path'
import {
  SELECT_PREFIX, SELECT_STUB_TEXT, PARENT_TYPE, SUB_TYPE, EMPTY_STR, TRIGGER_MODE_FULL, TRIGGER_MODE_SIMPLE
} from './const'

export default {
  name: 'v-category-select',
  data () {
    return {
      // trigger按钮显示内容
      text: '请选择',
      // 当前选中的value
      currentValue: '',
      // 当前选中的valueType
      currentValueType: '',
      // 当前选中的label
      currentLabel: '',
      // value值对应的label
      label: '',
      // 是否显示下拉面板
      showDropDown: false,
      // 当前的面板信息值
      optionDatas: {
        parent: [],
        sub: []
      },
      // 搜索的关键词
      searchKey: '',
      // 是否正在加载中
      isLoading: false,
      // 是否正在清除
      clearing: false,
      temDeptAreaList: [] // 临时存储区域部门数据，适用于问题清单页面->村社区/部门选项
    }
  },
  props: {
    // 当前的值
    value: {
      type: String
    },
    valueType: {
      type: String
    },
    // 最后显示在选择按钮上的样式，full为当前选择 （selectedText） xxx/xxx  simple为：(currentLabel)
    triggerMode: {
      type: String,
      validator: (value) => {
        return [TRIGGER_MODE_FULL, TRIGGER_MODE_SIMPLE].indexOf(value) !== -1
      },
      default: TRIGGER_MODE_FULL
    },
    // 获取数据接口
    fetchDrillData: Function,
    // 搜索接口
    querySearch: Function,
    // 按钮最大宽度
    buttonTxtMaxWidth: {
      type: String,
      default: '500px'
    },
    // 输入占位符
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    // 按钮最小宽度
    minWidth: {
      type: String,
      default: ''
    },
    // 按钮最小高度
    minHeight: {
      type: String,
      default: ''
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    // 允许提交的类型
    submitType: {
      type: String
    }
  },
  computed: {
    // 是否允许提交
    allowSubmit () {
      if (this.submitType) {
        return this.currentValueType === this.submitType
      }
      return true
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (nv, ov) {
        if (!ov && nv) {
          // 需要将value信息赋予给currentValue
          this.setCurrentInfo(nv, '', this.valueType)
          this.setSelectedText()
        }
        if (!ov || this.currentValue !== nv) {
          this.setCurrentInfo(nv, '', this.valueType)
          nv && this.getData(true)
        }
      }
    },
    searchKey (nv) {
      if (nv) {
        if (nv) {
          this.$nextTick(() => {
            $('body').addClass('zIndexSuggestion')
          })
        } else {
          $('body').removeClass('zIndexSuggestion')
        }
      }
    }
  },
  mounted () {
    const that = this
    this.open()
    // 设置点击到其他区域后弹窗消失
    $(document).on('click', (e) => {
      that.handleDropDown(false)
    })
  },
  methods: {
    // 确定按钮按下后，组件
    done () {
      this.setValueInfo(this.currentValue, this.currentValueType, this.currentLabel)
      this.handleDropDown(false)
    },
    // 取消按钮
    cancel () {
      this.handleDropDown(false)
    },
    // 头部当前项选中事件
    pathNodeSelect (item) {
      this.setCurrentInfo(item.value, item.label, item.type)
      if (item.type === PARENT_TYPE) {
        this.getData()
      }
    },
    // 当前被选中的值，作为中间态，只有确定后才会被作为value
    setCurrentInfo (value, label, type) {
      this.currentValue = value
      this.currentValueType = type
      this.currentLabel = label
    },
    /**
     * 包含以下动作
     * 触发input 实现v-model双向绑定
     * 触发change事件
     * 同步当前的currentValue
     * 同步当前的currentValueType
     * 设置选中的文字
     */
    setValueInfo (value, valueType, label) {
      this.setCurrentInfo(value, label, valueType)
      this.$emit('input', value)
      this.$emit('update:valueType', valueType)
      this.$emit('change', {
        value,
        label,
        type: valueType
      })
      this.$nextTick(() => {
        this.setSelectedText()
      })
    },
    // 选中之后赋值并清除下拉弹窗
    searchSelect (item) {
      this.setValueInfo(item.value, item.valueType, item.displayLabel || item.label)
      this.getData(true, true)
      this.handleDropDown(false)
    },
    /**
     *  设置按钮上选中的值
     *  如果value值没有的话，则设置为 ‘请选择’
     *  否则的话，则根据当前的options current路径拼接
     * */
    setSelectedText () {
      if (!this.value) {
        this.text = SELECT_STUB_TEXT
      } else {
        const showLabelArr = _.map(this.optionDatas.current, 'label')
        if (this.valueType === PARENT_TYPE) {
          this.text = this.triggerMode === TRIGGER_MODE_FULL ? `${SELECT_PREFIX}:${showLabelArr.join(
            '/'
          )}` : showLabelArr.slice(-1)[0]
        } else if (this.valueType === SUB_TYPE) {
          this.text = this.triggerMode === TRIGGER_MODE_FULL ? `${SELECT_PREFIX}:${showLabelArr.join(
            '/'
          )}/${this.currentLabel}` : this.currentLabel
        } else {}
      }
    },
    /**
     * 获取数据,当前类型不同，fetchDrillData中传参不一样,setSelected字段是表示请求完数据是否直接设置选中text
     * 一般在组件初始复制value或者手动传入value需要出发setSelected = ture
     * fromSearch 字段标识从搜索触发获取数据，如果搜出的结果是部门，由于current-path组件路径拼接机制
     *  需要将current最后一级去除，保持和选中操作获取的current级别一致
     *  */

    getData (setSelectedText = false, fromSearch = false) {
      this.isLoading = true
      const parent = this.currentValueType === PARENT_TYPE ? this.currentValue : ''
      const sub = this.currentValueType === SUB_TYPE ? this.currentValue : ''
      this.fetchDrillData(parent, sub, (datas, hideCurrentList) => {
        this.isLoading = false
        // 对是否放到首页进行排序
        datas.sub = _.sortBy(datas.sub, (item) => -item.singleLine)
        // 覆盖面板的数据，以防止被初始化到下一级
        this.temDeptAreaList = Object.assign({}, datas)
        if (hideCurrentList) {
          if (datas.current.length > 1) {
            const { parent } = this.optionDatas
            datas.parent = parent
          }
          datas.sub = []
        }
        this.optionDatas = datas
        const currentData = _.cloneDeep(datas.current)
        if (this.currentValueType === SUB_TYPE) {
          this.current = datas.current = currentData.slice(0, currentData.length - 1)
        } else {
          this.current = currentData
        }
        if (Array.isArray(currentData) && currentData.length > 0) {
          const targetValue = [...currentData].slice(-1)[0]
          this.setCurrentInfo(targetValue.value, targetValue.label, targetValue.valueType)
          if (setSelectedText) {
            this.setSelectedText()
            this.$emit('passDepatEvent')
          }
          // 如果选择了二级菜单，将隐藏面板
          if (datas.current.length > 1 && hideCurrentList) this.done()
        }
      })
    },
    // option内容选中
    // 处理面板显示或者隐藏
    handleDropDown (show) {
      this.showDropDown = show
    },
    // 打开
    open () {
      const that = this
      const doms = document.getElementsByClassName('rg-caller-container')
      for (let i = 0; i < doms.length; i++) {
        doms[i].addEventListener('click', function (e) {
          if (that.disabled) return
          e.stopPropagation()
          if (that.$refs.caller === this) {
            that.showDropDown = !that.showDropDown
            // 每次通过按钮打开下拉面板需要判断上次选择的值有没有确定，如果最后value和currentValue的值不一样，下次打开需要重新加载面板选项
            if (that.showDropDown) {
              if (that.currentValue !== that.value) {
                that.setCurrentInfo(that.value, '', that.valueType)
                that.getData(false)
              }
            }
          } else {
            that.showDropDown = false
          }
        })
      }
      this.searchKey = ''
    },
    // 清空选中的信息
    clear () {
      this.searchKey = ''
      this.setValueInfo(EMPTY_STR, EMPTY_STR, EMPTY_STR)
      this.$nextTick(() => {
        this.optionDatas = {
          parent: [],
          sub: []
        }
        this.$emit('clear')
      })
    }
  },
  components: {
    'v-category-trigger': VCategoryTrigger,
    'v-category-trigger-simple': VCategoryTriggerSimple,
    'v-category-option': VCategoryOption,
    'v-category-current-path': VCategoryCurrentPath,
    'v-drop-down': dropDown
  }

}
</script>

<style lang="less" scoped>
@darkBg: #F5F5F5;
.tabselector {
  position: relative;
  .rg-caller-container{
    display: inline-block;
  }
  .rg-drop-down {
    position: absolute;
  }
  div.rg-header {
      min-width: 400px;
      background-color: @darkBg;
      & > h3 {
          padding: 6px 80px 10px 10px;
          margin: 0;
          text-align: left;
          color: #24292e;
          font-size: 16px;
          white-space: nowrap;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          .rg-header-selected{
              white-space: nowrap;
              text-overflow: ellipsis;
              -o-text-overflow: ellipsis;
              overflow: hidden;
              font-size: 14px;
              max-width: 310px;
              display: inline-block;
          }
      }
      button{
          position: absolute;
          -webkit-appearance: none;
          padding: 0;
          cursor: pointer;
          background: 0 0;
          border: 0;
          outline: none;
          line-height: 100%;
          color: #999999;
          top: 3px;
          font-size: 20px;
          &.rg-close-button { right: 10px;font-size: 26px;top:0;font-weight: 300; }
          &.rg-removeall-button { right: 32px; }
          &.rg-done-button { /*right: 54px;*/right: 8px;top: 4px;i{font-size: 18px;} }
          &:hover { color: black; }
      }
  }
  .drop-down-flatdrill-container {
    box-sizing: border-box;
    padding: 10px 12px;
    width: 100%;
    .drop-down-flatdrill-container--inner {
      max-height: 200px;
      min-height: 100px;
      overflow-y: scroll;
      .rg-results-container {
        overflow: visible;
          background-color: white;
          list-style: none;
          margin: 0;
          padding: 0;
          position: relative;
          width: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          clear: both;
          border-bottom-left-radius: 2px;
          border-bottom-right-radius: 2px;
          .rg-results {
            background-color: white;
            list-style: none;
            margin: 0;
            padding: 5px;
            width: 400px;
          }
      }
      .divide {
        display: block;
        width: 94%;
        margin: 4px auto;
        height: 1px;
        border-bottom: 1px dashed #767676;
      }
      .empty {
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: #767676;
      }
    }
    .action {
      margin-top: 12px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
