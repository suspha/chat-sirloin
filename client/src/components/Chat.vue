<template>
  <div class="hello">
    <div v-if="!username">
      <h3>Login</h3>
      <form @submit.prevent="submitLogin">
        <el-input placeholder="Write username please" v-model="login"></el-input>
      </form>
    </div>
    <div v-else>
      <h2>Welcome: {{username}}!</h2>
      <button class="logout-btn" @click="logout">Logout</button>
      <form @submit.prevent="handleSubmit">
        <el-input placeholder="Write something" v-model="input"></el-input>
      </form>
      <ChatList :messages="messages" />       
    </div>
  </div>
</template>

<script>
import ChatList from './ChatList.vue'
export default {
  name: 'Chat',  
  //Deklarere
  components: { ChatList },
  created() {
    this.login = 'Suong'
    setTimeout(() => {
      this.submitLogin()
    }, 500)
  },
  methods: {
    handleDelete (_id) {      
      this.$socket.send({ action: 'delete', _id })
      this.$store.commit('delete', _id)
    },
    handleSubmit(){
      //send message
      this.$socket.send({ action: 'message', content: this.input, username: this.username })
      this.input = '' 
    },
    async submitLogin () {
      this.$store.commit('login', this.login)
      this.login = ''
      const { result } = await this.$socket.fetch({ action: 'load' })
      console.log(result)
      this.$store.commit('messages', result)      
    },
    logout() {
      //kalle mutation eller action her
      this.$store.commit('logout')
    }
  },
  computed: {
    messages() {
      return this.$store.getters.messages
    },
    username() {
      return this.$store.state.username
    }
  },
  data() {
    return {
      input: '',
      login: ''
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
.logout-btn {
  border: 2px solid #f65008;
  background-color: #fff;
  color:#f65008;
  padding: 6px 16px;
  border-radius: 10px;
  font-size: 16px;
}
form {
  margin-top: 1rem;
}
</style>
