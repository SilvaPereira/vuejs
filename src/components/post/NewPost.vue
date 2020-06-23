<template>
    <div id="app">
        <h1>Create new Post</h1>
            <div v-if="success" class="alert alert-success">
                <strong>Success!</strong> Your post was created.
            </div>
            <div v-if="!success" class="form-group">
                <div class="input" :class="{invalid: $v.title.$error}">
                    <label for="usr" >Title:</label>
                    <input @blur="$v.title.$touch()" v-model="title" type="text" class="form-control" id="title" placeholder="Enter title">
                    <p v-if="!$v.title.required && $v.title.$dirty">This field must not be empty</p>
                    <p v-if="!$v.title.minLen && $v.title.$dirty">This field must be over 8 characters</p>
                </div>
            </div>
            <hr>
             <div v-if="!success" class="form-group">
                <div class="input" :class="{invalid: $v.body.$error}">
                    <label for="Body">Body:</label>
                    <textarea @blur="$v.body.$touch()" v-model="body" class="form-control" rows="5" id="txtBody"></textarea>
                    <p v-if="!$v.body.required && $v.body.$dirty">This field must not be empty</p>
                </div>
            </div> 
        <hr>
        <button v-if="!success" @click="submitNewPost" class="btn btn-primary" :disabled="$v.$invalid">Submit</button>
        <button @click="navigateBack" class="btn btn-primary">Back</button>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
    name: 'app',
    data() {
        return {
            title: '',
            body: '',
            success: false
        }
    },
    validations: {
        title: {
            required,
            minLen: minLength(8)
        },
        body: {
            required
        }
    },
    methods: {
        navigateBack() {
            this.$router.push('/post');
        },
        submitNewPost() {
            this.$http.post('posts', { 'title': this.title, 'body': this.body})
            .then(response => {
                console.log(response.data);
                this.success = true;
                return response.json();
            });
        }
    }
}
</script>

<style scoped>

    .input.invalid label{
        color: red;
    }

    .input.invalid input{
        border: 1px solid red;
        background-color: #ffc9aa;
    }

    .input.invalid textarea{
        border: 1px solid red;
        background-color: #ffc9aa;
    }

</style>