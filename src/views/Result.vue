<template>
  <div class="result">
    <Menu mode="horizontal" theme="dark" active-name="1" @on-select="menuHandle">
      <MenuItem name="1">
        <Icon type="arrow-left-a"/>返回
      </MenuItem>
    </Menu>
    <Card style="width: 500px; margin: auto; text-align: left; margin-top: 20px;" :bordered="false" dis-hover>
      <p>补液总量</p>
      <Slider v-model="totalLiquid" :min="totalLiquidRange.min" :max="totalLiquidRange.max" :step="10" show-stops show-input></Slider>
      <Tabs style="margin-top: 30px">
        <TabPane name="1" v-if="expandLiquid != 0" label="扩容">
          <!-- 扩容的张力单独设定 -->
          <Instraction :dose="expandLiquid" tension="1" :notes="['30～60分钟内','静脉推注','或快速滴注']"></Instraction>
        </TabPane>
        <TabPane name="2" label="累计损失量">
          <!-- 累积损失量的张力是根据血浆渗透压的情况而定的， 在home页中以单独计算并保存入数据库中 -->
          <Instraction :dose="accumulateLiquid" :tension="tension" :notes="['静脉滴注','8～12h','或8～10ml/kg·h']"></Instraction>
        </TabPane>
        <TabPane name="3" label="继续损失量及生理需要量">
          <Instraction :dose="totalLiquid / 2" tension="1/2" :notes="['静脉滴注','16～18h','或5ml/kg·h']"></Instraction>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { Card, Slider, Tabs, TabPane, Menu, MenuItem, Icon } from 'iview'
import Instraction from '@/components/Instractions.vue'

export default {
  name: 'result',
  components: {
    Card,
    Slider,
    Tabs,
    TabPane,
    Menu,
    MenuItem,
    Icon,
    Instraction
  },
  data () {
    return {
      totalLiquid: this.$store.state.totalLiquidRange.min,
      totalLiquidRange: this.$store.state.totalLiquidRange,
      expandLiquid: this.$store.state.expandLiquid,
      tension: this.$store.state.tension
    }
  },
  computed: {
    accumulateLiquid: function() {
      return this.totalLiquid / 2 - this.expandLiquid
    }
  },
  methods: {
    menuHandle(index) {
      if (index === '1') {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
.result {
  height: 400px;
}
</style>
