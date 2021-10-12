import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import axios from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SchoolIcon from '@mui/icons-material/School'
import Navbar from '../../components/Navbar/Navbar'
import PostingBox from '../../components/PostingBox/PostingBox.jsx'
import Post from '../../components/Post/Post.jsx'
import Card from '../../components/Card/Card'
import { Avatar, Container, Grid, Hidden } from '@mui/material'

const drawerWidth = 200

const Club = ({ setCircle }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const history = useHistory()
  const { clubID } = useParams()
  const [user, setUser] = useState({})
  const [study, setStudy] = useState([])
  const [club, setClub] = useState([])
  const [posts, setPosts] = useState([])
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    // setCircle(true)
    // if (accessToken) {
    //   const fetchData = async () => {
    //     try {
    //       if (clubID) {
    //         const successStudy = await axios.get(`/club/${clubID}`, {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         })
    //         console.log('here')
    //         setStudy(successStudy)
    //         console.log('Success Club', successStudy.data)
    //       }
    //       const successClub = await axios.get(`/club/`, {
    //         headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         },
    //       })
    //       console.log('here')
    //       setClub(successClub)
    //       console.log('Success Club', successClub.data)
    //     } catch (error) {
    //       console.log('Error fetching data', error)
    //     }
    //   }
    //   fetchData()
    //   console.log(study)
    // } else {
    //   console.log('Im here')
    //   history.push('/login', { text: 'hellooooooo' })
    // }
    // setCircle(false)
  }, [history, setCircle, setClub, accessToken])

  const drawer = (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt='Memy Sharp'
          src='https://picsum.photos/400/400'
          sx={{ width: 100, height: 100, margin: '25px 0 15px 0' }}
        />
        <div>
          {user.fName} {user.lName}
        </div>
        <div>{user.username}</div>
        <div>{user.isFrom}</div>
        <div>{user.role}</div>
      </Box>
      <br />
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={'University of Canberra'}
            secondary={'Expected completion 2021'}
            onClick={() => console.log('list item clicked')}
          />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Frakfurt University'}
            secondary={'2015-2021'}
            onClick={() => console.log('list item clicked')}
          />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary={'Engineering Society Club'}
            secondary={'University of Canberra'}
            onClick={() => console.log('list item clicked')}
          />
        </ListItem>
      </List>
    </div>
  )

  // NO POSTS RELATED
  let ifNoPosts
  if (posts.length < 1) {
    ifNoPosts = (
      <Card>
        <Box sx={{ textAlign: 'center' }}>No Posts to display.</Box>
      </Card>
    )
  }

  const sidebarSkeleton = (
    <>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              // marginTop: '57px',
              marginTop: '0px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  )

  return (
    <>
      <Navbar />
      {sidebarSkeleton}
      <Container disableGutters maxWidth='xl' className='container'>
        <Grid container>
          <Hidden mdDown>
            <Grid item md={4}>
              {drawer}
            </Grid>
          </Hidden>
          <Hidden mdUp>
            <Grid item xs={12}>
              <Card height='190px'>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Avatar
                    alt='Memy Sharp'
                    src='https://picsum.photos/400/400'
                    sx={{ width: 100, height: 100, margin: '25px 0 15px 0' }}
                    onClick={() => setMobileOpen(!mobileOpen)}
                  />
                  <div>{/* {user.fName} {user.lName} */}</div>
                </Box>
              </Card>
            </Grid>
          </Hidden>
          <Grid item xs={8}>
            <Hidden mdDown>
              {ifNoPosts}
              <Post posts={posts} />
            </Hidden>
          </Grid>
          <Grid item xs={12}>
            <Hidden mdUp>
              {ifNoPosts}
              <Post posts={posts} />
            </Hidden>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Club
