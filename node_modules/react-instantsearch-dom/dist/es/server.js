import algoliasearch from 'algoliasearch/lite';
import createInstantSearchServer from './core/createInstantSearchServer';
export var createInstantSearch = function createInstantSearch() {
  return createInstantSearchServer(algoliasearch);
};