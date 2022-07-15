import axios from "axios";
import { LocalStorage } from 'quasar'
const API_URL = 'http://localhost:8080/api/auth/';
class AuthService {
  async login(user) {
    return await axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        console.log('res: ', response)
        if (response.data.accessToken) {
          LocalStorage.set('user', response.data)
          // localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  async logout() {
    localStorage.removeItem('user');
  }
  async register(user) {
    return await axios.post(API_URL + 'signup', {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}
export default new AuthService();