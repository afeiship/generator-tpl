import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { id } = useParams();
  return <><%= resource %> edit view - { id }.</>;
};

export const Routes = {
  path: 'edit/:id',
};
