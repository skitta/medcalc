<template>
  <div class="home">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <MenuItem name="1" style="float:none;">
        <Icon type="ios-paper"/>
        补液计算器
      </MenuItem>
    </Menu>
    <Card style="width: 500px; margin: auto; text-align: left; margin-top: 20px;" :bordered="false" dis-hover>
      <Form ref="formValidate" :model="formItem" :label-width="80" :rules="validate">
        <FormItem label="体重" prop="weight">
          <Input v-model="formItem.weight" number="true">
            <span slot="append">kg</span>
          </Input>
        </FormItem>
        <FormItem label="严重程度">
          <Select v-model="formItem.level">
            <Option value="1">轻度</Option>
            <Option value="2">中度</Option>
            <Option value="3">重度</Option>
          </Select>
        </FormItem>
        <FormItem label="渗透压">
          <Select v-model="formItem.pressure">
            <Option value="0">等渗</Option>
            <Option value="1">低渗</Option>
            <Option value="2">高滲</Option>
          </Select>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="补碱">
              <i-switch v-model="formItem.hasSoda" size="large">
                <span slot="yes">On</span>
                <span slot="no">Off</span>
              </i-switch>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="扩容">
              <i-switch v-model="formItem.hasExpand" size="large">
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
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Card, Form, FormItem, Input, Select, Option, Switch, Button, Row, Col, Message } from 'iview'

export default {
  name: 'home',
  components: {
    Menu,
    MenuItem,
    Icon,
    Card,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    'i-switch': Switch,
    Button,
    Row,
    Col,
    Message
  },
  data () {
    return {
      formItem: {
        weight: 1,
        level: '2',
        pressure: '1',
        hasSoda: true,
        hasExpand: false
      },
      validate: {
        weight: [
          {type: 'number', message: '请输入数字', trigger: 'blur'}
        ]
      },
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          var totalLiquidRange = {min: 0, max: 10}
          switch(this.formItem.level) {
            case '1':
              totalLiquidRange.min = this.formItem.weight * 90
              totalLiquidRange.max = this.formItem.weight * 120
            break
            case '2':
              totalLiquidRange.min = this.formItem.weight * 120
              totalLiquidRange.max = this.formItem.weight * 150
            break
            case '3':
              totalLiquidRange.min = this.formItem.weight * 150
              totalLiquidRange.max = this.formItem.weight * 180
            break
            default:
              totalLiquidRange.min = 0
              totalLiquidRange.max = 10
            break
          }
          this.$store.dispatch('setItem', this.formItem)
          this.$store.dispatch('setRange', totalLiquidRange)
          if (this.formItem.hasExpand) {
            this.$store.dispatch('setExpand', this.formItem.weight * 20)
          } else {
            this.$store.dispatch('setExpand', 0)
          }
          switch (this.formItem.pressure) {
            case '0':
              this.$store.dispatch('setTension', '1/2')
              break;
            case '1':
              this.$store.dispatch('setTension', '2/3')
              break;
            case '3':
              this.$store.dispatch('setTension', '1/3')
              break;
            default:
              break;
          }
          this.$router.push({name: 'result'})
        } else {
          this.$Message.error('请正确填写表单！')
        }
      })
    }
  },
}
</script>

<style scoped>
.home {
  height: 400px;
}
</style>
