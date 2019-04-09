<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import { CHECKCITY } from '@/config/urlConfig.js'
import Header from './Header.vue'
import Footer from './Footer.vue'

export default{
  components: {
    Header,
    Footer
  },
  created() {
    this.$http.get(CHECKCITY, {}).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {}
}
</script>
