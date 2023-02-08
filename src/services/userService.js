import axios from "axios";

const userService = {
    getFakeUsers: function () {
        try {
            return axios.get("https://jsonplaceholder.typicode.com/users");
        } catch (error) {
            console.log("error>>>", error);
        }
    },
    getFakeUserId: function (id) {
        try {
            return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        } catch (error) {
            console.log("error>>>", error);
        }
    },
    getUserPosts: function () {
        try {
            return axios.get("https://jsonplaceholder.typicode.com/posts");
        } catch (error) {
            console.log("error>>>", error);
        }
    },
    getPostId: function (id) {
        try {
            return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        } catch (error) {
            console.log("error>>>", error);
        }
    },
    getPostsComments: function (id) {
        try {
            return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        } catch (error) {
            console.log("error>>>", error);
        }
    },
}

export default userService;