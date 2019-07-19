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
              <el-button
                v-for="code in scope.row[scope.column.property]"
                :key="code"
                native-type="submit"
                size="mini"
                @click="openDialog(code)">
                  {{ code }}
                </el-button>
              <!-- <a
                v-for="code in scope.row[scope.column.property]"
                :key="code"
                :href="`https://worldwide.espacenet.com/classification/#!/CPC=${code.split(' ')[0]}`"
                target="_blank"
                rel="noopener noreferrer"
                >
                <el-button native-type="submit" size="mini">
                  {{ code }}
                </el-button>
              </a> -->
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
    <el-dialog
      :title="`Classificacao: ${dialogCode}`"
      :visible.sync="dialogVisible"
      width="1050px"
      :before-close="handleClose">
        <iframe
          :src="`https://worldwide.espacenet.com/classification/#!/CPC=${dialogCode.split(' ')[0]}`" frameborder="0"></iframe>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Fechar</el-button>
        </span> -->
    </el-dialog>
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
      dialogVisible: true,
      dialogCode: '',
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
    },
    handleClose () {
      this.dialogVisible = false
      this.dialogCode = ''
    },
    openDialog (code) {
      this.dialogCode = code
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="stylus">
.el-dialog
  height 80vh

iframe
  height 69vh
  display block
  width 100%
</style>
