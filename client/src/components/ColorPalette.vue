<template>
  <div class="colorPalette">
      <button v-for="info in palette"
      :key="info.id"
      :style="{'background-color': info.hex}"
      @click="setNewColor(info.hex)">
      {{ info.color }}, {{ hextoHueValue(info.hex) }}
      </button>
  </div>
</template>
<script>
import Mandelbrot2 from './Mandelbrot2'
export default {
  name:'ColorPalette',
  components: {
    Mandelbrot2
  },
  data() {
    return {
      newColorVal: 0,
      currentColor: 65,
      palette: [
        {
          color: 'blood orange',
          img: 0,
          hex: '#ff2f00',
        },
        {
          color: 'neon green',
          img: 0,
          hex: '#51ff00',
        },
        {
          color: 'summer blue',
          img: 0,
          hex: '#00d0ff',
        },
        {
          color: 'purple',
          img: 0,
          hex: '#c135e3',
        }
      ]
    }
  },
  methods: {
    setNewColor(newHex) {
      this.newColorVal = this.hextoHueValue(newHex);
      console.log('(from colorPal Comp)color btn clicked',this.newColorVal);
      this.$emit('update-color', this.newColorVal);
    },
    hextoHueValue(hex) {
      /**
       * Covert hex to RBG, RBG to base 10's to HSL
       * Return h (hue)
       */
      let r = 0, g = 0, b = 0, a = 1;
      if(hex.length == 7) {
        r = '0x' + hex[1] + hex[2];
        g = '0x' + hex[3] + hex[4];
        b = '0x' + hex[5] + hex[6];
      }
      r /= 255; // r = r/255
      g /= 255;
      b /= 255;
      let cmin = Math.min(r,g,b),
          cmax = Math.max(r,g,b),
          delta = cmax - cmin,
          h = 0,
          s = 0,
          l = 0
      if(delta == 0){
        h = 0;
      }else if(cmax == r){
        h = ((g-b)/delta) % 6;
      }else if(cmax == g) {
        h = (b-r / delta) + 2;
      }else {
        h = (r-g)/delta + 4;
      }
      h = Math.round(h * 60);
      if(h < 0) h+= 360;
      return h;
    }
  }
}
</script>
<style>


</style>