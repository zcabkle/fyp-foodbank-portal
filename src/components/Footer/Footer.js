import {
  Card, Typography,
} from '@mui/material';

function Footer() {
  return (
    <Card>
      <Card sx={{
        justifyContent: "center",
        alignContent: "center",
        textAlign: 'center',
        backgroundColor: 'background.default'
      }}>
        <Typography variant='body1' color="textSecondary">
          Copyright © 2023
        </Typography>
      </Card>
      <Card sx={{
        justifyContent: "center",
        alignContent: "center",
        textAlign: 'center',
        backgroundColor: 'background.default',
        shadows: 'none'
      }}>
        <br></br>
      </Card>
    </Card>
  )
}

export default Footer;