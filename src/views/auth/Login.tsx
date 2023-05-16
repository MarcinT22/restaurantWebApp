import React from 'react';
import '../../scss/auth.scss'



const Login: React.FC = () => {
  return <div className="auth">
    <div className="auth__container">
      <h1 className="auth__header auth__header--main">RestaurantApp</h1>
      <div className="auth__content">
        <h2 className="auth__header auth__header--highlight">
            Sign in
        </h2>
        <form className="auth__form">
          <div className="auth__field">
            <input type="text" className="auth__input" placeholder='E-mail' />
          </div>
          <div className="auth__field">
            <input type="password" className="auth__input" placeholder='Password' />
          </div>
          <input type="submit" value="Login" className="auth__button" />
        </form>
      </div>
    </div>
  </div>
}

export default Login;