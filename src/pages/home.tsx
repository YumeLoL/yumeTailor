import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import JobList from '@/pages/job';
import Layout from '@/components/Layout';
import MakerList from './maker';
import { Container, Divider } from '@mui/material';

export default function HomePage() {
    const [value, setValue] = React.useState('jobs');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <Container sx={{ width: '80%', typography: 'body1' }}>
                <Box sx={{ width: "100%", marginTop: "30px", borderBottom: 4, borderColor: 'divider' }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="makers" label="Makers" />
                        <Tab value="jobs" label="Jobs" />
                    </Tabs>
                    <Divider />
                    {
                        value === "makers" ? <MakerList /> : <JobList />
                    }
                </Box>
            </Container>

        </Layout>

    );
}