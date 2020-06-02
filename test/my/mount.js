import Vue from 'src/platforms/web/entry-runtime-with-compiler'

const VnodeConstructor = Vue.extend({
  components: {
    redText
  },
  data() {
    return {
      a: 1
    }
  },
  computed: {
    b() {
      return this.a + 1
    }
  },
  created() {
    this.helloA()
  },
  mounted() {
    this.helloB()
  },
  methods: {
    helloA() {
      console.log('hello a')
    },
    helloB() {
      console.log('hello b')
    },
    handleClick () {
      this.a++
    }
  },
  template: '<div>Vue test {{ this.a }} {{ this.b }} </div>'
})
