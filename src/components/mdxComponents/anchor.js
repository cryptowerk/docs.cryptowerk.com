import * as React from "react";

const AnchorTag = ({ children: link, ...props }) => {
  if(link) {
    return (
      <a href={props.href} rel="noopener noreferrer" target="_blank">{link}</a>
    );
  } else {
    return null;
  }
};

export default AnchorTag;
