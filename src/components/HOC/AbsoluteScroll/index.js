import React, { useState, useEffect, createRef } from 'react';
import { styled, Box, withStyles } from '@material-ui/core';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { HomeIconDefaultColor, HoverColor } from '../../constants/theme';

const ScrollElementWrapper = styled(Box)({
  overflowX: 'scroll',
});

const IconWrapper = styled(Box)({
  position: 'absolute',
  paddingLeft: 8,
});

const StyledPlayCircleFilledIcon = withStyles({
  root: {
    cursor: 'pointer',
    fill: HomeIconDefaultColor,
    '&:hover': {
      fill: HoverColor,
    },
  },
})(PlayCircleFilledIcon);
function AbsoluteScroll(props) {
  const { children } = props;
  const [scrollIcon, setScrollIcon] = useState({
    operator: 'add',
    preVal: 0,
    icon: '',
  });
  const OutlineIcon = createRef();

  useEffect(() => {
    if (!(OutlineIcon.current.scrollWidth > OutlineIcon.current.clientWidth)) {
      setScrollIcon({ ...scrollIcon, icon: '' });
    } else {
      setScrollIcon({
        ...scrollIcon,
        icon: 'Right',
      });
    }
  }, []);

  const scrollIconHandler = () => {
    let interval = setInterval(() => {
      if (!OutlineIcon.current) {
        clearInterval(interval);
        return;
      }
      let temp = OutlineIcon.current.scrollLeft;
      scrollIcon.operator === 'add'
        ? (OutlineIcon.current.scrollLeft += 25)
        : (OutlineIcon.current.scrollLeft -= 25);
      if (OutlineIcon.current.scrollLeft === temp) {
        clearInterval(interval);
        scrollIcon.operator === 'add'
          ? setScrollIcon({
              preVal: OutlineIcon.current.scrollLeft,
              operator: 'sub',
              icon: 'Left',
            })
          : setScrollIcon({
              preVal: OutlineIcon.current.scrollLeft,
              operator: 'add',
              icon: 'Right',
            });
      } else if (
        (scrollIcon.operator === 'add' &&
          OutlineIcon.current.scrollLeft >= scrollIcon.preVal + 250) ||
        (scrollIcon.operator === 'sub' &&
          OutlineIcon.current.scrollLeft <= scrollIcon.preVal - 250)
      ) {
        clearInterval(interval);
        setScrollIcon({
          ...scrollIcon,
          preVal: OutlineIcon.current.scrollLeft,
        });
      }
    }, 10);
  };

  return (
    <ScrollElementWrapper
      className="scrollElement"
      onScroll={(e) => {
        if (
          e.target.scrollLeft === 0 &&
          OutlineIcon.current.scrollWidth > OutlineIcon.current.clientWidth
        ) {
          setScrollIcon({
            preVal: OutlineIcon.current.scrollLeft,
            operator: 'add',
            icon: 'Right',
          });
        } else if (
          e.target.scrollWidth - 1 <=
            e.target.scrollLeft + e.target.clientWidth &&
          OutlineIcon.current.scrollWidth > OutlineIcon.current.clientWidth
        ) {
          setScrollIcon({
            preVal: OutlineIcon.current.scrollLeft,
            operator: 'sub',
            icon: 'Left',
          });
        }
      }}
      ref={OutlineIcon}
    >
      <IconWrapper>
        {scrollIcon.icon && (
          <StyledPlayCircleFilledIcon
            style={{
              ...(scrollIcon.icon === 'Left' && {
                transform: 'rotate(180deg)',
              }),
            }}
            onClick={() => scrollIconHandler()}
          />
        )}
      </IconWrapper>
      {children}
    </ScrollElementWrapper>
  );
}

export default AbsoluteScroll;
