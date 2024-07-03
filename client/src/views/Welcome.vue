<template>
  <div class="flex flex-col m-0 p-0 w-full min-h-screen h-full bg-snow/40 backdrop-blur-3xl">
    <section
      class="text-slate-800 text-center flex flex-col items-center justify-evenly sm:justify-between pt-[5vw] h-full font-bold"
    >
      <div class="flex flex-wrap justify-center items-center h-full">
        <h1
          class="font-[League-Ghotic] w-full h-fit felx content-center uppercase tracking-wide h-fit sm:text-[8vh] text-5xl"
        >
          Organize, Monitor, Achieve Your Goals.
        </h1>
        <p class="flex w-full sm:w-[45vw] justify-center mt-[3vw] px-2 sm:text-3xl mb-20 text-lg">
          Your Guide to Managing Time and Tasks.
        </p>
      </div>
      <img
        src="../assets/video/Animation_logo_Angel.gif"
        class="w-40 sm:w-60 mb-20 sm:mb-80"
        alt="Gif-Logo"
      />
    </section>
    <!-- tabbed menu -->
    <section class="w-full flex h-fit mb-10 sm:mb-20 text-slate-800">
      <div class="flex flex-col items-center h-full w-full">
        <h1
          class="font-[League-Ghotic] font-bold w-fit sm:text-6xl lg:text-8xl text-6xl mb-[5vw] text-center uppercase"
        >
          How to Use Angel?
        </h1>
        <div
          class="w-full h-fit px-2 sm:p-0 sm:w-[80vw] lg:w-[70vw] xl:w-[50vw] flex flex-wrap justify-evenly mb-5"
        >
          <button
            @click="showImage('project')"
            class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold"
          >
            PROJECT
            <img
              width="20"
              height="20"
              class="sm:w-7 md:w-10"
              src="https://img.icons8.com/ios-glyphs/90/1E293B/home.png"
              alt="home"
            />
          </button>
          <button
            @click="showImage('post')"
            class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold"
          >
            POST
            <img
              width="20"
              height="20"
              class="sm:w-7 md:w-10"
              src="https://img.icons8.com/fluency-systems-filled/96/1E293B/note.png"
              alt="note"
            />
          </button>
          <button
            @click="showImage('timer')"
            class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold"
          >
            TIMER
            <img
              width="20"
              height="20"
              class="sm:w-7 md:w-10"
              src="https://img.icons8.com/material-rounded/96/1E293B/time.png"
              alt="timer"
            />
          </button>
          <button
            @click="showImage('password')"
            class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold"
          >
            PASSWORD
            <img
              width="20"
              height="20"
              class="sm:w-7 md:w-10"
              src="https://img.icons8.com/metro/104/1E293B/password.png"
              alt="password"
            />
          </button>
          <button
            @click="showImage('piggybank')"
            class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold"
          >
            PIGGYBANK
            <img
              width="20"
              height="20"
              class="sm:w-7 md:w-10"
              src="https://img.icons8.com/ios-filled/100/1E293B/money-box--v1.png"
              alt="piggybank"
            />
          </button>
        </div>
        <div class="flex w-full xl:w-[55vw] text-center h-fit items-center flex-col">
          <div
            class="flex rounded-lg bg-ghost text-md sm:text-xl text-slate-800 shadow-lg p-4 mx-2 sm:mx-20"
          >
            <p v-if="currentImage === 'timer'" class="m-1">
              Use our timer to track the time spent on each task. Simply start the timer at the
              beginning of the task and stop it when you are finished. You can also pause the timer
              and resume it the next day, keeping track of the total time period.
            </p>
            <p v-if="currentImage === 'piggybank'" class="m-1">
              Keep track of your project expenses and income with ease. Add each transaction to get
              a clear overview of your project's finances or your total finances.
            </p>
            <p v-if="currentImage === 'password'" class="m-1">
              Securely save your passwords for each account or for accounts created specifically for
              your projects. Angel keeps your information safe and easily accessible.
            </p>
            <p v-if="currentImage === 'post'" class="m-1">
              Add personal notes to remind yourself of tasks to do, jot down important ideas, or
              plan upcoming activities. Notes help you keep everything well-organized and within
              reach.
            </p>
            <p v-if="currentImage === 'project'" class="m-1">
              When you log in to Angel, the first screen you will see is the homepage. Here you will
              find an overview of your projects, pinned posts, and passwords. The homepage is
              designed to give you quick and easy access to the most important information. You can
              create new projects or access existing ones. Each project groups various features that
              will help you better manage your time and tasks.
            </p>
          </div>
          <div class="w-full px-1 sm:w-[90vw] xl:w-[60vw] mt-5 drop-shadow-3xl">
            <img
              v-if="currentImage === 'password'"
              class="object-cover rounded-xl"
              src="../assets/img/password.png"
            />
            <img
              v-if="currentImage === 'piggybank'"
              class="object-cover rounded-xl"
              src="../assets/img/piggybank.png"
            />
            <img
              v-if="currentImage === 'post'"
              class="object-cover rounded-xl"
              src="../assets/img/post.png"
            />
            <img
              v-if="currentImage === 'timer'"
              class="object-cover rounded-xl"
              src="../assets/img/timer.png"
            />
            <img
              v-if="currentImage === 'project'"
              class="object-cover rounded-xl"
              src="../assets/img/project.png"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- tabbed menu -->
    <section class="w-full flex h-fit mb-20 justify-center text-slate-800">
      <div class="flex flex-col items-center text-center h-fit w-full sm:w-[50vw]">
        <h1
          class="font-[League-Ghotic] font-bold w-fit sm:text-8xl text-6xl mb-[2vw] text-center uppercase"
        >
          Sign Up Now!
        </h1>
        <p
          class="flex flex-col justify-center items-center text-lg sm:text-xl px-5 sm:px-2 w-full mb-[2vw]"
        >
          <b> ANGEL is completely free! </b>
          To get started with Angel, sign up and create your first project.
        </p>
        <router-link
          to="/register"
          class="bg-slate-800 sm:text-xl text-ghost rounded-md mt-2 pt-1 sm:pt-2 sm:w-fit h-8 sm:h-10 px-3 hover:bg-slate-900"
        >
          Try Angel free
        </router-link>
      </div>
    </section>
    <footer class="bg-ghost m-1 sm:m-2 rounded-lg shadow-lg drop-shadow-3xl">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between text-slate-800">
          <div class="mb-4 sm:mb-0">
            <a href="#" class="flex items-center">
              <img
                src="../assets/img/logo_angel.png"
                class="h-6 w-6 sm:w-8 sm:h-8 me-3"
                alt="Angel Logo"
              />
              <span class="self-center text-lg sm:text-2xl font-semibold whitespace-nowrap"
                >ANGEL</span
              >
            </a>
          </div>
          <div class="flex text-md sm:text-lg">
            <h2 class="font-semibold text-slate-900 uppercase">Follow me:</h2>
            <ul class="text-slate-800 font-medium flex">
              <li class="mx-3 hover:underline">
                <a href="https://github.com/MatteoGranata" target="_blank" class="hover:underline"
                  >Github</a
                >
              </li>
              <li class="hover:underline">
                <a
                  href="https://www.linkedin.com/in/matteo-granata-72220a263/"
                  target="_blank"
                  class="hover:underline"
                  >Linkedin</a
                >
              </li>
              <li class="ml-3 hover:underline">
                <a href="https://granatamatteo.it/" target="_blank" class="hover:underline"
                  >Portfolio</a
                >
              </li>
            </ul>
          </div>
        </div>
        <p class="text-slate-800 text-sm mt-3 sm:mt-6">
          Angel has been developed solely for educational purposes as a project for Start2Impact and
          is non-profit. I hope the app is useful to you and helps improve your productivity.
        </p>
        <hr class="mb-6 border-slate-800 sm:mx-auto" />
        <div class="flex justify-between items-center">
          <span class="text-sm text-slate-800 sm:text-center"
            >© 2024 <a href="#" class="hover:underline">ANGEL™</a>. All Rights Reserved.
          </span>
          <div class="flex justify-center mt-0">
            <a href="https://github.com/MatteoGranata/ANGEL" class="text-slate-800">
              <img
                width="35"
                height="35"
                src="https://img.icons8.com/ios-glyphs/90/1E293B/github.png"
                alt="github"
              />
              <span class="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentImage: 'project'
    }
  },
  methods: {
    showImage(image) {
      this.currentImage = image
    }
  }
}
</script>
