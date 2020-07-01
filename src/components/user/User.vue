<template>
    <div id="app">
        <h1>User</h1>
        <button class="btn btn-primary" v-on:click.prevent="getAllUsers()">Get all Users</button>
        UserId:
        <input v-model="inputUserId" type="text" id="inputUserId">
        <button class="btn btn-primary" v-on:click.prevent="getUser()">Get User</button>
        <!-- <button class="btn btn-primary" v-on:click.prevent="">New User</button> 
        <div class="input-group">
        <input type="text" class="form-control" placeholder="Search" name="search">
        <div class="input-group-btn">
        <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
        </div>
        </div>
        -->
        <router-link tag="button" to="/user/new" class="btn btn-primary">New User</router-link>
        <button @click="navigateBack" class="btn btn-primary">Back</button>
        <hr>
        <div v-if="error" class="alert alert-danger">
            <strong>No results!</strong> The User you searched for doesnt exist. Try another one.
        </div>
        <div v-if="warning" class="alert alert-warning">
            <strong>Warning!</strong> You need to write a User Id to search for.
        </div>
        <button v-if="show" @click="navigateBack" class="btn btn-primary">Clear Results</button>
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
        <ul v-if="singleItem">
            <li class="list-group-item"> 
                <div class="panel panel-default">
                    <div class="panel-heading"><strong>User Information {{ oneUser.id }} </strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-6">
                                <p><strong>Name:</strong> {{ oneUser.name }}</p>
                                <p><strong>Email:</strong> {{ oneUser.email }}</p>
                            </div>
                             <div class="col-sm-6">
                                <p><strong>Username:</strong> {{ oneUser.username }}</p>  
                            </div>
                        </div>
                    </div>
                    <div class="panel-body"><strong>User Address</strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-4">
                                <p><strong>Street:</strong> {{ oneUser.address.street }}</p>
                                <p><strong>Zipcode:</strong> {{ oneUser.address.zipcode }}</p>                                
                            </div>
                            <div class="col-sm-4">
                                <p><strong>Suite:</strong> {{ oneUser.address.suite }}</p>
                                <p><strong>Latitude:</strong> {{ oneUser.address.geo.lat }} </p>
                            </div>
                            <div class="col-sm-4">
                                <p><strong>City:</strong> {{ oneUser.address.city }} </p>                              
                                <p><strong>Longitude:</strong> {{ oneUser.address.geo.lng }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body"><strong>User Contact</strong>
                    <hr>
                        <div class="row">
                            <div class="col-sm-6">
                                <p><strong>Phone:</strong> {{ oneUser.phone }} </p>
                                <p><strong>Website:</strong> {{ oneUser.website }}</p>
                            </div>
                            <div class="col-sm-6">
                                <p><strong>Company Name:</strong> {{ oneUser.company.name }} </p>
                                <p><strong>BS:</strong> {{ oneUser.company.bs }}</p>
                            </div>
                            <div class="col-sm-8">
                                <p><strong>CatchPhrase:</strong> {{ oneUser.company.catchPhrase }}</p>
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
        oneUser: {
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
            if ( inputUserId.value == '') {
                this.singleItem = false;
                this.error = false;
                this.warning = true;
                return;
            }
            this.$http.get('users/' + inputUserId.value)
            .then(response => {
                console.log(response.data);
                return response.json();
            })
            .then(data => {
                this.oneUser = data;
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