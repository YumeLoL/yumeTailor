import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
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
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { IJob } from '@/models/job';
import { clothType, IClothType } from '@/constant/clothType';
import { getLabelById } from '@/tools/common';
import JobCard from '@/components/JobCard';
import Layout from '@/components/Layout'


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


const theme = createTheme()


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
  const [jobData, setJobData] = React.useState<any>();


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
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline />
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
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
              >
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
                  sx={{ width: 150 }}
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
                  sx={{ width: 230 }}
                  renderInput={(params) => <TextField {...params} label="Location" />}
                />
                <Button variant="outlined" onClick={handleSearch}>Search</Button>

              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {jobData?.data.length > 0 && jobData.data.map((card: IJob) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <JobCard card={card} />
                </Grid>
              ))}
            </Grid>
            <Stack spacing={2} justifyContent="center"
              alignItems="center" margin="40px" >
              <Pagination count={10} variant="outlined" color="primary" />
            </Stack>
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
    </Layout>
  );
}

export default MakerHome


