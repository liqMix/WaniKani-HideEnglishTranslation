//Hide English Sentences (WaniKani)
//Brady Young
//liq.mx
//March 22nd, 2021

window.onload = ()=>{!checkSentences() ? setTimeout(main, 1500) : main()};


//Sets the display of the english sentence to none
function hideEnglish(context_element){
    if(context_element.childNodes.length === 2){
      eng_sentence = context_element.childNodes[1];
    }
    else
      eng_sentence = context_element.childNodes[3];
    eng_sentence.setAttribute("style", "display: none");
}


//Adds button to control visibility of the english translation
function addButton(context_element){
    let button = document.createElement("button");
    button.innerHTML = "英語";
    button.style.marginTop = "5px";
    button.addEventListener("click", function(){toggleHide(this.parentNode);})
    context_element.appendChild(button);
}


//Toggles the visibility of the english translation,
//called by the button
function toggleHide(context_element){
  if(context_element.childNodes.length == 3){
    english = context_element.childNodes[1];
  }
  else
    english = context_element.childNodes[3];

  if(english.style.display === "none"){
      english.style.display = "block";
  }
  else
    english.style.display = "none";
}


//Check to see if the english sentences exist on the page
function checkSentences() { 
  console.log("Running!");
  let sentences = document.getElementsByClassName("context-sentence-group");
  if(sentences && sentences.length > 0) {
    return sentences;
  }
}
function main(){
  apply();
  let character = document.getElementById('character');
  console.log(character);
  if(character){
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    let observer = new MutationObserver(apply);
    let config = {characterData: true, subtree: true};
    observer.observe(character, config);
    window.onunload = ()=>{console.log("unload"); if(observer) observer.disconnect()}
  }
}

//Applies the extension to the page
function apply(){
  let sentences = checkSentences();
  if(sentences){
    for (sentence of sentences){
      hideEnglish(sentence);
      addButton(sentence);
    }
  }
}