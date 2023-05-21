<template>
    <header id="header">
      <ul class="nav nav-underline">
        <li class="nav-item selected">
          <a aria-current="page" href="/">
            <img src="../public/img/logo.png">
          </a>
        </li>
        <div class="d-flex align-items-center">
            
            <li class="nav-item p-2">
              <a class="nav-link" :class="{'active': currentPath === '/catalogue'}" href="/catalogue">Каталог</a>
            </li>
            <li class="nav-item p-2">
              <a class="nav-link" :class="{'active': currentPath === '/availablecars'}" href="/availablecars">Автомобили в наличии</a>
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
        mounted(){
            this.currentPath = window.location.pathname
        }
    }

</script>

<style>

</style>