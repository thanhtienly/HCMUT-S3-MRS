import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./styles.scss"
import { message } from 'antd'

const Signin = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const handleLogin = () => {
    // You'll update this function later...
    console.log(username);
    console.log(password);
    const url = "http://localhost:8080/thongTin/authenticate"
    const payload = {
      "tenDangNhap": username,
      "matKhau": password
    }
    console.log(payload);
    fetch(url, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {

      console.log(data);
      
      // localStorage.setItem('userdata', JSON.stringify(data));
      if(data['message'] === 'success') {
        localStorage.setItem('login', 'success');
        // localStorage.setItem('maKhachHang', data['entity']['maKhachHang']);
        localStorage.setItem('name',data['entity']['ho'] + ' ' + data['entity']['ten']);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('cccd', data['entity'].cccd);
        navigate('/')
      }
      else {
        localStorage.setItem('login', 'fail');
        message.error('Sai tên đăng nhập hoặc mật khẩu!')
      }
    })
    .catch(err => {console.log(err)});
  }

  return (
    <div className='container-fuild loginmainContainer'>
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={username}
          placeholder="Tên tài khoản"
          onChange={(ev) => setUsername(ev.target.value)}
          className={'inputBox'}
          type='text'
          required
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Mật khẩu"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
          type="password"
          required
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <button className={'buttonContainer'} onClick={handleLogin}>Sign in</button>
      </div>
    </div>
  )
}

export default Signin