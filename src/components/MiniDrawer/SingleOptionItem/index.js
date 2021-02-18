import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  withStyles,
  Box,
  styled,
  Typography,
  ListItemIcon,
  ListItem,
} from '@material-ui/core';
import { HoverColor, HeadingColor } from '../../constants/theme';

const ListItemWrapper = styled(Box)({
  '&:hover': {
    background: HoverColor,
  },
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
function SingleOptionItem(props) {
  const { option } = props;

  return (
    <Link to={option.defaultPath} style={{ textDecoration: 'none' }}>
      <ListItemWrapper>
        <ListItem>
          <StyledListItemIcon>{option.icon}</StyledListItemIcon>
          <OptionTyp>{option.title}</OptionTyp>
        </ListItem>
      </ListItemWrapper>
    </Link>
  );
}
SingleOptionItem.propTypes = {
  option: PropTypes.object.isRequired,
};
export default SingleOptionItem;
