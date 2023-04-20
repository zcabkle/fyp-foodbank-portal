import { Box, Link, Container, Paper, Typography, ButtonGroup, Button, Grid, Card, CardContent, Divider, CardActions } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { ArrowRight as ArrowRightIcon } from '../../icons/arrow-right';
import * as MdIcons from "react-icons/md";

function Item(props) {
  return (
    <Paper style={{ zIndex: '-3', textAlign: 'center', alignContent: 'center' }}>
      <img width="100%" height="auto" src={props.item.src} alt="carousel item" />
      <Typography variant="body1" color="textSecondary">
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
  const [loadedSS, setLoadedSS] = useState(false)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [firstImgLoaded, setFirstImgLoaded] = useState(false);

  if (!sessionStorage.getItem("userType")) {
    window.sessionStorage.setItem("userType", "")
  }

  if (sessionStorage.getItem("userType") !== '' && !loadedSS) {
    setUserType(sessionStorage.getItem("userType"));
    setLoadedSS(true);
  }

  useEffect(() => {
    try {
      fetch("/api/stats")
        .then(res => {
          return res.json()
        })
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
            textAlign: 'left',
            justifyContent: 'center',
            display: 'flex',
            mx: '50px'
          }}
        >
          {
            userType === '' && <Typography variant='body1' color="textSecondary"> <br></br> </Typography>
          }

          {
            userType === 'user' && <Typography variant='body1' color="textSecondary"> <br />
              <li>Use the <Link href='/foodbanks'>foodbank tab</Link> to find foodbanks and browse their items or parcels from the dropdowns. </li>
              <li> Alternatively, view the items available across all of our branches and filter them on the <Link href='/items'>items tab</Link>. </li>
              <li> Use the contact details provided to book a visit to the foodbank that can best support your needs at the moment. </li> <br /><br /></Typography>
          }
          {
            userType === 'donator' && <Typography variant='body1' color="textSecondary"> <br />
              <li>Use the <Link href='/foodbanks'>foodbank tab</Link> to find foodbanks and browse which items are in need at those foodbanks. </li>
              <li> Alternatively, view the items available across all of our branches on the <Link href='/items'>items tab</Link> to see which foodbanks are in need of donations. </li>
              <li> Use the contact details provided to book a visit to the foodbank that you would like to help out. </li> <br /><br /></Typography>
          }
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
    <Grid
      container
      spacing={3}
    >
      <Grid item md={1}></Grid>
      <Grid item md={10}
        xs={12}>
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
                        data-testid="Our Mission Statement"
                      >

                        &nbsp;
                        Our Mission Statement
                      </Typography>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
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

           //Carousel bug fix found here: https://github.com/Learus/react-material-ui-carousel/issues/189
            <img
              src={items[0].src}
              onLoad={() => setFirstImgLoaded(true)}
              style={{ display: "none" }}
            />
            {firstImgLoaded && (
              <Carousel
                NextIcon={<AiIcons.AiFillCaretRight />}
                PrevIcon={<AiIcons.AiFillCaretLeft />}
                autoPlay={true}
                interval={5000}
                animation={"slide"}
                navButtonsAlwaysVisible={true}
                changeOnFirstRender={true}
                style={{ height: "100%", width: '100%', zIndex: '-3' }}
              >
                {
                  items.map((item, i) => <Item key={i} item={item} />)
                }
              </Carousel>)}
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
                <Card style={{ height: '100%' }}>
                  <CardContent >
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
                      color="textSecondary"
                      variant="body1"
                      sx={{ mt: 2 }}
                    >
                      {foodbanksCount} branches are registered to our foodbank network! This is an amazing milestone in our efforts to combat food insecurity all across the UK.
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      endIcon={<ArrowRightIcon fontSize="small" />}
                      size="small"
                      href="/foodbanks"
                    >
                      Browse Foodbanks

                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
              >
                <Card style={{ height: '100%' }}>
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
                      color="textSecondary"
                      variant="body1"
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
                      href="/foodbanks"
                    >
                      Discover Foodbanks
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid
                item
                md={4}
                xs={12}
              >
                <Card style={{ height: '100%' }}>
                  <CardContent >
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
                      id="here"
                      color="textSecondary"
                      variant="body1"
                      sx={{ mt: 2 }}
                    >
                      Our foodbank network now offers a total of {itemCount} different items in order to help combat hunger and provide much-needed sustenance to those in need.
                    </Typography>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      endIcon={<ArrowRightIcon fontSize="small" />}
                      size="small"
                      href="/items"
                    >
                      Browse Items
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
                        <FaIcons.FaQuestionCircle /> &nbsp; What is this project?
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
                      <br /><br />
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
                        <FaIcons.FaQuestionCircle /> &nbsp; Who does this website serve?
                      </Typography>
                    </Box>
                    <br></br>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      component='span'
                    >

                      <ul>
                        <li>
                          For donators, our website provides an easy and convenient way to donate find where to donate the essential items that are currently needed by their local community.
                          This helps both large and small donators to make a larger impact and support those who are struggling with hunger.
                        </li>
                        <br></br>
                        <li>For foodbank users, our website offers the ability to browse stock before visiting a foodbank, enabling them to visit the foodbanks that best cater to their specific needs.
                          By utilizing our website, foodbank users can access the resources they need to help them and their families thrive.
                        </li>
                      </ul>
                      <br />
                      We are committed to serving both donators and foodbank users alike, and we encourage everyone to explore our website
                      and join us in our mission to create a world where no one goes hungry. Thank you for your support.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Grid>
      <Grid item md={1}></Grid>
    </Grid>
  )
}

export default LandingPage;

// MUI carousel component was used: https://www.npmjs.com/package/react-material-ui-carousel