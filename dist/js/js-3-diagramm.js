let grafDiv = document.getElementsByClassName('block-graf');

let isVisible = true; // Видимый ли элемент с диаграммой?

if(isVisible == false) {
    grafDiv[0].style.display = "none"; 
} else {
    grafDiv[0].style.display = "block";
}

function GetTable() {
    // Получаем ссылку на таблицу
    let table = document.getElementById("my-table");

    // Получаем список заголовков столбцов
    const headers = [];
    for (let i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].textContent;
    }

    //console.log(headers);

    // Проходим по каждой строке таблицы и сохраняем ее содержимое в массив словарей
    let data = [];

    for (let i = 1; i < table.rows.length; i++) {
      const tableRow = table.rows[i];
      const rowData = {};

      // Проходим по каждой ячейке в строке и сохраняем ее содержимое в соответствующий заголовок столбца
      for (let j = 0; j < tableRow.cells.length; j++) {
        rowData[headers[j]] = tableRow.cells[j].textContent;
      }

      data.push(rowData);
    }

    return data;
}

function CreateOutpMassForDate(Date, int_mode_y, int_mode_x) {
    // Date - Входной массив, с таблицей
    // int_mode_y и int_mode_x - число-ключ в массиве Date

    let str_mode;
    let str_mode_date;

    if(int_mode_y == 0) str_mode = "Жанр";
    else if (int_mode_y == 1) str_mode = "Год выхода";

    if(int_mode_x == 0) str_mode_date = "Количество частей";
    else if (int_mode_x == 1 || int_mode_x == 2) str_mode_date = "Рейтинг на кинопоиске";

    let outMassForDate_x = {};

    for(let i = 0; i < Date.length; i++) {
        if(outMassForDate_x[Date[i][str_mode]] == null) {
            //console.log('Для данного года ' + Date[i][str_mode] + ' ещё нет ключа');
            outMassForDate_x[Date[i][str_mode]] = Date[i][str_mode_date];
        } else {
            if(int_mode_x == 0) {
                if (outMassForDate_x[Date[i][str_mode]] < Date[i][str_mode_date]) {
                    outMassForDate_x[Date[i][str_mode]] = Date[i][str_mode_date];
                    //console.log('Обнаружено кол-во частей, больше записанного. outMassForDate_x[Date[i][str_mode]] = ' + outMassForDate_x[Date[i][str_mode]]);
                }
            }else if(int_mode_x == 1) {
                if (outMassForDate_x[Date[i][str_mode]] < Date[i][str_mode_date]) {
                    outMassForDate_x[Date[i][str_mode]] = Date[i][str_mode_date];
                    //console.log('Обнаружен рейтинг, больше записанного. outMassForDate_x[Date[i][str_mode]] = ' + outMassForDate_x[Date[i][str_mode]]);
                }
            } else if (int_mode_x == 2) {
                if (outMassForDate_x[Date[i][str_mode]] > Date[i][str_mode_date]) {
                    outMassForDate_x[Date[i][str_mode]] = Date[i][str_mode_date];
                    //console.log('Обнаружен рейтинг, меньше записанного. outMassForDate_x[Date[i][str_mode]] = ' + outMassForDate_x[Date[i][str_mode]]);
                }
            }
        }
    } 

    console.log(outMassForDate_x);
    return outMassForDate_x;
}

let inp_x_Ax = 0;

let newDate = CreateOutpMassForDate(data, 1, inp_x_Ax);

let data_x = [2011, 2012, 2016, 2020, 2021, 2023];
let data_y = [15, 10, 11, 16, 1, 20];

data_x = Object.keys(newDate);
data_y = Object.values(newDate);

/*
console.log('parseFloat(data_x[0]) = ' + parseFloat(data_x[0]));
if(parseFloat(data_x[0]) === NaN) {
    let y = data_x.length;
    data_x = [];
    for(let i = 0; i<y; i++) {
        data_x.push(i);
    }
    console.log('data_x = ' + data_x);
}

let map_y = {
    "Мультсериал" : 5,
    "Аниме" : 2,
    "Короткометражка" : 1,
    "Мультфильм" : 4
};
*/

