<template>
  <ul class="chat-list">
    <li v-for="msg in messages" :key="msg._id" class="speech-bubble">      
      <span id="content">{{ msg.content }}</span>
      <div id="date">{{ msg.date | date }}</div>
      <span id="user">User: {{ msg.username }}</span>      
      <button @click="handleDelete(msg._id)">Delete</button>      
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ChatList',
  props: [ 'messages' ],

  methods: {
    handleDelete (_id) {      
      this.$socket.send({ action: 'delete', _id })
      this.$store.commit('delete', _id)
    }
  }
}

</script>

<style scoped lang="scss">

#content {
  padding-bottom: 5px;
  display: inline-block;
}
#date, #user {
  color: #aaa;
  font-size: 11px; 
}
ul {
  list-style-type: none;
  padding: 1rem 0;
  width: 200px;
  margin: 0 auto;
}

li {
  padding: 5px;
}

.speech-bubble:nth-child(odd) {
	position: relative;
  right: 8rem; 
	background: #d0e3e1;
	border-radius: .4em;
  margin: 1rem 0;
}

.speech-bubble:nth-child(odd):after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-top-color: #d0e3e1;
	border-bottom: 0;
	border-left: 0;
	margin-left: -10px;
	margin-bottom: -20px;
}

.speech-bubble:nth-child(even) {
	position: relative;
  left: 8rem; 
	background: #debbb7;
	border-radius: .4em;
  margin: 1rem 0;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-top-color: #debbb7;
	border-bottom: 0;
	border-left: 0;
	margin-left: -10px;
	margin-bottom: -20px;
}
</style>