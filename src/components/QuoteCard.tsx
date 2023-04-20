import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router'
import { getQuotations } from '@/pages/api/httpRequest';

export default function QuoteCard() {
    const [quotes, setQuotes] = useState([])
    const router = useRouter()
    const { jobId } = router.query as { jobId: string }

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const res = await getQuotations(jobId);
                if (res.data.status === 200) {
                    setQuotes(res.data.data);
                }
            } catch (error) {
                console.log("error:", error);
            }
        }
        fetchQuotes();
    }, [])

    return (
        <div>
            {
                quotes.length > 0
                    ?
                    quotes.map((quote: any) => {
                        return <Card key={quote.id} sx={{ maxWidth: "100%" }}>
                            <CardActionArea>
                                <Stack
                                    direction="row"
                                    sx={{ p: "16px" }}
                                    spacing={2}
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                        sx={{ width: 120, height: 120 }}
                                    />
                                    <Typography gutterBottom variant="h5" component="div">
                                        Lizard
                                    </Typography>
                                </Stack>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {quote?.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {quote?.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    })
                    : (
                        <div>No Quotes</div>
                    )
            }
        </div>
    )

}