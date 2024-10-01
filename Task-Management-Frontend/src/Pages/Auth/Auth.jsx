import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import *as api from "../../Api/index"

const Auth = () => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPassValid, setIsPassValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [checks, setChecks] = useState([false, false, false]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email || !password) {
      alert("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    
    if (isSignup && !isPassValid) {
      alert("Please enter a valid password");
      setIsLoading(false);
      return;
    }

    setError('');
    
    if (isSignup && !name) {
      setError('Please enter your name to continue.');
      setIsLoading(false);
      return;
    }

    try {
      let response;
      if (isSignup) {
        response = await api.signUp({ name, email, password });
      } else {
        response= await api.logIn({ email, password });
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.result._id);

      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event('storage'));

      setIsLoading(false);
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 404) {
          alert(isSignup ? 'User already exists.' : 'User not found.');
        } else if (error.response.status === 400) {
          alert('Invalid credentials. Email and password do not match.');
        } else {
          alert(`Error during ${isSignup ? 'signup' : 'login'}. Please try again later.`);
        }
      } else {
        setError('Authentication failed. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleForgotPass = () => {
    navigate("/Forgotpassword");
  };

  const validatePass = (password) => {
    let updatedChecks = checks.slice(); // Create a copy of checks array
    const regex_special = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const regex_digit = /\d/;
    (password.length >= 8) ? updatedChecks[0] = true : updatedChecks[0]=false;
    (regex_special.test(password)) ? updatedChecks[1] = true : updatedChecks[1]=false;
    (regex_digit.test(password))? updatedChecks[2] = true : updatedChecks[2]=false;


    setChecks(updatedChecks);
    return updatedChecks.every(Boolean);
  };

  const setAndValidate = (e) => {
    setPassword(e.target.value);
    setIsPassValid(validatePass(e.target.value));
  };

  return (
    <section className={`auth-section ${isLoading ? 'loading-overlay' : ''}`}>
      {isLoading && (
        <div className="loading-overlay">
          <h1>Validating Credentials...</h1>
        </div>
      )}
      <div className='auth-container-2'>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor='name'>
              <h4>Display Name</h4>
              <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} />
            </label>
          )}

          <label htmlFor='email'>
            <h4>Email</h4>
            <input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label htmlFor='password'>
            <div
            //  style={{ display: 'flex', justifyContent: 'space-between' }}
             >
              <h4>Password</h4>
            </div>
              {isSignup ? (
                <input
                type={isChecked ? "text" : "password"}
                  name='password'
                  id='password'
                  style={{
                    border: password === "" ? "solid 1px #0000003e" : (isPassValid ? "1px solid green" : "1px solid red"),
                    outline: "none"
                  }}
                  onChange={setAndValidate}
                  />
                ) : (
                  <input type={isChecked ? "text" : "password"} name='password' id='password' onChange={(e) => setPassword(e.target.value)} />
                )}
              
              <input type='checkbox' checked={isChecked} style={{ fontSize: "15px" }} onClick={() => setIsChecked(!isChecked)} /> Show Password
          
              </label>

            {isSignup && (
              <p style={{ fontSize: "13px", color: password === "" ? "#0000003e" : "black" }}>
                <span style={{ color: checks[0] ? "green" : "red" }}>Password length must be between 8 and 15, </span>
                <span style={{ color: checks[1] ? "green" : "red" }}>must contain at least one special character, </span>
                <span style={{ color: checks[2] ? "green" : "red" }}>must contain at least one digit</span>
              </p>
            )}

          <button type='submit' className={`auth-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
            {isSignup ? "Sign Up" : "Log In"}
          </button>

          {isSignup && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking sign up, you agree to our 
              <span style={{ color: "#007ac6" }}> terms of service</span>, 
              <span style={{ color: "#007ac6" }}> privacy and policy</span>, and 
              <span style={{ color: "#007ac6" }}> cookies policy</span>.
            </p>
          )}
        </form>

        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
