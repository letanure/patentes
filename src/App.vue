<template>
  <div id="app">
    <el-container>
      <!-- <el-aside width="200px">Aside</el-aside> -->
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
        <el-main>
          <router-view/>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
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

#navXX
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
</style>
