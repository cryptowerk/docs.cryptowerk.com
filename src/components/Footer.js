import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn';
import Button from 'react-bootstrap/Button';
import Link from './link';
import './styles.css';
import config from '../../config.js';

const help = require('./images/help.svg');

const Footer = ({location}) => (
  <StaticQuery
    query={
      graphql`
        query FooterTitleQuery {
          site {
            siteMetadata {
              headerTitle
              githubUrl
              helpUrl
              tweetText
              logo {
                link
                image
              }
              headerLinks {
                link
                text
                setColor
              }
            }
          }
        }
        `}
    render={(data) => {
      const logoImg = require('./images/logo.svg');
      const twitter = require('./images/twitter.svg');
      const {
        site: {
          siteMetadata: {
            HeaderTitle,
            githubUrl,
            helpUrl,
            tweetText,
            logo,
            FooterLinks,
          }
        }
      } = data;
      return (
        <div >
        <div className={'navBarWrapper'}>
          <nav className={'navbar navbar-default navBarDefault'}>
            <div className={'navbar-header navBarHeader'}>
            <ul className={'nav navbar-nav navBarUL navBarNav navbar-right navBarULRight'}>
              {helpUrl !== '' ?
                (<li><a href={helpUrl}><img src={help} alt={'Help icon'}/></a></li>) : null
              }
              {tweetText !== '' ?
                (<li>
                  <a href={'https://twitter.com/intent/tweet?&text=' + tweetText} target="_blank">
                    <img className={'shareIcon'} src={twitter} alt={'Twitter'} />
                  </a>
                 </li>) : null
              }
              {githubUrl !== '' ?
                (<li className={'githubBtn'}>
                  <GitHubButton href={githubUrl} data-show-count="true" aria-label="Star on GitHub">Star</GitHubButton>
                </li>) : null}
                {(tweetText !== '' || githubUrl !== '') ?
                  (<li className="divider hidden-xs"></li>): null
                }

            </ul>
            </div>
          </nav>
        </div>
        </div>
      );
    }}
  />
);

export default Footer;
