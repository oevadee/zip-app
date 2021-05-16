import React from 'react';
import { Box } from '@chakra-ui/react';

const CardContent = ({ children, ...props }) => {
  return (
    <Box {...props} p={5}>
      {children}
    </Box>
  );
};

export default CardContent;
