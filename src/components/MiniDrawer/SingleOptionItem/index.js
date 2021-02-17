import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu } from '../../../components';
import { Accordion, AccordionSummary, AccordionDetails } from '../../HOC';
import {
  withStyles,
  Box,
  styled,
  Typography,
  ListItemIcon,
  ListItem,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  HoverColor,
  HeadingColor,
  HighlightColor,
  DarkHoverColor,
} from '../../constants/theme';

const ArrowIconParentWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});

const ArrowIconWrapper = styled(Box)({});

const MenuWrapper = styled(Box)({
  position: 'absolute',
  marginLeft: 137,
  marginTop: -18,
});
const ListItemWrapper = styled(Box)({
  '&:hover': {
    background: HoverColor,
  },
});
const DrawerItemWrapper = styled(Box)({
  cursor: 'pointer',
});
const OptionTyp = styled(Typography)({
  color: HeadingColor,
  fontSize: 14,
});

const ListWrapper = styled(Box)({
  minWidth: '100px',
  maxWidth: '200px',
  wordBreak: 'break-word',
  zIndex: 1,
});


const StyledListItemIcon = withStyles({
  root: {
    minWidth: 33,
  },
})(ListItemIcon);
function SingleOptionItem(props) {
  const { option, open, handleDrawerClose } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const TagName = open ? Box : Link;

  return (
    <DrawerItemWrapper
      onMouseOver={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      style={{
        ...(showMenu && { background: HoverColor }),
      }}
    >
      <Link to={option.defaultPath} style={{ textDecoration: 'none' }}>
        <ListItemWrapper
          style={{
            ...(open && option.menuArr.length > 0 && { pointerEvents: 'none' }),
          }}
        >
          <ListItem>
            <StyledListItemIcon>{option.icon}</StyledListItemIcon>
            <OptionTyp>{option.title}</OptionTyp>
            {option.menuArr.length > 0 && (
              <ArrowIconParentWrapper>
                {' '}
                <ArrowIconWrapper
                  style={{
                    ...(showMenu && { transform: 'rotate(270deg)' }),
                  }}
                >
                  {' '}
                  <ArrowBackIosIcon style={{ color: '#ffff', height: 11 }} />
                </ArrowIconWrapper>
              </ArrowIconParentWrapper>
            )}
          </ListItem>
        </ListItemWrapper>
      </Link>
      {showMenu && (
        <MenuWrapper>
          <Menu menuArr={option.menuArr} />
        </MenuWrapper>
      )}
    </DrawerItemWrapper>
  );
}
SingleOptionItem.propTypes = {
  option: PropTypes.object.isRequired,
};
export default SingleOptionItem;