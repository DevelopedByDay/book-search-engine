import decode from 'jwt-decode';

// Use class with refactored graphql
class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  // We must check if a user is logged in and if their token is expired 
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  isTokenExpired(token) {
    try {
      const codeToken = decode(token);
      if (codeToken.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // when logging out we can clear out a user's token as well
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
