
function changeThemeState() {
          const BUTTON = document.querySelector('.switch__circle');
          theme_state++;
          switch (theme_state) {
              case 1:
              BUTTON.className = "switch__circle switch__circle--center";
              document.body.className  = "light"
              break;
              case 2:
              BUTTON.className = "switch__circle switch__circle--right";
              document.body.className  = "dark"
        
              break;
              case 3:
                theme_state = 0;
                BUTTON.className = "switch__circle switch__circle--left";
              document.body.className  = "blue"
        
            default:
              break;
          }
        }
        
function changeState() {

                const VALUE = this.textContent;

                if (validity(SCREEN_VALUE+VALUE))  {
                        if (prevSCREEN_VALUE && !OPERATOR) {
                                prevSCREEN_VALUE = "";
                        }
                        SCREEN_VALUE+=VALUE;
                        printScreen(SCREEN_VALUE);
                        return;
                } 
                else if ("+-x/=".includes(VALUE)) {
                        if (VALUE=="=" && !OPERATOR) {
                                return;
                        }
                        if (OPERATOR && prevSCREEN_VALUE && SCREEN_VALUE) {
                                resolve();
                                printScreen(RESULT);
                                prevSCREEN_VALUE = RESULT;
                                RESULT = "";
                                SCREEN_VALUE = "";
                                if (VALUE=="=") {
                                        OPERATOR = "";
                                }
                                return;
                        } 
                        else if (prevSCREEN_VALUE) {
                                OPERATOR = VALUE;
                                printScreen("");
                                return;
                        }
                        if (VALUE!="=") {
                                OPERATOR = VALUE;
                        }
                        printScreen("");
                        prevSCREEN_VALUE = SCREEN_VALUE;
                        SCREEN_VALUE = "";
                } 
                else {
                          switch (VALUE) {
                            case "DEL":
                                if (prevSCREEN_VALUE) {
                                        prevSCREEN_VALUE = "";
                                }
                                SCREEN_VALUE = SCREEN_VALUE.slice(0,-1);
                                printScreen(SCREEN_VALUE);
                                break;
                            case  "RESET":
                                SCREEN_VALUE = "";
                                prevSCREEN_VALUE = ""
                                OPERATOR = "";
                                printScreen("");
                                RESULT = "";
                            default:
                              break;
                          }
                        }
}

function printScreen(VALUE) {
        SCREEN.textContent = "";

        let COMA = "";
        let includeCOMA = false;
        VALUE = VALUE.replace(/,/g,"");
        if (VALUE.includes('.')) {
                includeCOMA = true;
                COMA = VALUE.split('.')[1];
                VALUE = VALUE.split('.')[0];
        }
        if (VALUE.length>3) {
                VALUE = VALUE.replace(',','');
                VALUE = VALUE.split("").reverse().join("").replace(/(\d{3})(?=\d)/g,"$1,").split("").reverse().join("");
        }
        if (includeCOMA) {
                VALUE = VALUE.concat('.'+COMA);
        }
        if (VALUE.length>12 && includeCOMA) {
                        VALUE = `${VALUE.split('.')[0]}.${VALUE.split('.')[1].slice(0,5)}+`;
        } else if (VALUE.length>16) {
                SCREEN.textContent = "Muchos numeros😨"
                return;
        }
        setTimeout(()=>SCREEN.textContent = VALUE, 50)
}

function resolve() {
      switch (OPERATOR) {
        case "+":
        RESULT = String(parseFloat(prevSCREEN_VALUE) +parseFloat(SCREEN_VALUE));
          break;
          case "-":
        RESULT = String(parseFloat(prevSCREEN_VALUE) -parseFloat(SCREEN_VALUE));
          break;
          case "x":
          RESULT = String(parseFloat(prevSCREEN_VALUE) *parseFloat(SCREEN_VALUE));
          break;
          case "/":
          RESULT = String(parseFloat(prevSCREEN_VALUE) /parseFloat(SCREEN_VALUE));
          break;
        default:
          break;
      }

}
       
function validity(VALUE) {
        if (!isNaN(VALUE)) return true;
}

function keyState(e) {
        let key = e.key=="Enter" ? "=" : e.key == "*" ? "x" : e.key;
        if(!isNaN(key) || "x-+/.=".includes(key)) {
                changeState.call({textContent:key})
        }
}

const SCREEN = document.querySelector('.screen');
const KEYS = document.querySelectorAll('.keys__key');
const SWITCH = document.querySelector('.switch');

let theme_state = 0;
let SCREEN_VALUE = "";
let prevSCREEN_VALUE= "";
let OPERATOR = "";
let RESULT = "";

SWITCH.addEventListener('click', changeThemeState);
KEYS.forEach( key => key.addEventListener('click', changeState));
window.addEventListener('keydown', keyState)


SCREEN.textContent = "";