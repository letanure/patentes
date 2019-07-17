<template>
  <div id="app">
    <el-container>
      <!-- <el-header>
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">
            <router-link to="/">Home</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/about">About</router-link>
          </el-menu-item>
        </el-menu>
      </el-header> -->
      <el-container>
        <el-aside :class="{aSideOpen}">
          <el-button
            class="toggleMenu"
            :icon=" aSideOpen ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"
            @click="toggleAside"
            circle
            >
          </el-button>

          <el-row :gutter="20">
            <el-col :span="24">
              <div class="label">Exibir colunas:</div>
              <ColumnsFilter></ColumnsFilter>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
<script>
import ColumnsFilter from '@/components/ColumnsFilter'

export default {
  name: 'app',
  components: {
    ColumnsFilter
  },
  data () {
    return {
      aSideOpen: false
    }
  },

  methods: {
    toggleAside () {
      this.aSideOpen = !this.aSideOpen
    }
  }
}
</script>
<style lang="stylus">
  body
    font-family 'Avenir', Helvetica, Arial, sans-serif
    font-family "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align left
    // color #2c3e50
    padding 0
    margin 0

  #app
    height 100vh

  .el-aside
    width 300px
    margin-left -250px
    transition margin .2s ease-in-out
    position relative
    background-color #99a9bf
    height 100vh
    will-change margin
    padding-top 60px
    padding-right 60px
    padding-left 10px

    &.aSideOpen
      margin-left 0

    .toggleMenu
      position absolute
      top 5px
      right 5px

    .label
      margin-bottom 3px
      color #fff
      font-size 14px

</style>
