/* eslint-disable */
import { Box, Button, Card, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const AdminShowcases = () => {
  const [showcases, setShowcases] = useState();
  const [deleteShowcase, setDeleteShowcase] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    loadShowcases();
    console.log('effect showcases', showcases)
  }, []);
  
  const loadShowcases = async () => {
    try {
      const vimShow = await fetch(`https://api.vimeo.com/me/albums?per_page=100`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REACT_APP_SHOWCASE_AUTH}` } })
      .then(response => response.json());
      // console.log('vimShow', vimShow)
      const vimShowData = vimShow.data;
      // console.log('vimShowData', vimShowData)
      setShowcases(vimShowData);
      setLoaded(true);

    } catch (error) {
        console.log('error on fetching showcases', error);
      }
  }

  const removeShowcase = async () => {
    try {
      const vimDelete = await fetch(`https://api.vimeo.com/me/albums/${deleteShowcase}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.REACT_APP_SHOWCASE_ADMIN_AUTH}` } })
      // .then(response => response.json());
      // console.log('vimDelete', vimDelete)
      // const vimDeleteData = vimDelete.data;
      // console.log('vimDeleteData', vimDeleteData)
      loadShowcases();

    } catch (error) {
        console.log('error on deleting showcase', error);
      }
  }

  const onClick = (showcaseId) => {
    setDeleteShowcase(showcaseId);
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item display="flex" alignItems="center" p={2}>
          <Typography component="div">Showcase <Box component="span" fontWeight="800">{deleteShowcase}</Box> will be deleted</Typography>
        </Grid>
        <Grid item alignItems="center" p={1}>
          <Button
            onClick={removeShowcase}
          >
            Delete Showcase
          </Button>
        </Grid>
      </Grid>
      {loaded === true ? (
        <Grid container spacing={2} p={4}>
          {showcases.map((showcase, index) => {
          return (
            <Grid item
              onClick={() => onClick(showcase.uri.split("/")[4])}
              xs={1.33}
            >
              <Card sx={{ p:2 }}>
                <Grid item>
                  {index}
                </Grid>
                <Grid item>
                  {showcase.name}
                </Grid>
                <Grid item>
                  {showcase.uri.split("/")[4]}
                </Grid>
              </Card>
            </Grid>
          )
          })}
        </Grid>
        ) : (
          null
        )}

    </>
  );
};

export default AdminShowcases;
