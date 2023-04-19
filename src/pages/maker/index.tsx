import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from "styled-components";
import axiosInstance from '../api/axios';
import { getJobs } from '../api/httpRequest';
import { JobParamsType } from '@/models/job';

interface IClothType {
  label: string;
  id: number;
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme()

const clothType: IClothType[] = [
  {
    label: 'Shirt', id: 1001
  },
  {
    label: 'Pants', id: 1002
  },
  {
    label: 'Dress', id: 1003
  },
  {
    label: 'Jacket', id: 1004
  },
  {
    label: 'Shoes', id: 1005
  }
]

const MakerHome = () => {
  const [value, setValue] = React.useState<number | null>();
  const [locationList, setLocationList] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState<string>();
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
    location: location,
    type: value
})
const [jobData, setJobData] = React.useState();


  // get location list
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/job-locations');
        if (response.data.status === 200) {
          setLocationList(response.data.data)
        }
      } catch (error) {
        console.log('error:', error)
      }
    }

    fetchData();
  }, [])

  // paginate all jobs with filter by location and cloth type
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJobs({
            page: pagination.page,
            limit: pagination.limit,
            location: pagination.location,
            type: pagination.type
        });
        if (response.data.status === 200) {
          setJobData(response.data.data)
        }
      } catch (error) {
        console.log('error:', error)
      }
    }

    fetchData();
  }, [pagination])



  const handleSearch = () => {
    setPagination({
      ...pagination,
      location: location,
      type: value
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            YumeTailor
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              All Jobs
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <SearchBar>
                <Autocomplete
                  onChange={(event, newValue: IClothType | null) => {
                    if (newValue) {
                      setValue(newValue.id);
                    } else {
                      setValue(null);
                    }
                  }}
                  id="combo-box-demo"
                  options={clothType}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Cloth Type" />}
                />
                <Autocomplete
                  onChange={(event, newValue: string | null) => {
                    if (newValue) {
                      setLocation(newValue);
                    } else {
                      setLocation('');
                    }
                  }}
                  id="free-solo-demo"
                  freeSolo
                  options={locationList.map((option) => option)}
                  renderInput={(params) => <TextField {...params} label="Location" />}
                />
                <Button variant="outlined" onClick={handleSearch}>Search</Button>
              </SearchBar>

            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default MakerHome


const SearchBar = styled.div`
  
`;