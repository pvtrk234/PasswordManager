import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { isEmail } from "validator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import LoadingDotsDark from "./LoadingDotDark";
import AuthService from "../../services/auth.service";
import '../../styles/Register.css';

const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$');
const validUsername = new RegExp('^(?=.*?[a-z]).{4,}$');
const startSignUpState = {
  username: "",
  email: "",
  password: "",
}

const validateField = (name, value) => {
  let error = '';

  if (name === 'username' && !validUsername.test(value)) {
    error = "Nazwa użytkownika powinna zawierać co najmniej jedną małą literę i składać się z co najmniej 4 znaków.";
  }
  if (name === 'email') {
    if (!isEmail(value)) {
      error = "To nie jest prawidłowy e-mail.";
    }
  }
  if (name === 'password' && !validPassword.test(value)) {
    error = "Hasło powinno zawierać co najmniej wielką literę, jedną cyfrę i składać się z co najmniej 8 znaków.";
  }

  return error;
}

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(startSignUpState);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errors = {};
    errors.username = validateField('username', form.username);
    errors.email = validateField('email', form.email);
    errors.password = validateField('password', form.password);
    return errors;
  }

  const handleRegister = (event) => {
    event.preventDefault();
    let errors = validate();
    setErrors(errors);

    if (Object.keys(errors).every(key => !errors[key])) {
      AuthService.register(form.username, form.email, form.password).then(
        (response) => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate("/login");
          }, 2_000)
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          
          if (resMessage == "Error: Username is already taken!") {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              setErrors({ ...errors, username: `Nazwa użytkownika jest już zajęta!` });
            }, 2_000)
          } else if (resMessage == "Error: Email is already in use!") {
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              setErrors({ ...errors, username: `Podany e-mail jest już w użyciu!` });
            }, 2_000)
          }
        }
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  return (
    <div className="formRegister">
        <form id="registrationForm" onSubmit={handleRegister}>
            <h1>Rejestarcja</h1>
            <div className='container'>
                <div className={`usernameSection ${errors.username ? 'error' : ''}`}>
                    <label htmlFor="username">Nazwa użytkownika <b>ᴡʏᴍᴀɢᴀɴᴇ</b></label>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="Nazwa użytkownika" 
                        value={form.username} 
                        onChange={handleInputChange}
                        required
                    />
                    {errors.username && (
                        <div className='smallInfo'>
                            <label htmlFor="smallInfo">{errors.username}</label>
                        </div>
                    )}
                </div>
                <div className={`nameSection ${errors.email ? 'error' : ''}`}>
                    <label htmlFor="email">E-mail <b>ᴡʏᴍᴀɢᴀɴᴇ</b></label>
                    <input
                        type="text" 
                        name="email"
                        placeholder="E-mail" 
                        value={form.email} 
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && (
                        <div className='smallInfo'>
                            <label htmlFor="smallInfo">{errors.email}</label>
                        </div>
                    )}
                </div>
                <div className={`passwordSection ${errors.password ? 'error' : ''}`}>
                    <label htmlFor="password">Hasło główne <b>ᴡʏᴍᴀɢᴀɴᴇ</b></label>
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
                    {errors.password && (
                        <div className='smallInfo'>
                            <label htmlFor="smallInfo">{errors.password}</label>
                        </div>
                    )}  
                </div>
                {loading && <LoadingDotsDark />}
                {!loading && (
                    <button id="butto n" type="submit">Utwórz konto</button>
                )}
                <div className="footer">
                    <a href="/login">Masz już konto? Zaloguj się</a>
                    <p>© 2024 Password-Manager Inc.</p>
                </div>
            </div>
        </form>
    </div>
  );
};

export default Register;