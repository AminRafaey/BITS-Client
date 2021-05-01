import React, { useEffect, useState } from 'react';

import {
  TemplateMultiSelect,
  Template,
  OptionSelection,
} from '../../components';
import { Box, styled } from '@material-ui/core';

const TemplateSelectWrapper = styled(Box)({
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
  const [selectedMedia, setSelectedMedia] = useState({});
  const [contantList, setContactList] = useState([]);

  useEffect(() => {
    Object.entries(selectedTemplate).length > 0 &&
      setMessage(selectedTemplate.content);
  }, [selectedTemplate]);

  return (
    <div>
      <TemplateSelectWrapper>
        <TemplateMultiSelect setSelectedTemplate={setSelectedTemplate} />
      </TemplateSelectWrapper>
      <TemplateWrapper>
        <Template
          message={message}
          setMessage={setMessage}
          setSelectedMedia={setSelectedMedia}
          selectedMedia={selectedMedia}
        />
      </TemplateWrapper>
      <OptionSelectionWrapper>
        {' '}
        <OptionSelection
          setContactList={setContactList}
          contantList={contantList}
          selectedMedia={selectedMedia}
          message={message}
        />{' '}
      </OptionSelectionWrapper>
    </div>
  );
}

export default QuickSend;
