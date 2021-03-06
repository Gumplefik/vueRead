/* global Vue */

var apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

/**
 * Actual demo
 */

const extend = {
  created() {
    console.log(this);
  },
  mounted() {
    this.test()
  },
  methods: {
    test() {
      console.log('test')
    }
  }
}

new Vue({

  el: '#demo',

  data: {
    branches: ['master', 'dev'],
    currentBranch: 'master',
    commits: null
  },

  extends: extend,
  created: function () {
    this.fetchData()
  },

  computed: {
    b () {
      return this.currentBranch + '123213'
    }
  },

  watch: {
    currentBranch() {
      return this.currentBranch + '666'
    }
  },

  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    fetchData: function () {
      var self = this
      if (navigator.userAgent.indexOf('PhantomJS') > -1) {
        // use mocks in e2e to avoid dependency on network / authentication
        setTimeout(function () {
          self.commits = window.MOCKS[self.currentBranch]
        }, 0)
      } else {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', apiURL + self.currentBranch)
        xhr.onload = function () {
          self.commits = JSON.parse(xhr.responseText)
          console.log(self.commits[0].html_url)
        }
        xhr.send()
      }
    }
  }
})
