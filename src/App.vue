<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/editing0">Editing</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="sass" scoped>
#app
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

#nav
  margin-bottom: 20px
  padding: 17px
  background-color: #f1f1f1

  a
    font-weight: bold
    color: #2c3e50

    &.router-link-exact-active
      color: #42b983

</style>
