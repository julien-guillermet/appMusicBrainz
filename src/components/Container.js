import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";
import GridHome from "./GridHome";
import Bio from "./Bio"
import GridFavorites from './GridFavorites'

function Container() {
  return (
    <Wrapper>
        <Switch>
          <Route exact path="/" component={GridHome} />
          <Route path="/bio" component={Bio} />
          <Route path="/fav" component={GridFavorites} />
        </Switch>
    </Wrapper>
  );
}

const Wrapper = styled.div`
`;

export default Container;