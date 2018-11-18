<template>
  <div class="room1">
    <Chat/>
  </div>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/Chat.vue'

export default {
  name: 'room1',
  components: {
    Chat
  }
}
</script>
