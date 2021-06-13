import PropTypes from 'prop-types';
import { Box, Card, CardContent, Grid } from '@material-ui/core';
import FileDropzone from '../../FileDropzone';
import ChannelBrief from './ChannelBrief';
import ChannelFileCard from './ChannelFileCard';
import ChannelMembers from './ChannelMembers';
import ChannelMetadata from './ChannelMetadata';
import ChannelDescriptionForm from './ChannelDescriptionForm';
import ChannelDetailsForm from './ChannelDetailsForm';
import ChannelInfoForm from './ChannelInfoForm';

const ChannelOverview = (props) => {
  const { channel, ...other } = props;

  return (
    <Grid
      container
      spacing={3}
      {...other}
    >
      <Grid
        item
        lg={8}
        xl={9}
        xs={12}
      >
        <ChannelBrief
          description={channel.description}
          tags={channel.tags}
          title={channel.title}
        />
        <Box sx={{ mt: 3 }}>
          <ChannelDetailsForm savedTitle="Previously Entered Title" savedCategory="mobile" /> {/* api for channel_title and channel_category goes here */}
        </Box>
        <Box sx={{ mt: 3 }}>
          <ChannelDescriptionForm savedContent="Previously entered content goes here" /> {/* api for channel_description goes here */}
        </Box>
        <Box sx={{ mt: 3 }}>
          <ChannelInfoForm savedTarget="4500" /> {/* api for channel_description goes here */}
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <FileDropzone />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              mb: -1,
              mt: 2,
              mx: -1
            }}
          >
            {channel.files.map((file) => (
              <Box
                key={file.url}
                sx={{
                  m: 1,
                  width: 240
                }}
              >
                <ChannelFileCard
                  mimeType={file.mimeType}
                  name={file.name}
                  size={file.size}
                  url={file.url}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        lg={4}
        xl={3}
        xs={12}
      >
        <ChannelMetadata
          authorAvatar={channel.author.avatar}
          authorName={channel.author.name}
          budget={channel.budget}
          currency={channel.currency}
          endDate={channel.endDate}
          updatedAt={channel.updatedAt}
        />
        <Box sx={{ mt: 3 }}>
          <ChannelMembers members={channel.members} />
        </Box>
      </Grid>
    </Grid>
  );
};

ChannelOverview.propTypes = {
  // @ts-ignore
  channel: PropTypes.object.isRequired
};

export default ChannelOverview;
