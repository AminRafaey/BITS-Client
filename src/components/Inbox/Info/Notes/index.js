import React from 'react';
import Note from './Note';
import { EmptyWrapper } from '../index';

function Notes(props) {
  return (
    <>
      {[1, 2, 3].map((n) => (
        <React.Fragment key={n}>
          <EmptyWrapper />
          <Note />
        </React.Fragment>
      ))}
    </>
  );
}
Notes.propTypes = {};

export default Notes;
