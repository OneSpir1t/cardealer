<template>
    <div>
        <ul class="nav nav-underline">
        <li class="nav-item selected">
          <a aria-current="page" href="/">
            <img src="<% BASE_URL %>/img/logo.png">
          </a>
        </li>
        <div class="d-flex align-items-center">
            <li class="nav-item p-2">
              <a class="nav-link" href="/about">О нас</a>
            </li>
            <li class="nav-item p-2">
              <a class="nav-link" href="/catalogue">Каталог</a>
            </li>
            <li class="nav-item p-2">
              <a class="nav-link" href="/availablecars">Автомобили в наличии</a>
            </li>
        </div>
      </ul>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>