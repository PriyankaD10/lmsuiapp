import axios from 'axios';

const USER_API_LOGIN_URL = 'https://lmsuserservice.azurewebsites.net/users/login'
const USER_API_USERNAME_EXIST_URL = 'https://lmsuserservice.azurewebsites.net/users/exists'
const USER_API_REGISTER_USER_URL = 'http://localhost:9013/users/register'

class UserService {
    login(user){
        return axios.post(USER_API_LOGIN_URL,user)
    }
    isUsernameExists(username){
        let url  = USER_API_USERNAME_EXIST_URL+'/'+username
        console.log("url >>>"+url)
        return axios.get(url)
    }
    registerUser(user){
        //let url  = USER_API_USERNAME_EXIST_URL+'/'+username
        //console.log("url >>>"+USER_API_REGISTER_USER_URL)
        return axios.post(USER_API_REGISTER_USER_URL,user)
    }
}
export default new UserService()