let strLett;

if(inp_x_Ax == 0) strLett = "Кол-во частей";
else if(inp_x_Ax == 1) strLett = "Max рейтинг";
else if(inp_x_Ax == 2) strLett = "Min рейтинг";

//DrawLinearGrafic_02(data_x, data_y, strLett, "Год выхода");

function GetMinMaxVal(mass) {
    for(let i = 0; i<mass.length; i++) {
        mass[i] = parseFloat(mass[i]);
    }

    let min = d3.min(mass); 
    let max = d3.max(mass); 
    let gerr = max-min;

    let outMin = min - gerr*0.1;
    let outMax = max + gerr*0.1;

    let outMass = [outMin, outMax];
    console.log('sizeMass = ' + outMass);
    return outMass;
}

function DrawLinearGrafic_02(data_x, data_y, strX, strY) {
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
    //var xAxis;
    //xAxis.tickFormat(d3.format(".0f")).tickValues(data_x.map(d => Number(d).toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping:false})));  
    xAxis.tickFormat(d3.format(".0f"))
        .tickValues(data_x.filter((d, i) => i % 2 === 0).map(d => Number(d).toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping:false})));

    var yAxis = d3.axisLeft(yScale)
        .tickValues(d3.range(Math.ceil(yScale.domain()[0]), Math.floor(yScale.domain()[1]) + 1, 1))
        .tickFormat(d3.format(".0f"));

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
        .text(strY)
        .attr("class", "x-legend")
        .style("fill", "gray"); // set color to gray

    svg.append("g")
        .attr("transform", "translate(" + 20 + ", "+ 200 + ") rotate(-90)")
        .append("text")
        .text(strX)
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

let inMapEx_01 = {
    "Мультсериал" : 5,
    "Аниме" : 2,
    "Короткометражка" : 1,
    "Мультфильм" : 4
};

DrawGistDiagramm(inMapEx_01);

function DrawGistDiagramm(map) {    
    let width = 500;
    let height = 300;
    let marginX = 50;
    let marginY = 40;

    let svg = d3.select(".curr-graff")
     .append("svg")
     .attr("height", height)
     .attr("width", width)
     //.style("border", "solid thin grey");
     
    let min = 0;
    let max = 6; // изменено на 6, чтобы большинство столбцов не было скрыто за верхней границей
    let xAxisLen = width - 2 * marginX;
    let yAxisLen = height - 2 * marginY;
    let data = Object.entries(map);

    // Функции шкалирования
    let scaleX = d3.scaleBand()
     .domain(data.map(function(d) {
       return d[0];
     }))
     .range([0, xAxisLen])
     .padding(0.45);
     
    let scaleY = d3.scaleLinear()
     .domain([min, max])
     .range([yAxisLen, 0]);
     
    // Создание осей
    let axisX = d3.axisBottom(scaleX);  // Горизонтальная
    let axisY = d3.axisLeft(scaleY)     // Вертикальная
    //var yAxis = d3.axisLeft(yScale)
        .tickValues(d3.range(Math.ceil(scaleY.domain()[0]), Math.floor(scaleY.domain()[1]) + 1, 1))
        .tickFormat(d3.format(".0f"));

    svg.append("g")
     .attr("transform", `translate(${marginX}, ${height - marginY})`)
     .call(axisX)
     .attr("class", "x-axis");
     
    svg.append("g")
     .attr("transform", `translate(${marginX}, ${marginY})`)
     .call(axisY);

    // Цвета столбиков
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    // Создание и отрисовка столбиков гистограммы
    let g = svg.append("g")
    .attr("transform", `translate(${ marginX}, ${ marginY})`)
    .selectAll(".rect")
    .data(data)
    .enter().append("rect")
    .attr("x", function(d) { return scaleX(d[0]); })
    .attr("width", scaleX.bandwidth())
    .attr("y", function(d) { return scaleY(d[1]); })
    .attr("height", function(d) { return yAxisLen - scaleY(d[1]); })
    .attr("fill", function(d) { return color(d[0]); })
    .attr("rx", 3)
    .attr("ry", 3);  
}
