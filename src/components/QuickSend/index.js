import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  TemplateMultiSelect,
  Template,
  OptionSelection,
} from '../../components';
import { useConnectStatusState } from '../../Context/ConnectStatus';
import { Box, styled, CircularProgress } from '@material-ui/core';

const TemplateSelectWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});
const LoadingWrapper = styled(Box)({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const TemplateWrapper = styled(Box)({});
const OptionSelectionWrapper = styled(Box)({
  marginTop: 40,
});
function QuickSend(props) {
  const { setOpenModal } = props;
  const [message, setMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedMedia, setSelectedMedia] = useState({});
  const [contantList, setContactList] = useState([]);
  const connectState = useConnectStatusState();

  useEffect(() => {
    Object.entries(selectedTemplate).length > 0 &&
      setMessage(selectedTemplate.content);
  }, [selectedTemplate]);

  useEffect(() => {
    !connectState && setOpenModal(true);
  }, [connectState]);

  return (
    <div>
      {connectState ? (
        <React.Fragment>
          <TemplateSelectWrapper>
            <TemplateMultiSelect
              setSelectedTemplate={setSelectedTemplate}
              selectedTemplate={selectedTemplate}
            />
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
        </React.Fragment>
      ) : (
        <LoadingWrapper>
          <CircularProgress color="primary" />
        </LoadingWrapper>
      )}
    </div>
  );
}
QuickSend.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};
export default QuickSend;
