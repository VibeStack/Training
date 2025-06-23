const intro = document.querySelector('.intro');

document.querySelector('#date').addEventListener('change',(e)=>{
    fetch('./data.json')
    .then((res)=>res.json())
    .then((data)=>{
        data.forEach((data)=>{ 
            if(e.target.value == data.id){
                document.querySelector('.intro h2').innerText = data.begining.title; 
                document.querySelectorAll('.intro p').forEach((eachPara,idx)=>{
                    eachPara.innerText = data.begining[`p${idx+1}`]
                })
            }
            console.log(data);
        })
    })
})