import Home from './components/Home.vue';
import User from './components/user/User.vue';
import NewUser from './components/user/NewUser.vue';
import Post from './components/post/Post.vue';
import NewPost from './components/post/NewPost.vue'; 
import Comment from './components/Comment/Comment.vue';
import NewComment from './components/comment/NewComment.vue';

export const routes = [
    { path: '', component: Home } ,
    { path: '/post/new', component: NewPost } ,
    { path: '/user/new', component: NewUser } ,
    { path: '/post', component: Post},
    { path: '/comment', component: Comment },
    { path: '/user', component: User} 
];