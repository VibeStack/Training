const inputDate = document.querySelector('#date')
const container = document.querySelector('.container')
const begining = document.querySelector('.begining')

let requiredDayData;

function createTags(element,attributes,innerElement,parent){
    const elementTag = document.createElement(`${element}`);
    for (const key in attributes) {
        elementTag.setAttribute(key, attributes[key]);
    }
    elementTag.innerText = innerElement;
    parent.append(elementTag);
    return elementTag;
}

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
                console.log(key);
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
                                console.log(createTags('li',{},`${requiredDayData[key][element][i]}`,olElement));;
                            }
                            break;
                        }
                        if(element === 'a'){
                            console.log(requiredDayData[key][element]);
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
inputDate.addEventListener('change',(e)=>{
    getData('./data.json',inputDate.value)
})