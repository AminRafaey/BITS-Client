import React, { useEffect, useState } from 'react';
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
import {
  useCompanyState,
  useCompanyDispatch,
  loadCompanies,
} from '../../../../Context/Company';
import {
  useLeadSourceState,
  useLeadSourceDispatch,
  loadLeadSource,
} from '../../../../Context/LeadSource';
import { getCompanies, getLeadSource } from '../../../../api/Lead';
import { styled, Box, Typography, CircularProgress } from '@material-ui/core';
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
const LoaderWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '50vh',
  alignItems: 'center',
});
function Filters(props) {
  const [filters, setFilters] = useState({
    labels: [],
    companies: [],
    countries: [],
    leadSources: [],
  });
  const [companyLoader, setCompanyLoader] = useState(false);
  const [leadSourceLoader, setLeadSourceLoader] = useState(false);
  const companyState = useCompanyState();
  const companyDispatch = useCompanyDispatch();
  const leadSourceState = useLeadSourceState();
  const leadSourceDispatch = useLeadSourceDispatch();

  console.log(filters);
  useEffect(() => {
    if (companyState.length < 1) {
      setCompanyLoader(true);
      getCompanies().then((res) => {
        loadCompanies(companyDispatch, { companies: res });
        setCompanyLoader(false);
      });
    }
  }, []);

  useEffect(() => {
    if (leadSourceState.length < 1) {
      setLeadSourceLoader(true);
      getLeadSource().then((res) => {
        loadLeadSource(leadSourceDispatch, { leadSource: res });
        setLeadSourceLoader(false);
      });
    }
  }, []);
  const commonProps = { filters: filters, setFilters: setFilters };
  return (
    <FiltersWrapper>
      <HeaderWrapper>
        <FiltersTyp>Filters</FiltersTyp>
        <ClearTyp>Clear</ClearTyp>
      </HeaderWrapper>
      {companyLoader || leadSourceLoader ? (
        <LoaderWrapper>
          <CircularProgress color="primary" size={35} />
        </LoaderWrapper>
      ) : (
        <React.Fragment>
          <Label {...commonProps} />

          <Company {...commonProps} />

          <LeadSource {...commonProps} />

          <Country {...commonProps} />
        </React.Fragment>
      )}
      {
        // <City />
        // <State />
        // <FirstName />
        // <LastName />
        // <Email />
        // <Phone />
      }
    </FiltersWrapper>
  );
}
Filters.propTypes = {};

export default Filters;
