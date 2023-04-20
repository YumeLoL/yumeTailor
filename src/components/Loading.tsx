import * as React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';


const variants = [
    'h1',
    'h3',
    'body1',
    'caption',
  ] as readonly TypographyProps['variant'][];

export default function Loading() {
  return (
    <div>
    {variants.map((variant) => (
      <Typography component="div" key={variant} variant={variant}>
        {true ? <Skeleton /> : variant}
      </Typography>
    ))}
  </div>
  );
}