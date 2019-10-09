import createConnector from '../core/createConnector';
/**
 * connectPoweredBy connector provides the logic to build a widget that
 * will display a link to algolia.
 * @name connectPoweredBy
 * @kind connector
 * @providedPropType {string} url - the url to redirect to algolia
 */

export default createConnector({
  displayName: 'AlgoliaPoweredBy',
  getProvidedProps: function getProvidedProps() {
    var isServer = typeof window === 'undefined';
    var url = 'https://www.algolia.com/?' + 'utm_source=react-instantsearch&' + 'utm_medium=website&' + "utm_content=".concat(!isServer ? window.location.hostname : '', "&") + 'utm_campaign=poweredby';
    return {
      url: url
    };
  }
});