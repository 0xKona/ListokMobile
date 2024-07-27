import { RootState } from '@redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import ListokEditorDetails from './listok-details';
import ListokEditorWeekView from './listok-week-view';
import ListokEditorConfirmation from './listok-editor-confirmation';

const ListokEditor = () => {
  const { currentStep } = useSelector((state: RootState) => state.listokEditor);

  switch (currentStep) {
    case 1:
      return <ListokEditorDetails />;
    case 2:
      return <ListokEditorWeekView />;
    case 3:
      return <ListokEditorConfirmation />;
    default:
      return;
  }
};

export default ListokEditor;
