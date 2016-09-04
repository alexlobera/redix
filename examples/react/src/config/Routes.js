import React from "react";
import PhotoListContainer from "../containers/PhotoListContainer";
import { Route, IndexRoute } from 'react-router';

const Routes = (
  <Route path="/">
    <IndexRoute component={PhotoListContainer} />
  </Route>
);

export default Routes;
