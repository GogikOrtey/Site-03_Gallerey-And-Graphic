let grafDiv = document.getElementsByClassName('block-graf');

let isVisible = true; // Видимый ли элемент с диаграммой?

if(isVisible == false) {
    grafDiv[0].style.display = "none"; 
} else {
    grafDiv[0].style.display = "block";
}

let data_x = [1, 2, 3, 4, 5, 6];
let data_y = [15, 10, 11, 16, 1, 20];

DrawGrafic_02(data_x, data_y);

function GetMinMaxVal(mass) {
  let min = d3.min(mass);
  let max = d3.max(mass);
  let gerr = max-min;

  let outMin = min - gerr*0.1;
  let outMax = max + gerr*0.1;

  let outMass = [outMin, outMax];
  return outMass;
}

function DrawGrafic_02(data_x, data_y) {
    // Проверяем, что входные данные являются числами
    if (!Array.isArray(data_x) || !Array.isArray(data_y) || data_x.length !== data_y.length) {
        console.error("Invalid input data");
        return;
    }
    for (var i = 0; i < data_x.length; i++) {
        if (isNaN(data_x[i]) || isNaN(data_y[i])) {
            console.error("Invalid input data");
            return;
        }
    }
    
    // Создаем элемент SVG
    var svg = d3.select(".curr-graff")
        .append("svg")
        .attr("width", '500px')
        .attr("height", '400px')
        .attr("margin", 'auto');

    // Создаем функции масштабирования для x и y

    let dat_x = GetMinMaxVal(data_x);
    let dat_y = GetMinMaxVal(data_y);

    var xScale = d3.scaleLinear()
      .domain([dat_x[0], dat_x[1]]) //.domain([0, d3.max(data_x)]) // .domain([0, data_x.length - 1])
      .range([50, 450]);
    
    var yScale = d3.scaleLinear()
      .domain([dat_y[0], dat_y[1]]) //.domain([0, d3.max(data_y)])
      .range([250, 50]);

    // Создаем оси x и y
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", "translate(0," + 250 + ")")
        .attr("class", "x-axis")
        .call(xAxis);

    svg.append("g")
        .attr("transform", "translate(" + 50 + ",0)")
        .attr("class", "y-axis")
        .call(yAxis);

    // Добавляем легенды
    svg.append("g")
        .attr("transform", "translate(225," + 290 + ")")
        .append("text")
        .text("Жанр")
        .attr("class", "x-legend")
        .style("fill", "gray"); // set color to gray

    svg.append("g")
        .attr("transform", "translate(" + 20 + ", "+ 200 + ") rotate(-90)")
        .append("text")
        .text("Кол-во частей")
        .attr("class", "y-legend")
        .style("fill", "gray"); // set color to gray

    svg.append("path")
        .datum(data_y)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("stroke-dasharray", "0,0")
        .attr("d", d3.line()
            .x(function(d, i) { return xScale(data_x[i]); })
            .y(function(d) { return yScale(d); })
            .curve(d3.curveCardinal.tension(0.1)) // Задаю степень кривизны линии
        );
}