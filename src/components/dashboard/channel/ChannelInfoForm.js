// import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
// import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import {
  Box,
  Button,
  Card,
  InputAdornment,
  // Chip,
  // FormHelperText,
  // IconButton,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
  TextField,
  Typography
} from '@material-ui/core';
import {
  Facebook,
  GitHub,
  LinkedIn,
  Twitter
} from '@material-ui/icons';
// import PlusIcon from '../../../icons/Plus';

const ChannelInfoForm = (props) => {
  const { savedTarget, savedCategory, onBack, onNext, ...other } = props;
  // const [tag, setTag] = useState('');

  return (
    <Formik
      initialValues={{
        channel_target: savedTarget,
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          channel_target: Yup
            .number()
            .typeError('Only enter numbers. Commas will be generated automatically')
            .required('Required')
        })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // Call API to store step data in server session
          // It is important to have it on server to be able to reuse it if user
          // decides to continue later.
          setStatus({ success: true });
          setSubmitting(false);

          if (onNext) {
            onNext();
          }
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        // setFieldValue,
        // setFieldTouched,
        touched,
        values
      }) => (
        <form
          onSubmit={handleSubmit}
          {...other}
        >
          <Card sx={{ p: 3 }}>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              Channel information
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Enter the information for your channel.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                error={Boolean(touched.channel_target && errors.channel_target)}
                fullWidth
                helperText={touched.channel_target && errors.channel_target}
                label="Channel Target"
                name="channel_target"
                type="number"
                placeholder="How much money you need to make every month to continue your project"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.channel_target}
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
              />
            </Box>
            <Box>
              <Typography sx={{ mt: 4 }}>
                External Accounts
              </Typography>
              <TextField
                sx={{ mt: 2 }}
                error={Boolean(touched.channel_social_github && errors.channel_social_github)}
                fullWidth
                helperText={touched.channel_social_github && errors.channel_social_github}
                label="GitHub"
                name="channel_social_github"
                type="url"
                placeholder="https://"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.channel_social_github}
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><GitHub /></InputAdornment>
                }}
              />
              <TextField
                sx={{ mt: 2 }}
                error={Boolean(touched.channel_social_facebook && errors.channel_social_facebook)}
                fullWidth
                helperText={touched.channel_social_facebook && errors.channel_social_facebook}
                label="Facebook"
                name="channel_social_facebook"
                type="url"
                placeholder="https://"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.channel_social_facebook}
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Facebook /></InputAdornment>
                }}
              />
              <TextField
                sx={{ mt: 2 }}
                error={Boolean(touched.channel_social_twitter && errors.channel_social_twitter)}
                fullWidth
                helperText={touched.channel_social_twitter && errors.channel_social_twitter}
                label="Twitter"
                name="channel_social_twitter"
                type="url"
                placeholder="https://"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.channel_social_twitter}
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Twitter /></InputAdornment>
                }}
              />
              <TextField
                sx={{ mt: 2 }}
                error={Boolean(touched.channel_social_linkedin && errors.channel_social_linkedin)}
                fullWidth
                helperText={touched.channel_social_linkedin && errors.channel_social_linkedin}
                label="LinkedIn"
                name="channel_social_linkedin"
                type="url"
                placeholder="https://"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.channel_social_linkedin}
                variant="outlined"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LinkedIn /></InputAdornment>
                }}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                mt: 6
              }}
            >
              {onBack && (
                <Button
                  color="primary"
                  onClick={onBack}
                  size="large"
                  variant="text"
                >
                  Previous
                </Button>
              )}
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ChannelInfoForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  savedTarget: PropTypes.number,
  savedCategory: PropTypes.string
};

export default ChannelInfoForm;
