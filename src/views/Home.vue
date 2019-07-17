<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <PatentsTable></PatentsTable>
  </div>
</template>

<script>
import PatentsTable from '@/components/PatentsTable'

// window.data = patentes

export default {
  name: 'home',
  components: {
    PatentsTable
  }
}
</script>

<style lang="stylus">
.el-select
  width 100%
.el-tag
  margin 0 5px 5px 0
.el-dialog__body
  .el-row
    margin-bottom 5px
    border-bottom 1px solid lightgrey
    padding 5px
</style>
