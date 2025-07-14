import Cookies from 'js-cookie';

const isAuthenticated = () => Cookies.get('accessToken') ? true : false


export default isAuthenticated