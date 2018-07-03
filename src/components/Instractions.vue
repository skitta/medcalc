<template>
  <div>
    {{ calcDose(tension) }}
    <p>张力 {{tension}}</p>
    <div>10% NaCl {{ tenPersentNaCl }} ml</div>
    <div>5% NaHCO3 {{ fivePersentNaHCO3 }} ml</div>
    <div>10% G.S {{ tenPersentGS }} ml</div>
  </div>
</template>

<script>
export default {
    name: 'Instraction',
    data() {
        return {
            tenPersentNaCl: 0,
            fivePersentNaHCO3: 0,
            tenPersentGS: () => { return dose - tenPersentNaCl - fivePersentNaHCO3 }
        }
    },
    props: {
        tension: String,
        dose: Number
    },
    computed: {
      calcDose: (tension) => {
        switch (tension) {
          case '1/2':
            this.tenPersentNaCl = Math.round(dose / 2 * 0.06)
            this.fivePersentNaHCO3 = Math.round(dose / 2 * 0.093)
            break;
          case '1/3':
            this.tenPersentNaCl = Math.round(dose / 3 * 0.06)
            this.fivePersentNaHCO3 = Math.round(dose / 3 * 0.093)
            break;
          case '2/3':
            this.tenPersentNaCl = Math.round(dose * 2 / 3 * 0.06)
            this.fivePersentNaHCO3 = Math.round(dose * 2 / 3 * 0.093)
            break;
          default:
            this.tenPersentNaCl = 0
            this.fivePersentNaHCO3 = 0
            break;
        }
      }
    }
}
</script>
