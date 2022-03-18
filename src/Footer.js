import { Divider, Typography } from '@mui/material';
import React from 'react';

export function Footer() {

  return (
    <>
      {/* <Divider style={{marginTop:'25px', marginBottom:'25px'}}/> */}
      <Typography variant="body2" color="text.secondary" align="center" textAlign={'center'} fontSize={'15px'} sx={{ mt: 8, mb: 4 }} style={{ marginBottom: '5x' }}>
        © 2022 ClassTrack, No Rights Reserved.
        {/* TODO: Consider expanding the footer (also depronto we reserve some rights depending on our license ) */}
      </Typography>
    </>
  )

}