import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getLabelById } from '@/tools/common';
import Stack from '@mui/material/Stack';
import { IJob } from '@/models/job';
import { useRouter } from 'next/router';



export default function JobCard({ card }: { card: IJob }) {
    const router = useRouter();

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
                <Button size="small" onClick={()=>{
                    router.push(`/job/${card.id}`)
                }}>Learn More</Button>
            </CardActions>
        </Card>
    );
}