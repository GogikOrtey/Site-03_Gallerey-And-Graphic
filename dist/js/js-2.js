/*
let elem = document.getElementsByClassName("img-class");
//let children = elem[0].childNodes;
let children = document.getElementsByTagName("img");

console.log('children[0].nodeName = ' + children[0].nodeName);


// Перебираем все элементы в массиве elem
for (let i = 0; i < children.length; i++) {
  // Добавляем обработчик событий к каждому элементу

  children[i].onmousedown = function() {
    // Вызываем функцию при нажатии на элемент

    //console.log('this.offsetWidth = ' + this.offsetWidth);

    let width = parseInt(this.offsetWidth);
    let height = parseInt(this.offsetHeight);
    this.style.width = (width * 0.9) + "px";
    this.style.height = (height * 0.9) + "px";
  };

  children[i].onmouseup = function() {
    // Вызываем функцию при нажатии на элемент

    //console.log('this.offsetWidth = ' + this.offsetWidth);

    let width = parseInt(this.offsetWidth);
    let height = parseInt(this.offsetHeight);
    this.style.width = (width / 0.9) + "px";
    this.style.height = (height / 0.9) + "px";
  };
}
*/