import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, CardActionArea, Collapse, Container, IconButton, Skeleton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import router, { useRouter } from 'next/router'
import { getQuotationByQuotationId, getQuotations } from '@/pages/api/httpRequest';
import Loading from './Loading';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { ExpandMore } from '@mui/icons-material';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function QuoteCard() {
    const [quotes, setQuotes] = useState([])
    const router = useRouter()
    const { jobId } = router.query as { jobId: string }

    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
    }, [quotes])


    // useEffect(() => {
    //     const fetchOneQuote = async () => {
    //         try {
    //             const res = await getQuotationByQuotationId(quotationId);
    //             if (res.data.status === 200) {
    //                     setQuotes(res.data.data);
    //             }
    //         } catch (error) {
    //             console.log("error:", error);
    //         }
    //     }
    // },[])


    return (
        <>
            {
                quotes.length > 0
                    ?
                    quotes.map((quote: any) => {
                        return (
                            <Paper elevation={5} key={quote.id} sx={{ flexGrow: 1, overflow: 'hidden', py: 2, px: 5, my: 3, mx: 0 }}>

                                <Grid container direction="column" spacing={2}>
                                    <Grid item sm container>
                                        <Grid item xs={3}>
                                            <ButtonBase sx={{ width: 128, height: 128 }}>
                                                <Img alt="complex" src="/static/images/grid/complex.jpg" />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Typography gutterBottom variant="subtitle1">xx</Typography>
                                            <Typography gutterBottom variant="subtitle1" component="div">
                                                Standard license
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                Full resolution 1920x1080 • JPEG
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                ID: 1030114
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="subtitle1" component="div">
                                                $19.00
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid item sm container direction="column" >
                                        <div>
                                            <Typography variant="body2" color="text.secondary">
                                                {expanded ? quote.message : quote.message.substring(0, 200).concat("...")}
                                            </Typography>
                                            {
                                                quote.message.length > 200 && <Button onClick={handleExpandClick} size="small">more</Button>
                                            }

                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    })

                    : (
                        quotes.length === 0 ? <Stack sx={{ height: 500 }}><Loading /> </Stack> : <div>no quotes</div>
                    )
            }
        </>
    )

}