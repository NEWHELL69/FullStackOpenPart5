import { useState } from 'react'
import loginService from './services/login'
import Message from './components/Message'
import Dashboard from './components/Dashboard'
import Login from './components/Login'

const getLoggedUserToken = () => {
  const loggedUserTokenJSON = window.localStorage.getItem('loggedBlogAppUserToken');
  if (loggedUserTokenJSON) {
    return JSON.parse(loggedUserTokenJSON)
  }

  return null;
}

const App = () => {
  const [token, setToken] = useState(getLoggedUserToken());
  const [message, setMessage] = useState(null);
  const [messageId, setMessageId] = useState(0);

  const handleMessage = (message) => {
    setMessageId(messageId => messageId + 1)
    setMessage(message)
  }

  const handleErrors = (axiosResponseError, message) => {
    if(axiosResponseError.response.status === 401) {
      handleMessage(`${message}, 401`);
    }
  }

  const handleLogin = async (username, password) => {
    let token;
    
    // Getting form fields from react states
    const credentials = {
      username: username,
      password: password
    }

    // Logging in getting the token
    try {
      token = await loginService.getToken(credentials);
      setToken(token);
    } catch (axiosResponseError) {
      console.log(axiosResponseError);
      handleErrors(axiosResponseError, "Invalid password or username");
      return; // Returning from this function if token did not get
    }

    window.localStorage.setItem(
      'loggedBlogAppUserToken', JSON.stringify(token)
    )
  }

  const clearToken = () => {
    window.localStorage.clear();
    setToken(null);
  }

  return (
    <>
      <Message initialMessage={message} initialMessageId={messageId}/>
      {token && <Dashboard token={token} handleMessage={handleMessage} clearToken={clearToken}/>}
      {!token && <Login handleLogin={handleLogin}></Login>}
    </>
  )
}

export default App