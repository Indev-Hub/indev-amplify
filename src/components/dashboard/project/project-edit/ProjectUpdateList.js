/* eslint-disable */
import React, { useState } from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  Typography,
  CardHeader,
  Card,
  CardContent
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';

const ProjectUpdateList = (props) => {
  const { project, user, overlap } = props;

  const [expanded, setExpanded] = useState(null);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        mt={overlap}
        {...props}
      >
        <Grid
          item
          xl={9}
          lg={9}
          md={10}
          xs={12}
        >
          <Card>
            <CardHeader title="Updates" />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  backgroundColor: 'brand.primary0',
                  p: 4
                }}
              >
                {console.log('update length', project.updates.items.length)}
                {console.log('updates', project.updates)}
                {project.updates.items.length > 0 ? (
                  project.updates.items.map((update, idx) => (
                    <>
                      <Accordion
                        expanded={expanded === `panel${idx}`}
                        onChange={handleChange(`panel${idx}`)}
                      >
                        <AccordionSummary
                          aria-controls={`panel${idx}d-content`}
                          id={`panel${idx}d-header`}
                        >
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs={6}>
                              <Typography variant="h6" fontWeight="400" color="brand.primary1">{`Update #${update.index}`}</Typography>
                              {/* <Chip label={`Update ${update.index}`} variant="outlined" sx={{ color: 'brand.primary1', borderColor: 'brand.primary1' }} /> */}
                              <Typography variant="h3">{update.name}</Typography>
                            </Grid>
                            <Grid item>
                              <IconButton
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                href="#"
                              >
                                <Visibility />
                              </IconButton>                          
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Divider />
                          <Grid container spacing={2} mt={2}>
                            <Grid item xs={8}>
                              <Typography>{update.content}</Typography>
                            </Grid>
                          </Grid>
                          <Divider sx={{ my: 3 }} />
                          {update.format.map((format) => (
                            <Chip label={format} variant="outlined" sx={{ color: 'brand.primary1', borderColor: 'brand.primary1', mr: 1 }} />
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    </>
                  ))
                ) : (
                  null
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectUpdateList
