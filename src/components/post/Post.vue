<template>
    <div id="app">
        <h1>Posts</h1>
        <button class="btn btn-primary" v-on:click.prevent="getAllPosts()">Get all Posts</button>
        <button class="btn btn-primary" v-on:click.prevent="getPost()">Get Post</button>
        <!-- <button class="btn btn-primary" v-on:click.prevent="getPostComment()">Get a Post Comments</button> -->
        <input v-model="inputPostId" type="text" id="inputPostId">
        <!-- <button class="btn btn-primary" v-on:click.prevent="navigateNewPost">New Post</button> -->
        <router-link tag="button" to="/post/new" class="btn btn-primary">New Post</router-link>
        <button @click="navigateBack" class="btn btn-primary">Back</button>
        <hr>
        <button v-if="show" @click="navigateBack" class="btn btn-primary">Clear Results</button>
        <ul>
            <li class="list-group-item" v-for="post in posts" v-bind:key="post">
                <div class="panel panel-default">
                    <div class="panel-heading"><strong>Post Information {{ post.id }}</strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-10">
                                <p><strong>Title:</strong> {{ post.title }}</p>
                            </div>    
                            <div class="col-sm-10">
                                <p><strong>Body:</strong> {{ post.body }}</p>
                            </div>    
                        </div>
                    </div>
                </div>
            </li>
        </ul> 
        <!-- <ul>
        <li class="list-group-item"> {{onePost.userId}} - {{onePost.id}} - {{onePost.title}} - {{onePost.body}}</li>
        </ul> -->
        <ul>
            <li class="list-group-item" v-for="comment in comments" v-bind:key="comment">{{ comment.postId }} - {{ comment.id }} - {{ comment.name }} - {{ comment.email }} - {{ comment.body }}</li>
        </ul> 
        <router-view></router-view>
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
            onePost: {
                userId : '',
                id: '',
                title: '',
                body: ''
            },
            inputPostId: '',
            comments: [],
            posts: [],
            show: false
        };
    },
    methods: {
        navigateBack() {
            this.$router.push('/');
        },
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