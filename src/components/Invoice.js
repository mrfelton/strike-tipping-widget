import React from "react";
import QRCode from "qrcode.react";
import { Button, CircularProgress, Modal, Box, Typography, Grid } from '@mui/material';

const getQuoteExpirationSeconds = quote => {
  var dif = new Date().getTime() - new Date(quote.expiration).getTime();
  var Seconds_from_T1_to_T2 = dif / 1000;
  var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
  return Math.floor(Seconds_Between_Dates);
}

export const Invoice = ({ quote, size, ...rest }) => {
  const link = `lightning:${quote.lnInvoice}`;
  return (
    <Box {...rest}>
      <a href={link}>
        <QRCode size={size} value={quote.lnInvoice.toUpperCase()} />
      </a>
      <Typography align="center">{`Expires in ${getQuoteExpirationSeconds(quote)} seconds`}</Typography>
    </Box>
  );
}
