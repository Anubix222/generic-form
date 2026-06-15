import { Grid } from "@mui/material";

export const GridContainer = ({ hideButtons, sx, children }: any) => {
  return (
    <Grid container spacing={1} sx={{ p: hideButtons ? 0 : 2, ...sx }}>
      {children}
    </Grid>
  );
};
