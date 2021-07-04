import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Link,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import { API, graphqlOperation } from 'aws-amplify';
import VideoLibrary from '../../video/VideoLibrary';
import {
  updateUser
} from '../../../graphql/mutations';
import UserInfo from '../../user/UserInfo';
import useAuth from '../../../hooks/useAuth';
import wait from '../../../utils/wait';
import countries from './countries';

const AccountGeneralSettings = (props) => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  console.log('user', user);

  return (
    <Grid
      container
      spacing={3}
      {...props}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  p: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                  borderRadius: '50%'
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    height: 100,
                    width: 100
                  }}
                />
              </Box>
              <Typography
                color="textPrimary"
                sx={{ mt: 1 }}
                variant="subtitle2"
              >
                {user.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Your plan:
                {' '}
                <Link
                  color="primary"
                  component={RouterLink}
                  to="/dashboard/account"
                >
                  {user.plan}
                </Link>
              </Typography>
            </Box>
            <UserInfo />
            <VideoLibrary />
          </CardContent>
          <CardActions>
            <Button
              color="primary"
              fullWidth
              variant="text"
            >
              Remove Picture
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <Formik
          enableReinitialize
          initialValues={{
            canHire: user.canHire || false,
            city: user.city || '',
            country: user.country || '',
            email: user.email || '',
            isPublic: user.isPublic || false,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            displayName: user.displayName || '',
            phone: user.phone || '',
            state: user.state || '',
            submit: null
          }}
          validationSchema={Yup
            .object()
            .shape({
              canHire: Yup.bool(),
              city: Yup.string().max(255),
              country: Yup.string().max(255),
              email: Yup
                .string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              isPublic: Yup.bool(),
              phone: Yup.string(),
              state: Yup.string(),
              firstName: Yup
                .string()
                .min(2)
                .required('Your first name is required'),
              lastName: Yup
                .string()
                .min(2)
                .required('Your last name is required')
            })}
          onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
            try {
              // NOTE: Make API request
              const UpdateUserInput = {
                id: user.id,
                firstName: values.firstName,
                lastName: values.lastName,
                displayName: values.displayName,
                email: user.email
              };
              console.log('user info', UpdateUserInput);
              console.log('user.id:', user.id, 'user.sub', user.sub);
              await API.graphql(graphqlOperation(updateUser, { input: UpdateUserInput }));
              console.log('user info', UpdateUserInput);

              await wait(200);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              enqueueSnackbar('Profile updated', {
                anchorOrigin: {
                  horizontal: 'right',
                  vertical: 'top'
                },
                variant: 'success'
              });
            } catch (err) {
              console.error(err);
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader title="Profile" />
                <Divider />
                <CardContent>
                  <Grid
                    container
                    spacing={4}
                  >
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First Name"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last Name"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.displayName && errors.displayName)}
                        fullWidth
                        helperText={touched.displayName && errors.displayName}
                        label="Display Name"
                        name="displayName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.displayName}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email
                          ? errors.email
                          : 'We will use this email to contact you'}
                        label="Email Address"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        required
                        type="email"
                        value={values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.phone && errors.phone)}
                        fullWidth
                        helperText={touched.phone && errors.phone}
                        label="Phone Number"
                        name="phone"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phone}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <Autocomplete
                        getOptionLabel={(option) => option.text}
                        options={countries}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            label="Country"
                            name="country"
                            onChange={handleChange}
                            variant="outlined"
                            {...params}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.state && errors.state)}
                        fullWidth
                        helperText={touched.state && errors.state}
                        label="State/Region"
                        name="state"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.state}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <TextField
                        error={Boolean(touched.city && errors.city)}
                        fullWidth
                        helperText={touched.city && errors.city}
                        label="City"
                        name="city"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.city}
                        variant="outlined"
                      />
                    </Grid>
                    {/* <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="subtitle2"
                      >
                        Public Profile
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        Means that anyone viewing your profile will
                        be able to see your contacts details
                      </Typography>
                      <Switch
                        checked={values.isPublic}
                        color="primary"
                        edge="start"
                        name="isPublic"
                        onChange={handleChange}
                      />
                    </Grid> */}
                    <Grid
                      item
                      md={12}
                      xs={12}
                      justify="center"
                      justifyContent="center"
                      display="flex"
                      textAlign="center"
                    >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <Switch
                          checked={values.accept_work}
                          color="primary"
                          edge="start"
                          name="canHire"
                          onChange={handleChange}
                        />
                        <Typography
                          color="textPrimary"
                          gutterBottom
                          variant="subtitle2"
                        >
                          Available to hire
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body2"
                        >
                          When this is selected your channel will be shown to recruiters and companies looking to hire. You can toggle this on/off as often as you like.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>
                        {errors.submit}
                      </FormHelperText>
                    </Box>
                  )}
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2
                  }}
                >
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Card>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
};

export default AccountGeneralSettings;
