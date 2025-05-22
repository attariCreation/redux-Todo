import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import GridLoader from "react-spinners/GridLoader";

const Loader = () => {

  return (
      <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      >
      <GridLoader
        color="#f1a31e"
        size={30}
        aria-label="Loading Spinner"
        // data-testid="loader"
      />
      </Backdrop>
  )
}

export default Loader