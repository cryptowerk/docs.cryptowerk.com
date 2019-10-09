import { createIndex } from 'react-instantsearch-core';
var Index = createIndex({
  Root: 'div',
  props: {
    className: 'ais-MultiIndex__root'
  }
});
export default Index;