const sodData = document.querySelectorAll('.sod p');
const eodData = document.querySelectorAll('.eod p');
const dateArray = document.querySelectorAll('.date');

const data = fetch('./data.json')
    .then(res => res.json())
    .then((data)=>{
        dateArray[0].innerText = data.date;
        sodData[0].innerText = data.sod;
        eodData[0].innerText = data.eod;
    })
