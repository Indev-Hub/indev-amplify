import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Button, Card, CardContent, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import ChannelDescriptionForm from './ChannelDescriptionForm';
import ChannelDetailsForm from './ChannelDetailsForm';
import ChannelOwnerForm from './ChannelOwnerForm';

const ChannelCreateWizard = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [formInput, setFormInput] = useState({
    id: '',
    name: '',
    manager: '',
    category: '',
    description: '',
    featuredImg: ''
  });

  const handleChange = (event) => {
    setFormInput({
      ...formInput,
      [event.target.name]: event.target.value
    });
    console.log('formInput:', formInput);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComplete = () => {
    setCompleted(true);
  };

  return (
    <div {...props}>
      {!completed
        ? (
          <>
            {activeStep === 0 && (
              <ChannelOwnerForm
                formInput={formInput}
                handleChange={handleChange}
                onNext={handleNext}
              />
            )}
            {activeStep === 1 && (
              <ChannelDetailsForm
                onBack={handleBack}
                onNext={handleNext}
                savedTitle=""
              />
            )}
            {activeStep === 2 && (
              <ChannelDescriptionForm
                onBack={handleBack}
                onComplete={handleComplete}
              />
            )}
          </>
        )
        : (
          <Card>
            <CardContent>
              <Box
                sx={{
                  maxWidth: 450,
                  mx: 'auto'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText'
                    }}
                  >
                    <StarIcon fontSize="small" />
                  </Avatar>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    align="center"
                    color="textPrimary"
                    variant="h3"
                  >
                    You are all done!
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="subtitle1"
                  >
                    Congratulations on setting up your Indev channel.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2
                  }}
                >
                  <Button
                    color="primary"
                    component={RouterLink}
                    to="/dashboard/channels/1"
                    variant="contained"
                  >
                    View channel
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}
    </div>
  );
};

export default ChannelCreateWizard;
