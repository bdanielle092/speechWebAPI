//search form element
const searchForm = document.querySelector("#search-form");
//input element
const searchFormInput = document.querySelector("input");

// speechRecognition include these lines to feed the right objects to Chrome, and any future implementations that might support the features without a prefix:
// with prefix || without prefix
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//if else statement saying wether the browser supports speech recognition
if (SpeechRecognition) {
    console.log("Your browser supports speech recognition");

    //placing the button inside the searchForm at the end 
    searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>')
    //button
    const micBtn = searchForm.querySelector("button");
    //icon
    const micIcon = micBtn.querySelector("i");
    // recognition is the method for speechRecognition 
    const recognition = new SpeechRecognition();
    //SpeechRecognition.continuous Controls whether continuous results are returned for each recognition, or only a single result. Defaults to single (false.)
    recognition.continuous = true;

    micBtn.addEventListener("click", micBtnClick)
    function micBtnClick() {
        //start speech recognition
        if (micIcon.classList.contains("fa-microphone")) {
            recognition.start();
        }
        //stop speech recognition
        else {
            recognition.stop();
        }
    }
    //Listen to these events using addEventListener() or by assigning an event listener to the oneventname property of this interface.

    recognition.addEventListener("start", startSpeechRecognition);
    //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition. Also available via the onstart property.
    function startSpeechRecognition() {
        micIcon.classList.remove("fa-microphone");
        micIcon.classList.add("fa-microphone-slash");
        searchFormInput.focus();
        console.log("Speech Recognition Active");
    }

    recognition.addEventListener("end", endSpeechRecognition);
    //Fired when the speech recognition service has disconnected.Also available via the onend property.
    function endSpeechRecognition() {
        micIcon.classList.remove("fa-microphone-slash")
        micIcon.classList.add("fa-microphone");
        searchFormInput.focus();
        console.log("Speech Recognition disconnected ");
    }

    recognition.addEventListener("result", resultOfSpeechRecognition);
    //Fired when the speech recognition service returns a result — a word or phrase has been positively recognized and this has been communicated back to the app. Also available via the onresult property.
    function resultOfSpeechRecognition(event) {
        //index of the currentResult
        const currentResultIndex = event.resultIndex;
        //shows transcript of what we say 
        const transcript = event.results[currentResultIndex][0].transcript;
        searchFormInput.value = transcript;

        // if we get the command to stop recording we want the speech recognition to stop recording
        if (transcript.toLowerCase().trim() === "stop recording") {
            recognition.stop();
        }
        // if input value is not currently empty then we want to set its input value to transcript
        else if (!searchFormInput.value) {
            searchFormInput.value = transcript;
        }
        //if we get the command go then we want the search form to be submitted
        else {
            if (transcript.toLowerCase().trim() === "go") {
                searchForm.submit();
            }
            //if we get the command reset input we want to set the input value to an empty string
            else if (transcript.toLowerCase().trim() === "reset input") {
                searchFormInput.value = "";
            }
            //else we want to replace the input value with the current transcript
            else {
                searchFormInput.value = transcript;
            }
        }

    }

} else {
    console.log("Your browser doesn't support speech recognition")

}


//Notes
//SpeechRecognition.interimResultsControls whether interim results should be returned (true) or not (false.) Interim results are results that are not yet final (e.g. the SpeechRecognitionResult.isFinal property is false.)

//SpeechRecognition.maxAlternatives Sets the maximum number of SpeechRecognitionAlternatives provided per result. The default value is 1.

//SpeechRecognition.langReturns and sets the language of the current SpeechRecognition. If not specified, this defaults to the HTML lang attribute value, or the user agent's language setting if that isn't set either. Other words you can set the language


 //submit the result automatically with a set timer for 750 milliseconds delay
        // setTimeout(() => {
        //     searchForm.submit();
        // }, 750)
