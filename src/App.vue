<template>
  <div>
    <h1>Meu projeto vue</h1>
    <p :title="informacao">Autor: {{autor.toUpperCase()}} - {{criacao}} </p>
     
    <button @click="trocarInformacoes()">Mostrar/Esconder informações</button> 
    <div v-show="mostrarInformacoesComplementares">
        <h2>Informações adicionais</h2>

        <ul>
           <li v-for="p in projetos" :key="p.nome">{{p.nome}}</li>
        </ul>

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
      ]
    }
  },
  methods: {
    trocarInformacoes() {
      this.mostrarInformacoesComplementares = !this.mostrarInformacoesComplementares
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
</style>
