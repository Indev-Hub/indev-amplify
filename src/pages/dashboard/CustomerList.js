import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Breadcrumbs, Button, Container, Grid, Link, Typography } from '@material-ui/core';
import { CustomerListTable } from '../../components/dashboard/customer';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import ChevronRightIcon from '../../icons/ChevronRight';
import DownloadIcon from '../../icons/Download';
import PlusIcon from '../../icons/Plus';
import UploadIcon from '../../icons/Upload';
import useSettings from '../../hooks/useSettings';
import gtm from '../../lib/gtm';
import axios from '../../lib/axios';

const CustomerList = () => {
  const isMountedRef = useIsMountedRef();
  const { settings } = useSettings();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomers = useCallback(async () => {
    try {
      const response = await axios.get('/api/customers');

      if (isMountedRef.current) {
        setCustomers(response.data.customers);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  return (
    <>
      <Helmet>
        <title>Dashboard: Customer List | Material Kit Pro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 8
        }}
      >
        <Container maxWidth={settings.compact ? 'xl' : false}>
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                Customer List
              </Typography>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator={<ChevronRightIcon fontSize="small" />}
                sx={{ mt: 1 }}
              >
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Dashboard
                </Link>
                <Link
                  color="textPrimary"
                  component={RouterLink}
                  to="/dashboard"
                  variant="subtitle2"
                >
                  Management
                </Link>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                >
                  Customers
                </Typography>
              </Breadcrumbs>
              <Box
                sx={{
                  mb: -1,
                  mx: -1,
                  mt: 1
                }}
              >
                <Button
                  color="primary"
                  startIcon={<UploadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                >
                  Import
                </Button>
                <Button
                  color="primary"
                  startIcon={<DownloadIcon fontSize="small" />}
                  sx={{ m: 1 }}
                >
                  Export
                </Button>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ m: -1 }}>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Add Customer
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <CustomerListTable customers={customers} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CustomerList;
