import Layout from '@/components/Layout'
import { IJob } from '@/models/job'
import router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getJobDetail } from '../api/httpRequest'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import { getLabelById } from '@/tools/common'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface JobIdProps {
  jobId: string
}
const JobDetailPage = () => {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const router = useRouter()
  const { jobId } = router.query
  const [jobData, setJobData] = React.useState<IJob>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getJobDetail(jobId as string);
        if (response.data.status === 200) {
          setJobData(response.data.data);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchData();
  }, [jobId]);


  return (
    <Layout>
      <Container maxWidth="md">

        <CssBaseline />
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          <Typography component="h1" variant="h4" align="center">
            {jobData?.name}
          </Typography>
          <Chip label={jobData?.status ? "Open" : "Closed"} color="success" variant="outlined" />
        </Stack>

        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Job Details" />
            <Tab value="two" label="Quotations" />
          </Tabs>
          {
            value === "one"
              ?
              <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>

                  <Typography variant="subtitle1" gutterBottom>
                    Cloth Type: {getLabelById(jobData?.cloth_type as number)}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Location: {jobData?.location}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Details: {jobData?.description}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Budget: {jobData?.budget}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Post At: {jobData?.updated_at.substring(0, 10)}
                  </Typography>

                </Paper>
              </Container>
              :
              <div>xx</div>
          }
        </Box>
      </Container>

    </Layout >
  )
}

export default JobDetailPage
