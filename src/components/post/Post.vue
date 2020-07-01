<template>
    <div id="app">
        <h1>Posts</h1>
        <button class="btn btn-primary" v-on:click.prevent="getAllPosts()">Get all Posts</button>
        PostId:
        <input v-model="inputPostId" type="text" id="inputPostId">
        <button class="btn btn-primary" v-on:click.prevent="getPost()">Get Post</button>
        <router-link tag="button" to="/post/new" class="btn btn-primary">New Post</router-link>
        <button @click="navigateBack" class="btn btn-primary">Back</button>
        <hr>
        <div v-if="error" class="alert alert-danger">
            <strong>No results!</strong> The Post you searched for doesnt exist. Try another one.
        </div>
        <div v-if="warning" class="alert alert-warning">
            <strong>Warning!</strong> You need to write a Post Id to search for.
        </div>
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
        <ul v-if="singleItem">
            <li class="list-group-item">
                <div class="panel panel-default">
                    <div class="panel-heading"><strong>Post Information {{ post.id }}</strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-10">
                                <p><strong>Title:</strong> {{onePost.title}}</p>
                            </div>    
                            <div class="col-sm-10">
                                <p><strong>Body:</strong> {{onePost.body}}</p>
                            </div>    
                        </div>
                    </div>
                </div> 
            </li>
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
            show: false,
            singleItem: false,
            error: false,
            warning: false
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
            if ( inputPostId.value == ''){
                this.singleItem = false;
                this.error = false;
                this.warning = true;
                return;
            }
            this.$http.get('posts/' + inputPostId.value)
            .then(response => {  
                console.log(response.data);
                return response.json();
            })
            .then(data => {
                this.onePost = data;
                this.singleItem = true;
                this.warning = false;
            }, error => {
                this.singleItem = false;
                this.error = true;
                this.warning = false;
            });             
        },
    }
}

</script>