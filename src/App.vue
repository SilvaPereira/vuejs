<template>
  <div id="app">

    <router-view></router-view>
    <button v-on:click.prevent="getAllPosts">Get all Posts</button>
    <br><br>
    <p>PostId</p>
    <input v-model="inputPostId" type="text" id="inputPostId">
    <br><br>
    <button v-on:click.prevent="getPost()">Get a Post</button>
    <br><br>
    <button v-on:click.prevent="getPostComment()">Get a Post Comments</button>
    <br><br>
    <ul>
        <li class="list-group-item" v-for="post in posts" v-bind:key="post">{{ post.userId }} - {{ post.id }} - {{ post.title }} - {{ post.body }}</li>
    </ul> 
    <ul>
      <li class="list-group-item">{{onePost.userId}} - {{onePost.id}} - {{onePost.title}} - {{onePost.body}}</li>
    </ul>
    <ul>
        <li class="list-group-item" v-for="comment in comments" v-bind:key="comment">{{ comment.postId }} - {{ comment.id }} - {{ comment.name }} - {{ comment.email }} - {{ comment.body }}</li>
    </ul> 
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
    post: {
      userId : '',
      id: '',
      title: '',
      body: ''
    },
    comment: {
      postId : '',
      id : '',
      name : '',
      email : '',
      body : ''
    },
    onePost: {
      userId : '',
      id: '',
      title: '',
      body: ''
    },
    inputPostId: '',
    comments: [],
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
    getPost(){
      this.$http.get('posts/' + inputPostId.value)
      .then(response => {  
                        console.log(response.data);
                        return response.json();
                    })
                    .then(data => {
                      //const resultArray = {};
                      //for (let key in data) {
                      //  resultArray.push(data[key]);
                      //}
                      this.onePost = data;
                    });             
    },
    getPostComment(){
      this.$http.get('posts/' + inputPostId.value + '/comments')
      .then(response => {
                        console.log(response.data);
                        return response.json();
                    })
                    .then(data => {
                      const resultComments = [];
                      for (let key in data) {
                        resultComments.push(data[key]);
                      }
                      this.comments = resultComments;
                    });
    } 
  }
}

</script>

<style>
</style>
