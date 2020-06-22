<template>
    <div id="app">
        <h1>User</h1>
        <button class="btn btn-primary" v-on:click.prevent="getAllUsers()">Get all Users</button>
        <button class="btn btn-primary" v-on:click.prevent="getUser()">Get User</button>
        <input v-model="inputUserId" type="text" id="inputUserId">
        <!-- <button class="btn btn-primary" v-on:click.prevent="">New User</button> -->
        <router-link tag="button" to="/user/new" class="btn btn-primary">New User</router-link>
        <button @click="navigateBack" class="btn btn-primary">Back</button>
        <hr>
        <button v-if="show" @click="navigateBack" class="btn btn-primary">Clear Results</button>
        <hr>
        <ul>
            <li class="list-group-item" v-for="user in users" v-bind:key="user"> 
                <div class="panel panel-default">
                    <div class="panel-heading"><strong>User Information {{ user.id }} </strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-6">
                                <p><strong>Name:</strong> {{ user.name }}</p>
                                <p><strong>Email:</strong> {{ user.email }}</p>
                            </div>
                             <div class="col-sm-6">
                                <p><strong>Username:</strong> {{ user.username }}</p>  
                            </div>
                        </div>
                    </div>
                    <div class="panel-body"><strong>User Address</strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-4">
                                <p><strong>Street:</strong> {{ user.address.street }}</p>
                                <p><strong>Zipcode:</strong> {{ user.address.zipcode }}</p>                                
                            </div>
                            <div class="col-sm-4">
                                <p><strong>Suite:</strong> {{ user.address.suite }}</p>
                                <p><strong>Latitude:</strong> {{ user.address.geo.lat }} </p>
                            </div>
                            <div class="col-sm-4">
                                <p><strong>City:</strong> {{ user.address.city }} </p>                              
                                <p><strong>Longitude:</strong> {{ user.address.geo.lng }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body"><strong>User Contact</strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-6">
                                <p><strong>Phone:</strong> {{ user.phone }} </p>
                                <p><strong>Website:</strong> {{ user.website }}</p>
                            </div>
                            <div class="col-sm-6">
                                <p><strong>Company Name:</strong> {{ user.company.name }} </p>
                                <p><strong>BS:</strong> {{ user.company.bs }}</p>
                            </div>
                            <div class="col-sm-8">
                                <p><strong>CatchPhrase:</strong> {{ user.company.catchPhrase }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul> 
        <hr>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
    return {
        user: {
                id: '',
                name: '',
                username: '',
                email: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: '',
                    geo: {
                        lat: '',
                        lng: ''
                    }
                },
                phone: '',
                website: '',
                company: {
                    name: '',
                    catchPhrase: '',
                    bs: ''
                }
        },
        inputUserId: '',
        users: [],
        show: false
        };
    },
    methods: {
        navigateBack() {
            this.$router.push('/');
        }, 
        getAllUsers() {
            this.$http.get('users')
                .then(response => {
                            console.log(response.data);
                            return response.json();
                        })
                        .then(data => {
                            const resultArray = [];
                            for (let key in data) {
                            resultArray.push(data[key]);
                            }
                            this.users = resultArray;
                        });

        },
        getUser() {
            this.$http.get('users/' + inputUserId.value)
                .then(response => {
                    console.log(response.data);
                    return response.json();
                })
                .then(data => {
                    
                })
        }
    },
}
</script>