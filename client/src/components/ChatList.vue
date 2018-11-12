<template>
  <ul>
    <li v-for="msg in messages" :key="msg._id">
      <span id="content">{{ msg.content }} </span>
      <span id="date">{{ msg.date | date }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ChatList',
  props: [ 'messages' ]
}

</script>

<style scoped lang="scss">
#date {
  color: #aaa;
  font-size: 11px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
   padding: 6px;
}

li:nth-child(odd) {
  margin: 0 10px;
  transition: background-color 0.8s ease;
  background-color: #eef3e6;
}
</style>