// import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ParallaxSlide from './ParallaxSlide';
import SimpleArrow from './SimpleArrow';
// import DotIndicator from './DotIndicator';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    // a must if you want to set arrows, indicator as absolute
    position: 'relative'
  },
  slide: {
    overflow: 'hidden',
    // relative is a must if you want to create overlapping layers in children
    position: 'relative',
    backgroundColor: 'white',
    height: 800,
    marginLeft: spacing(0),
    marginRight: spacing(0),
    [breakpoints.up('sm')]: {
      paddingTop: spacing(0)
    },
    [breakpoints.up('md')]: {
      paddingTop: spacing(0)
    }
  },
  imageContainer: {
    display: 'block',
    width: '100%',
    height: '100%'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    boxShadow: '10px 10px #EC008C',
    [breakpoints.up('sm')]: {
      marginLeft: '0%'
    }
  },
  arrow: {
    display: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [breakpoints.up('sm')]: {
      display: 'inline-flex'
    }
  },
  arrowLeft: {
    left: 0,
    [breakpoints.up('lg')]: {
      left: 20
    }
  },
  arrowRight: {
    right: 0,
    [breakpoints.up('lg')]: {
      right: 20
    }
  },
  indicatorContainer: {
    textAlign: 'center'
  }
}));

const ParallaxCarousel = ({ data }) => {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const renderElements = ({ index, onChangeIndex }) => (
    <>
      <SimpleArrow
        className={cx(classes.arrow, classes.arrowLeft)}
        direction="<"
        // disabled={index === 0}
        onClick={() => onChangeIndex(index - 1)}
      />
      <SimpleArrow
        className={cx(classes.arrow, classes.arrowRight)}
        direction=">"
        // disabled={index === data.length - 1}
        onClick={() => onChangeIndex(index + 1)}
      />
      {/* <div className={classes.indicatorContainer}>
        {data.map(({ id }, i) => (
          <DotIndicator
            key={id}
            active={i === index}
            onClick={() => onChangeIndex(i)}
          />
        ))}
      </div> */}
    </>
  );
  const renderChildren = () => data.map(({ id, image }) => (
    <div
      key={id}
      className={classes.slide}
    >
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src={image}
          alt="slide"
        />
      </div>
    </div>
  ));
  return (
    <div className={classes.root}>
      <ParallaxSlide renderElements={renderElements}>
        {renderChildren}
      </ParallaxSlide>
    </div>
  );
};

ParallaxCarousel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      image: PropTypes.string
    })
  )
};
ParallaxCarousel.defaultProps = {
  data: []
};

export default ParallaxCarousel;
