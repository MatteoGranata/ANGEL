<template>
    <div class="edit-post-form">
      <textarea v-model="postContent" placeholder="Inserisci il nuovo contenuto"></textarea>
      <button @click="$emit('update-post', post._id, postContent)">Aggiorna</button>
      <button @click="$emit('cancel-edit')">Annulla</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      post: Object, // Receive the post object from post-list.vue
    },
    data() {
      return {
        postContent: '', // Local copy of content for editing
      };
    },
    created() {
      // Initialize postContent with the received post's content
      this.postContent = this.post.content;
    },
  };
  </script>
  