import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const FlexBox: FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);

export default FlexBox;
