// src/components/Login.js

import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function Login({ open, handleClose, setOpen }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 간단한 데모용 사용자 이름과 비밀번호
    const demoUsername = "demoUser";
    const demoPassword = "demoPassword";
  
    // 사용자가 입력한 사용자 이름과 비밀번호
    if (username === demoUsername && password === demoPassword) {
      // 로그인 성공
      alert("로그인 성공!");
      setOpen(false);
    } else {
      // 로그인 실패
      alert("로그인 실패. 사용자 이름 또는 비밀번호가 일치하지 않습니다.");
    }
  };
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>로그인</DialogTitle>
      <DialogContent>
        <TextField
          label="사용자 이름"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>닫기</Button>
        <Button onClick={handleLogin}>로그인</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Login;
