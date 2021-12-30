import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
function NormalRoute({children}) {
    return children
}
NormalRoute.propTypes = {
  children: PropTypes.any.isRequired,
};
export default NormalRoute
