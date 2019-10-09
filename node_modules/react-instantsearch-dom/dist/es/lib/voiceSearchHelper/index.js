import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
// copied from https://github.com/algolia/instantsearch.js/blob/0e988cc85487f61aa3b61131c22bed135ddfd76d/src/lib/voiceSearchHelper/index.ts
export default function createVoiceSearchHelper(_ref) {
  var searchAsYouSpeak = _ref.searchAsYouSpeak,
      onQueryChange = _ref.onQueryChange,
      onStateChange = _ref.onStateChange;
  var SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;

  var getDefaultState = function getDefaultState(status) {
    return {
      status: status,
      transcript: '',
      isSpeechFinal: false,
      errorCode: undefined
    };
  };

  var state = getDefaultState('initial');
  var recognition;

  var isBrowserSupported = function isBrowserSupported() {
    return Boolean(SpeechRecognitionAPI);
  };

  var isListening = function isListening() {
    return state.status === 'askingPermission' || state.status === 'waiting' || state.status === 'recognizing';
  };

  var setState = function setState() {
    var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    state = _objectSpread({}, state, newState);
    onStateChange();
  };

  var getState = function getState() {
    return state;
  };

  var resetState = function resetState() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';
    setState(getDefaultState(status));
  };

  var onStart = function onStart() {
    setState({
      status: 'waiting'
    });
  };

  var onError = function onError(event) {
    setState({
      status: 'error',
      errorCode: event.error
    });
  };

  var onResult = function onResult(event) {
    setState({
      status: 'recognizing',
      transcript: event.results[0] && event.results[0][0] && event.results[0][0].transcript || '',
      isSpeechFinal: event.results[0] && event.results[0].isFinal
    });

    if (searchAsYouSpeak && state.transcript) {
      onQueryChange(state.transcript);
    }
  };

  var onEnd = function onEnd() {
    if (!state.errorCode && state.transcript && !searchAsYouSpeak) {
      onQueryChange(state.transcript);
    }

    if (state.status !== 'error') {
      setState({
        status: 'finished'
      });
    }
  };

  var stop = function stop() {
    dispose();
    resetState();
  };

  var start = function start() {
    recognition = new SpeechRecognitionAPI();

    if (!recognition) {
      return;
    }

    resetState('askingPermission');
    recognition.interimResults = true;
    recognition.addEventListener('start', onStart);
    recognition.addEventListener('error', onError);
    recognition.addEventListener('result', onResult);
    recognition.addEventListener('end', onEnd);
    recognition.start();
  };

  var dispose = function dispose() {
    if (!recognition) {
      return;
    }

    recognition.stop();
    recognition.removeEventListener('start', onStart);
    recognition.removeEventListener('error', onError);
    recognition.removeEventListener('result', onResult);
    recognition.removeEventListener('end', onEnd);
    recognition = undefined;
  };

  var toggleListening = function toggleListening() {
    if (!isBrowserSupported()) {
      return;
    }

    if (isListening()) {
      stop();
    } else {
      start();
    }
  };

  return {
    getState: getState,
    isBrowserSupported: isBrowserSupported,
    isListening: isListening,
    toggleListening: toggleListening,
    dispose: dispose
  };
}