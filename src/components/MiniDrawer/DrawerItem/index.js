import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu } from '../../../components';
import {
  withStyles,
  Box,
  styled,
  Typography,
  ListItemIcon,
  ListItem,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { HoverColor, HeadingColor } from '../../constants/theme';

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
  position: 'relative',
  pointerEvents: 'none',
  '&:hover': {
    background: HeadingColor,
  },
});
const DrawerItemWrapper = styled(Box)({
  cursor: 'pointer',
});
const OptionTyp = styled(Typography)({
  color: HeadingColor,
  fontSize: 14,
});
const StyledListItemIcon = withStyles({
  root: {
    minWidth: 33,
  },
})(ListItemIcon);
function DrawerItem(props) {
  const { option } = props;
  const [showMenu, setShowMenu] = useState(false);
  return (
    <DrawerItemWrapper
      onMouseOver={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      style={{
        ...(showMenu && { background: HoverColor }),
      }}
    >
      <ListItemWrapper>
        <ListItem>
          <StyledListItemIcon>{option.icon}</StyledListItemIcon>
          <OptionTyp>{option.title}</OptionTyp>
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
        </ListItem>
      </ListItemWrapper>
      {showMenu && (
        <MenuWrapper>
          <Menu menuArr={option.menuArr} />
        </MenuWrapper>
      )}
    </DrawerItemWrapper>
  );
}
DrawerItem.propTypes = {
  option: PropTypes.object.isRequired,
};
export default DrawerItem;
