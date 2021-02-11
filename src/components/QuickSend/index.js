import React, { useEffect, useState } from 'react';
import {
  TemplateMultiSelect,
  Template,
  OptionSelection,
} from '../../components';
import { Box, styled } from '@material-ui/core';

const CampaignSelectWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});
const TemplateWrapper = styled(Box)({});
const OptionSelectionWrapper = styled(Box)({
  marginTop: 40,
});
function QuickSend(props) {
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState({});

  useEffect(() => {
    Object.entries(selectedTemplate).length > 0 &&
      setMessage(selectedTemplate.content);
  }, [selectedTemplate]);
  return (
    <div>
      <CampaignSelectWrapper>
        <TemplateMultiSelect setSelectedTemplate={setSelectedTemplate} />
      </CampaignSelectWrapper>
      <TemplateWrapper>
        <Template message={message} setMessage={setMessage} />
      </TemplateWrapper>
      <OptionSelectionWrapper>
        {' '}
        <OptionSelection />{' '}
      </OptionSelectionWrapper>
    </div>
  );
}

export default QuickSend;
