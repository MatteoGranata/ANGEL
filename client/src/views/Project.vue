<template>
    <div class="bg-neutral-900 min-h-screen h-fit w-full">
        <div class="flex justify-center w-full h-full mt-10">
            <button @click="createProject"
                class="fixed bottom-0 right-0 py-3 m-7 w-20 h-20 flex justify-center rounded-full bg-neutral-800 text-5xl ring-2 ring-inset ring-neutral-600 hover:bg-neutral-900">
                +
            </button>
            <div class="flex flex-row justify-center w-full h-full mt-10">
                <ul class="grid grid-cols-1 gap-9 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <li v-for="project in userProject" :key="project._id"
                        class="flex flex-col border-2 border-neutral-600 rounded-lg w-[60vw] sm:w-[60vw] md:w-96 h-[35vh] p-2">
                        <textarea @keyup="autoUpdate(project._id)" v-model="project.content" name="project" id="project"
                            class="bg-neutral-800 overflow-hidden rounded-md px-2 resize-none h-full w-full outline-none"></textarea>
                        <div class="mt-2 flex-row flex">
                            <button @click="deletePost(project._id)"
                                class="rounded-md px-1.5 py-0.5 text-lg mx-2 shadow-sm ring-2 ring-inset ring-neutral-600 hover:bg-neutral-800">
                                &#128465;
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            content: '',
            userProject: [],
        };
    },
    mounted() {
        this.fetchProjects();
    },
    methods: {
        async fetchProjects() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.get('/project', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                this.userPosts = response.data.projects;
            } catch (error) {
                console.error(error);
            }
        },
        async createProject() {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.post('/project', {
                    headers: { Authorization: `bearer ${token}` },
                });
                console.log('Post added:', response.data);

                this.userPosts.push(response.data.post)
                this.content = ''

            } catch (error) {
                console.error(error);
            }
        },
        // async autoUpdate(postId) {
        //     clearTimeout(this.timeoutId);
        //     this.timeoutId = setTimeout(() => {
        //         this.updatePost(postId)
        //     }, 300);
        // },
        async update(postId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }

                const postToUpdate = this.userPosts.find(post => post._id == postId);
                if (!postToUpdate) {
                    console.error('Post to update not found');
                    return;
                }
                const response = await axios.patch(`/post/${postId}`, { content: postToUpdate.content }, {
                    headers: { Authorization: `bearer ${token}` },
                });

            } catch (error) {
                console.error(error);
            }
        },
        async deletePost(postId) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await axios.delete(`/post/${postId}`, {
                    headers: { Authorization: `bearer ${token}` },

                });
                console.log('Post removed:', response.data);
                this.userPosts = this.userPosts.filter(post => post._id !== postId);
            } catch (error) {
                console.error(error)
            }
        },

    }
}
</script>
