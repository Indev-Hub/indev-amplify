/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Toolbar
} from '@material-ui/core';
import SaveIcon from '../../../../icons/Save';
import DotsVertical from '../../../../icons/DotsVertical';
// import ProjectOwner from "./ProjectOwner";
// import ProjectDetails from "./UpdateForm";
// import ProjectDescription from "./ProjectDescription";
// import ProjectReview from "./ProjectReview";
import { createUpdate } from "../../../../graphql/mutations";
import { getUser } from "../../../../graphql/queries";
import { API, Auth, graphqlOperation } from "aws-amplify";
import useAuth from "src/hooks/useAuth";
import UpdateForm from "./UpdateForm";

const UpdateAdd = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    short: '',
    author: '',
    content: '',
    type: ''
  });
  // console.log('Update is created:', updateCreated)

  // Set state for User table
  const [userData, setUserData] = useState();

  // Get user attributes
  const { user } = useAuth();
  // console.log('user', user);

  // Load User table data
  useEffect(() => {
    getUserTable();
    console.log('user table:', userData)
  }, [])

  // API call to get User table data
  const getUserTable = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(getUser, { id: user.id }));
      const userList = userData.data.getUser;
      setUserData(userList);
      console.log('list', userList);
    } catch (error) {
      console.log('error on fetching videos', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    console.log('Change:', formData)
  };
  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const back = () => {
    setCurrentStep(currentStep - 1);
  };

  async function addUpdate() {
    // Destructure formData
    const { name, short, author, content, type } = formData;

    // Create Update Inputs
    const CreateUpdateInput = {
      name: name,
      short: short,
      updateAuthorId: user.id,
      content: content,
      type: type
      // featuredImg: key // featured image input
    };

    // Create new update
    const newUpdate = await API.graphql(graphqlOperation(createUpdate, { input: CreateUpdateInput }));
    // if (!newChannel.ok) {
    //   throw new Error('ERROR on creating new channel', console.error);
    // }
    console.log('New Update Added', newUpdate.data.createUpdate)
    return newUpdate.data.createUpdate;
    // const setNewChannel = newChannel.data.createChannel;
  }

  return (
    <>
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
                // component={RouterLink}
                size="large"
                startIcon={<SaveIcon />}
                sx={{ mx: 2 }}
                // to="/update/1"
                variant="contained"
                onClick={addUpdate}
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
      <UpdateForm
        data={formData}
        handleChange={handleChange}
        addUpdate={addUpdate}
        next={next}
      />
    </>
  );

  // switch (currentStep) {
  //   case 1:
  //     return (
  //       <UpdateForm
  //         data={formData}
  //         handleChange={handleChange}
  //         next={next}
  //       />
  //     );
  //   case 2:
  //     return (
  //       <ProjectDescription
  //         data={formData}
  //         handleChange={handleChange}
  //         next={next}
  //         back={back}
  //       />
  //     );
  //   case 3:
  //     return (
  //       <ProjectDescription
  //         data={formData}
  //         handleChange={handleChange}
  //         next={next}
  //         back={back}
  //       />
  //     );
  //   default:
  //     return (
  //       <>
  //         <ProjectReview data={formData} addProject={addProject} back={back} />
  //       </>
  //     );
  // }
};
export default UpdateAdd;