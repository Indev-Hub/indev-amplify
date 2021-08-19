import { Accordion, AccordionSummary, AccordionDetails, Container, Typography, Divider } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AdminVideos from '../components/admin/AdminVideos';
import AdminShowcases from '../components/admin/AdminShowcases';
import gtm from '../lib/gtm';

const Admin = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Helmet>
        <title>Indev Admin</title>
      </Helmet>
      <Container sx={{ mt: 5 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
          >
            <Typography variant="h6" fontWeight="600">Showcases</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <AdminShowcases />
          </AccordionDetails>
        </Accordion>
      </Container>
      <Container sx={{ mt: 1 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
          >
            <Typography variant="h6" fontWeight="600">Videos</Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            <AdminVideos />
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
};

export default Admin;
