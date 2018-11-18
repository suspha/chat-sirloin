<template>
  <div class="chat">
    <el-container>
    <Group />
      <div v-if="!username">
        <h2>Login</h2>
        <form @submit.prevent="submitLogin">
          <el-input placeholder="Write username please" v-model="login"></el-input>
        </form>
      </div>
      <div v-else>
        <h2>Welcome: {{username}}!</h2>
        <el-button type="danger" round class="logout-btn" @click="logout">Logout</el-button>
        <form @submit.prevent="handleSubmit">
          <el-input placeholder="Write something" v-model="input"></el-input>
        </form>
        <ChatList :messages="messages" />
      </div>
    </el-container>
  </div>
</template>

<script>
import ChatList from './ChatList.vue'
import Group from './Group.vue'

export default {
  name: 'Chat',
  //Deklarere
  components: { ChatList, Group },
  // created() {
  //   this.login = 'Susana'
  //   setTimeout(() => {
  //     this.submitLogin()
  //   }, 500)
  // },
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
    },
    // handleEdit(_id) {
    //   this.$store.commit('update')
    // }
  },
  computed: {
    messages() {
      return this.$store.state.messages

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
.chat {
  text-align: center;
  margin: 2rem;
}

h2 {
  margin: 40px 0;
}
a {
  color: #42b983;
}

form {
  margin-top: 1rem;
}
</style>
