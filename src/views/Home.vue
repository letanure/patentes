<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Filtros</span>
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

    <el-dialog
      title="Detalhes"
      :visible.sync="detailsVisible"
      width="70%"
      >
      <el-row :gutter="20" v-for="(item, index) in patentes[indexVisible]" :key="index">
          <el-col :span="5">
            {{index}}
          </el-col>
          <el-col :span="19">
            <template v-if="index === 'CLASSIFICAÇÃO'">
              <el-tag
                v-for="tag in item"
                :key="tag"
                size="small"
                >
                  {{tag}}
              </el-tag>
            </template>
            <template v-else-if="index === 'INVENTOR'">
              <el-tag
                v-for="tag in item"
                :key="tag"
                size="small"
                >
                  {{tag}}
              </el-tag>
            </template>
            <template v-else>
              {{item}}
            </template>
          </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailsVisible = false">Fechar</el-button>
      </span>
    </el-dialog>

    <el-table
      :data="patentesFiltered"
      stripe
      height="550"
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in columnsToShow"
        :key="index"
        :prop="item"
        :label="item"
        sortable
        >
          <template slot-scope="scope">
            <template v-if="scope.column.property === 'CLASSIFICAÇÃO'">
              <el-tag
                v-for="tag in scope.row[scope.column.property]"
                :key="tag"
                size="small"
                >
                  {{tag}}
              </el-tag>
            </template>
            <template v-else-if="scope.column.property === 'INVENTOR'">
              <el-tag
                v-for="tag in scope.row[scope.column.property]"
                :key="tag"
                size="small"
                >
                  {{tag}}
              </el-tag>
            </template>
            <template v-else >
              {{ scope.row[scope.column.property] }}
            </template>
          </template>
      </el-table-column>
      <el-table-column
      fixed="right"
      label="Operations"
      width="120">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="openDetail(scope.$index)">Detalhes</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import patentes from '@/data/patentes.json'

// window.data = patentes

export default {
  name: 'home',
  components: {
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
      detailsVisible: false,
      indexVisible: 0,
      patentes: patentes,
      classificationsActive: []
    }
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
  },
  methods: {
    openDetail (index) {
      this.indexVisible = index
      this.detailsVisible = true
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
