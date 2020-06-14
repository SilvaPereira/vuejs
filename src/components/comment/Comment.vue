<template>
    <div id="app">
        <h1>Comment</h1>
        <button class="btn btn-primary" v-on:click.prevent="getAllComments()">Get all Comments</button>
        <button class="btn btn-primary" v-on:click.prevent="">New Comment</button>
        <button @click="navigateBack" class="btn btn-primary">Go Back</button>
        <ul>
            <li class="list-group-item" v-for="comment in comments" v-bind:key="comment">
                <div class="panel panel-default">
                    <div class="panel-heading"><strong>Comment Information</strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-6">
                                <p><strong>Name:</strong> {{ comment.name }}</p>
                            </div>    
                            <div class="col-sm-6">
                                <p><strong>Email:</strong> {{ comment.email }}</p>
                            </div> 
                            <div class="col-sm-10">
                                <p><strong>Body:</strong> {{ comment.body }}</p>
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
            comment: {
                        postId : '',
                        id : '',
                        name : '',
                        email : '',
                        body : ''
            },
            comments: []
        }
    },
    methods: {
            navigateBack() {
                this.$router.push('/');
            },
            getAllComments() {
            this.$http.get('comments')
                .then(response => {
                            console.log(response.data);
                            return response.json();
                        })
                        .then(data => {
                            const resultArray = [];
                            for (let key in data) {
                            resultArray.push(data[key]);
                            }
                            this.comments = resultArray;
                        });

        }
    }
}
</script>