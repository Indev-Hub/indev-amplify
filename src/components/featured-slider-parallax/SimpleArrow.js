// import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from './Icon';

const useStyles = makeStyles(({ breakpoints }) => ({
  root: {
    borderRadius: '50%',
    color: '#EC0082',
    border: '2px solid',
    backgroundColor: 'transparent',

    height: 40,
    '& .MuiIcon-root': {
      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)'
    },
    '&:hover': {
      background: 'transparent',
      '& .MuiIcon-root': {
        transform: 'scale(2)',
        backgroundColor: 'transparent',
        [breakpoints.up('md')]: {
          transform: 'scale(1.7)'
        }
      }
    },
    [breakpoints.up('sm')]: {
      width: 48,
      minWidth: 48,
      height: 48
    },
    [breakpoints.up('md')]: {
      width: 64,
      minWidth: 64,
      height: 64
    }
  }
}));

const SimpleArrow = ({ direction, iconProps, ...props }) => {
  const classes = useStyles(props);
  return (
    <Button
      display="flex"
      // alignItem="center"
      {...props}
      classes={classes}
    >
      <Icon {...iconProps}>{`${direction}`}</Icon>
    </Button>
  );
};

SimpleArrow.propTypes = {
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']).isRequired,
  iconProps: PropTypes.shape({})
};
SimpleArrow.defaultProps = {
  iconProps: {}
};

export default SimpleArrow;
