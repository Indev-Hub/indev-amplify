import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
      <div>
        <AdminShowcases />
      </div>
    </>
  );
};

export default Admin;
