import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    link: {
      textDecoration: 'none', // 밑줄 제거
      color: 'inherit', // 텍스트 색상 상속
    },
  }));

const UserRegist = () => {
    const classes = useStyles();

    return (
<div class="wrapper">
    <div class="item">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/employee" className={classes.link}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="div">
                 직원 등록
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Link to="/visitor" className={classes.link}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="div">
                  방문자 등록
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
      </div>
    </div>
    );
};

export default UserRegist;