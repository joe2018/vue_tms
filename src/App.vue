<template>
  <router-view></router-view>
</template>

<script>
window.addEventListener('beforeunload',()=>{
  localStorage.clear()
});
</script>

<style>

</style>
