import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import KeywordSelect from '../../QuickSend/Template/KeywordSelect';
import { Button, Alert, SecondaryButton } from '../../HOC';
import {
  createTemplate,
  getTemplates,
  updateTemplate as updateTemplateApi,
} from '../../../api/template';
import {
  useTemplateState,
  useTemplateDispatch,
  addTemplate,
  loadTemplates,
  updateTemplate,
} from '../../../Context/Template';
import {
  Box,
  styled,
  Grid,
  Typography,
  CircularProgress,
  TextField,
} from '@material-ui/core';
import { DarkBackgroundColor } from '../../constants/theme';
import { initTemplate } from '../../constants/InitialValues';

const textAreaStyle = {
  width: '100%',
  minHeight: '160px',
  resize: 'none',
  borderRadius: '42px',
  border: `0px solid #ffff`,
  padding: '1.5rem',
  outlineWidth: '0px',
};

const textFieldStyle = {
  background: '#ffff',
  borderRadius: 5,
  width: 200,
};
const CreateTemplateWrapper = styled(Box)({
  width: '100%',
  minHeight: 100,
  display: 'flex',
  borderRadius: 16,
  padding: '8px 0px 24px 0px',
});

const FieldWrapper = styled(Box)({
  padding: '16px 0px 0px 16px',
});

const FieldLabelNameTyp = styled(Typography)({
  fontSize: 15,
  fontFamily: 'medium',
});

const ButtonsWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  paddingTop: 24,
});

const ErorWrapper = styled(Box)({
  paddingTop: 24,
  fontSize: 14,
  display: 'flex',
  justifyContent: 'center',
});
const LoaderWrapper = styled(Box)({
  width: '100%',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function CreateTemplate(props) {
  const history = useHistory();
  const search = useLocation().search;
  const edit = new URLSearchParams(search).get('edit');
  const index = new URLSearchParams(search).get('index');
  const templateDispatch = useTemplateDispatch();
  const templateState = useTemplateState();
  const [template, setTemplate] = useState(initTemplate);
  const [templateLoading, setTemplateLoading] = useState(true);
  const [error, setError] = useState({ name: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [textAreaVal, setTextAreaVal] = useState('');
  const templateTextAreaRef = useRef();

  useEffect(() => {
    if (edit && index) {
      const templateTemp = templateState[index];
      templateTemp &&
        setTemplate({
          ...template,
          title: templateTemp.title,
          ...templateTemp,
        });
      templateTemp && setTextAreaVal(templateTemp.content);
    }
  }, []);
  useEffect(() => {
    if (templateState.length === 0) {
      getTemplates()
        .then((res) => {
          setTemplateLoading(false);
          loadTemplates(templateDispatch, { templates: res });
        })
        .catch((err) => {});
    } else {
      setTemplateLoading(false);
    }
  }, []);

  const handleSubmit = () => {
    if (!template.title) {
      setError({
        name: 'title',
        message: "Template name can't be empty, Please type name to continue",
      });
      return;
    }
    if (!templateTextAreaRef.current.value) {
      setError({
        name: 'content',
        message: "Content can't be empty, Please type a message to continue",
      });
      return;
    }
    setLoading(true);
    if (edit && index) {
      updateTemplateApi(template._id, {
        ...template,
        content: templateTextAreaRef.current.value,
      })
        .then((res) => {
          updateTemplate(templateDispatch, {
            selectedTemplateIndex: index,
            updatedTemplate: res,
          });
          setTemplate(initTemplate);
          templateTextAreaRef.current.value = '';
          setLoading(false);
          history.push('/manageTemplate');
        })
        .catch((err) => {
          setLoading(false);
          err.message && setError(err);
        });
    } else {
      createTemplate({
        ...template,
        content: templateTextAreaRef.current.value,
      })
        .then((res) => {
          addTemplate(templateDispatch, { template: res });
          setTemplate(initTemplate);
          templateTextAreaRef.current.value = '';
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          err.message && setError(err);
        });
    }
  };
  return (
    <CreateTemplateWrapper>
      {templateLoading ? (
        <LoaderWrapper>
          <CircularProgress color="primary" />
        </LoaderWrapper>
      ) : (
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <FieldWrapper ml={5.5}>
              <Box pb={0.75}>
                {' '}
                <FieldLabelNameTyp>Template Name</FieldLabelNameTyp>
              </Box>
              <TextField
                label="Required *"
                variant="outlined"
                size="small"
                value={template.title}
                autoFocus={true}
                style={{ ...textFieldStyle }}
                onChange={(e) => {
                  error.message &&
                    error.name === 'title' &&
                    setError({ name: '', message: '' });
                  setTemplate({ ...template, title: e.target.value });
                }}
              />
            </FieldWrapper>
          </Grid>

          <Grid item xs={6}>
            <FieldWrapper>
              <Box pl={5.5}>
                <FieldLabelNameTyp>Content</FieldLabelNameTyp>
              </Box>
              <KeywordSelect
                setMessage={setTextAreaVal}
                templateTextAreaRef={templateTextAreaRef}
              />
              <textarea
                style={textAreaStyle}
                defaultValue={textAreaVal}
                ref={templateTextAreaRef}
                placeholder="Type your message here..."
                onChange={(e) => {
                  error.message &&
                    error.name === 'content' &&
                    setError({ name: '', message: '' });
                }}
              />
            </FieldWrapper>
          </Grid>
          <Grid item xs={12}>
            {error.message && (
              <ErorWrapper>
                <Alert severity="error">{error.message}</Alert>
              </ErorWrapper>
            )}
            <ButtonsWrapper style={{ ...(loading && { paddingRight: 79 }) }}>
              {' '}
              <SecondaryButton
                mr={1}
                onClick={() => {
                  setTemplate(initTemplate);
                  templateTextAreaRef.current.value = '';
                }}
              >
                Cancel
              </SecondaryButton>
              {loading ? (
                <CircularProgress size={24} color="primary" />
              ) : (
                <Button onClick={handleSubmit}>
                  {edit && index ? 'Update' : 'Create Template'}
                </Button>
              )}
            </ButtonsWrapper>
          </Grid>
        </Grid>
      )}
    </CreateTemplateWrapper>
  );
}
CreateTemplate.propTypes = {};
export default CreateTemplate;
