<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Filtros</span>
        <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
      </div>
      <el-row :gutter="20">
        <el-col :span="10">
          <small>Colunas</small>
          <el-select v-model="columnsToShow" multiple placeholder="Exibir colunas">
            <el-option
              v-for="item in columnsAvailable"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <small>Busca Classificação</small>
          <el-select v-model="classificationsActive" multiple placeholder="Classificaçoes">
            <el-option
              v-for="item in classifications"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-card>

    <el-table
      :data="patentesFiltered"
      stripe
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in columnsToShow"
        :key="index"
        :prop="item"
        :label="item"
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import patentes from '@/data/patentes.json'

export default {
  name: 'home',
  components: {
    // HelloWorld
  },
  data () {
    return {
      columnsToShow: [
        'STATUS',
        'PROCESSO',
        'CLASSIFICAÇÃO',
        'RESPONSÁVEL'
      ],
      columnsAvailable: Object.keys(patentes[0]),
      patentes: patentes,
      classificationsActive: []
    }
  },

  computed: {
    classifications () {
      let list = []
      patentes.forEach(item => {
        list = [...list, ...item['CLASSIFICAÇÃO'].split(', ')]
      })
      return [...new Set(list)]
    },
    patentesFiltered () {
      let list = patentes
      if (this.classificationsActive.length > 0) {
        list = list.filter(item => {
          return item['CLASSIFICAÇÃO'].split(' ,').every(elem => this.classificationsActive.indexOf(elem) > -1)
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
</style>
