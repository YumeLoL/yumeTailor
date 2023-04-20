import Layout from '@/components/Layout'
import { IJob } from '@/models/job'
import router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getJobDetail } from '../api/httpRequest'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Chip, Divider, FormControl, Input, InputAdornment, InputLabel, Paper, Stack, TextField, Typography } from '@mui/material'
import { getLabelById } from '@/tools/common'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

interface JobIdProps {
  jobId: string
}
const JobDetailPage = () => {
  const [value, setValue] = React.useState('one');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [messageError, setMessageError] = useState('');
  const [bidError, setBidError] = useState('');

  const router = useRouter()
  const { jobId } = router.query
  const [jobData, setJobData] = React.useState<IJob>()

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const message = data.get('message') as string | null;
    const bid = parseFloat(data.get('bid') as string);

    if (isNaN(bid) || bid <= 0) {
      setBidError('Bid is required, and must be positive number');
      return;
    }

    if (message === null || message === '') {
      setMessageError('Message is required');
      return;
    }

    console.log("send quote:", data.get('message'), data.get('bid'))
  }

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
      <Container maxWidth="md"  >
        <CssBaseline />

        <Stack height="150px" paddingBottom={2} direction="row" spacing={2} justifyContent="space-between" alignItems="flex-end">
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
            <Typography component="h1" variant="h4" align="center">
              {jobData?.name}
            </Typography>
            <Chip label={jobData?.status ? "Open" : "Closed"} color="success" variant="filled" />
          </Stack>

          <Stack direction="column" spacing={0} justifyContent="center" alignItems="center">
            <Typography variant="subtitle1" align="center">
              Bids
            </Typography>
            <Typography variant="h5" align="center">
              {jobData?.quotation_count}
            </Typography>
          </Stack>
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
              ? <>
                <Paper elevation={10} variant="outlined" sx={{ my: { xs: 3, md: 6 } }}>

                  <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" gutterBottom sx={{ p: { xs: 2, md: 3 } }}>
                      About The Job
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ p: { xs: 2, md: 3 } }}>
                      Budget: {jobData?.budget}
                    </Typography>
                  </Stack>

                  <Divider />
                  <Typography variant="subtitle1" gutterBottom sx={{ p: { xs: 2, md: 3 } }}>
                    Cloth Type: {getLabelById(jobData?.cloth_type as number)}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ p: { xs: 2, md: 3 } }}>
                    Location: {jobData?.location}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ p: { xs: 2, md: 3 } }}>
                    Details: {jobData?.description}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom sx={{ p: { xs: 2, md: 3 } }}>
                    Post At: {jobData?.updated_at.substring(0, 10)}
                  </Typography>

                </Paper>

                <Paper elevation={10} variant="outlined" sx={{ my: { xs: 3, md: 6 } }}>

                  <Typography variant="h6" gutterBottom sx={{ p: { xs: 2, md: 3 } }}>
                    Make a quotation
                  </Typography>
                  <Divider />
                  <Box component="form" onSubmit={handleSend} noValidate>
                    <TextField
                      id="standard-textarea"
                      sx={{
                        width: 600,
                        maxWidth: '100%',
                        m: { xs: 2, md: 3 }
                      }}
                      multiline
                      rows={6}
                      placeholder="message to the customer"
                      variant="filled"
                      required
                      label="Message"
                      name="message"
                      error={Boolean(messageError)}
                      helperText={messageError}
                      onChange={() => setMessageError('')}
                    />

                    <TextField
                      required
                      id="standard-number"
                      sx={{ p: { xs: 2, md: 3 }, pl: { xs: 0, md: 0 }, ml: { xs: 2, md: 3 }}}
                      label="Bid"
                      name="bid"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                      error={Boolean(bidError)}
                      helperText={bidError}
                      onChange={() => setBidError('')}
                    />

                    <Stack sx={{ p: { xs: 2, md: 3 } }} direction="row" spacing={2}>
                      <Button variant="contained" endIcon={<SendIcon />} type="submit">
                        Send
                      </Button>
                    </Stack>
                  </Box>
                </Paper></>
              :
              <div>xx</div>
          }
        </Box>
      </Container>

    </Layout >
  )
}

export default JobDetailPage
