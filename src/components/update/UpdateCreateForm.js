import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import SaveIcon from '../../icons/Save';
import DotsVertical from '../../icons/DotsVertical';
import FileDropzone from '../FileDropzone';
import QuillEditor from '../QuillEditor';

const categoryOptions = [
  { label: 'Programming', value: 'programming' },
  { label: 'Health', value: 'health' },
  { label: 'Innovation', value: 'innovation' }
];

const channelOptions = [
  { label: 'Channel 1', value: 'channel 1' },
  { label: 'Channel 2', value: 'channel 2' },
  { label: 'Channel 3', value: 'channel 3' }
];

const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const UpdateCreateForm = () => {
  const [cover, setCover] = useState(null);

  const handleDropCover = async ([file]) => {
    const data = await toBase64(file);
    setCover(data);
  };

  const handleRemoveCover = () => {
    setCover(null);
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ py: 2 }}
        >
          <Grid
            alignItems="center"
            container
            justifyContent="flex-end"
            spacing={3}
          >
            {/* <Grid item>
              <Typography
                color="textPrimary"
                variant="body2"
              >
                Hello, Jane Rotanson
              </Typography>
            </Grid> */}
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
      <Divider />
      <Grid
        container
        spacing={3}
        pt={4}
      >
        <Grid
          item
          lg={8}
          md={6}
          xl={9}
          xs={12}
        >
          <Card variant="outlined">
            <CardContent>
              <TextField
                fullWidth
                label="Update title"
                name="title"
                variant="outlined"
              />
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  label="Short description"
                  rows={3}
                  variant="outlined"
                />
              </Box>
              <Typography
                color="textSecondary"
                sx={{
                  mb: 2,
                  mt: 3
                }}
                variant="subtitle2"
              >
                Cover
              </Typography>
              {cover
                ? (
                  <div>
                    <Box
                      sx={{
                        backgroundImage: `url(${cover})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: 420,
                        borderRadius: '20px'
                      }}
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 2
                      }}
                    >
                      <Button
                        color="primary"
                        onClick={handleRemoveCover}
                        variant="text"
                      >
                        Change Cover
                      </Button>
                    </Box>
                  </div>
                )
                : (
                  <FileDropzone
                    accept="image/*"
                    maxFiles={1}
                    onDrop={handleDropCover}
                  />
                )}
              <Box sx={{ mt: 3 }}>
                <Typography
                  color="textSecondary"
                  sx={{ mb: 2 }}
                  variant="subtitle2"
                >
                  Content
                </Typography>
                <QuillEditor
                  placeholder="Write something"
                  sx={{ height: 400 }}
                />
              </Box>
            </CardContent>
          </Card>
          <Card
            variant="outlined"
            sx={{ mt: 3 }}
          >
            <CardHeader title="Meta" />
            <CardContent>
              <TextField
                fullWidth
                label="SEO title"
                name="title"
                variant="outlined"
              />
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  label="SEO description"
                  rows={4}
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ ml: 1 }}>
                <FormControlLabel
                  control={(
                    <Switch
                      color="primary"
                      edge="start"
                      name="enablePublishAt"
                    />
                  )}
                  label="Schedule Publish"
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <MobileDateTimePicker
                  label="Post Date"
                  renderInput={(props) => (
                    <TextField
                      fullWidth
                      variant="outlined"
                      {...props}
                    />
                  )}
                  onChange={() => { }}
                  value={new Date()}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {categoryOptions.map((category) => (
                    <option
                      key={category.value}
                      value={category.value}
                    >
                      {category.label}
                    </option>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ mt: 3 }}>
                <TextField
                  fullWidth
                  label="Channel"
                  name="channel"
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {channelOptions.map((channel) => (
                    <option
                      key={channel.value}
                      value={channel.value}
                    >
                      {channel.label}
                    </option>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ mt: 3 }}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      defaultChecked
                      name="publishedGlobally"
                    />
                  )}
                  label="Published Globally"
                />
              </Box>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      defaultChecked
                      name="enableComments"
                    />
                  )}
                  label="Enable Comments"
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateCreateForm;
