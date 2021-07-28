<template>
  <div
    class="home-banner"
    :class="{
      'theme-yellow': theme === 'yellow',
      'theme-blue': theme === 'blue'
    }"
  >
    <v-category-select
      class="home-banner-area"
      placeholder="搜索部门名称"
      :valueType.sync="valueType"
      :fetchDrillData="getSub"
      :querySearch="querySearch"
      v-model="orgcode"
      :trigger-mode="modeType"
      @change="deptChange"
    ></v-category-select>
    <el-select
      v-model="periodIndex"
      class="home-banner-select"
      :style="{ width: 18 * list[periodIndex].topic.length + 'px' }"
      v-if="list.length > 0"
    >
      <template v-for="(item, index) in list">
        <el-option :key="index" :label="item && item.topic" :value="index">
        </el-option>
      </template>
    </el-select>
    <div class="home-banner-score" v-if="showScore">
      <span
        :class="tabIndex === 0 ? 'active-bottom-line' : ''"
        @click="tabIndex = 0"
        >当月得分</span
      >
      <span
        :class="tabIndex === 1 ? 'active-bottom-line' : ''"
        @click="tabIndex = 1"
        >总分</span
      >
      <p v-if="tabIndex === 0">{{ score.monthScore }}</p>
      <p v-if="tabIndex === 1">{{ score.yeaScore }}</p>
    </div>
  </div>
</template>

<script>
import VSelect from '@/components/home-v-category-select'
import { mixin } from '@/components/mixins.js'
import { getPeriod, getRegionScore } from '@/api/home'
import { mapGetters } from 'vuex'
import store from '@/store'
import { getDeptDetail } from '@/api/region'
export default {
  data () {
    return {
      TYPEORM: {
        R: 'parent',
        D: 'sub'
      },
      // 总分，当月得分
      tabIndex: 1,
      periodIndex: '',
      list: [],
      score: {},
      // 重写 mixins 的 orgcode 获取逻辑
      // valueType: '',
      orgcode: '',
      modeType: 'simple'
    }
  },
  props: {
    showScore: {
      type: Boolean,
      default: true
    },
    update: {
      type: Function
    },
    theme: {
      type: String,
      default: 'yellow'
    }
  },
  computed: {
    ...mapGetters('home', [
      'getPeriod',
      'getRegionId',
      'getScoreIndex',
      'getValueType'
    ])
  },
  watch: {
    valueType: {
      handler: function (newVal, oldVal) {
        store.commit('home/updateValueType', this.TYPEORM[newVal] || newVal)
      }
    },
    getValueType: {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal) {
          this.valueType = newVal
        }
      }
    },
    getScoreIndex: {
      handler: function (newVal, oldVal) {
        this.getScore()
      }
    },
    getRegionId: {
      handler: function (newVal, oldVal) {
        if (this.orgcode !== newVal) {
          this.orgcode = newVal
        }
      }
    },
    orgcode: {
      handler: function (newVal, oldVal) {
        if (!newVal) return
        store.commit('home/updateRegionId', newVal)
        this.getList()
        this.getScore()
        // 如果选择的区域为南湖区，则跳转到评估汇总
        if (
          newVal === '11111111111111111111111111111111' &&
          this.$route.name === 'homeDeduction'
        ) {
          this.$router.push({
            name: 'homeSummary'
          })
        }
        // 如果选择的区域为村社区和部门，则跳转到扣分情况
        getDeptDetail(newVal).then(res => {
          const region = res.data
          if (
            region.regionDeptLevel === '4' ||
            (region.regionDeptLevel === '3' && region.regionDeptType === 'D')
          ) {
            if (this.$route.name === 'homeSummary') {
              this.$router.push({
                name: 'homeDeduction'
              })
            }
          }
          // 如果是镇街道，则跳转到扣分情况
          if (
            oldVal === '11111111111111111111111111111111' &&
            region.regionDeptType === 'R'
          ) {
            if (this.$route.name === 'homeSummary') {
              this.$router.push({
                name: 'homeDeduction'
              })
            }
          }
        })
      }
    },
    periodIndex: {
      handler: function (newVal, oldVal) {
        store.commit('home/updatePeriod', this.list[newVal].period)
        this.getScore()
      }
    }
  },
  methods: {
    getScore () {
      if (!this.getRegionId || !this.getPeriod) return
      getRegionScore({
        periodYear: this.getPeriod,
        regionDeptId: this.getRegionId
      }).then(res => {
        this.score = res.data
      })
    },
    getList () {
      // 提前获取首页 banner 组件的周期列表
      getPeriod({
        regionId: this.getRegionId || store.state.region.regionDeptId,
        // 1 - 取上级区域部门周期 0 - 取当前区域部门周期
        parentFlag: this.$route.name === 'homeSummary' ? 0 : 1
      }).then(res => {
        this.list = res.data
        this.periodIndex = 0
        // 获取之前的区域 id ，没有则获取账号区域id
        this.orgcode = this.getRegionId || store.state.region.regionDeptId
      })
    }
  },
  components: {
    'v-category-select': VSelect
  },
  mixins: [mixin],
  beforeMount () {
    this.getList()
  },
  mounted () {}
}
</script>
<style scoped lang="less">
.active-bottom-line {
  font-weight: bold;
  position: relative;
  &::after {
    display: block;
    content: '';
    width: 40%;
    height: 2px;
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translate(-50%, 0);
    background: #fff;
  }
}
.theme-yellow {
  background-image: linear-gradient(0deg, #fec750 0%, #fdb567 100%);
}
.theme-blue {
  background-image: linear-gradient(-10deg, #6c70fd 0%, #72bcff 100%);
}
.home-banner {
  position: relative;
  width: 100%;
  height: 155px;
  display: inline-block;
  border-radius: 4px;
  padding: 30px 20px;
  box-sizing: border-box;
  color: #fff;
  &-area {
    position: absolute !important;
    left: 25px;
    top: 33px;
  }
  &-select {
    position: absolute;
    left: 25px;
    top: 78px;
    box-sizing: border-box;
    /deep/ .el-input__inner {
      border: none;
      background: transparent;
      color: #fff;
      font-size: 18px;
      padding: 0;
      &:hover {
        font-weight: bold;
      }
    }
    /deep/ .el-input__icon::before {
      color: #fff;
    }
  }
  &-score {
    position: absolute;
    right: 26px;
    top: 33px;
    text-align: right;
    > span {
      cursor: pointer;
      padding: 0 10px;
      font-size: 18px;
      color: #ffffff;
    }
    > p {
      position: absolute;
      right: 10px;
      top: 35px;
      margin: auto;
      font-size: 42px;
      color: #ffffff;
    }
  }
}
</style>
