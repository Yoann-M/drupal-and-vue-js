<template>
  <div id="app">
    <Navbar/>
    <div class="container">
        <transition name="fade" appear mode="out-in">
           <router-view></router-view>
        </transition>      
    </div>
  </div>
</template>

<script>
import Navbar from './components/partials/Navbar.vue'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>

/* FADE UP */
.fade-up-enter-active,
.fade-up-leave-active {
  transform: translateY(0px);
  transition: opacity 0.5s, transform 0.7s;
}
.fade-up-enter,
.fade-up-leave-active {
  opacity: 0;
  transform: translateY(10px);
}

/* FADE */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
