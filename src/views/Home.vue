<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Filtros</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <small>Busca Classificação</small>
          <el-select v-model="classificationsActive" filterable multiple placeholder="Classificaçoes">
            <el-option
              v-for="item in classifications"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-card> -->

    <PatentsTable></PatentsTable>
  </div>
</template>

<script>
import PatentsTable from '@/components/PatentsTable'
import patentes from '@/data/patentes.json'

// window.data = patentes

export default {
  name: 'home',
  components: {
    PatentsTable
  },

  computed: {
    classifications () {
      let list = []
      patentes.forEach(item => {
        list = [...list, ...item['CLASSIFICAÇÃO']]
      })
      return [...new Set(list)]
    },
    patentesFiltered () {
      let list = patentes
      if (this.classificationsActive.length > 0) {
        list = list.filter(item => {
          return item['CLASSIFICAÇÃO'].every(elem => this.classificationsActive.indexOf(elem) > -1)
        })
      }
      return list
    }
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
