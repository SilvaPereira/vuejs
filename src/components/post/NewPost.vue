<template>
    <div id="app">
        <h1>Create new Post</h1>
            <div class="form-group">
                <label for="usr" >Title:</label>
                <input v-model="post.title" type="text" class="form-control" id="title" placeholder="Enter title">
            </div>
            <hr>
             <div class="form-group">
                <label for="Body">Body:</label>
                <textarea v-model="post.body" class="form-control" rows="5" id="txtBody"></textarea>
            </div> 
        <hr>
        <button @click="submitNewPost" class="btn btn-primary">Submit</button>
        <button @click="navigateBack" class="btn btn-primary">Back</button>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            post: {
                id: '',
                title: '',
                body: ''
            }
        }
    },
    methods: {
        navigateBack() {
            this.$router.push('/');
        },
        submitNewPost() {
            this.$http.post('posts', this.post)
            .then(response => {
                console.log(response.data);
                return response.json();
            });
        }
    }
}
</script>