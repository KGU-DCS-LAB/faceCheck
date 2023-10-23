import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none', // 밑줄 제거
    color: 'inherit', // 텍스트 색상 상속
  },
  card: {
      gridItem: {
    display: 'flex',
    justifyContent: 'center', // 수평 가운데 정렬
  },
  },
}));

function CardList() {
  const classes = useStyles();

  return (
    <div class="wrapper">
        <div class="item">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Link to="/userRegist" className={classes.link}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="div">
                  사용자 등록
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Link to="/userRegist" className={classes.link}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="div">
                  얼굴 인식 카메라 등록
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Link to="/userRegist" className={classes.link}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" component="div">
                  출입 기록 관리
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      </Grid>
      </div>
    </div>
  );
}

export default CardList;
