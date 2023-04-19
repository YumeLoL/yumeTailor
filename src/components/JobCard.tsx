import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getLabelById } from '@/tools/common';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import { IJob } from '@/models/job';



export default function JobCard({ card }: { card: IJob }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        TYPE: {getLabelById(card.cloth_type)}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        QUOTATION: {card.quotation_count}
                    </Typography>
                </Stack>

                <Typography sx={{ mb: 1.5, fontSize: 24 }} color="text.secondary">
                    {card.name}
                </Typography>

                <Typography sx={{ mb: 1.5 }} variant="body2">
                    {card.description}
                </Typography>


                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ mb: 1.5 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        BUDGET: {card.budget}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        LOCATION: {card.location}
                    </Typography>
                </Stack>


            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}