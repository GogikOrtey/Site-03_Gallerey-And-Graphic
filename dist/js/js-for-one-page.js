let elem = document.getElementsByClassName("h0");
elem[0].style.display = 'none';
//document.write(elem[0].nodeName + ' 123');

// Получить элемент с id "my-element"
let element = document.getElementById("123");
//let element = elem_2.getElementsByName //("p");; //elem_2. firstElementChild

// Задать начальный цвет текста
let colorIndex = 180;
let b = 0;

let min = 180;
let max = 220;

// Использовать setInterval() для изменения цвета текста каждые 500 миллисекунд
setInterval(function() {
  // Установить цвет текста элемента
  element.style.color = `rgb(${colorIndex}, ${colorIndex}, ${colorIndex})`;

  // Увеличить или уменьшить индекс цвета, чтобы изменить его от 
  // светлого до темного и обратно

  if((colorIndex < max) && (b == 0)) {
    colorIndex += 3;
  } else if (colorIndex >= max) {
    b = 1;
  }

  if((colorIndex > min) && (b == 1)) {
    colorIndex -= 3;
  } else if (colorIndex <= min) {
    b = 0;
  }

  /*
  if (colorIndex == 0) {
    colorIndex = 255;
  } else {
    colorIndex = 0;
  }
  */

  //console.log(element.nodeName);
  //console.log('colorIndex = ' + colorIndex);
}, 50);