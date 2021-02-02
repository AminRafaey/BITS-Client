import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  styled,
  List,
  Typography,
  ListItem,
  Paper,
} from '@material-ui/core';
import { HoverColor, HeadingColor } from '../../constants/theme';
const OptionTyp = styled(Typography)({
  fontSize: 12,
});

const ListWrapper = styled(Box)({
  minWidth: '100px',
  maxWidth: '200px',
  wordBreak: 'break-word',
  zIndex: 1,
});

const ListItemWrapper = styled(Box)({
  color: '#212121',
  cursor: 'pointer',
  '&:hover': {
    background: HoverColor,
    color: HeadingColor,
  },
  whiteSpace: 'normal',
});
function Menu(props) {
  const { menuArr } = props;
  return (
    <ListWrapper>
      <List style={{ width: '100px' }}>
        <Paper elevation={24}>
          {menuArr.map((m, index) => (
            <Link to={m.link} key={index} style={{ textDecoration: 'none' }}>
              <ListItemWrapper>
                <ListItem>
                  <OptionTyp>{m.title}</OptionTyp>
                </ListItem>
              </ListItemWrapper>
            </Link>
          ))}
        </Paper>
      </List>
    </ListWrapper>
  );
}

Menu.propTypes = {
  menuArr: PropTypes.array.isRequired,
};
export default Menu;
