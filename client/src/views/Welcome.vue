<template>
    <div class="flex flex-col m-0 p-0 w-full min-h-screen h-full bg-snow/40 backdrop-blur-3xl">
        <section
            class="text-slate-800 text-center flex flex-col items-center justify-evenly sm:justify-between pt-[5vw] h-full font-bold">
            <div class="flex flex-wrap justify-center items-center h-full">
                <h1
                    class="font-[League-Ghotic] w-full h-fit felx content-center uppercase tracking-wide h-fit sm:text-[8vh] text-5xl">
                    Organizza, Monitora, Raggiungi i Tuoi Obiettivi.
                </h1>
                <p class="flex w-full sm:w-[45vw] justify-center mt-[3vw] px-2 sm:text-3xl mb-20 text-lg">
                    La Tua Guida per Gestire il Tempo e le Attività.
                </p>
            </div>
            <img src="../assets/video/Animation_logo_Angel.gif" class="w-40 sm:w-60 mb-20 sm:mb-80" alt="Gif-Logo">
        </section>
        <section class="w-full flex h-fit mb-10 sm:mb-20 text-slate-800">
            <div class="flex flex-col items-center h-full w-full">
                <h1
                    class="font-[League-Ghotic] font-bold w-fit sm:text-6xl lg:text-8xl text-6xl mb-[5vw] text-center uppercase">
                    Come Utilizzare Angel?
                </h1>
                <div
                    class="w-full h-fit px-2 sm:p-0 sm:w-[80vw] lg:w-[70vw] xl:w-[50vw] flex flex-wrap justify-evenly mb-5">
                    <button @click="showImage('project')"
                        class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold">
                        PROJECT
                        <img width="20" height="20" class="sm:w-7 md:w-10"
                            src="https://img.icons8.com/ios-glyphs/90/1E293B/home.png" alt="home" />
                    </button>
                    <button @click="showImage('post')"
                        class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold">
                        POST
                        <img width="20" height="20" class="sm:w-7 md:w-10"
                            src="https://img.icons8.com/fluency-systems-filled/96/1E293B/note.png" alt="note" />
                    </button>
                    <button @click="showImage('timer')"
                        class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold">
                        TIMER
                        <img width="20" height="20" class="sm:w-7 md:w-10"
                            src="https://img.icons8.com/material-rounded/96/1E293B/time.png" alt="timer" />
                    </button>
                    <button @click="showImage('password')"
                        class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold">
                        PASSWORD
                        <img width="20" height="20" class="sm:w-7 md:w-10"
                            src="https://img.icons8.com/metro/104/1E293B/password.png" alt="password" />
                    </button>
                    <button @click="showImage('piggybank')"
                        class="m-1 sm:mr-3 bg-ghost text-slate-800 w-fit h-fit sm:w-20 lg:w-28 xl:w-28 pt-0.5 sm:py-2 rounded-md px-1 m-1 sm:px-2 shadow-lg flex sm:flex-col items-center sm:text-md lg:text-xl text-md font-bold">
                        PIGGYBANK
                        <img width="20" height="20" class="sm:w-7 md:w-10"
                            src="https://img.icons8.com/ios-filled/100/1E293B/money-box--v1.png" alt="piggybank" />
                    </button>
                </div>
                <div class="flex w-full xl:w-[55vw] text-center h-fit items-center flex-col">
                    <div class="flex rounded-lg bg-ghost text-md sm:text-xl text-slate-800 shadow-lg p-4 mx-2 sm:mx-20">
                        <p v-if="currentImage === 'timer'" class="m-1">
                            Modalità Calcolatore del Tempo
                            Utilizzate il nostro contatore per tracciare il tempo impiegato in ogni attività.
                            Basta
                            avviare
                            il
                            contatore
                            all'inizio dell'attività e fermarlo quando avete finito. Il tempo totale impiegato
                            verrà
                            automaticamente
                            sommato
                            al progetto. Potete anche stoppare il contatore e riprenderlo il giorno successivo,
                            mantenendo
                            traccia del
                            periodo di tempo totale.
                        </p>
                        <p v-if="currentImage === 'piggybank'" class="m-1">
                            Gestione delle Finanze
                            Tenete traccia delle spese e delle entrate dei vostri progetti con facilità.
                            Aggiungete
                            ogni
                            transazione per
                            ottenere una panoramica chiara delle finanze del vostro progetto o delle finanze
                            totali.
                        </p>
                        <p v-if="currentImage === 'password'" class="m-1">
                            Salvataggio delle Password
                            Salvate in modo sicuro le vostre password per ogni account o per account creati
                            specificamente
                            per i
                            vostri
                            progetti. Angel mantiene le vostre informazioni al sicuro e facilmente accessibili.
                        </p>
                        <p v-if="currentImage === 'post'" class="m-1">
                            Note Personali
                            Aggiungete note personali per ricordarvi cosa fare, annotare idee importanti o
                            pianificare
                            le
                            prossime
                            attività.
                            Le note vi aiutano a mantenere tutto ben organizzato e a portata di mano.
                        </p>
                        <p v-if="currentImage === 'project'" class="m-1">
                            Quando accedi ad Angel, la prima schermata che vedrai è la homepage. Qui troverai
                            una panoramica dei tuoi progetti, i post e le password che hai pinnato. La homepage
                            è progettata per darti un accesso rapido e semplice alle informazioni più
                            importanti. Puoi creare nuovi progetti o accedere a
                            quelli esistenti. Ogni progetto raggruppa diverse funzionalità che ti aiuteranno a
                            gestire meglio il tuo tempo e le tue attività.
                        </p>
                    </div>
                    <div class="w-full px-1 sm:w-[90vw] xl:w-[60vw] mt-5 drop-shadow-3xl">
                        <img v-if="currentImage === 'password'" class="object-cover rounded-xl"
                            src="../assets/Screen/password.png" alt="">
                        <img v-if="currentImage === 'piggybank'" class="object-cover rounded-xl"
                            src="../assets/Screen/piggybank.png" alt="">
                        <img v-if="currentImage === 'post'" class="object-cover rounded-xl"
                            src="../assets/Screen/post.png" alt="">
                        <img v-if="currentImage === 'timer'" class="object-cover rounded-xl"
                            src="../assets/Screen/timer.png" alt="">
                        <img v-if="currentImage === 'project'" class="object-cover rounded-xl"
                            src="../assets/Screen/project.png" alt="">
                    </div>
                </div>
            </div>
        </section>
        <section class="w-full flex h-fit mb-20 justify-center text-slate-800">
            <div class="flex flex-col items-center text-center h-fit w-full sm:w-[50vw]">
                <h1 class="font-[League-Ghotic] font-bold w-fit sm:text-8xl text-6xl mb-[2vw] text-center uppercase">
                    Registrati Ora!
                </h1>
                <p class="flex text-lg sm:text-xl px-2 w-full">
                    Per iniziare a utilizzare Angel, registrati e crea il tuo primo progetto. Siamo entusiasti di
                    aiutarti a raggiungere i tuoi obiettivi con maggiore efficienza e organizzazione.
                </p>
                <router-link to="/register"
                    class="bg-slate-800 sm:text-xl text-ghost rounded-md mt-2 pt-1 sm:pt-2 sm:w-28 sm:h-10 px-1.5 hover:bg-slate-900 uppercase">
                    Try Angel
                </router-link>
            </div>
        </section>
        <footer class="bg-ghost m-1 sm:m-2 rounded-lg shadow-lg drop-shadow-3xl">
            <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div class="md:flex md:justify-between text-slate-800">
                    <div class="mb-4 sm:mb-0">
                        <a href="#" class="flex items-center">
                            <img src="../assets/logo_angel.png" class="h-6 sm:h-8 me-3" alt="Angel Logo" />
                            <span class="self-center text-lg sm:text-2xl font-semibold whitespace-nowrap">ANGEL</span>
                        </a>
                    </div>
                    <div class="flex text-md sm:text-lg">
                        <h2 class="font-semibold text-slate-900 uppercase">
                            Follow me:
                        </h2>
                        <ul class="text-slate-800 font-medium flex">
                            <li class="mx-3 hover:underline">
                                <a href="https://github.com/MatteoGranata" target="_blank"
                                    class="hover:underline ">Github</a>
                            </li>
                            <li class=" hover:underline">
                                <a href="https://www.linkedin.com/in/matteo-granata-72220a263/" target="_blank"
                                    class="hover:underline">Linkedin</a>
                            </li>
                            <li class="ml-3  hover:underline">
                                <a href="https://granatamatteo.it/" target="_blank"
                                    class="hover:underline">Portfolio</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <p class="text-slate-800 text-sm mt-3 sm:mt-6">
                    Angel è stato realizzato solo a scopo didattico come progetto per Start2Impact e non ha fini di
                    lucro. Spero che l'app ti sia utile e ti aiuti a migliorare la tua produttività.
                </p>
                <hr class="mb-6 border-slate-800 sm:mx-auto" />
                <div class="flex justify-between items-center">
                    <span class="text-sm text-slate-800 sm:text-center">© 2024 <a href="#"
                            class="hover:underline">ANGEL™</a>. All Rights Reserved.
                    </span>
                    <div class="flex justify-center mt-0">
                        <a href="https://github.com/MatteoGranata/ANGEL" class="text-slate-800">
                            <img width="35" height="35" src="https://img.icons8.com/ios-glyphs/90/1E293B/github.png"
                                alt="github" />
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
            currentImage: 'project',
        }
    },
    methods: {
        showImage(image) {
            this.currentImage = image;
        }
    }
}
</script>
