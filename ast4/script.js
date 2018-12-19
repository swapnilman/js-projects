var containerEl = document.getElementById('container');
var scoreEl = document.getElementById('score');
var messageEl = document.getElementById('message');
var buttonEl = document.getElementById('button')

var wordsArray = ["about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also", "although", "always", "am", "among", "amongst", "amoungst", "amount", "an", "and", "another", "any", "anyhow", "anyone", "anything", "anyway", "anywhere", "are", "around", "as", "at", "back", "be", "became", "because", "become", "becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom", "but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven", "else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own", "part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];


class Word {
  constructor() {
    this.xPos;
    this.yPos;
    this.word = wordsArray[Math.floor(Math.random() * (wordsArray.length))];
    this.el = document.createElement('div')
    this.children = [];
    this.chars = [];
    this.isUpdated = false;
    for (let i = 0; i < this.word.length; i++) {
      this.chars.push(this.word[i]);
      let child = document.createElement('span');
      child.innerHTML = this.word[i];
      this.children.push(child);
      this.el.appendChild(child);
    }
  }

  //adds word to the container
  draw() {
    this.xPos = Math.floor(Math.random() * 900 + 200);
    this.yPos = -5;
    this.el.style.position = 'absolute';
    this.el.style.left = this.xPos + 'px';
    this.el.style.top = this.yPos + 'px';

    container.appendChild(this.el);
  }

  fall() {
    this.yPos++;
    this.el.style.top = this.yPos + 'px';
    if(this.yPos + 17 > containerEl.offsetHeight) {
      gameOver();
    }
  }

  //checks if new character input matches the word and highlights the matching spans
  checkChar(inputChars) {
    let len = inputChars.length;
    if(this.chars.slice(0, len).join('') === inputChars.join('')) {
      for(let i = 0; i < len; i++) {
        this.children[i].classList.add('highlight');
      }
      this.isUpdated = true;
    } else if (this.isUpdated) {
      for(let i = 0; i < this.chars.length; i++) {
        this.children[i].classList.remove('highlight')
      }
    }
  }

  //checks if the input matches the whole word and removes the word when matches
  checkMatch(inputChars) {
    if(this.chars.join('') === inputChars.join('')) {
      containerEl.removeChild(this.el);
      return true;
    }
  }
}


class Game {
  constructor() {
    this.inPlayWords = [];
    this.inputChars = [];
    this.interval;
    this.score;
    this.speed;
  }

  init() {
    this.inPlayWords = [];
    this.inputChars = [];
    this.score = 0;
    this.speed = 1000/30;
    scoreEl.innerHTML = this.score;
    this.gameLoop();
  }

  gameLoop() {
    let count = 0;
    document.addEventListener('keydown', this.pressEvent);
    let that = this
    this.interval = setInterval(function(){
      if (count % 50 === 0 || that.inPlayWords.length == 0) {
        let word = new Word();
        that.inPlayWords.push(word)
        word.draw()
      }
      count++;
      for(let i = 0; i < that.inPlayWords.length; i++) {
        that.inPlayWords[i].fall(that);
      }
    }, this.speed)
  }

  pressEvent(e) {
    let key = e.keyCode;
    // console.log(this)
    if (key >= 65 && key <= 90) {
      //for Alphabets
      this.inputChars.push(e.key); //pushes new character into the inputChars array
      for(let i = 0; i < this.inPlayWords.length; i++) {
        this.inPlayWords[i].checkChar(this.inputChars); //checks match with each word
      }
    } else if (key === 8) {
      //for Backspace
      this.inputChars.pop();
      for(let i = 0; i < this.inPlayWords.length; i++) {
        this.inPlayWords[i].checkChar(this.inputChars);
      }
    } else if (key === 13) {
      //for Enter
      for(let i = 0; i < this.inPlayWords.length; i++) {
        if(this.inPlayWords[i].isUpdated) {
          if(this.inPlayWords[i].checkMatch(this.inputChars)) {
            this.inPlayWords.splice(i, 1); //removes word from array if match found
            this.score++; //increment score
            scoreEl.innerHTML = this.score;
          } else {
            this.inPlayWords[i].checkChar([]);
          }
        }
      }
      this.inputChars = []; //emptys inputChars array when enter is pressed
    }
  }
}


var game = new Game();

buttonEl.addEventListener('click', function() {
  for (let i = 0; i < game.inPlayWords.length; i++) {
    containerEl.removeChild(game.inPlayWords[i].el);
  }
  messageEl.removeChild(messageEl.lastChild)
  messageEl.style.visibility = 'hidden';
  game.init()
})

function gameOver() {
  clearInterval(game.interval);
  messageEl.childNodes[1].innerHTML = "Game Over!!!"
  buttonEl.innerHTML = 'Play Again'
  let scoreMsg = document.createElement('p');
  scoreMsg.innerHTML = 'Score :';
  let gameScore = document.createElement('span');
  gameScore.innerHTML = game.score;
  scoreMsg.appendChild(gameScore);
  messageEl.appendChild(scoreMsg)
  messageEl.style.visibility = 'visible'
}