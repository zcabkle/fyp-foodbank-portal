import { Box, Link, Container, Paper, Typography, ButtonGroup, Button, Grid, Card, CardContent, Divider, CardActions } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { ArrowRight as ArrowRightIcon } from '../icons/arrow-right';
import * as MdIcons from "react-icons/md";

window.user_type = "";

function Item(props) {
  return (
    <Paper style={{ zIndex: '-3', textAlign: 'center', alignContent: 'center' }}>
      <img width="auto" height="500vh" src={props.item.src} />
      <Typography variant="h6">
        {props.item.description}
      </Typography>
      <br></br>
    </Paper>
  )
}

const LandingPage = () => {

  const [userType, setUserType] = useState('');
  const [itemCount, setItemCount] = useState(0);
  const [foodbanksCount, setFoodbanksCount] = useState(0);
  const [visitsCount, setVisitsCount] = useState(0);
  const [rerendered, setRerendered] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  if (sessionStorage.getItem("userType") && !rerendered) {
    setUserType(sessionStorage.getItem("userType"));
    setRerendered(true);
  }

  useEffect(() => {
    try {
      fetch("http://localhost:8080/stats")
        .then(res => res.json())
        .then(res => {
          setItemCount(res.items_count)
          setFoodbanksCount(res.foodbanks_count)
          setVisitsCount(res.visits_count)
        })
        .then(() => setLoading(false));
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }, []);

  function ChoosePersona() {
    return (
      <Paper style={{ zIndex: '-3', textAlign: 'center', alignContent: 'center' }}>
        <br></br>
        <Typography variant='h6'>Who are you visiting this website as?</Typography>
        <br></br>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          {userType === 'donator' ? <Button sx={{ color: 'white' }} onClick={() => {
            window.sessionStorage.setItem("userType", "donator");
            setUserType('donator')
          }}>Foodbank Donator</Button> : <Button sx={{ color: 'grey' }} variant="outlined" onClick={() => {
            window.sessionStorage.setItem("userType", "donator");
            setUserType('donator')
          }}>Foodbank Donator</Button>}
          {userType === 'user' ? <Button sx={{ color: 'white' }} onClick={() => {
            window.sessionStorage.setItem("userType", "user");
            setUserType('user')
          }}>Foodbank User</Button> : <Button sx={{ color: 'grey' }} variant="outlined" onClick={() => {
            window.sessionStorage.setItem("userType", "user");
            setUserType('user')
          }}>Foodbank User</Button>}
        </ButtonGroup>

        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            mx: '50px'
          }}
        >
          {userType === '' && <Typography variant='body1'> <br></br> </Typography>}

          {userType === 'user' && <Typography variant='body1'> <br />  <li>Use the <Link href='/foodbanks'>foodbank tab</Link> to find foodbanks and browse their items or parcels from the dropdowns. </li>
            <li> Alternatively, view the items available across all of our branches and filter them on the <Link href='/items'>items tab</Link>. </li>
            <li> Use the contact details provided to book a visit to the foodbank that can best support your needs at the moment. </li> <br /><br /></Typography>}
          {userType === 'donator' && <Typography variant='body1'> <br />  <li>Use the <Link href='/foodbanks'>foodbank tab</Link> to find foodbanks and browse which items are in need at those foodbanks. </li>
            <li> Alternatively, view the items available across all of our branches on the <Link href='/items'>items tab</Link> to see which foodbanks are in need of donations. </li>
            <li> Use the contact details provided to book a visit to the foodbank that you would like to help out. </li> <br /><br /> </Typography>}
        </Box>
      </Paper>
    )
  }

  var items = [
    {
      name: "Item 1",
      description: "Providing help when you need it most!",
      src: "./foodbank_smiling.png"
    },
    {
      name: "Item 1",
      description: "We are requesting donations, it's a great way to help out your local community.",
      src: "./fooddonations.jpg"
    },
    {
      name: "Item 2",
      description: "A wide variety of items are available, use the items tab to see what is currently in stock.",
      src: "/foodbank_items.jpg"
    },
    {
      name: "Item 4",
      description: "Cash donations are accepted, contact your local foodbank to arrange this.",
      src: "/coins.jpg"
    }
  ]

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">

        <Grid
          container
          justifyContent="space-between"
        >
          <Grid
            item
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex'
                  }}
                >
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="h6"
                  >
                    <FaIcons.FaRocket
                      color="primary"
                      size={20}
                    />
                    &nbsp;
                    Our Mission Statement
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ mt: 2, align: 'center' }}
                >
                  With great pride, we announce that our nationwide network of foodbanks, bringing hope and sustenance to those in need. <br />
                  Join us in our mission to combat hunger and make a real difference in the lives of individuals and families across the country. Together, we can create a world where no one goes hungry.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <br />

        <Carousel
          NextIcon={<AiIcons.AiFillCaretRight />}
          PrevIcon={<AiIcons.AiFillCaretLeft />}
          autoPlay={true}
          interval={5000}
          animation={"slide"}
          navButtonsAlwaysVisible={true}
          style={{ height: "100%", width: '100%', zIndex: '-3' }}
        >
          {
            items.map((item, i) => <Item key={i} item={item} />)
          }
        </Carousel>
        <br></br>
        <ChoosePersona />
        <br></br>
        <Grid
          container
          justifyContent="space-between"
          spacing={3}
        >
          <Grid
            item
            md={4}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="h6"
                  >
                    <AiIcons.AiFillShop
                      color="primary"
                      fontSize="medium"
                    />
                    &nbsp;
                    Registered Branches
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ mt: 2 }}
                >

                  We are excited to announce that {foodbanksCount} branches are registered to our foodbank network! This is a great milestone in our efforts to combat food insecurity and provide easier access to those in need.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  endIcon={<ArrowRightIcon fontSize="small" />}
                  size="small"
                >
                  <Link href="/foodbanks" underline="none">
                    Browse Foodbanks
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >

                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="h6"
                  >
                    <AiIcons.AiOutlineStock
                      color="primary"
                      fontSize="large"
                    />
                    &nbsp;
                    Recorded Visits
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ mt: 2 }}
                >
                  Our nationwide network has proudly recorded {visitsCount} visits, providing unparalleled access to our foodbanks. Join us and experience the difference today!
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  endIcon={<ArrowRightIcon fontSize="small" />}
                  size="small"
                >
                  <Link href="/foodbanks" underline="none">
                    Dicover Foodbanks
                  </Link>

                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid
            item
            md={4}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >

                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="h6"
                  >
                    <MdIcons.MdFoodBank
                      color="primary"
                      fontSize="large"
                    />
                    &nbsp;
                    Number of Items
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ mt: 2 }}
                >
                  We are pleased to announce that our foodbank network now offers a total of {itemCount} different items to help combat hunger and provide much-needed sustenance to those in need.
                </Typography>
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  endIcon={<ArrowRightIcon fontSize="small" />}
                  size="small"
                >
                  <Link href="/items" underline="none">
                    Browse Items
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="h6"
                  >
                    <FaIcons.FaQuestionCircle />
                  </Typography>
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="h6"
                  >
                    What is this project?
                  </Typography>
                </Box>
                <br></br>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >

                  We are proud to introduce our latest project, which aims to reduce food wastage by providing more powerful insights to foodbank workers, users, and donators.
                  By doing so, we hope to drive more useful donations across the UK and better serve our community in the fight against hunger. Our system is completely synced with the foodbanks' own systems,
                  providing an up-to-date snapshot of the situation at each foodbank. This allows you to make the most effective use of donations and ensure that they reach those who need them most.
                  <br /><br/>
                  We encourage everyone to take advantage of the variety of items available through our network and to spread the word about the resources we offer.
                  With your help, we can make a real difference in the fight against food insecurity and create a more sustainable future for all. Thank you for your support.

                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            md={6}
            xs={12}
          >
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex'
                  }}
                >
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="h6"
                  >
                    <FaIcons.FaQuestionCircle />
                  </Typography>
                  <Typography
                    color="primary.main"
                    sx={{ pl: 1 }}
                    variant="h6"
                  >
                    Who does this website serve?
                  </Typography>
                </Box>
                <br></br>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >

                  <li>For donators, our website provides an easy and convenient way to donate find where to donate the essential items that are currently needed by their local community.
                    This helps both large and small donators to make a larger impact and support those who are struggling with hunger.</li>
                  <li>For foodbank users, our website offers the ability to browse stock before visiting a foodbank, enabling them to visit the foodbanks that best cater to their specific needs.
                    By utilizing our website, foodbank users can access the resources they need to help them and their families thrive.</li>
                  <br />We are committed to serving both donators and foodbank users alike, and we encourage everyone to explore our website
                  and join us in our mission to create a world where no one goes hungry. Thank you for your support.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default LandingPage;