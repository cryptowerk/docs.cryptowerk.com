import React from 'react';
import {
  StaticQuery,
  graphql
} from 'gatsby';
import './components/styles.css';
import Button from 'react-bootstrap/Button';

const ButtonGetAPIKey = ({
  link
}) => ( <
  StaticQuery query = {
    graphql `
			query buttonTitleQuery {
			  site(siteMetadata: {headerLinks: {elemMatch: {}}}) {
			    siteMetadata {
			      logo {
			        link
			      }
			      headerLinks {
			        link
			        text
			        setColor
			      }
			    }
			  }
			}
        `
  }
  render = {
    (data) => {
      const {
        site: {
          siteMetadata: {
            headerLinks,
          }
        }
      } = data;
      return ( <
        div > {
          headerLinks.map((link, key) => {
            if (link.link !== '' && link.text !== '') {
              return (
                <
                Button key = {
                  key
                }
								className = {
                  link.setColor
                }
                href = {
                  link.link
                }
                target = "_blank"
                dangerouslySetInnerHTML = {
                  {
                    __html: link.text
                  }
                }
                />
              );
            }
          })
        } <
        /div>
      );
    }
  }
  />
);


export default ButtonGetAPIKey;
