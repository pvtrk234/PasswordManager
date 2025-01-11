import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import LoadingDotsDark from './LoadingDotDark';
import AuthService from "../../services/auth.service";
import '../../styles/Login.css';

const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$');
const validUsername = new RegExp('^(?=.*?[a-z]).{4,}$');
const startLoginState = {
  username: "",
  password: ""
}

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(startLoginState);

  const validateField = (name, value) => {
    let error = '';

    if (name === 'username' && !validUsername.test(value)) {
      error = "";
    }
    if (name === 'password' && !validPassword.test(value)) {
      error = "";
    }

    return error;
  }

  const validate = () => {
    const errors = {};
    errors.username = validateField('username', form.username);
    errors.password = validateField('password', form.password);
    return errors;
  }

  const handleLogin = (event) => {
    event.preventDefault();
    let errors = validate();
    setErrors(errors);

    if (Object.keys(errors).every(key => !errors[key])) {
      AuthService.login(form.username, form.password).then(
        () => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false)
            navigate("/user");
            window.location.reload();
          }, 2_000)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              setErrors({ ...errors, username: `${resMessage}` });
            }, 2_000)
        }
      ).catch((err) => {
        setLoading(false);
      });
    } else {
      console.log(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  return (
    <div className="formLogin">
        <form id="loginForm">
            <h1>Logowanie</h1>
            <div className='container'>
                <div className={`usernameSection ${errors.username ? 'error' : ''}`}>
                    <label htmlFor="username">Nazwa użytkownika</label>
                    <input 
                        type="username"
                        name="username"
                        placeholder="Nazwa użytkownika"
                        value={form.username}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className={`passwordSection ${errors.username ? 'error' : ''}`}>
                    <label htmlFor="password">Hasło główne</label>
                    <div className="password-input-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            placeholder="Hasło"
                            value={form.password}
                            onChange={handleInputChange}
                            required
                        />
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)} />
                    </div>
                    {errors.username && (
                        <div className='smallInfo'>
                            <label htmlFor="smallInfo">{errors.username}</label>
                        </div>
                    )}  
                </div>
                {loading && <LoadingDotsDark />}
                {!loading && (
                  <button type="submit" onClick={handleLogin}>Zaloguj się</button>
                )}
                <div className="footer">
                    <a href="/register">Nie masz konta? Utwórz konto</a>
                    <p>© 2024 PassGuard Inc.</p>
                </div>
            </div>
        </form>
    </div>
  );
};

export default Login;