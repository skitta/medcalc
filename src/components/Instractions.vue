<template>
  <div>
    <div>
      <Tag color="green">总量 {{dose}} ml</Tag>
      <Tag color="blue">张力 {{tension}}</Tag>
    </div>
    <Card dis-hover style="margin-top: 20px;">
        <div class="float">
          <div>10% NaCl {{ tenPersentNaCl }} ml</div>
          <div>5% NaHCO3 {{ fivePersentNaHCO3 }} ml</div>
          <div>10% G.S {{ dose - tenPersentNaCl - fivePersentNaHCO3 }} ml</div>
        </div>
        <div class="float slash"></div>
        <div class="float notes">
          <p v-for="n in notes">{{n}}</p>
        </div>
        <div style="clear: both;"></div>
    </Card>
  </div>
</template>

<script>
import {Card, Tag} from 'iview'

export default {
  name: "Instraction",
  components: {
    Card,
    Tag
  },
  data() {
    return {};
  },
  props:{
    tension: String,
    dose: Number,
    notes: Array
  },
  computed: {
    tenPersentNaCl: function() {
      var nacl = 0
      switch (this.tension) {
        case "1/2":
          nacl = Math.round(this.dose / 2 * 0.06);
          break;
        case "1/3":
          nacl = Math.round(this.dose / 3 * 0.06);
          break;
        case "2/3":
          nacl = Math.round(this.dose * 2 / 3 * 0.06);
          break;
        default:
          nacl = Math.round(this.dose * 0.06);
          break;
      }
      return nacl
    },
    fivePersentNaHCO3: function() {
      var nahco3 = 0
      switch (this.tension) {
        case "1/2":
          nahco3 = Math.round(this.dose / 2 * 0.093);
          break;
        case "1/3":
          nahco3 = Math.round(this.dose / 3 * 0.093);
          break;
        case "2/3":
          nahco3 = Math.round(this.dose * 2 / 3 * 0.093);
          break;
        default:
          nahco3 = Math.round(this.dose * 0.093);
          break;
      }
      return nahco3
    }
  }
};
</script>

<style scoped>
.float {
  float: left;
}

.slash {
  height: 63px;
  width: 20px;
  margin-left: 10px;
  margin-right: 10px;
  background-image: url('../assets/slash.svg')
}

/* .notes {
  width: 100px;
} */
</style>
