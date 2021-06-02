import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tree from "react-ui-tree";
import initialTree from "./tree";
import Icon from "react-icons-kit";
import { folder } from "react-icons-kit/feather/folder";
import { file } from "react-icons-kit/feather/file";
import styled from "styled-components";
import { ContextMenuTrigger } from "react-contextmenu";
import _ from "lodash";
import { StrollableContainer } from "react-stroller";
import deepdash from "deepdash";

import "./styles.css";
import "react-ui-tree/dist/react-ui-tree.css";
import "./theme.css";
import "./react-contextmenu.css";

// add deepdash to lodash
deepdash(_);

function collect(props) {
  return props;
}

const LightScrollbar = styled.div`
  width: 10px;
  background-color: #fff;
  opacity: 0.7;
  border-radius: 4px;
  margin: 4px;
`;
const Toolbar = styled.div`
  position: relative;
  display: flex;
  color: #d8e0f0;
  z-index: +1;
  /*border: 1px solid white;*/
  padding-bottom: 4px;
  i {
    margin-right: 5px;
    cursor: pointer;
  }
  i :hover {
    color: #d8e0f0;
  }
`;

const FloatLeft = styled.span`
  padding-left: 4px;
  width: 100%;
`;


const initialState = {
  active: null,
  tree: {
    ...initialTree
  },
  collapsed: false
};

class App extends Component {
  state = initialState;

  renderNode = node => {
    const renderFileFolderToolbar = (isFolder, caption) => (
      <Toolbar>
        <FloatLeft>
          <Icon icon={isFolder ? folder : file} />
          {caption}
        </FloatLeft>
      </Toolbar>
    );

    const isFolder = node.hasOwnProperty("children");
    return (
      <ContextMenuTrigger
        id="FILE_CONTEXT_MENU"
        key={node.id}
        name={node.id}
        collect={collect}
        holdToDisplay={-1}
      >
        {renderFileFolderToolbar(isFolder, node.module)}
      </ContextMenuTrigger>
    );
  };

  render() {
    const { collapsed } = this.state;

    return (
      <div>
        <div className="tree">
          {!collapsed && (
            <StrollableContainer draggable bar={LightScrollbar}>
              <Tree
                paddingLeft={20}
                tree={this.state.tree}
                renderNode={this.renderNode}
              />
            </StrollableContainer>
          )}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
