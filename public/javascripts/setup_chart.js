function setupChart(scaleDataArr=[]) {
  let ctx = document.getElementById("scaleChart");
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
              labels: [...Array(scaleDataArr.length).keys()],
              datasets: [{
                label: 'Weight (AU)',
                data: scaleDataArr,
                backgroundColor: 'cornflowerblue',
                cubicInterpolationMode: 'monotone'
              }]
          },
    options: {
                animation: {
                  duration: 0
                }
             }
  });
}

function getChartData() {
  $.ajax({
      url: 'http://localhost:3000/scale/scale_info',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        // console.log(JSON.parse(data).scaleData);
        scaleD = JSON.parse(data).scaleData;
        setupChart(scaleD.slice(scaleD.length-50));
      }

  });
}
