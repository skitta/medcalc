<template>
  <div class="main form">
    <Card>
      <h3 slot="title">补液计算器</h3>
      <Form ref="formValidate" :model="formItem" :label-width="80" :rules="validate">
        <FormItem label="体重" prop="weight">
          <Input v-model="formItem.weight" number=true @on-change="handleChange">
            <span slot="append">kg</span>
          </Input>
        </FormItem>
        <FormItem label="严重程度">
          <Select v-model="formItem.level" @on-change="handleChange">
            <Option value="1">轻度</Option>
            <Option value="2">中度</Option>
            <Option value="3">重度</Option>
          </Select>
        </FormItem>
        <FormItem label="渗透压">
          <Select v-model="formItem.pressure" @on-change="handleChange">
            <Option value="0">等渗</Option>
            <Option value="1">低渗</Option>
            <Option value="2">高滲</Option>
          </Select>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="补碱">
              <i-switch v-model="formItem.hasSoda" size="large" @on-change="handleChange">
                <span slot="yes">On</span>
                <span slot="no">Off</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="扩容">
              <i-switch v-model="formItem.hasExpand" size="large" @on-change="handleChange">
                <span slot="yes">On</span>
                <span slot="no">Off</span>
              </i-switch>
            </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">开始计算</Button>
        </FormItem>
      </Form>
    </Card>

    <transition name="fade">
    <Card v-if="showResult" style="margin-top: 10px">
      <p>补液总量</p>
      <Slider v-model="totalLiquid" :min="totalLiquidRange.min" :max="totalLiquidRange.max" :step="10" show-stops show-input></Slider>
      <Collapse style="margin-top: 30px">
        <Panel name="1" v-if="formItem.hasExpand">
          扩容 {{ expandLiquid }} ml
          <div slot="content">
            <div>10% NaCl {{ Math.round(expandLiquid * 0.06) }} ml </div>
            <div>5% NaHCO3 {{ Math.round(expandLiquid * 0.093) }} ml </div>
            <div>10% G.S {{ expandLiquid - Math.round(expandLiquid * 0.06) - Math.round(expandLiquid * 0.093) }} ml </div>
          </div>
        </Panel>
        <Panel name="2">
          累计损失量 {{ totalLiquid / 2 - expandLiquid }} ml
          <div slot="content">
            <div v-if="formItem.pressure==='0'">
              <!-- <p>张力 1/2</p> -->
              <!-- <div>10% NaCl {{ Math.round((totalLiquid / 2 - expandLiquid) / 2 * 0.06) }} ml</div>
              <div>5% NaHCO3 {{ Math.round((totalLiquid / 2 - expandLiquid) / 2 * 0.093) }} ml</div>
              <div>10% G.S {{ totalLiquid / 2 - expandLiquid - Math.round((totalLiquid / 2 - expandLiquid) / 2 * 0.06) - Math.round((totalLiquid / 2 - expandLiquid) / 2 * 0.093) }} ml</div> -->
              <Instraction :dose="accumulateLiquid" :tension="'1/2'"/>
            </div>
            <div v-if="formItem.pressure==='1'">
              <div>10% NaCl {{ Math.round((totalLiquid / 2 - expandLiquid) / 3 * 2 * 0.06) }} ml</div>
              <div>5% NaHCO3 {{ Math.round((totalLiquid / 2 - expandLiquid) / 3 * 2 * 0.093) }} ml</div>
              <div>10% G.S {{ totalLiquid / 2 - expandLiquid - Math.round((totalLiquid / 2 - expandLiquid) / 3 * 2 * 0.06) - Math.round((totalLiquid / 2 - expandLiquid) / 3 * 2 * 0.093) }} ml</div>
            </div>
            <div v-if="formItem.pressure==='2'">
              <div>10% NaCl {{ Math.round((totalLiquid / 2 - expandLiquid) / 3 * 0.06) }} ml</div>
              <div>5% NaHCO3 {{ Math.round((totalLiquid / 2 - expandLiquid) / 3 * 0.093) }} ml</div>
              <div>10% G.S {{ totalLiquid / 2 - expandLiquid - Math.round((totalLiquid / 2 - expandLiquid) / 3 * 0.06) - Math.round((totalLiquid / 2 - expandLiquid) / 3 * 0.093) }} ml</div>
            </div>
          </div>
        </Panel>
        <Panel name="3">
          继续损失量及生理需要量 {{ totalLiquid / 2 }} ml
          <div slot="content">
            <div>10% NaCl {{ Math.round((totalLiquid / 2) / 2 * 0.06) }} ml</div>
            <div>5% NaHCO3 {{ Math.round((totalLiquid / 2) / 2 * 0.093) }} ml</div>
            <div>10% G.S {{ totalLiquid / 2 - Math.round((totalLiquid / 2) / 2 * 0.06) - Math.round((totalLiquid / 2) / 2 * 0.093) }} ml</div>
          </div>
        </Panel>
      </Collapse>
    </Card>
    </transition>
  </div>
</template>

<script>
import Instraction from './Instractions.vue'
export default {
  name: 'Medcalc',
  components: {
    Instraction
  },
  data () {
    return {
      formItem: {
        weight: 0,
        level: '1',
        pressure: '0',
        hasSoda: true,
        hasExpand: false
      },
      validate: {
        weight: [
          {type: 'number', message: '请输入数字', trigger: 'blur'}
        ]
      },
      totalLiquidRange: {
        min: 0,
        max: 10
      },
      totalLiquid: 0,
      expandLiquid: 0,
      accumulateLiquid: () => { return totalLiquid / 2 - expandLiquid },
      showResult: false
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          switch(this.formItem.level) {
            case '1':
              this.totalLiquidRange.min = this.formItem.weight * 90
              this.totalLiquidRange.max = this.formItem.weight * 120
            break
            case '2':
              this.totalLiquidRange.min = this.formItem.weight * 120
              this.totalLiquidRange.max = this.formItem.weight * 150
            break
            case '3':
              this.totalLiquidRange.min = this.formItem.weight * 150
              this.totalLiquidRange.max = this.formItem.weight * 180
            break
            default:
              this.totalLiquidRange.min = 0
              this.totalLiquidRange.max = 10
            break
          }

          this.totalLiquid = this.totalLiquidRange.min
          
          if (this.formItem.hasExpand) {
            this.expandLiquid = this.formItem.weight * 20
          } else {
            this.expandLiquid = 0
          }

          this.showResult = true
        } else {
          this.$Message.error('请正确填写表单！')
        }
      })
    },
    handleChange(event){
      this.showResult = false
    }
  }
}
</script>

<style scoped>
h3 {
  text-align: center;
}

.main {
  text-align: left;
}

.form {
  width: 500px;
  margin: auto;
}

.fade-enter-active, .fade-leave-active {
  transition: all .3s ease;
}

.fade-enter, .fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
