// import { useState } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
// import MobileDatePicker from '@material-ui/lab/MobileDatePicker';
import {
  Box,
  Button,
  Card,
  // Chip,
  FormHelperText,
  // IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
// import PlusIcon from '../../../icons/Plus';

const ChannelDetailsForm = (props) => {
  const { savedTitle, savedCategory, onBack, onNext, ...other } = props;
  // const [tag, setTag] = useState('');

  // const nextUpdate = () => {
  //   savedTitle == { 'null' ? 'Next' : 'Update' }
  // };

  return (
    <Formik
      initialValues={{
        channel_title: savedTitle,
        channel_category: savedCategory,
        tags: ['Full-Time'],
        startDate: new Date(),
        endDate: new Date(),
        submit: null
      }}
      validationSchema={Yup
        .object()
        .shape({
          channel_title: Yup
            .string()
            .min(3, 'Must be at least 3 characters')
            .max(255, 'Shorter. Must be shorter. Waaaaay shorter.')
            .required('Required'),
          channel_category: Yup
            .string()
            .min(3, 'Must be at least 3 characters')
            .max(255)
            .required('Required'),
          tags: Yup.array(),
          startDate: Yup.date(),
          endDate: Yup.date()
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
              Channel details
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Enter some basic information to categorize your channel. You can change this information later.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                error={Boolean(touched.channel_title && errors.channel_title)}
                fullWidth
                helperText={touched.channel_title && errors.channel_title}
                label="Channel Name"
                name="channel_title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.channel_title}
                variant="outlined"
              />
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  mt: 3
                }}
              >
                <FormControl
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel>
                    Category
                  </InputLabel>
                  <Select
                    error={Boolean(touched.channel_category && errors.channel_category)}
                    fullWidth
                    helperText={touched.channel_category && errors.channel_category}
                    label="Category"
                    name="channel_category"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.channel_category}
                  >
                    <MenuItem value="game">
                      Game Development
                    </MenuItem>
                    <MenuItem value="software">
                      Software Development
                    </MenuItem>
                    <MenuItem value="mobile">
                      Mobile App Development
                    </MenuItem>
                  </Select>
                </FormControl>
                {/* <TextField
                  fullWidth
                  label="Tags"
                  name="tags"
                  onChange={(event) => setTag(event.target.value)}
                  value={tag}
                  variant="outlined"
                />
                <IconButton
                  sx={{ ml: 2 }}
                  onClick={() => {
                    if (!tag) {
                      return;
                    }

                    setFieldValue('tags', [
                      ...values.tags,
                      tag
                    ]);
                    setTag('');
                  }}
                >
                  <PlusIcon fontSize="small" />
                </IconButton> */}
              </Box>
              {/* <Box sx={{ mt: 2 }}>
                {values.tags.map((_tag, i) => (
                  <Chip
                    onDelete={() => {
                      const newTags = values.tags.filter((t) => t !== _tag);

                      setFieldValue('tags', newTags);
                    }}
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    label={_tag}
                    sx={{
                      '& + &': {
                        ml: 1
                      }
                    }}
                    variant="outlined"
                  />
                ))}
              </Box> */}
              {Boolean(touched.tags && errors.tags) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {errors.tags}
                  </FormHelperText>
                </Box>
              )}
              {/* <Box
                sx={{
                  display: 'flex',
                  mt: 4
                }}
              >
                <Box sx={{ mr: 2 }}>
                  <MobileDatePicker
                    label="Start Date"
                    onAccept={() => setFieldTouched('startDate')}
                    onChange={(date) => setFieldValue('startDate', date)}
                    onClose={() => setFieldTouched('startDate')}
                    renderInput={(inputProps) => (
                      <TextField
                        variant="outlined"
                        {...inputProps}
                      />
                    )}
                    value={values.startDate}
                  />
                </Box>
                <MobileDatePicker
                  label="End Date"
                  onAccept={() => setFieldTouched('endDate')}
                  onChange={(date) => setFieldValue('endDate', date)}
                  onClose={() => setFieldTouched('endDate')}
                  renderInput={(inputProps) => (
                    <TextField
                      variant="outlined"
                      {...inputProps}
                    />
                  )}
                  value={values.endDate}
                />
              </Box> */}
              {Boolean(touched.startDate && errors.startDate) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {errors.startDate}
                  </FormHelperText>
                </Box>
              )}
              {Boolean(touched.endDate && errors.endDate) && (
                <Box sx={{ mt: 2 }}>
                  <FormHelperText error>
                    {errors.endDate}
                  </FormHelperText>
                </Box>
              )}
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

              {/* Send channel_title and channel_category to db */}
              <Button
                color="primary"
                disabled={isSubmitting}
                type="submit"
                variant="contained"
              >
                {
                  (savedTitle === '')
                    ? <p>Next</p>
                    : <p>Update</p>
                }
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

ChannelDetailsForm.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  savedTitle: PropTypes.string,
  savedCategory: PropTypes.string
};

export default ChannelDetailsForm;
