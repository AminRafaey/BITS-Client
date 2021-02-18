import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
  DarkHoverColor,
} from '../../constants/theme';

const ArrowIconParentWrapper = styled(Box)({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
});

const ArrowIconWrapper = styled(Box)({});

const ListItemWrapper = styled(Box)({
  background: DarkHoverColor,
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

const StyledListItem = withStyles({
  root: {
    paddingLeft: 48,
  },
})(ListItem);
function DrawerItem(props) {
  const { option, open } = props;
  const [expanded, setExpanded] = useState(false);
  const TagName = open ? Box : Link;

  return (
    <Accordion expanded={expanded}>
      <AccordionSummary>
        <TagName
          to={open ? '/' : option.defaultPath}
          width={'100%'}
          style={{ textDecoration: 'none' }}
        >
          <ListItem onClick={() => setExpanded(!expanded)}>
            <StyledListItemIcon>{option.icon}</StyledListItemIcon>
            <OptionTyp>{option.title}</OptionTyp>
            {option.menuArr.length > 0 && (
              <ArrowIconParentWrapper>
                {' '}
                <ArrowIconWrapper
                  style={{
                    ...(expanded && { transform: 'rotate(270deg)' }),
                  }}
                >
                  {' '}
                  <ArrowBackIosIcon style={{ color: '#ffff', height: 11 }} />
                </ArrowIconWrapper>
              </ArrowIconParentWrapper>
            )}
          </ListItem>
        </TagName>
      </AccordionSummary>

      {option.menuArr.map((m, index) => (
        <AccordionDetails key={index}>
          <Link
            to={m.link}
            key={index}
            style={{ textDecoration: 'none', width: '100%' }}
          >
            <ListItemWrapper>
              <StyledListItem>
                <OptionTyp>{m.title}</OptionTyp>
              </StyledListItem>
            </ListItemWrapper>
          </Link>
        </AccordionDetails>
      ))}
    </Accordion>
  );
}
DrawerItem.propTypes = {
  option: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};
export default DrawerItem;
