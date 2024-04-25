<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
      <nav>
        <router-link to="/register">register</router-link>
        -
        <router-link to="/login">login</router-link>
      </nav>
      <router-view/>
</template>

<script>
export default{
 
}
</script>


