<template>
  <div id="app">
    <button v-on:click.prevent="getAllPosts">Get all Posts</button>
    <br><br>
    <input type="text" value="">
    <br><br>
    <button v-on:click.prevent="getPost(1)">Get a Post</button>
    <br><br>
    <button v-on:click.prevent="getPostComment(id)">Get a Post Comments</button>
    <br><br>
    <ul>
        <li class="list-group-item" v-for="post in posts" v-bind:key="post">{{ post.userid }} - {{ post.id }} - {{ post.title }} - {{ post.body }}</li>
    </ul> 
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    post: {
      userid : '',
      id: '',
      title: '',
      body: ''
    },
    posts: []
    };
  },
  methods: {
    getAllPosts() {
      this.$http.get('posts')
          .then(response => {
                        console.log(response.data);
                        return response.json();
                    })
                    .then(data => {
                      const resultArray = [];
                      for (let key in data) {
                        resultArray.push(data[key]);
                      }
                      this.posts = resultArray;
                    });
    },
    getPost: function(id){
      this.$http.get('posts/{{id}}')
      .then(response => {  
                      console.log(response.data);
      });             
    },
    getPostComment: function(id){
      this.$http.get('posts/1/comments')
      .then(response => {
                        console.log(response.data);
                    });
    } 	
  }
}

</script>

<style>
</style>
