//Hide English Sentences (WaniKani)
//Brady Young
//liqmix.github.io
//October 18th, 2019


//Sets the display of the english sentence to none
function hideEnglish(context_element){
    if(context_element.childNodes.length == 2){
      eng_sentence = context_element.childNodes[1];
    }
    else
      eng_sentence = context_element.childNodes[3];
    eng_sentence.setAttribute("style", "display: none");
}


//Adds button to control visibility of the english translation
function addButton(context_element){
    var button = document.createElement("button");
    context_element.appendChild(button);
    button.innerHTML = "英語";
    button.addEventListener("click", 
                            function() {
                              toggleHide(this.parentNode);
                            })
}


//Toggles the visibility of the english translation,
//called by the button
function toggleHide(context_element){
  if(context_element.childNodes.length == 3){
    english = context_element.childNodes[1];
  }
  else
    english = context_element.childNodes[3];

  if(english.style.display == "none"){
      english.style.display = "block";
  }
  else
    english.style.display = "none";
}


//Check to see if the english sentences exist on the page
function checkSentences() { 
  var sentences = document.getElementsByClassName("context-sentence-group");
  if(!sentences || sentences.length == 0) {
    return false;
  }
  return sentences;
}


//Applies the extension to the page
function main(){
  var sentence;
  var sentences = checkSentences();
  if(sentences){
    for (sentence of sentences){
      hideEnglish(sentence);
      addButton(sentence);
    }
  }
}


//Handle lesson and review pages by watching for changes to the character field.
var character = document.getElementById('character');
if(character){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
  var observer = new MutationObserver(main);
  var config = { characterData: false, attributes: false, childList: true, subtree: false };
  observer.observe(character, config);
}


//Otherwise handle vocabulary pages which are static
else main();

