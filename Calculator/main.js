var infix = [];
var postfix = [];
var postfixStack = [];
var finalResult;

function pushEle(val) {
  if (isNaN(val)) 
  {
    if(val == '.')
    {
      infix.push(parseFloat(infix.pop()+0.00000001));
      // console.log(parseFloat(infix.pop()%1).toFixed(6));
    }
    else
    {
      var tempOp = infix.pop();
      if(isNaN(tempOp))
        infix.push(val);
      else{
        infix.push(tempOp);
        infix.push(val);
      }      
    }
  }
  else {
    if (infix.length === 0) 
    {
      if(val == 15)
      {
        infix.push(0);
      }
      else
      {
        infix.push(val);
      }  
    } 
    else 
    {
      var last = infix.pop();
      if (isNaN(last)) 
      {
        infix.push(last);
        if(val == 15)
        {
          infix.push(0);
        }
        else
        {
          infix.push(val);
        }
      } 
      else 
      {
        if(val == 15)
        {
          var twoZero = last + "00";
          infix.push(Number(twoZero));
          postfix.pop();
          // val = last * 10 + val;
        }
        else
        {
          infix.push(last * 10 + val);
          postfix.pop();
          val = last * 10 + val;
        }
      }
    }
  }
  postfix = [];
  postfixStack = [];
  for (let i = 0; i < infix.length; i++) {
    convetToPostFix(infix[i]);
  }
  if (postfixStack.length !== 0) {
    while (postfixStack.length !== 0) {
      postfix.push(Object.keys(postfixStack.pop())[0]);
    }
  }
  if(infix[infix.length-1] === '%')
  {
    calculate();
  }
  if(!isNaN(infix[infix.length-1]))
  {
      calculate();
  }
  
  // console.log(postfix);
  // console.log(postfixStack);
  displayInput();
}

function convetToPostFix(ele) {
  const operators = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
    "%": 4,
    "(": 5,
  };
  if (!isNaN(ele)) {
    postfix.push(ele); //[2,]
  } else {
    var precendence = operators[ele];
    if (postfixStack.length === 0) {
      postfixStack.push({ [ele]: precendence });
    } else {
      var lastop = postfixStack.pop();
      var lastopPre = Object.values(lastop)[0];

      if (lastopPre == 5) {
        postfixStack.push(lastop);
        postfixStack.push({ [ele]: precendence });
        return;
      }
      if (ele === ")") {
        postfix.push(Object.keys(lastop)[0]);
        postfixStack.pop();
        return;
      }
      if (lastopPre >= precendence) {
        postfix.push(Object.keys(lastop)[0]);
        postfixStack.push({ [ele]: precendence });
      } else {
        postfixStack.push(lastop);
        postfixStack.push({ [ele]: precendence });
      }
    }
  }
}

function displayInput() {
  if(infix.length === 0)
  {
      document.getElementById('out').innerText = 0;    
  }
    
  const temp = infix.join("");
  document.getElementById("in").innerText = temp;
}
function AllClear() {
  document.getElementById("in").innerText = "";
  document.getElementById("out").innerText = "0";
  infix = [];
  postfix = [];
  postfixStack = [];
  finalResult = 0;
}
function backSpace() { 
  var temp = infix.pop();
  postfix = [];
  postfixStack = [];
  for (let i = 0; i < infix.length; i++) {
    convetToPostFix(infix[i]);
  }
  if (postfixStack.length !== 0) {
    while (postfixStack.length !== 0) {
      postfix.push(Object.keys(postfixStack.pop())[0]);
    }
  }
  if(!isNaN(infix[infix.length-1])){
    calculate();
  } 
  if(temp>9 && !isNaN(temp))
  {
    infix.push(Math.floor(temp/10));
    postfix = [];
    postfixStack = [];
    for (let i = 0; i < infix.length; i++) {
      convetToPostFix(infix[i]);
    }
    if (postfixStack.length !== 0) {
      while (postfixStack.length !== 0) {
        postfix.push(Object.keys(postfixStack.pop())[0]);
      }
    }
    calculate();
  }
  displayInput();
  // console.log(postfix);
  // console.log(postfixStack);
}

function calculate() {
  var result;
  for (let i = 0; i < postfix.length; i++) 
    {
        var op = postfix[i];
        if (isNaN(op)) {
          switch (op) {
            case "+":
              var val1 = Number(postfix[i - 2]);
              var val2 = Number(postfix[i - 1]);
              result = val1 + val2;
              postfix.splice(i - 2, 3, result);
              i = i - 2;
              break;
    
            case "-":
              var val1 = Number(postfix[i - 2]);
              var val2 = Number(postfix[i - 1]);
              result = val1 - val2;
              postfix.splice(i - 2, 3, result);
              i = i - 2;
              break;
    
            case "*":
              var val1 = Number(postfix[i - 2]);
              var val2 = Number(postfix[i - 1]);
              result = val1 * val2;
              postfix.splice(i - 2, 3, result);
              i = i - 2;
              break;
    
            case "/":
              var val1 = Number(postfix[i - 2]);
              var val2 = Number(postfix[i - 1]);
              result = val1 / val2;
              postfix.splice(i - 2, 3, result);
              i = i - 2;
              break;

            case "%":
              finalResult = Number(finalResult) / 100;
              finalResult = finalResult*10;
              displayOutput();
              infix = [];
              infix.push(finalResult);
              return;
              break;

            default:
                //
          }
        }
    }
  if (postfix.length !== 0) {
    finalResult = postfix[0];
    displayOutput();
  } 
}

function displayOutput()
{
    if(!Number.isInteger(finalResult))
    {
        var length;
        const converted = finalResult.toString();
        if (converted.includes('.')) {
            length = converted.split('.')[1].length;
        };
        if(length>6){
            finalResult = finalResult.toFixed(6);
        }                     
    }
    document.getElementById('out').innerText ="= "+ Number(finalResult);
}
function finalAnswer(){
  infix = [];
  postfix = [];
  postfixStack = [];
  document.getElementById('in').innerText ="";
  displayOutput();
}

function squareRoot()
{
  var root = Math.sqrt(finalResult);
  finalResult = root;
  infix = [];
  postfix = []; 
  postfixStack = [];
  document.getElementById('in').innerText ="";
  displayOutput();
}