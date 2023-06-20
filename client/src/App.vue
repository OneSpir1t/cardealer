<template>
    <header id="header">
      <ul class="nav nav-underline">
        <li class="nav-item selected">
          <router-link aria-current="page" exact to="/">
            <img src="../public/img/logo.png">
          </router-link>
        </li>
        <div class="d-flex align-items-center">           
          <li class="nav-item p-2">
            <router-link exact to="/catalogue" class="nav-link" exact-active-class="active">Каталог</router-link>
          </li>
          <li class="nav-item p-2">
            <router-link exact to="/availablecars" class="nav-link" exact-active-class="active">Автомобили в наличии</router-link>
          </li>
        </div>
      </ul>
    </header>
    <main class="wrapper">     
        <router-view></router-view>
    </main>
    <footer class="align-items-end d-flex flex-fill justify-content-center">
      <p class="text-center text-muted">© Copyright 2023 Latyshev</p>
    </footer>
  
</template>

<script>
  export default{
    data(){
      return{
        currentPath: ''
      }
    },
    computed: {
      Path(){
        console.log(window.location.pathname)
        return window.location.pathname
      }
    },
  }

</script>

<style>

</style>