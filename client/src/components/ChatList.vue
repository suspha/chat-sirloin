<template>
  <div class="chat-list">
		<el-card v-for="msg in messages" :key="msg._id" class="speech-bubble">
			<div id="content" v-if="msg.edit">
				<el-input v-model="msg.content"/>
				<el-button size="mini" type="success" @click="handleSave(msg)">Save</el-button>
			</div>
			<div v-else>{{ msg.content }}</div>
			<div id="user">User: {{ msg.username }}</div>
			<div id="date">{{ msg.date | date }}</div>
			<div class="bottom-chat-list">
				<el-button type="primary" icon="el-icon-edit" circle @click="toggleEdit(msg)"></el-button>
				<el-button type="warning" icon="el-icon-delete" circle @click="handleDelete(msg._id)"></el-button>
			</div>
		</el-card>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
  props: [ 'messages' ],

  methods: {
    handleDelete (_id) {
      this.$socket.send({ action: 'delete', _id })
      this.$store.commit('delete', _id)
		},
		editMode (msg, mode) {
			return this.messages.map(x => {
				if (x._id === msg._id) {
					x.edit = mode
				}
				return x
			})
		},
		toggleEdit (msg) {
			this.$store.commit('messages', this.editMode(msg, true))
		},
		handleSave(msg) {
			this.$store.commit('messages', this.editMode(msg, false))
			this.$socket.send({ action: 'update', ...msg })
		}
  }
}

</script>

<style scoped lang="scss">

#content {
  padding-bottom: 5px;
}
#date, #user {
  color: #5f6c66;
  font-size: 11px;
}
.chat-list {
  list-style-type: none;
  padding: 1rem 0;
  width: 250px;
	margin: 0 auto;
}
.el-input  {
margin-bottom: 10px;
}
.bottom-chat-list {
	background-color: #f5f5f5;	
	padding: 5px 5px 5px 10px;
	position: absolute;
	bottom: 0; /* attaches the element to the bottom */
	left: 0; /* attaches the element to the left-side */
	right: 0; /* attaches the element to the right-side */
}
.el-button.is-round {
	margin-bottom: 1.2rem;
}

.speech-bubble {
  &:nth-child(odd) {
    position: relative;
    right: 8rem;
    background: #d0e3e1;
    border-radius: .4em;
    margin: 1rem 0;
    padding-bottom: 2rem;
  }
  &:nth-child(even) {
    position: relative;
    left: 8rem;
    background: #debbb7;
    border-radius: .4em;
    margin: 1rem 0;
    padding-bottom: 2rem;
  }
}

#date {
	color: #999;
	font-size: 10px;
	padding-bottom: 8px;
}

#user {
	color: #888;
	font-size: 10px;
	padding-top: 8px;
}
</style>