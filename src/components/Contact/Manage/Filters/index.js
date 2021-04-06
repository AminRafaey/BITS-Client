import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  Company,
  LeadSource,
  Country,
  City,
  State,
  FirstName,
  LastName,
  Email,
  Phone,
} from './Filter';

import { styled, Box, Typography } from '@material-ui/core';
import { LinkColor } from '../../../constants/theme';

const FiltersWrapper = styled(Box)({
  padding: '16px 28px 16px 28px',
});
const HeaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

const FiltersTyp = styled(Typography)({
  fontSize: 16,
  fontFamily: 'medium',
});
const ClearTyp = styled(Typography)({
  color: LinkColor,
  fontSize: 14,
});

function Filters(props) {
  const [filters, setFilters] = useState({
    labels: [],
    companies: [],
    countries: [],
    leadSources: [],
    cities: [],
    states: [],
    firstNames: [],
    lastNames: [],
    emails: [],
    phones: [],
  });

  const commonProps = { filters: filters, setFilters: setFilters };
  return (
    <FiltersWrapper>
      <HeaderWrapper>
        <FiltersTyp>Filters</FiltersTyp>
        <ClearTyp>Clear</ClearTyp>
      </HeaderWrapper>

      <Label {...commonProps} />

      <Company {...commonProps} />

      <LeadSource {...commonProps} />

      <Country {...commonProps} />
      <City {...commonProps} />
      <State {...commonProps} />
      <FirstName {...commonProps} />
      <LastName {...commonProps} />
      <Email {...commonProps} />
      <Phone {...commonProps} />
    </FiltersWrapper>
  );
}
Filters.propTypes = {};

export default Filters;
