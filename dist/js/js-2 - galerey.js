$(document).ready(function() {
  $("#gallery").lightGallery();
});

/*
// Переменная с ссылками на все изображения 
var images = [
  { src: '/img/1.jpg', thumb: '/img/1.jpg', subHtml: ' ' },
  { src: '/img/2.jpg', thumb: '/img/2.jpg',subHtml: ' ' },
  // ... добавим все изображения
  { src: '/img/22.jpg', thumb: '/img/22.jpg',subHtml: ' ' }
];
*/

// Создаем пустой массив, который будет заполняться ссылками на изображения
var images = [];

// Проходим циклом по всем изображениям от 1 до 22 и формируем ссылки
for (var i = 1; i <= 22; i++) {
  var src = '/img/' + i + '.jpg';
  images.push({ src: src, thumb: src, subHtml: ' ' });
}

// Добавляем в него все изображения 
images.forEach(function(image) {
  var link = document.createElement('a');
  link.href = image.src;
  link.setAttribute('data-sub-html', image.subHtml);

  var img = document.createElement('img');
  img.src = image.thumb;
  link.appendChild(img);

  document.querySelector('#gallery').appendChild(link);
});
