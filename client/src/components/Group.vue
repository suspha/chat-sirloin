<template>
  <div class="group">
   <el-aside id="nav">
     <el-row class="tac">
       <el-col :span="12">
        <el-button round @click="addGroup"> + Add group </el-button>
        <el-menu>
          <router-link to="/">Chat room 1 </router-link>
          <router-link to="/about">Chat room 2 </router-link>
        </el-menu>
       </el-col>
     </el-row>
   </el-aside>
  </div>
</template>

<script>
export default {
  name: 'group',

  methods: {
    addGroup () {

      
    }
  }
}

</script>

<style scoped lang="scss">
.el-header{
  text-align: center; 
}

.el-aside {
  margin-top: 4rem;
}

.el-button.is-round {
  margin-bottom: 2rem;
}

h4{
  color: #2c3e50;
  border-bottom: 1px solid #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>