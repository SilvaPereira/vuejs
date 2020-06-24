<template>
    <div id="app">
        <h1>Create new User</h1>
            <div v-if="success" class="alert alert-success">
                <strong>Success!</strong> Your user was created.
            </div>
            
            <div v-if="userInfo">
                <div class="form-group row">
                    <p>User Information</p>
                    <div class="input col-xs-6" :class="{invalid: $v.name.$error}">
                        <label for="name">Name:</label>
                        <input @blur="$v.name.$touch()" v-model="name" type="text" class="form-control" id="txtName" placeholder="Enter name">
                        <p v-if="!$v.name.required && $v.name.$dirty">This field must not be empty</p>
                    </div>
                </div>  
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.username.$error}">
                        <label for="username">Username:</label>
                        <input @blur="$v.username.$touch()" v-model="username" type="text" class="form-control" id="txtUsername" placeholder="Enter username">
                        <p v-if="!$v.username.required && $v.username.$dirty">This field must not be empty</p>
                        <p v-if="!$v.username.minLen && $v.username.$dirty">This field must be over 6 characters</p>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.email.$error}">
                        <label for="email">Email:</label>
                        <input @blur="$v.email.$touch()" v-model="email" type="text" class="form-control" id="txtEmail" placeholder="Enter e-mail">
                        <p v-if="!$v.email.required && $v.email.$dirty">This field must not be empty</p>
                        <p v-if="!$v.email.required && $v.email.$dirty">Please insert a valid e-mail</p>
                    </div>
                </div>
                {{ $v }}
            </div>

            <div v-if="userAddress">
                <div class="form-group row">
                    <p>User Address</p>
                    <div class="input col-xs-6" :class="{invalid: $v.street.$error}">
                        <label for="street">Street:</label>
                        <input @blur="$v.street.$touch()" v-model="street" type="text" class="form-control" id="txtStreet" placeholder="Enter street">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.suite.$error}">
                        <label for="suite">Suite:</label>
                        <input @blur="$v.suite.$touch()" v-model="suite" type="text" class="form-control" id="txtSuite" placeholder="Enter suite">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.city.$error}">
                        <label for="city">City:</label>
                        <input @blur="$v.city.$touch()" v-model="city" type="text" class="form-control" id="txtCity" placeholder="Enter city">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.zipcode.$error}">
                        <label for="zipcode">Zipcode:</label>
                        <input @blur="$v.zipcode.$touch()" v-model="zipcode" type="text" class="form-control" id="txtZipcode" placeholder="Enter zipcode">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.latitude.$error}">
                        <label for="latitude">Latitude:</label>
                        <input @blur="$v.latitude.$touch()" v-model="latitude" type="text" class="form-control" id="txtLatitude" placeholder="Enter latitude">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.longitude.$error}">
                        <label for="longitude">Longitude:</label>
                        <input @blur="$v.longitude.$touch()" v-model="longitude" type="text" class="form-control" id="txtLongitude" placeholder="Enter longitude">
                    </div>
                </div>
            </div>
           
            <div v-if="userContact">
                <div class="form-group row">
                    <p>User Contact</p>
                    <div class="input col-xs-6" :class="{invalid: $v.phone.$error}">
                        <label for="phone">Phone:</label>
                        <input @blur="$v.phone.$touch()" v-model="phone" type="text" class="form-control" id="txtPhone" placeholder="Enter phone">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.companyName.$error}">
                        <label for="companyName">Company Name:</label>
                        <input @blur="$v.companyName.$touch()" v-model="companyName" type="text" class="form-control" id="txtCompanyName" placeholder="Enter company name">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.website.$error}">
                        <label for="website">Website:</label>
                        <input @blur="$v.website.$touch()" v-model="website" type="text" class="form-control" id="txtWebsite" placeholder="Enter website">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.bs.$error}">
                        <label for="bs">BS:</label>
                        <input @blur="$v.bs.$touch()" v-model="bs" type="text" class="form-control" id="txtBS" placeholder="Enter BS">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="input col-xs-6" :class="{invalid: $v.catchPhrase.$error}">
                        <label for="catchPhrase">Catch Phrase:</label>
                        <input @blur="$v.catchPhrase.$touch()" v-model="catchPhrase" type="text" class="form-control" id="txtCatchPhrase" placeholder="Enter catch phrase">
                    </div>    
                </div>
            </div>
        <hr>
        <button v-if="userContact" @click="submitNewUser" class="btn btn-primary" :disabled="$v.$invalid">Submit</button>
        <button v-if="userInfo" @click="addressSection" class="btn btn-primary" :disabled="$v.email.$invalid || $v.username.$invalid || $v.name.$invalid">Next</button> 
        <button v-if="userAddress" @click="contactSection" class="btn btn-primary" :disabled="$v.street.$invalid  || $v.suite.$invalid || $v.city.$invalid">Next</button>
        <button @click="navigateBack" class="btn btn-primary">Back</button>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
    name: 'app',
    data() {
    return {
            success: false,
            userInfo: true,
            userAddress: false,
            userContact: false,
            name: '',
            username: '',
            email: '',
            street: '',
            suite: '',
            city: '',
            zipcode: '',
            latitude: '',
            longitude: '',
            phone: '',
            companyName: '',
            website: '',
            bs: '',
            catchPhrase: ''

        }
    },
    validations: {
        name: {
            required
        },
        email: {
            required,
            email
        },
        username: {
            required,
            minLen: minLength(6)
        },
        street: {
            required
        },
        suite: {
            required
        },
        city: {
            required
        },
        zipcode: {
            required
        },
        latitude: {
            required
        },
        longitude: {
            required
        },
        phone: {
            required
        },
        companyName: {
            required
        },
        website: {
            required
        },
        bs: {
            required
        },
        catchPhrase: {
            required
        }
    },
    methods: {
        navigateBack() {
            this.$router.push('/user');
        },
        submitNewUser() {

        },
        addressSection(){
            this.userInfo = false;
            this.userAddress = true;
        },
        contactSection(){
            this.userAddress = false;
            this.userContact = true;
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


/*
labels 5px margin-right

*/
</style>