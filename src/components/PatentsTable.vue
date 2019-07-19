<template>
  <div class="PatentsTable">
    <PatentDetail
      :id="indexVisible"
      :visible.sync="detailsVisible"
      v-on:detail:close="detailsVisible = $event"
    ></PatentDetail>
    <el-table
      :data="filteredPatents"
      stripe
      height="calc(100vh - 40px)"
      size="small"
      style="width: 100%">
      <el-table-column
        v-for="(item, index) in columnsToShow"
        :key="index"
        :prop="item"
        :label="item"
        sortable
        >
          <template slot-scope="scope">
            <template v-if="scope.column.property === 'PROCESSO'">
              <form action="https://gru.inpi.gov.br/pePI/servlet/PatenteServletController" target='_blank'>
                <input type="hidden" name="NumPedido" :value="`${scope.row['NATUREZA']} ${scope.row[scope.column.property]}`" />
                <input type="hidden" name="Action" value="SearchBasico" />
                <el-button type="text" native-type="submit" size="mini">
                  {{ scope.row[scope.column.property] }}
                </el-button>
              </form>
            </template>
            <template v-else-if="scope.column.property === 'CLASSIFICAÇÃO'">
              <!-- <form
                v-for="code in scope.row[scope.column.property]"
                :key="code"
                action="https://gru.inpi.gov.br/pePI/servlet/PatenteServletController" target='_blank'>
                  <input type="hidden" name="NumPedido" value="" />
                  <input type="hidden" name="ListaNumeroPatente" value=" " />
                  <input type="hidden" name="NumPrioridade" value="" />
                  <input type="hidden" name="CodigoPct" value="" />
                  <input type="hidden" name="DataDeposito1" value="" />
                  <input type="hidden" name="DataDeposito2" value="" />
                  <input type="hidden" name="DataPrioridade1" value="" />
                  <input type="hidden" name="DataPrioridade2" value="" />
                  <input type="hidden" name="DataDepositoPCT1" value="" />
                  <input type="hidden" name="DataDepositoPCT2" value="" />
                  <input type="hidden" name="DataPublicacaoPCT1" value="" />
                  <input type="hidden" name="DataPublicacaoPCT2" value="" />
                  <input type="hidden" name="ClassificacaoIPC" :value="code" />
                  <input type="hidden" name="CatchWordIPC" value="" />
                  <input type="hidden" name="Titulo" value="" />
                  <input type="hidden" name="Resumo" value="" />
                  <input type="hidden" name="NomeDepositante" value="" />
                  <input type="hidden" name="CpfCnpjDepositante" value="" />
                  <input type="hidden" name="NomeInventor" value="" />
                  <input type="hidden" name="RegisterPerPage" value="20" />
                  <input type="hidden" name="botao" value=" pesquisar » " />
                  <input type="hidden" name="Action" value="SearchAvancado" />
                <el-button native-type="submit" size="mini">
                  {{ code }}
                </el-button>

              </form> -->

              <a
                v-for="code in scope.row[scope.column.property]"
                :key="code"
                :href="`https://worldwide.espacenet.com/classification/#!/CPC=${code.split(' ')[0]}`"
                target="_blank"
                rel="noopener noreferrer"
                >
                <el-button native-type="submit" size="mini">
                  {{ code }}
                </el-button>
              </a>
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
import { mapGetters, mapState } from 'vuex'
import PatentDetail from '@/components/PatentDetail'

export default {
  name: 'PatentsTable',
  components: {
    PatentDetail
  },
  props: {
    msg: String
  },

  data () {
    return {
      detailsVisible: false,
      indexVisible: 0
    }
  },

  computed: {
    ...mapGetters([
      'filteredPatents'
    ]),
    ...mapState({
      columnsToShow: 'columnsToShow'
    })
  },

  methods: {
    openDetail (index) {
      this.indexVisible = index
      this.detailsVisible = true
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
