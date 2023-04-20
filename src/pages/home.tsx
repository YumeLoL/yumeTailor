import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import JobList from '@/pages/job';
import Layout from '@/components/Layout';
import MakerList from './maker';
import { Container, Divider } from '@mui/material';

export default function HomePage() {
    const [value, setValue] = React.useState('one');

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
                        <Tab value="one" label="Makers" />
                        <Tab value="two" label="Jobs" />
                    </Tabs>
                    <Divider />
                    {
                        value === "one" ? <MakerList /> : <JobList />
                    }
                </Box>
            </Container>

        </Layout>

    );
}