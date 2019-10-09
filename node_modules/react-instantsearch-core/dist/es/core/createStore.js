export default function createStore(initialState) {
  var state = initialState;
  var listeners = [];

  function dispatch() {
    listeners.forEach(function (listener) {
      return listener();
    });
  }

  return {
    getState: function getState() {
      return state;
    },
    setState: function setState(nextState) {
      state = nextState;
      dispatch();
    },
    subscribe: function subscribe(listener) {
      listeners.push(listener);
      return function unsubcribe() {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    }
  };
}