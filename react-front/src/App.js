import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onLoginHandler = (event) => {
    event.preventDefault();
    let body = {
      username: email,
      password: password,
    };
    axios
      .post('http://localhost:3001/auth/signin', JSON.stringify(body), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log('Receive Token');
        setToken(res.data.accessToken);
        setIsLogin(true);
        setEmail('');
        setPassword('');
      })
      .catch(console.log('Failed Login'));
  };
  const onLogoutHandler = (event) => {
    event.preventDefault();
    setToken('');
    setIsLogin(false);
  };
  return (
    <div>
      {isLogin === false ? (
        <div>
          <form onSubmit={onLoginHandler}>
            <div>
              <label>Email</label>
              <input type="" value={email} onChange={onEmailHandler} />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={onPasswordHandler}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      ) : (
        <div>
          <h1>HomePage</h1>
          <button onClick={onLogoutHandler}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
