
const bill = document.querySelector('.bill')
const kwh = document.querySelector('.kwh')
 const commercial = document.querySelector('.comm')
  const residential = document.querySelector('.res')
const getDefault =(commercial) => {  
    let defaults 
    if(commercial.checked){
      defaults = .12
    }else{
      defaults = .25
    }
    return defaults
}


const savings = (month, year) => {
    let monthly_bill = month
    let cost_kwh
    kwh.value ? cost_kwh = year : 
    cost_kwh = getDefault(commercial) 
     
    let annual_production = (12 * monthly_bill)/ cost_kwh
    let system_size = (annual_production/ 1.46) /1000
    const interest = .07
    const formula = interest/12 * (1 + interest/12) **
     120/((1+ interest/12) ** 120 - 1)
    let costAfterIncentive = system_size * 2000 * .6
    let monthly_finance = costAfterIncentive * formula
    let first_month_saving = monthly_bill - monthly_finance
    let first_year_saving = first_month_saving * 12
    
    document.querySelector('.savings-month').innerText = '$'+Math.round(first_month_saving)
    document.querySelector('.savings-year').innerText = '$'+Math.round(first_year_saving)
    document.querySelector('.system-size').innerText = Math.round(system_size)+' KW'
    document.querySelector('.annual').innerText = Math.round(annual_production)+' KWh'
    chart1(Number(bill.value), Number(kwh.value))
   chart2(Number(bill.value), Number(kwh.value))
  
}



  const chart1 = (month, kwho)=>{
    const percent = [.068, .076, .103, .107, .107, .109, 
   .123, .107, .098, .079, .063, .052]
    
    let monthly_bill = month
    let cost_kwh
    kwh.value ? cost_kwh =  kwho: 
    cost_kwh = getDefault(commercial) 
      
    let annual_production = (12 * monthly_bill)/ cost_kwh
    for (let i =0; i< 12;i++){
      myChart.data.datasets[0].data.push(annual_production * percent[i])  
   }   
    myChart.update()

  }  


const chart2 = (month, kwho) =>{
    let monthly_bill = month
    let year_bill = monthly_bill * 12 
    let cost_kwh  
    kwh.value ? cost_kwh =  kwho: 
    cost_kwh = getDefault(commercial) 
    let annual_production = (12 * monthly_bill)/ cost_kwh
    let system_size = (annual_production/ 1.46) /1000
    const interest = .07
    const formula = interest/12 * (1 + interest/12) **
     120/((1+ interest/12) ** 120 - 1)
    let costAfterIncentive = system_size * 2000 * .6
    let monthly_finance = costAfterIncentive * formula

    for (let i =0; i<20; i++){
      if (i < 10){
       myChart2.data.datasets[0].data.push(monthly_finance * 12)
      }else{
        myChart2.data.datasets[0].data.push(0)
      }
    }

     for (let i =0; i<20; i++){
        if(i > 0 ){
          myChart2.data.datasets[1].data.push(myChart2.data.datasets[1].data[i-1] + (myChart2.data.datasets[1].data[i-1] * .025))
       
       }else{
          myChart2.data.datasets[1].data.push(year_bill)
     }
    }
            myChart2.update()
          for (let i = 0; i < 20; i++){
             if(i == 0) {
                 myChart3.data.datasets[0].data.push(myChart2.data.datasets[1].data[i] - myChart2.data.datasets[0].data[i])
             } else if(i > 0 && i < 10){
                 myChart3.data.datasets[0].data.push(myChart2.data.datasets[1].data[i] - myChart2.data.datasets[0].data[i] +  myChart3.data.datasets[0].data[i-1])
             }else{
                myChart3.data.datasets[0].data.push(myChart2.data.datasets[1].data[i] + myChart3.data.datasets[0].data[i-1])
             }
          } 
          myChart3.update()
  }  

  

const getSavings = () =>{
  if(!bill.value || isNaN(bill.value) || (isNaN(kwh.value) && kwh.value)||
        bill.value <= 0 || (kwh.value && kwh.value<=0) ){
        alert('enter correct information')
      }else{
 savings(Number(bill.value), Number(kwh.value))
  }
}

const reset = () =>{
    location.reload()
}


const ctx = document.getElementById('chart').getContext('2d');
  
  
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'] ,

      
      datasets: [{
        label: 'solar',
        data: [],
        borderWidth: 1,
        backgroundColor: 'orange'
      }]

    },

    options: {
      scales: {
         y: {
          beginAtZero: true,
          title:{
            display : true,
            text: 'KWH  THOUSANDS'
          }
        }
       
        
      }
    }
  });



  
const ctx2 = document.getElementById('chart2').getContext('2d');
    
    let xlabels2 = []
     
  for (let i =0; i< 20;i++){
    xlabels2.push(`year ${i+1}`)
  }

  
  const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels:xlabels2,
      
      datasets: [{
        label: 'Monthly cost with solar financing',
        data: [],
        borderWidth: 1,
        backgroundColor: 'orange'
      },
      {
        label: 'Grid cost no solar',
        data: [],
        borderWidth: 1,
        backgroundColor: 'blue'
      } ]

    },

    options: {
      scales: {
        y: {
          beginAtZero: true,
           title:{
            display : true,
            text: 'GRID  COST  NO  SOLAR'
          }
        }
      }
    }
  });
   

const remove = ()=>{
   document.getElementById("chart").remove()
}
   

   const ctx3 = document.getElementById('chart3').getContext('2d');

    let xlabels3 = []
     
  for (let i =0; i< 20;i++){
    xlabels3.push(`year ${i+1}`)
  }

  const myChart3 = new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: xlabels3,

      
      datasets: [{
        label: 'solar',
        data: [],
        borderWidth: 1,
        backgroundColor: 'orange'
      }]
        

    },

    options: {
      scales: {
        y: {
          beginAtZero: true,
          title:{
            display : true,
            text: 'CUMULATIVE  SAVINGS'
          }
        }
      }
    }
  });