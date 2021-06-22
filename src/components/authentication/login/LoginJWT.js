import * as Yup from 'yup';
import { Formik } from 'formik';
// import { Alert, Box, Button, FormHelperText, TextField } from '@material-ui/core';
import { Box, Button, FormHelperText, TextField } from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

const LoginJWT = (props) => {
  const isMountedRef = useIsMountedRef();
  const { login } = useAuth();

  return (
    <Formik
      // initialValues={{
      //   email: 'demo@devias.io',
      //   password: 'Password123!',
      //   submit: null
      // }}
      initialValues={{
        email: '',
        password: '',
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          email: Yup
            .string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          password: Yup
            .string()
            .max(255)
            .required('Password is required')
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        console.log({ values });
        try {
          await login(values.email, values.password);

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          {...props}
        >
          <TextField
            autoFocus
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box sx={{ mt: 2 }}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
          </Box>
          {/* <Box sx={{ mt: 2 }}>
            <Alert severity="info">
              <div>
                Use
                {' '}
                <b>test@gmail.com</b>
                {' '}
                and password
                {' '}
                <b>1234567</b>
              </div>
            </Alert>
          </Box> */}
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
