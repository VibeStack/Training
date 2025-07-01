const inputDate = document.querySelector('#date')
const containerFrame = document.querySelector('.containerFrame')
let container = document.querySelector('.container')
const begining = document.querySelector('.begining')

const todaysDate = new Date()
const day = String(todaysDate.getDate()).padStart(2, '0');
const month = String(todaysDate.getMonth() + 1).padStart(2, '0');
const year = todaysDate.getFullYear();

const formattedDate = `${year}-${month}-${day}`;
const startDate = '2025-06-23';

function createTags(element,attributes,innerElement,parent){
    const elementTag = document.createElement(`${element}`);
    for (const key in attributes) {
        elementTag.setAttribute(key, attributes[key]);
    }
    elementTag.innerText = innerElement;
    parent.append(elementTag);
    return elementTag;
}

let requiredDayData;
inputDate.value = startDate;

async function getData(url,selectedDate) {
    try{
        const response = await fetch(url);
        const allData = await response.json();
        const singleRequiredValues = allData.filter((eachDate)=>{
            return eachDate.id == selectedDate
        })
        requiredDayData = singleRequiredValues[0];
        for(let key in requiredDayData){
            if(key === 'id'){
                continue;
            }
            else{
                const sectionTags = createTags('section',{class:`${key}`},"",container);
                for(const element in requiredDayData[key]){
                    const noOfElements = Object.values(requiredDayData[key][element]).length;
                    for(let i=0;i<noOfElements;i++){
                        if(element === 'ol'){
                            const noOfLiInOlTags = Object.values(requiredDayData[key][element]).length;
                            const olElement = createTags(`${element}`,{},"",sectionTags)
                            for(let i=0;i<noOfLiInOlTags;i++){
                                createTags('li',{},`${requiredDayData[key][element][i]}`,olElement);
                            }
                            break;
                        }
                        if(element === 'a'){
                            for(const aTagKeys in requiredDayData[key][element]){
                                createTags(`${element}`,{href:`${requiredDayData[key][element][aTagKeys]}`},`${aTagKeys}`,sectionTags)
                            }
                            break;
                        }
                        createTags(`${element}`,{},`${requiredDayData[key][element][i]}`,sectionTags)
                    }
                }
            }
        }
    } 
    catch(error){
        console.error('Fetch error:', error);
    }
}
getData('./data.json',inputDate.value)

inputDate.addEventListener('change', (e) => {
    const selected = new Date(e.target.value);
    const minDate = new Date("2025-06-23");
    const maxDate = new Date("2025-07-20");

    let displayDate = e.target.value;
    
    if (selected < minDate || selected > maxDate) {
        alert("Please select a date within the training period (23 June to 20 July 2025).");
        inputDate.value = startDate;
        displayDate = startDate
    }

    container.remove();
    container = createTags('div', { class: "container" }, "", containerFrame);
    getData('./data.json', displayDate);
});