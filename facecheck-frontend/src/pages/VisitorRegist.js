import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

function VisitorRegistration() {
  const [visitorData, setVisitorData] = useState({
    photo: '',
    name: '',
    reasonForVisit: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisitorData({ ...visitorData, [name]: value });
  };

  const handleRegistration = () => {
    // visitorData를 서버로 보내거나 다른 작업 수행
    console.log('방문자 정보:', visitorData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        방문자 등록
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <label>사진</label>
            <input type="file" name="photo" onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이름"
              name="name"
              value={visitorData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="방문 사유"
              name="reasonForVisit"
              value={visitorData.reasonForVisit}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegistration}
        >
          등록
        </Button>
      </form>
    </Container>
  );
}

export default VisitorRegistration;
