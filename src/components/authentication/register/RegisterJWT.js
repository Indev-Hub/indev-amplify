import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link
} from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';

const RegisterJWT = (props) => {
  const isMountedRef = useIsMountedRef();
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        user_email: '',
        user_first_name: '',
        user_last_name: '',
        password: '',
        roles: 'user',
        policy: false,
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          user_email: Yup
            .string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          user_first_name: Yup
            .string()
            .max(255)
            .required('First Name is required'),
          user_last_name: Yup
            .string()
            .max(255)
            .required('Last Name is required'),
          password: Yup
            .string()
            .min(8)
            .max(40)
            .required('Password is required'),
          roles: Yup
            .string()
            .max(255)
            .required('Last Name is required'),
          policy: Yup
            .boolean()
            .oneOf([true], 'This field must be checked')
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await register(values.user_first_name, values.user_last_name, values.user_email, values.password, values.roles);
          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
          navigate('/authentication/login', { state: {} });
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
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
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="First Name"
            margin="normal"
            name="user_first_name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.user_first_name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            label="Last Name"
            margin="normal"
            name="user_last_name"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.user_last_name}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.user_email && errors.user_email)}
            fullWidth
            helperText={touched.user_email && errors.user_email}
            label="Email Address"
            margin="normal"
            name="user_email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.user_email}
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
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              ml: -1,
              mt: 2
            }}
          >
            <Checkbox
              checked={values.policy}
              color="primary"
              name="policy"
              onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body2"
            >
              I have read the
              {' '}
              <Link
                color="primary"
                component="a"
                href="#"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </Box>
          {Boolean(touched.policy && errors.policy) && (
            <FormHelperText error>
              {errors.policy}
            </FormHelperText>
          )}
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
              Register
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterJWT;
