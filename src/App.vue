<template>
  <div>
    <h1>Meu projeto vue</h1>
    <p :title="informacao">Autor: {{autor.toUpperCase()}} - {{criacao}} </p>
    <font-awesome-icon icon="sort-up" />
    <font-awesome-icon icon="sort-down" />
    <font-awesome-icon icon="sort" />
    <button @click="trocarInformacoes()">Mostrar/Esconder informações</button> 
    <div v-show="mostrarInformacoesComplementares">
        <h2>Informações adicionais</h2>

        <form @submit.prevent="salvarProjeto">
            <label for="nome">Nome:</label><br/>
            <input type="text" id="nome" autofocus required v-model="projeto.nome"/> <br/>
            <label for="tamanho">Tamanho:</label><br/>
            <input type="number" id="tamanho" required min="0" max="100" v-model="projeto.tamanho"/> <br/>
            
            <input type="submit" :value="acao" />

        </form>  


        <table>
          <tr>
            <th @click="ordenar('nome')" class="ordenar">Nome  <font-awesome-icon :icon="getTipoOrdenacao('nome')" />  </th>
            <th @click="ordenar('tamanho')" class="ordenar">Tamanho <font-awesome-icon :icon="getTipoOrdenacao('tamanho')"/></th>
            <th></th>
          </tr>
          <tr v-for="(p, idx) in projetos" :key="p.nome" :class="{'alteracao': alteracaoIdx == idx}">
            <td> {{p.nome}} </td>
            <td> {{p.tamanho}} </td>
            <td> 
              <button @click="alterar(idx)">Alterar</button>
              <button @click="remover(p)">Remover</button> 
            </td>
          </tr>
          <tr>
            <td colspan="3">Tamanho total: {{tamanhoTotal}} </td>
          </tr>
        </table>

    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {   //JSON - Javascript Object Notation
      autor: 'Fabiano Oss',
      criacao: 'criando em ' + new Date().toLocaleString(),
      informacao: 'Posso colocar uma informação customizada',
      mostrarInformacoesComplementares: false,
      projetos: [
        {nome: "HTML", tamanho: 100 },
        {nome: "CSS", tamanho: 80},
        {nome: "JavaScript", tamanho: 200}
      ],
      projeto: {
        nome: null,
        tamanho: 0
      },
      alteracaoIdx: -1,
      orderField: {
        nome: null,
        type: 'asc'
      }
    }
  },
  methods: {
    trocarInformacoes() {
      this.mostrarInformacoesComplementares = !this.mostrarInformacoesComplementares
    },
    salvarProjeto() {
/*      this.projetos.push(
        {
          nome: this.projeto.nome,
          tamanho: this.projeto.tamanho  
        }
      )      */
      const projetoSalvar = Object.assign({}, this.projeto)
      if (this.alteracaoIdx > -1) {
        this.projetos[this.alteracaoIdx] = projetoSalvar
      }
      else {
        this.projetos.push(projetoSalvar)
      }

      this.reset()
    },
    reset() {
      this.projeto.nome = null
      this.projeto.tamanho = 0
      this.alteracaoIdx = -1
    },
    remover(projetoParaRemover) {
      if (confirm("Excluir registro?") ) {
        // this.projetos.splice(this.projetos.indexOf(projetoParaRemover), 1)
        this.projetos = this.projetos.filter(p => p != projetoParaRemover )
        this.reset()
      }
    },
    alterar(idx) {
      this.projeto = Object.assign({}, this.projetos[idx]) 
      this.alteracaoIdx = idx
    },
    getTipoOrdenacao(field) {
      if (field == this.orderField.nome) {
        if (this.orderField.type == 'asc')
          return 'sort-up'
        return 'sort-down'
      }
      return 'sort'
    },
    ordenar(field) {
      if (field == this.orderField.nome) {
        this.orderField.type = this.orderField.type == 'asc' ? 'desc' : 'asc'
      }
      this.orderField.nome = field
      const orderType = this.orderField.type == 'asc' ? 1 : -1

      this.projetos.sort( (a, b) => {
          if (isNaN(a[field]) || isNaN(b[field])) {
            return (a[field].localeCompare( b[field] )) * orderType
          }
          return (a[field] - b[field]) * orderType
      })
    }
  },
  computed: {
    acao() {
      return this.alteracaoIdx > -1 ? "Alterar" : "Adicionar"
    },
    tamanhoTotal() {
      return this.projetos.map(p => p.tamanho )
                  .reduce( (a,b) => a + b , 0 )
    }
  },
  watch: {
    alteracaoIdx: function(val) {
      console.log(val)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.alteracao {
  background-color: yellow;
}

.ordenar {
  cursor: pointer;
}

</style>
