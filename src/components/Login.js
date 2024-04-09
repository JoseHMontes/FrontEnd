import React, { useState } from "react";
import "./Login/Login.css";
import { FaRegUser } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';

function Users() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(""); // Corregido aquí

  const handleLogin = () => {
    const url = "http://localhost:8000/api-auth/token/";
    const loginData = {
      username: username,
      password: password,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error en la solicitud.");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setResponse(JSON.stringify(data));
        console.log(
          "Usuario autenticado. Redirigiendo a la página de dashboard..."
        );
      })
      .catch((error) => {
        setResponse("Error: " + error.message);
      });
  };

  return (
    <div className='login-container'>
     <div className= "wrapper">
      <form >
        <h1>Login</h1>
        <div className='input-box'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <FaRegUser className='icon' />
        </div>
        <div className='input-box'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <RiLockPasswordLine className='icon' />
        </div>

        <div className='remember-forgot'>
          <label>
            <input type='checkbox' />Remenber me
          </label>
          <a href='#'>Forgot password</a>
        </div>

        <button type='button' onClick={handleLogin}>Login</button> {/* Cambiado type a button */}
        {/* Mostrar respuesta */}
        {response && <p>{response}</p>}
        
        <div className='register-link'>
          <p>
            Don´t have an account? <a href='#'>Register</a>
          </p>
        </div>
      </form>
    </div>
     
    </div>
  );
}

export default Users;
