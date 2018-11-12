<template>
  <div class="hello">
    <h3>Type your message here: </h3>
    <form @submit.prevent="handleSubmit">
      <el-input placeholder="Write something" v-model="input"></el-input>
    </form>
    <ChatList :messages="messages"/> 
  </div>
</template>

<script>
import ChatList from './ChatList.vue'
export default {
  name: 'Chat',  
  //Deklarere
  components: { ChatList },
  props: {
    msg: String
  },
  methods: {
    handleSubmit(){
      //send message
      this.$socket.send({ action: 'message', content: this.input })
      this.input = '' 
    }
  },
  computed: {
    messages() {
      return this.$store.state.messages
    }
  },

  data() {
    return {
      input: ''
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>
