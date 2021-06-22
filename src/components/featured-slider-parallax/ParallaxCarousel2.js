// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cx from 'clsx';
import {
  Box,
  Typography,
  Button
} from '@material-ui/core';
import ParallaxSlide2 from './ParallaxSlide2';
import SimpleArrow from './SimpleArrow';
import Graphics from '../graphics/Graphics';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    position: 'relative'
  },
  slide: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'white',
    // height: 800,
    marginLeft: spacing(0),
    marginRight: spacing(0),
    [breakpoints.up('sm')]: {
      paddingTop: spacing(0)
    },
    [breakpoints.up('md')]: {
      paddingTop: spacing(0)
    }
  },
  h2: {
    fontSize: 26,
    fontWeight: 900,
    whiteSpace: 'inherit',
    textWrap: 'inherit',
    zIndex: 20,
    [breakpoints.up('sm')]: {
      fontSize: 36
    }
  },
  h3: {
    fontSize: 16,
    fontWeight: 500,
    paddingBottom: 20,
    whiteSpace: 'inherit',
    textWrap: 'inherit',
    zIndex: 30,
    [breakpoints.up('sm')]: {
      fontSize: 18
    }
  },

  button: {
    fontSize: 18,
    lineHeight: 1,
    fontWeight: 500,
    padding: '10px 40px',
    color: '#fff',
    width: 'auto',
    borderRadius: 500,
    backgroundColor: '#EC008C',
    zIndex: 40
  },
  panelBack: {
    position: 'absolute',
    // padding: 40,
    width: '33%',
    minWidth: 300,
    height: 300,
    top: '10%',
    marginLeft: '5% !important',
    [breakpoints.up('lg')]: {
      minWidth: 400,
      marginLeft: '10% !important'
    },
    backgroundColor: '#ffffff',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap',
    textWrap: 'break-word',
    zIndex: 10
  },
  panelFront: {
    position: 'absolute',
    padding: 20,
    width: '100%',
    minWidth: 300,
    [breakpoints.up('lg')]: {
      padding: 40,
      minWidth: 400
    },
    height: 300,
    // top: '10%',
    // marginLeft: '10% !important',
    backgroundColor: '#ffffff',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-wrap',
    textWrap: 'break-word',
    zIndex: 10
  },
  graphic1: {
    position: 'absolute',
    padding: 0,
    width: '100%',
    minWidth: 400,
    height: 310,
    top: '5%',
    left: 30,
    display: 'none',
    [breakpoints.up('sm')]: {
      display: 'block'
    },
    // marginLeft: '10% !important',
    overflow: 'hidden',
    zIndex: 1
  },
  img: {
    zIndex: 5
  },
  arrow: {
    display: 'none',
    position: 'absolute',
    top: '40%',
    transform: 'translateY(-50%)',
    color: '#fffff !important',
    [breakpoints.up('sm')]: {
      display: 'inline-flex'
    }
  },
  arrowLeft: {
    left: '4.16%',
    [breakpoints.up('lg')]: {
      left: '4.16%'
    }
  },
  arrowRight: {
    right: '4.16%',
    [breakpoints.up('lg')]: {
      right: '4.16%'
    }
  }
}));

// const backImage = {
//   backgroundImage: "url('https://source.unsplash.com/1900x900/?",
//   height: '70vh',
//   minHeight: 600,
//   width: '100%',
//   display: 'block',
//   zIndex: 10,
//   objectFit: 'cover'
// };

const ParallaxCarousel2 = () => {
  const classes = useStyles();
  const data = [
    {
      id: 1,
      boxProps: {
        bgcolor: '',
        bgimage: 'water'
      },
      title: 'Channel  #1',
      description: 'The brief description of the channel’s content will go here and here and here and here...oh yeah...and here.',
      img: 'water'
    },
    {
      id: 2,
      boxProps: {
        bgcolor: '',
        bgimage: 'sand'
      },
      title: 'Channel #2',
      description: 'Description goes here',
      img: 'sand'
    },
    {
      id: 3,
      boxProps: {
        bgcolor: '',
        bgimage: 'fire'
      },
      title: 'Channel #3',
      description: 'The brief description of the channel’s content will go here and here and here and here...oh yeah...and here.',
      img: 'fire'
    },
    {
      id: 4,
      boxProps: {
        bgcolor: '',
        bgimage: 'wind'
      },
      title: 'Channel #4',
      description: 'This channel is all about the power of wind. WHOOOOOOOOOSH!',
      img: 'wind'
    }
  ];
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
  return (
    <Box width="100%">
      <ParallaxSlide2
        renderElements={renderElements}
        className={classes.slide}
      >
        {({ injectStyle }) => data.map(({ boxProps, title, description, id, img }, i) => (
          <Box style={{
            backgroundImage: `url('https://source.unsplash.com/1900x900/?${img}')`,
            height: '70vh',
            minHeight: 600,
            width: '100%',
            display: 'block',
            zIndex: 1,
            objectFit: 'cover'
          }}
          >
            {/* eslint-disable-next-line */}
            <Box key={id} {...boxProps} container justify="center">
              <Box>
                <Box
                  className={classes.panelBack}
                  style={injectStyle(i, 0)}
                  alignItems="flex-start"
                >
                  <Box
                    className={classes.panelFront}
                    style={injectStyle(i, 0)}
                    alignItems="flex-start"
                  >
                    <Typography
                      noWrap
                      align="left"
                      className={classes.h2}
                      style={injectStyle(i, 100)}
                    >
                      {title}
                    </Typography>
                    <Typography
                      noWrap
                      align="left"
                      className={classes.h3}
                      style={injectStyle(i, 140)}
                    >
                      {description}
                    </Typography>
                    <Button
                      align="left"
                      className={classes.button}
                      style={injectStyle(i, 180)}
                    >
                      View now
                    </Button>
                  </Box>
                  <Box
                    className={classes.graphic1}
                    style={injectStyle(i, 500)}
                    alignItems="flex-start"
                  >
                    <Graphics
                      width="100%"
                      graphicID="0"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </ParallaxSlide2>
    </Box>
  );
};

export default ParallaxCarousel2;
