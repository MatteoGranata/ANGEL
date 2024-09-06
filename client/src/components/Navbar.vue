<template>
  <nav v-show="$route.path === '/'">
    <div class="flex justify-between w-full h-fit p-0 sm:p-2 text-slate-800 bg-ghost">
      <div class="flex h-fit ml-3 mt-2">
        <img
          src="../assets/img/logo_angel.png"
          class="w-6 h-8 pb-2 sm:pb-0 sm:w-8 sm:h-8"
          alt="logo-Angel"
        />
      </div>
      <div
        class="flex justify-between m-0 p-1 sm:p-2 sm:w-48 text:md sm:text-lg items-center flex-wrap"
      >
        <router-link to="/login" class="pt-0.5 sm:pt-1 px-1 font-bold">Sign In</router-link>
        <router-link
          to="/register"
          class="bg-slate-800 text-ghost rounded-md pt-0.5 sm:pt-1 px-1.5 hover:bg-slate-900"
          >Get Started</router-link
        >
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>
