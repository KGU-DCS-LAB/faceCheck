import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';

function EmployeeRegistration() {
  const [employeeData, setEmployeeData] = useState({
    photo: '',
    department: '',
    name: '',
    position: '',
    accessLocation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleRegistration = () => {
    // employeeData를 서버로 보내거나 다른 작업 수행
    console.log('직원 정보:', employeeData);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        직원 등록
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
              label="부서"
              name="department"
              value={employeeData.department}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="이름"
              name="name"
              value={employeeData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="직책"
              name="position"
              value={employeeData.position}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="출입 가능 장소"
              name="accessLocation"
              value={employeeData.accessLocation}
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

export default EmployeeRegistration;
