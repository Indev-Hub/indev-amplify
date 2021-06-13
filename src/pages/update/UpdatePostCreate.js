import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core';
import { UpdatePostCreateForm } from '../../components/update';
import SaveIcon from '../../icons/Save';
import DotsVertical from '../../icons/DotsVertical';
import gtm from '../../lib/gtm';

const UpdatePostCreate = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Create Update | Indev</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          minHeight: '100%'
        }}
      >
        <div>
          <Container maxWidth="lg">
            <Toolbar
              disableGutters
              sx={{ py: 2 }}
            >
              <Grid
                alignItems="center"
                container
                justifyContent="space-between"
                spacing={3}
              >
                <Grid item>
                  <Typography
                    color="textPrimary"
                    variant="body2"
                  >
                    Hello, Jane Rotanson
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    color="primary"
                    component={RouterLink}
                    size="large"
                    to="/update"
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    component={RouterLink}
                    size="large"
                    startIcon={<SaveIcon />}
                    sx={{ mx: 2 }}
                    to="/update/1"
                    variant="contained"
                  >
                    Publish Update
                  </Button>
                  <IconButton edge="end">
                    <DotsVertical fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </div>
        <Divider />
        <Box sx={{ py: 6 }}>
          <Container maxWidth="lg">
            <UpdatePostCreateForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default UpdatePostCreate;
