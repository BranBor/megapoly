document.addEventListener('DOMContentLoaded', function() {

let params;
let climateValue, transportValue, populationValue, safetyValue, staffValue, cellNumber, cellParams, key, hasPaid, chosenPlayer, minusOrPlusCash, hardEventType;

let businessArr = ["warehouse","shop","metal_factory","cafe_restaurant","jewelry_shop","electronics_store","pharmacy","IT_company","fabric_factory"];

let worthOfWarehouse = 100000, worthOfShop = 100000, worthOfMetalFactory = 100000, worthOfCafeRestaurant = 100000, 
worthOfJewelryShop = 100000, worthOfElectronicsStore = 100000,worthOfPharmacy = 100000, worthOfITCompany = 100000, 
worthOfFabricFactory = 100000;

let profitOfWarehouse = 10000, profitOfShop = 10000, profitOfMetalFactory = 10000, profitOfCafeRestaurant = 10000, 
    profitOfJewelryShop = 10000, profitOfElectronicsStore = 10000, profitOfPharmacy = 10000, profitOfITCompany = 10000, 
    profitOfFabricFactory = 10000;

const cashAmount1 = document.querySelector("#cashAmount1");
const cashAmount2 = document.querySelector("#cashAmount2");
const lastProfit1 = document.querySelector("#lastProfitText1");
const lastProfit2 = document.querySelector("#lastProfitText2");
const eventText = document.querySelector("#eventText");

let cash1 = 200000;
let cash2 = 200000;

// Единая функция для обновления баланса на экране
function updateCashUI() {

    if (parseInt(cashAmount1.textContent) < parseInt(cash1) || parseInt(cashAmount2.textContent) < parseInt(cash2)){
        let audioLink = 'assets/sounds/gameSounds/cashGain' + (Math.floor(Math.random() * 3) + 1).toString() + '.mp3';
        let audio = new Audio(audioLink);
        audio.volume = 0.3;
        audio.play();
    } 

    cashAmount1.textContent = cash1 + '$';
    cashAmount2.textContent = cash2 + '$';

}

// Generates the same shape of per-cell stats that php/saveMeGod.php used to
// produce (climate/transport/population/safety/staff), but entirely in the
// browser — no server round-trip needed. Kept as a drop-in replacement so
// nothing downstream (the click handlers, the info panels) had to change.
function generateCellParams() {
    const params = {};
    for (let i = 1; i <= 56; i++) {
        params[i] = {
            climate: Math.floor(Math.random() * 101),
            transport: Math.floor(Math.random() * 101),
            population: Math.floor(Math.random() * 101),
            safety: Math.floor(Math.random() * 11),
            staff: Math.floor(Math.random() * 101)
        };
    }
    return params;
}

function start(){
    cellParams = generateCellParams();
    document.querySelectorAll('.sub_cont, .sub_cont2, .sub_cont3, .sub_cont4').forEach(cell => {
        cell.addEventListener('click', function() {

            cellNumber = this.querySelector('.number').innerText;
            params = cellParams[cellNumber];

            const celltext = document.querySelector("#celltext");
            celltext.innerHTML = cellNumber;

            if (params) {
                climateValue = params.climate;
                transportValue = params.transport;
                populationValue = params.population;
                safetyValue = params.safety;
                staffValue = params.staff;
                updateCellContent('climate_2', climateValue);
                updateCellContent('transport_3', transportValue);
                updateCellContent('manpower_1', populationValue);
                updateCellContent('safety_1', safetyValue);
                updateCellContent('staff_1', staffValue);

                updateBusinessCardContent();
            }
        });
    });
};

start();

let eventVariable = 0;
let hardEventVariable = 0;

let businessNameText1;
let businessNumberText1;
let businessNameText2;
let businessNumberText2;

const iframe1 = document.querySelector('#businessIframe1');
const iframe2 = document.querySelector('#businessIframe2');

let iframeDocument1, iframeDocument2, imageDiv1, defaultBusinessImage, imageDiv2, businessCost1, businessCost2, businessProfit2;
let iframe1Loaded = false;
let iframe2Loaded = false;

iframe1.onload = function(){
    iframeDocument1 = iframe1.contentWindow.document;
    businessNameText1 = iframeDocument1.querySelector("#businessNameText1");
    businessNumberText1 = iframeDocument1.querySelector("#businessNumberText1");
    businessCost1 = iframeDocument1.querySelector("#businessCost1");

    defaultBusinessImage = 'assets/images/business/no-business-image.png';
    imageDiv1 = iframeDocument1.querySelector("#businessImage1");
    imageDiv1.src = defaultBusinessImage;
    iframe1Loaded = true;
}

iframe2.onload = function(){
    iframeDocument2 = iframe2.contentWindow.document;
    businessNameText2 = iframeDocument2.querySelector("#businessNameText2");
    businessNumberText2 = iframeDocument2.querySelector("#businessNumberText2");
    businessCost2 = iframeDocument2.querySelector("#businessCost2");
    businessProfit2 = iframeDocument2.querySelector("#businessProfit2");

    imageDiv2 = iframeDocument2.querySelector("#businessImage2");
    imageDiv2.src = 'assets/images/business/no-business-image.png';
    iframe2Loaded = true;
}

let setBusinessesObj1 = {};
let setBusinessesObj2 = {};

for(let i = 1; i <= 56; i++){
    let value = 'cell' + i;
    setBusinessesObj1[value] = 'none';
    setBusinessesObj2[value] = 'none';
}

function updateBusinessCardContent(){
    if (!iframe1Loaded || !imageDiv1 || !businessNameText1 || !businessNumberText1 || !businessCost1) {
        console.log("updateBusinessCardContent: iframe1 not ready yet, skipping this call");
        return;
    }
    let key1 = `cell${cellNumber}`;
    if (setBusinessesObj1[key1] != 'none'){
        businessNameText1.textContent = setBusinessesObj1[key1];
        businessNumberText1.textContent = `Cell number: ${cellNumber}`;
        switch(setBusinessesObj1[key1]){
            case "warehouse":
                imageDiv1.src = 'assets/images/business/warehouse.png';
                businessCost1.textContent = `Cost: ${worthOfWarehouse}$`;
                break;
            case "shop":
                imageDiv1.src = 'assets/images/business/retail-store.jpg';
                businessCost1.textContent = `Cost: ${worthOfShop}$`;
                break;
            case "metal_factory":
                imageDiv1.src = 'assets/images/business/metals-manufacturing-plant.jpg';
                businessCost1.textContent = `Cost: ${worthOfMetalFactory}$`;
                break;
            case "cafe_restaurant":
               imageDiv1.src = 'assets/images/business/cafe.jpg';
               businessCost1.textContent = `Cost: ${worthOfCafeRestaurant}$`;
                break;
            case "jewelry_shop":
                imageDiv1.src = 'assets/images/business/jewelry-store.jpg';
                businessCost1.textContent = `Cost: ${worthOfJewelryShop}$`;
                break;
            case "electronics_store":
                imageDiv1.src = 'assets/images/business/allo.jpg';
                businessCost1.textContent = `Cost: ${worthOfElectronicsStore}$`;
                break;
            case "pharmacy":
               imageDiv1.src = 'assets/images/business/pharmacy.jpg';
               businessCost1.textContent = `Cost: ${worthOfPharmacy}$`;
                break;
            case "IT_company":
                imageDiv1.src = 'assets/images/business/it.jpg';
                businessCost1.textContent = `Cost: ${worthOfITCompany}$`;
                break;
            case "fabric_factory":
               imageDiv1.src = 'assets/images/business/fabric-factory.jpg';
               businessCost1.textContent = `Cost: ${worthOfFabricFactory}$`;
                break;   
            default:
                imageDiv1.src = 'assets/images/business/no-business-image.png';
                console.log("image bug xd");
                break;
            }
    } 
    else if (setBusinessesObj2[key1] != 'none'){
        businessNameText1.textContent = setBusinessesObj2[key1];
        businessNumberText1.textContent = `Cell number: ${cellNumber}`;
        switch(setBusinessesObj2[key1]){
            case "warehouse":
                imageDiv1.src = 'assets/images/business/warehouse.png';
                businessCost1.textContent = `Cost: ${worthOfWarehouse}$`;
                break;
            case "shop":
                imageDiv1.src = 'assets/images/business/retail-store.jpg';
                businessCost1.textContent = `Cost: ${worthOfShop}$`;
                break;
            case "metal_factory":
                imageDiv1.src = 'assets/images/business/metals-manufacturing-plant.jpg';
                businessCost1.textContent = `Cost: ${worthOfMetalFactory}$`;
                break;
            case "cafe_restaurant":
               imageDiv1.src = 'assets/images/business/cafe.jpg';
                businessCost1.textContent = `Cost: ${worthOfCafeRestaurant}$`;
                break;
            case "jewelry_shop":
                imageDiv1.src = 'assets/images/business/jewelry-store.jpg';
                businessCost1.textContent = `Cost: ${worthOfJewelryShop}$`;
                break;
            case "electronics_store":
                imageDiv1.src = 'assets/images/business/allo.jpg';
                businessCost1.textContent = `Cost: ${worthOfElectronicsStore}$`;
                break;
            case "pharmacy":
               imageDiv1.src = 'assets/images/business/pharmacy.jpg';
               businessCost1.textContent = `Cost: ${worthOfPharmacy}$`;
                break;
            case "IT_company":
                imageDiv1.src = 'assets/images/business/it.jpg';
                businessCost1.textContent = `Cost: ${worthOfITCompany}$`;
                break;
            case "fabric_factory":
               imageDiv1.src = 'assets/images/business/fabric-factory.jpg';
               businessCost1.textContent = `Cost: ${worthOfFabricFactory}$`;
                break;  
            default:
                imageDiv1.src = 'assets/images/business/no-business-image.png';
                console.log("image bug xd");
                break;
        }
    }

    if (setBusinessesObj1[key1] == 'none' && setBusinessesObj2[key1] == 'none'){
        imageDiv1.src = defaultBusinessImage;
        businessNameText1.textContent = 'no business';
        businessNumberText1.textContent = `Cell number: ${cellNumber}`;
        businessCost1.textContent = 'no business';
    }
}

function updateCellContent(className, value) {
    const element = document.querySelector(`.${className}`);
    element.innerText = value + "%";
    if (className == "safety_1"){
        element.style.backgroundColor = getColorSafety(value);
    }
    else{
        element.style.backgroundColor = getColor(value);
    }
}

function getColor(value) {
    if (value >= 0 && value < 25) {
        return 'rgb(128, 0, 0)';
    } else if (value >= 25 && value < 50) {
        return 'rgb(255, 153, 0)';
    } else if (value >= 50 && value < 75) {
        return 'rgb(255, 187, 51)';
    } else if (value >= 75 && value <= 100) {
        return 'rgb(153, 204, 0)';
    }
    return '';
}
function getColorSafety(value) {
    if (value >= 0 && value < 3) {
        return 'rgb(153, 204, 0)'; 
    } else if (value >= 3 && value < 5) {
        return ' rgb(255, 187, 51)';
    } else if (value >= 5 && value < 8) {
        return 'rgb(255, 153, 0)';
    } else if (value >= 8 && value <= 10) {
        return 'rgb(128, 0, 0)';
    }
    return '';
}

function setBusinesss () {
    if (round == 2){
        if ((cellPlayer1 - ( 56 * Math.floor(lapsPlayer1 / 2))) == cellNumber){
            console.log("its oke1");
        }
        else{
            console.log("viberi druguu cell1");
        }
    }
    if (round == 1){
        if ((cellPlayer2 - ( 56 * Math.floor(lapsPlayer2 / 2))) == cellNumber){
            console.log("its oke2");
        }
        else{
            console.log("viberi druguu cell2");
        }
    }
}

function easyEvent(){
    let randomEventNumber = Math.floor(Math.random() * 2) + 1;

    switch(randomEventNumber){
        case 1:
            minusOrPlusCash = 2000;
            chosenPlayer = Math.floor(Math.random() * 2) + 1;
            if (chosenPlayer == 1){
                cash1 -= minusOrPlusCash;
            }
            else if (chosenPlayer == 2){
                cash2 -= minusOrPlusCash;
            }
            eventText.textContent = `Fraudsters hacked the card of player ${chosenPlayer} and stole ${minusOrPlusCash}$ `;
            break;
        case 2:
            minusOrPlusCash = 4000;
            chosenPlayer = Math.floor(Math.random() * 2) + 1;
            if (chosenPlayer == 1){
                cash1 += minusOrPlusCash;
            }
            else if (chosenPlayer == 2){
                cash2 += minusOrPlusCash;
            }
            eventText.textContent = `${chosenPlayer} player received invesment from partners ${minusOrPlusCash}$`;
            break;
    }
    updateCashUI(); // Обновляем UI после ивента
    console.log("easyEvent");
}

const shopText1 = document.querySelector('#shopText1')
const shopText2 = document.querySelector('#shopText2')
const shopText3 = document.querySelector('#shopText3')
const shopText4 = document.querySelector('#shopText4')

const shopCost1 = document.querySelector('#shopCost1')
const shopCost2 = document.querySelector('#shopCost2')
const shopCost3 = document.querySelector('#shopCost3')
const shopCost4 = document.querySelector('#shopCost4')

const shopImage1 = document.querySelector('#shopImage1')
const shopImage2 = document.querySelector('#shopImage2')
const shopImage3 = document.querySelector('#shopImage3')
const shopImage4 = document.querySelector('#shopImage4')

const shopBuyBtn1 = document.querySelector('#shopBuyBtn1')
const shopBuyBtn2 = document.querySelector('#shopBuyBtn2')


const businessImages = {
    warehouse: 'assets/images/business/warehouse.png',
    shop: 'assets/images/business/retail-store.jpg',
    metal_factory: 'assets/images/business/metals-manufacturing-plant.jpg',
    cafe_restaurant: 'assets/images/business/cafe.jpg',
    jewelry_shop: 'assets/images/business/jewelry-store.jpg',
    electronics_store: 'assets/images/business/allo.jpg',
    pharmacy: 'assets/images/business/pharmacy.jpg',
    IT_company: 'assets/images/business/it.jpg',
    fabric_factory: 'assets/images/business/fabric-factory.jpg'
};

function getBusinessData(num) {
    let name = "";
    let cost = 0;

    switch(num) {
        case 1:
            name = businessArr[0]; // warehouse
            cost = worthOfWarehouse;
            break;
        case 2:
            name = businessArr[1]; // shop
            cost = worthOfShop;
            break;
        case 3:
            name = businessArr[2]; // metal_factory
            cost = worthOfMetalFactory;
            break;
        case 4:
            name = businessArr[3]; // cafe_restaurant
            cost = worthOfCafeRestaurant;
            break;
        case 5:
            name = businessArr[4]; // jewelry_shop
            cost = worthOfJewelryShop;
            break;
        case 6:
            name = businessArr[5]; // electronics_store
            cost = worthOfElectronicsStore;
            break;
        case 7:
            name = businessArr[6]; // pharmacy
            cost = worthOfPharmacy;
            break;
        case 8:
            name = businessArr[7]; // IT_company
            cost = worthOfITCompany;
            break;
        case 9:
            name = businessArr[8]; // fabric_factory
            cost = worthOfFabricFactory;
            break;
    }
    return { name, cost };
}

function setShop() {

    let num1 = Math.floor(Math.random() * businessArr.length) + 1;
    let num2 = Math.floor(Math.random() * businessArr.length) + 1;


    while (num1 === num2) {
        num2 = Math.floor(Math.random() * businessArr.length) + 1;
    }


    const firstBusiness = getBusinessData(num1);
    const secondBusiness = getBusinessData(num2);


    shopText1.textContent = firstBusiness.name;
    shopCost1.textContent = '$' + firstBusiness.cost;
    shopImage1.src = businessImages[firstBusiness.name];

    shopText2.textContent = secondBusiness.name;
    shopCost2.textContent = '$' + secondBusiness.cost;
    shopImage2.src = businessImages[secondBusiness.name];

    // A fresh offer means both slots are available again, even if the previous
    // offer had already been bought out.
    shopBuyBtn1.disabled = false;
    shopBuyBtn1.textContent = 'Buy';
    shopBuyBtn2.disabled = false;
    shopBuyBtn2.textContent = 'Buy';
}
function hardEvent(){
    setShop();
    let randomHardEventNumber = Math.floor(Math.random() * 2) + 1;
    console.log(randomHardEventNumber, 'numbbaaaaa');
    switch(randomHardEventNumber){
        case 1: 
            hardEventType = 1;
            eventText.textContent = 'The IT market overheating led to 50% decrease in IT-companies profit';
            console.log("IT reduce");
            break;
        case 2: 
            hardEventType = 2;
            eventText.textContent = 'Due to monopoly on diamonds their cost skyrocketed and profit of jewelry shops dropped by 50%';
            console.log("Jewelry reduce");
            break;
    }
    console.log("hardEvent");
}



let businessCards1 = [];
let businessCards2 = [];
let profit = 0;

function countProfit1() {
    let initialCash = cash1; // Снимок денег до начисления прибыли за круг
    let currentCell;
    let amountOfWarehouse = 0, amountOfShop = 0, amountOfMetalFactory = 0, amountOfCafeRestaurant = 0, 
    amountOfJewelryShop = 0, amountOfElectronicsStore = 0, amountOfPharmacy = 0, amountOfITCompany = 0, 
    amountOfFabricFactory = 0;

    for(let i = 1; i <= 56; i++){
        let key = 'cell' + i;
        currentCell = i;
        let neededParam = cellParams[currentCell];
        let iks = 0;
        let randomCountProfitNumber = Math.floor(Math.random() * 100) + 1;
        let currentProfit = 0;

        switch(setBusinessesObj1[key]){
            case "warehouse":
                iks = 3;
                currentProfit = profitOfWarehouse + profitOfWarehouse * (neededParam.transport / 100) * iks;
                cash1 += Math.round(currentProfit);
                amountOfWarehouse += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "shop":
                currentProfit = profitOfShop;
                currentProfit += profitOfShop * (neededParam.climate / 100) * 1.25;
                currentProfit += profitOfShop * (neededParam.transport / 100) * 1.5;
                currentProfit += profitOfShop * (neededParam.population / 100) * 1.5;
                cash1 += Math.round(currentProfit);
                amountOfShop += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "metal_factory":
                currentProfit = profitOfMetalFactory;
                currentProfit += profitOfMetalFactory * (neededParam.transport / 100) * 2;
                currentProfit += profitOfMetalFactory * (neededParam.staff / 100) * 3;
                cash1 += Math.round(currentProfit);
                amountOfMetalFactory += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "cafe_restaurant":
                currentProfit = profitOfCafeRestaurant;
                currentProfit += profitOfCafeRestaurant * (neededParam.climate / 100) * 1.5;
                currentProfit += profitOfCafeRestaurant * (neededParam.population / 100) * 3;
                cash1 += Math.round(currentProfit);
                amountOfCafeRestaurant += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "jewelry_shop":
                currentProfit = profitOfJewelryShop;
                currentProfit += profitOfJewelryShop * (neededParam.climate / 100) * 4;
                currentProfit += profitOfJewelryShop * (neededParam.staff / 100) * 2;
                if(hardEventType == 2){
                    currentProfit = currentProfit * 0.5;
                    //hardEventType = 0; 
                }
                cash1 += Math.round(currentProfit);
                amountOfJewelryShop += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "electronics_store":
                currentProfit = profitOfElectronicsStore;
                currentProfit += profitOfElectronicsStore * (neededParam.climate / 100) * 2;
                currentProfit += profitOfElectronicsStore * (neededParam.transport / 100) * 1.5;
                currentProfit += profitOfElectronicsStore * (neededParam.population / 100) * 2;
                cash1 += Math.round(currentProfit);
                amountOfElectronicsStore += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "pharmacy":
                currentProfit = profitOfPharmacy;
                currentProfit += profitOfPharmacy * (neededParam.climate / 100) * 1.5;
                currentProfit += profitOfPharmacy * (neededParam.population / 100) * 2;
                cash1 += Math.round(currentProfit);
                amountOfPharmacy += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "IT_company":
                currentProfit = profitOfITCompany;
                currentProfit += profitOfITCompany * (neededParam.staff / 100) * 5;
                if(hardEventType == 1){
                    currentProfit = currentProfit * 0.5;
                    //hardEventType = 0; 
                }
                cash1 += Math.round(currentProfit);
                amountOfITCompany += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "fabric_factory":
                currentProfit = profitOfFabricFactory;
                currentProfit += profitOfFabricFactory * (neededParam.transport / 100) * 2;
                currentProfit += profitOfFabricFactory * (neededParam.population / 100) * 3;
                currentProfit += profitOfFabricFactory * (neededParam.staff / 100) * 1.5;
                cash1 += Math.round(currentProfit);
                amountOfFabricFactory += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash1 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;  
            default:
                break;
        }
    }
    cash1 = Math.round(cash1);
    
    // Считаем чистый профит за этот круг и выводим на экран
    let lapProfit = cash1 - initialCash;
    lastProfit1.textContent = lapProfit + '$';
    
    updateCashUI();
}

function countProfit2() {
    let initialCash = cash2; // Снимок денег до начисления прибыли за круг
    let currentCell;
    let amountOfWarehouse = 0, amountOfShop = 0, amountOfMetalFactory = 0, amountOfCafeRestaurant = 0, 
    amountOfJewelryShop = 0, amountOfElectronicsStore = 0, amountOfPharmacy = 0, amountOfITCompany = 0, 
    amountOfFabricFactory = 0;

    let randomCountProfitNumber = Math.floor(Math.random() * 100) + 1;

    for(let i = 1; i <= 56; i++){
        let key = 'cell' + i;
        currentCell = i;
        let neededParam = cellParams[currentCell];
        let iks = 0;
        let currentProfit = 0;

        switch(setBusinessesObj2[key]){
            case "warehouse":
                iks = 3; 
                currentProfit = profitOfWarehouse + profitOfWarehouse * (neededParam.transport / 100) * iks;
                cash2 += Math.round(currentProfit);
                amountOfWarehouse += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "shop":
                currentProfit = profitOfShop;
                currentProfit += profitOfShop * (neededParam.climate / 100) * 1.25;
                currentProfit += profitOfShop * (neededParam.transport / 100) * 1.5;
                currentProfit += profitOfShop * (neededParam.population / 100) * 1.5;
                cash2 += Math.round(currentProfit);
                amountOfShop += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "metal_factory":
                currentProfit = profitOfMetalFactory;
                currentProfit += profitOfMetalFactory * (neededParam.transport / 100) * 2;
                currentProfit += profitOfMetalFactory * (neededParam.staff / 100) * 3;
                cash2 += Math.round(currentProfit);
                amountOfMetalFactory += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "cafe_restaurant":
                currentProfit = profitOfCafeRestaurant;
                currentProfit += profitOfCafeRestaurant * (neededParam.climate / 100) * 1.5;
                currentProfit += profitOfCafeRestaurant * (neededParam.population / 100) * 3;
                cash2 += Math.round(currentProfit);
                amountOfCafeRestaurant += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "jewelry_shop":
                currentProfit = profitOfJewelryShop;
                currentProfit += profitOfJewelryShop * (neededParam.climate / 100) * 4;
                currentProfit += profitOfJewelryShop * (neededParam.staff / 100) * 2;
                if(hardEventType == 2){
                    currentProfit = currentProfit * 0.5;
                    //hardEventType = 0; 
                }
                cash2 += Math.round(currentProfit);
                amountOfJewelryShop += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "electronics_store":
                currentProfit = profitOfElectronicsStore;
                currentProfit += profitOfElectronicsStore * (neededParam.climate / 100) * 2;
                currentProfit += profitOfElectronicsStore * (neededParam.transport / 100) * 1.5;
                currentProfit += profitOfElectronicsStore * (neededParam.population / 100) * 2;
                cash2 += Math.round(currentProfit);
                amountOfElectronicsStore += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "pharmacy":
                currentProfit = profitOfPharmacy;
                currentProfit += profitOfPharmacy * (neededParam.climate / 100) * 1.5;
                currentProfit += profitOfPharmacy * (neededParam.population / 100) * 2;
                cash2 += Math.round(currentProfit);
                amountOfPharmacy += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "IT_company":
                currentProfit = profitOfITCompany;
                currentProfit += profitOfITCompany * (neededParam.staff / 100) * 5;
                if(hardEventType == 1){
                    currentProfit = currentProfit * 0.5;
                    //hardEventType = 0; 
                }
                cash2 += Math.round(currentProfit);
                amountOfITCompany += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;
            case "fabric_factory":
                currentProfit = profitOfFabricFactory;
                currentProfit += profitOfFabricFactory * (neededParam.transport / 100) * 2;
                currentProfit += profitOfFabricFactory * (neededParam.population / 100) * 3;
                currentProfit += profitOfFabricFactory * (neededParam.staff / 100) * 1.5;
                cash2 += Math.round(currentProfit);
                amountOfFabricFactory += 1;
                if(neededParam.safety >= randomCountProfitNumber){
                    cash2 -= 0.8 * currentProfit;
                    console.log('robbery');
                }
                break;  
            default:
                break;
        }
    }
    cash2 = Math.round(cash2);
    
    // Считаем чистый профит за этот круг и выводим на экран
    let lapProfit = cash2 - initialCash;
    lastProfit2.textContent = lapProfit + '$';
    
    updateCashUI();
}



function giveCard1(){
    //if (shopGiveCard == 0){
        let randomCardNumber =  Math.floor(Math.random() * 9) + 1;
   // }
    //else{
    //    let randomCardNumber = shopCardNumber
    //}




    if(businessCards1.length <= 5 - 1){
        switch (randomCardNumber) {
            case 1: businessCards1.push("warehouse"); break;
            case 2: businessCards1.push("shop"); break;   
            case 3: businessCards1.push("metal_factory"); break;
            case 4: businessCards1.push("cafe_restaurant"); break;  
            case 5: businessCards1.push("jewelry_shop"); break;
            case 6: businessCards1.push("electronics_store"); break;  
            case 7: businessCards1.push("pharmacy"); break;
            case 8: businessCards1.push("IT_company"); break;  
            case 9: businessCards1.push("fabric_factory"); break;          
        }
        giveCard1Add();
    }
    else{
        console.log("you've reached max of businesses1")
    }
    console.log(businessCards1);
}

function giveCard2(){
    let randomCardNumber =  Math.floor(Math.random() * 9) + 1;

    if(businessCards2.length <= 5 - 1){
        switch (randomCardNumber) {
            case 1: businessCards2.push("warehouse"); break;
            case 2: businessCards2.push("shop"); break;   
            case 3: businessCards2.push("metal_factory"); break;
            case 4: businessCards2.push("cafe_restaurant"); break;  
            case 5: businessCards2.push("jewelry_shop"); break;
            case 6: businessCards2.push("electronics_store"); break;  
            case 7: businessCards2.push("pharmacy"); break;
            case 8: businessCards2.push("IT_company"); break;  
            case 9: businessCards2.push("fabric_factory"); break;          
        }
        giveCard2Add();
    }
    else{
        console.log("you've reached max of businesses2")
    }
}

function giveCard1Add(){
    let cardId;
    let variable;

    switch (businessCards1.length) {
        case 0:
            if(document.querySelector('#business1_text').innerText != 'empty'){
                document.querySelector('#business1_text').innerText = 'empty';
                document.querySelector('#business2_text').innerText = 'empty';
                document.querySelector('#business3_text').innerText = 'empty';
                document.querySelector('#business4_text').innerText = 'empty';
                document.querySelector('#business5_text').innerText = 'empty';
            }
            break;
        case 1:
            cardId = 'business' + businessCards1.length + '_text';
            variable = document.querySelector(`#${cardId}`);
            variable.innerText = businessCards1[businessCards1.length - 1];
            document.querySelector('#business2_text').innerText = 'empty';
            document.querySelector('#business3_text').innerText = 'empty';
            document.querySelector('#business4_text').innerText = 'empty';
            document.querySelector('#business5_text').innerText = 'empty';
            break;
        case 2:
            cardId = 'business' + businessCards1.length + '_text';
            variable = document.querySelector(`#${cardId}`);
            variable.innerText = businessCards1[businessCards1.length - 1];
            document.querySelector('#business3_text').innerText = 'empty';
            document.querySelector('#business4_text').innerText = 'empty';
            document.querySelector('#business5_text').innerText = 'empty';
            break;
        case 3:
            cardId = 'business' + businessCards1.length + '_text';
            variable = document.querySelector(`#${cardId}`);
            variable.innerText = businessCards1[businessCards1.length - 1];
            document.querySelector('#business4_text').innerText = 'empty';
            document.querySelector('#business5_text').innerText = 'empty';
            break;
        case 4:
            cardId = 'business' + businessCards1.length + '_text';
            variable = document.querySelector(`#${cardId}`);
            variable.innerText = businessCards1[businessCards1.length - 1];
            document.querySelector('#business5_text').innerText = 'empty';
            break;
        case 5:
            cardId = 'business' + businessCards1.length + '_text';
            variable = document.querySelector(`#${cardId}`);
            variable.innerText = businessCards1[businessCards1.length - 1];
            break;
    }
}

function giveCard2Add(){
    let cardId;
    let variable;

    switch (businessCards2.length) {
        case 0:
            if(document.querySelector('#business10_text').innerText != 'empty'){
                document.querySelector('#business10_text').innerText = 'empty';
                document.querySelector('#business20_text').innerText = 'empty';
                document.querySelector('#business30_text').innerText = 'empty';
                document.querySelector('#business40_text').innerText = 'empty';
                document.querySelector('#business50_text').innerText = 'empty';
            }
            break;
        case 1:
            cardId = 'business' + (businessCards2.length) * 10 + '_text';
            variable = document.querySelector(`#${cardId}`);
            variable.innerText = businessCards2[businessCards2.length - 1];
            document.querySelector('#business20_text').innerText = 'empty';
            document.querySelector('#business30_text').innerText = 'empty';
            document.querySelector('#business40_text').innerText = 'empty';
            document.querySelector('#business50_text').innerText = 'empty';
            break;
        case 2:
            cardId = 'business' + (businessCards2.length) * 10 + '_text';
            variable = document.querySelector(`#${cardId}`);
            variable.innerText = businessCards2[businessCards2.length - 1];
            document.querySelector('#business30_text').innerText = 'empty';
            document.querySelector('#business40_text').innerText = 'empty';
            document.querySelector('#business50_text').innerText = 'empty';
            break;
        case 3:
            cardId = 'business' + (businessCards2.length) * 10 + '_text';
            variable = document.querySelector(`#${cardId}`);
            variable.innerText = businessCards2[businessCards2.length - 1];
            document.querySelector('#business40_text').innerText = 'empty';
            document.querySelector('#business50_text').innerText = 'empty';
           break;
        case 4:
           cardId = 'business' + (businessCards2.length) * 10 + '_text';
           variable = document.querySelector(`#${cardId}`);
           variable.innerText = businessCards2[businessCards2.length - 1];
           document.querySelector('#business50_text').innerText = 'empty';
           break;
        case 5:
           cardId = 'business' + (businessCards2.length) * 10 + '_text';
           variable = document.querySelector(`#${cardId}`);
           variable.innerText = businessCards2[businessCards2.length - 1];
           break;
    }
}

const smallBtnsDivs = document.querySelectorAll('.small_button_text_div');
smallBtnsDivs.forEach(btnDiv => {btnDiv.addEventListener("click", function(){
    let btnDivId = this.id;
    let variableText = document.querySelector(`#${btnDivId}`);
    let neededText = variableText.textContent.trim();
    if(neededText == 'empty'){
        imageDiv2.src = 'assets/images/business/no-business-image.png';
        businessNameText2.textContent = 'no business';
        businessNumberText2.textContent = `Number of card: 0`;
        businessCost2.textContent = 'no business';
        businessProfit2.textContent = `no business`;
    }
    else if(neededText != 'empty'){
        switch(neededText){
            case "warehouse":
                imageDiv2.src = 'assets/images/business/warehouse.png';
                businessCost2.textContent = `Cost: ${worthOfWarehouse}$`;
                businessProfit2.textContent = `Std profit: ${profitOfWarehouse}$`;
                break;
            case "shop":
                imageDiv2.src = 'assets/images/business/retail-store.jpg';
                businessCost2.textContent = `Cost: ${worthOfShop}$`;
                businessProfit2.textContent = `Std profit: ${profitOfShop}$`;
                break;
            case "metal_factory":
                imageDiv2.src = 'assets/images/business/metals-manufacturing-plant.jpg';
                businessCost2.textContent = `Cost: ${worthOfMetalFactory}$`;
                businessProfit2.textContent = `Std profit: ${profitOfMetalFactory}$`;
                break;
            case "cafe_restaurant":
                imageDiv2.src = 'assets/images/business/cafe.jpg';
                businessCost2.textContent = `Cost: ${worthOfCafeRestaurant}$`;
                businessProfit2.textContent = `Std profit: ${profitOfCafeRestaurant}$`;
                break;
            case "jewelry_shop":
                imageDiv2.src = 'assets/images/business/jewelry-store.jpg';
                businessCost2.textContent = `Cost: ${worthOfJewelryShop}$`;
                businessProfit2.textContent = `Std profit: ${profitOfJewelryShop}$`;
                break;
            case "electronics_store":
                imageDiv2.src = 'assets/images/business/allo.jpg';
                businessCost2.textContent = `Cost: ${worthOfElectronicsStore}$`;
                businessProfit2.textContent = `Std profit: ${profitOfElectronicsStore}$`;
                break;
            case "pharmacy":
                imageDiv2.src = 'assets/images/business/pharmacy.jpg';
                businessCost2.textContent = `Cost: ${worthOfPharmacy}$`;
                businessProfit2.textContent = `Std profit: ${profitOfPharmacy}$`;
                break;
            case "IT_company":
                imageDiv2.src = 'assets/images/business/it.jpg';
                businessCost2.textContent = `Cost: ${worthOfITCompany}$`;
                businessProfit2.textContent = `Std profit: ${profitOfITCompany}$`;
                break;
            case "fabric_factory":
                imageDiv2.src = 'assets/images/business/fabric-factory.jpg';
                businessCost2.textContent = `Cost: ${worthOfFabricFactory}$`;
                businessProfit2.textContent = `Std profit: ${profitOfFabricFactory}$`;
                break;   
            }
            businessNameText2.textContent = neededText;
    }
    let chandgedBtnDivId = btnDivId.replace('business_textDiv', '');
    switch (chandgedBtnDivId){
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
            businessNumberText2.textContent = `Number of card: ${chandgedBtnDivId}`;
            break;
    };
})});

const smallBtnsDivs2 = document.querySelectorAll('.small_button_text_div_2');
smallBtnsDivs2.forEach(btnDiv2 => {btnDiv2.addEventListener("click", function(){
    let btnDivId = this.id;
    let variableText = document.querySelector(`#${btnDivId}`);
    let neededText = variableText.textContent.trim();
    if(neededText == 'empty'){
        imageDiv2.src = 'assets/images/business/no-business-image.png';
        businessNumberText2.textContent = `Number of card: 0`;
        businessNameText2.textContent = 'no business';
        businessProfit2.textContent = `no business`;
    }
    else if(neededText != 'empty'){
        switch(neededText){
            case "warehouse":
                imageDiv2.src = 'assets/images/business/warehouse.png';
                businessCost2.textContent = `Cost: ${worthOfWarehouse}$`;
                businessProfit2.textContent = `Std profit: ${profitOfWarehouse}$`;
                break;
            case "shop":
                imageDiv2.src = 'assets/images/business/retail-store.jpg';
                businessCost2.textContent = `Cost: ${worthOfShop}$`;
                businessProfit2.textContent = `Std profit: ${profitOfShop}$`;
                break;
            case "metal_factory":
                imageDiv2.src = 'assets/images/business/metals-manufacturing-plant.jpg';
                businessCost2.textContent = `Cost: ${worthOfMetalFactory}$`;
                businessProfit2.textContent = `Std profit: ${profitOfMetalFactory}$`;
                break;
            case "cafe_restaurant":
                imageDiv2.src = 'assets/images/business/cafe.jpg';
                businessCost2.textContent = `Cost: ${worthOfCafeRestaurant}$`;
                businessProfit2.textContent = `Std profit: ${profitOfCafeRestaurant}$`;
                break;
            case "jewelry_shop":
                imageDiv2.src = 'assets/images/business/jewelry-store.jpg';
                businessCost2.textContent = `Cost: ${worthOfJewelryShop}$`;
                businessProfit2.textContent = `Std profit: ${profitOfJewelryShop}$`;
                break;
            case "electronics_store":
                imageDiv2.src = 'assets/images/business/allo.jpg';
                businessCost2.textContent = `Cost: ${worthOfElectronicsStore}$`;
                businessProfit2.textContent = `Std profit: ${profitOfElectronicsStore}$`;
                break;
            case "pharmacy":
                imageDiv2.src = 'assets/images/business/pharmacy.jpg';
                businessCost2.textContent = `Cost: ${worthOfPharmacy}$`;
                businessProfit2.textContent = `Std profit: ${profitOfPharmacy}$`;
                break;
            case "IT_company":
                imageDiv2.src = 'assets/images/business/it.jpg';
                businessCost2.textContent = `Cost: ${worthOfITCompany}$`;
                businessProfit2.textContent = `Std profit: ${profitOfITCompany}$`;
                break;
            case "fabric_factory":
                imageDiv2.src = 'assets/images/business/fabric-factory.jpg';
                businessCost2.textContent = `Cost: ${worthOfFabricFactory}$`;
                businessProfit2.textContent = `Std profit: ${profitOfFabricFactory}$`;
                break;   
            }
            businessNameText2.textContent = neededText;
    }
    let chandgedBtnDivId = parseInt(btnDivId.replace('business_textDiv', '')) / 10;
    switch (chandgedBtnDivId){
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            businessNumberText2.textContent = `Number of card: ${chandgedBtnDivId}`;
            break;
    };
})});

let mrPolizei;
let smallBtns = document.querySelectorAll('.small_btns');
smallBtns.forEach(btn => {btn.addEventListener("click", function(){
    let btnId = this.id;
    let cardToDelete;
    let cardExist = 1;
    if (round == 2){
        if ((cellPlayer1 - ( 56 * Math.floor(lapsPlayer1 / 2))) == cellNumber){
            mrPolizei = 1;
        }
        else{
            mrPolizei = 0;
        }
        if (mrPolizei == 1){
            switch (btnId){
                case '1smallBtn':
                    if(businessCards1.length >= 1){ cardToDelete = businessCards1[0]; }
                    else { cardExist = 0; }
                    break;
                case '2smallBtn':
                    if(businessCards1.length >= 2){ cardToDelete = businessCards1[1]; }
                    else { cardExist = 0; }
                    break;
                case '3smallBtn':
                    if(businessCards1.length >= 3){ cardToDelete = businessCards1[2]; }
                    else { cardExist = 0; }
                    break;
                case '4smallBtn':
                    if(businessCards1.length >= 4){ cardToDelete = businessCards1[3]; }
                    else { cardExist = 0; }
                    break;
                case '5smallBtn':
                    if(businessCards1.length == 5){ cardToDelete = businessCards1[4]; }
                    else { cardExist = 0; }
                    break;
            }
            if (cardExist == 1){
                key = 'cell' + cellNumber;
                if (setBusinessesObj1[key] == 'none' && setBusinessesObj2[key] == 'none'){
                    payForBusiness(cardToDelete);
                    if (hasPaid == 1){

                        let audioLink = 'assets/sounds/gameSounds/buildSound.mp4';
                        let audio = new Audio(audioLink);
                        audio.volume = 0.5
                        audio.play();


                        setBusinessesObj1[key] = cardToDelete;
                        useCard1(cardToDelete);
                        giveCard1Add();
                        let currentCellBusiness = document.querySelector(`#c${cellNumber}`);
                        currentCellBusiness.style.backgroundColor = 'rgb(88, 23, 23)';
                    }
                }
            }
        }
    }
    else if (round == 1){
        if ((cellPlayer2 - ( 56 * Math.floor(lapsPlayer2 / 2))) == cellNumber){
            mrPolizei = 1;
        }
        else{
            mrPolizei = 0;
        }
        if (mrPolizei == 1){
            switch (btnId){
                case '10smallBtn':
                    if(businessCards2.length >= 1){ cardToDelete = businessCards2[0]; }
                    else { cardExist = 0; }
                    break;
                case '20smallBtn':
                    if(businessCards2.length >= 2){ cardToDelete = businessCards2[1]; }
                    else { cardExist = 0; }
                    break;
                case '30smallBtn':
                    if(businessCards2.length >= 3){ cardToDelete = businessCards2[2]; }
                    else { cardExist = 0; }
                    break;
                case '40smallBtn':
                    if(businessCards2.length >= 4){ cardToDelete = businessCards2[3]; }
                    else { cardExist = 0; }
                    break;
                case '50smallBtn':
                    if(businessCards2.length == 5){ cardToDelete = businessCards2[4]; }
                    else { cardExist = 0; }
                    break;
            }
            if(cardExist == 1){
                key = 'cell' + cellNumber;
                if (setBusinessesObj1[key] == 'none' && setBusinessesObj2[key] == 'none'){
                    payForBusiness(cardToDelete);
                    if (hasPaid == 1){

                            let audioLink = 'assets/sounds/gameSounds/buildSound.mp4';
                            let audio = new Audio(audioLink);
                            audio.play();


                            setBusinessesObj2[key] = cardToDelete;
                            useCard2(cardToDelete);
                            giveCard2Add();
                            let currentCellBusiness = document.querySelector(`#c${cellNumber}`);
                            currentCellBusiness.style.backgroundColor = 'rgb(36, 66, 94)';
                        }
                    }
            }
        }
    }
    updateBusinessCardContent();
})});

let smallSellBtns = document.querySelectorAll('.small_sell_btns');

smallSellBtns.forEach(btnSell => {btnSell.addEventListener("click", function(){
    btnSell = this.id;
    sellCard(btnSell);
})});

let cash;

function sellCard(btnId){

    if (round == 2){
        let businessElement = document.querySelector('#business' + btnId[7].toString() + '_text');
        let businessText = businessElement.textContent;

        if (businessText == 'empty'){
            alert('You have no business card')
            return
        }

        let isConfirmed = confirm(`Вы точно хотите продать ${businessText}?`);
            if (!isConfirmed) {
                return; // Прерываем выполнение функции, продажа отменяется
            }

        if (businessText !== 'empty'){
            let sellCost = 0;


            switch (businessText) {
                case "warehouse":
                    sellCost = worthOfWarehouse * 0.3;
                    break;
                case "shop":
                    sellCost = worthOfShop * 0.3;
                    break;
                case "metal_factory":
                    sellCost = worthOfMetalFactory * 0.3;
                    break;
                case "cafe_restaurant":
                    sellCost = worthOfCafeRestaurant * 0.3;
                    break;
                case "jewelry_shop":
                    sellCost = worthOfJewelryShop * 0.3;
                    break;
                case "electronics_store":
                    sellCost = worthOfElectronicsStore * 0.3;
                    break;
                case "pharmacy":
                    sellCost = worthOfPharmacy * 0.3;
                    break;
                case "IT_company":
                    sellCost = worthOfITCompany * 0.3;
                    break;
                case "fabric_factory":
                    sellCost = worthOfFabricFactory * 0.3;
                    break;
                default:
                    sellCost = 0; 
            }
            useCard1(businessCards1[btnId[7]-1]);
            cash1 += sellCost;
            updateCashUI();
            businessElement.textContent = 'empty';
            
        }
    }

    if (round == 1){

        let businessElement = document.querySelector('#business' + btnId[7].toString() + '0_text');
        let businessText = businessElement.textContent;

        if (businessText == 'empty'){
            alert('You have no business card')
            return
        }

        let isConfirmed = confirm(`Вы точно хотите продать ${businessText}?`);
            if (!isConfirmed) {
                return; // Прерываем выполнение функции, продажа отменяется
            }

        if (businessText !== 'empty'){
            let sellCost = 0;


            switch (businessText) {
                case "warehouse":
                    sellCost = worthOfWarehouse * 0.3;
                    break;
                case "shop":
                    sellCost = worthOfShop * 0.3;
                    break;
                case "metal_factory":
                    sellCost = worthOfMetalFactory * 0.3;
                    break;
                case "cafe_restaurant":
                    sellCost = worthOfCafeRestaurant * 0.3;
                    break;
                case "jewelry_shop":
                    sellCost = worthOfJewelryShop * 0.3;
                    break;
                case "electronics_store":
                    sellCost = worthOfElectronicsStore * 0.3;
                    break;
                case "pharmacy":
                    sellCost = worthOfPharmacy * 0.3;
                    break;
                case "IT_company":
                    sellCost = worthOfITCompany * 0.3;
                    break;
                case "fabric_factory":
                    sellCost = worthOfFabricFactory * 0.3;
                    break;
                default:
                    sellCost = 0;
            }
            useCard2(businessCards2[btnId[7]-1]);
            cash2 += sellCost;
            updateCashUI();
            businessElement.textContent = 'empty';
            
        }
    }
}


function payForBusiness(business) {
    if (round == 2){
        cash = cash1;
    }
    else if (round == 1){
        cash = cash2;
    }
    switch (business){
            case "warehouse":
                if (cash - worthOfWarehouse >= 0){ cash -= worthOfWarehouse; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;
            case "shop":
                if (cash - worthOfShop >= 0){ cash -= worthOfShop; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;
            case "metal_factory":
                if (cash - worthOfMetalFactory >= 0){ cash -= worthOfMetalFactory; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;
            case "cafe_restaurant":
                if (cash - worthOfCafeRestaurant >= 0){ cash -= worthOfCafeRestaurant; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;
            case "jewelry_shop":
                if (cash - worthOfJewelryShop >= 0){ cash -= worthOfJewelryShop; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;
            case "electronics_store":
                if (cash - worthOfElectronicsStore >= 0){ cash -= worthOfElectronicsStore; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;
            case "pharmacy":
                if (cash - worthOfPharmacy >= 0){ cash -= worthOfPharmacy; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;
            case "IT_company":
                if (cash - worthOfITCompany >= 0){ cash -= worthOfITCompany; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;
            case "fabric_factory":
                if (cash - worthOfFabricFactory >= 0){ cash -= worthOfFabricFactory; hasPaid = 1; }
                else{ hasPaid = 0; }
                break;  
    }
    if (round == 2){
        cash1 = cash;
    } else if (round == 1){
        cash2 = cash;
    }
    
    updateCashUI(); // Деньги обновились сразу после транзакции покупки!
}

function useCard1(usedCard) {
    let lastIndex = businessCards1.lastIndexOf(usedCard);
    if (lastIndex !== -1) {
        businessCards1.splice(lastIndex, 1);
    }
    console.log(businessCards1);
}

function useCard2(usedCard) {
    let lastIndex = businessCards2.lastIndexOf(usedCard);
    if (lastIndex !== -1) {
        businessCards2.splice(lastIndex, 1);
    }
}

let player1 = document.querySelector("#player1div");
let player2 = document.querySelector("#player2div");
let rollDiceBtn = document.querySelector("#rollDiceBtn");
let round = 1;

player1.style.left = "20px";
player1.style.top = "5px";
player2.style.left = "20px";
player2.style.top = "40px";

let directions = ["right", "down", "left", "up"];

const leftLimit = 20;
const topLimitPlayer1 = 5;
const topLimitPlayer2 = 40;

let cellPlayer1 = 1;
let cellPlayer2 = 1;

let lapsPlayer1 = -1;
let lapsPlayer2 = -1;

let directionIndex1 = 0;
let directionIndex2 = 0;

let prevPositionX1 = 20;
let prevPositionY1 = 5;
let prevPositionX2 = 20;
let prevPositionY2 = 40;

let passed1 = 0;
let passed2 = 0;

const gameCube = document.querySelector("#gameCube");
const cubePlayerImage = document.querySelector("#cubePlayerImage");

firstMove = true;

function rolldice() {
    
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    gameCube.src = 'assets/images/cube/' + randomNumber.toString() + '.svg';

    let currentSrc = cubePlayerImage.getAttribute('src');

    if (currentSrc === 'assets/images/players/player_2_immage_ver_2.svg') {
    cubePlayerImage.setAttribute('src', 'assets/images/players/player_1_immage_ver_2.svg');
    console.log('11');
    } 
    else {
    cubePlayerImage.setAttribute('src', 'assets/images/players/player_2_immage_ver_2.svg');
    console.log('22');
    }

    
    let audioLink = 'assets/sounds/cubeSounds/s' + (Math.floor(Math.random() * 9) + 1).toString() + '.mp4';
    let audio = new Audio(audioLink);
    audio.volume = 0.3;

    if (firstMove == false) {
        audio.play();
    }
    
    firstMove = false;
    


    let oneStep = randomNumber * 80;

    let currentPositionX1 = parseInt(player1.style.left);
    let currentPositionY1 = parseInt(player1.style.top);
    let currentPositionX2 = parseInt(player2.style.left);
    let currentPositionY2 = parseInt(player2.style.top);

    function movePlayer(player, currentPositionX, currentPositionY, oneStep, maxX, maxY, directionIndex, topLimit, initialX, initialY, lapsCounter, prevPositionX, prevPositionY) {
        let direction = directions[directionIndex];

        switch (direction) {
            case "right":
                currentPositionX += oneStep;
                if (currentPositionX > maxX) {
                    let excessPixels = currentPositionX - maxX;
                    currentPositionX = maxX;
                    directionIndex = (directionIndex + 1) % 4;
                    return movePlayer(player, currentPositionX, currentPositionY, excessPixels, maxX, maxY, directionIndex, topLimit, initialX, initialY, lapsCounter, prevPositionX, prevPositionY);
                }
                break;
            case "down":
                currentPositionY += oneStep;
                if (currentPositionY > maxY) {
                    let excessPixels = currentPositionY - maxY;
                    currentPositionY = maxY;
                    directionIndex = (directionIndex + 1) % 4;
                    return movePlayer(player, currentPositionX, currentPositionY, excessPixels, maxX, maxY, directionIndex, topLimit, initialX, initialY, lapsCounter, prevPositionX, prevPositionY);
                }
                break;
            case "left":
                currentPositionX -= oneStep;
                if (currentPositionX < leftLimit) {
                    let excessPixels = leftLimit - currentPositionX;
                    currentPositionX = leftLimit;
                    directionIndex = (directionIndex + 1) % 4;
                    return movePlayer(player, currentPositionX, currentPositionY, excessPixels, maxX, maxY, directionIndex, topLimit, initialX, initialY, lapsCounter, prevPositionX, prevPositionY);
                }
                break;
            case "up":
                currentPositionY -= oneStep;
                if (currentPositionY < topLimit) {
                    let excessPixels = topLimit - currentPositionY;
                    currentPositionY = topLimit;
                    directionIndex = (directionIndex + 1) % 4;
                    return movePlayer(player, currentPositionX, currentPositionY, excessPixels, maxX, maxY, directionIndex, topLimit, initialX, initialY, lapsCounter, prevPositionX, prevPositionY);
                }
                break;
        }

        if ((prevPositionX <= initialX && currentPositionX > initialX && direction === "right") ||
            (prevPositionY <= initialY && currentPositionY > initialY && direction === "down") ||
            (prevPositionX >= initialX && currentPositionX < initialX && direction === "left") ||
            (prevPositionY >= initialY && currentPositionY < initialY && direction === "up")) {
            lapsCounter++;
        }

        player.style.left = currentPositionX + "px";
        player.style.top = currentPositionY + "px";

        return { currentPositionX, currentPositionY, directionIndex, lapsCounter, prevPositionX: currentPositionX, prevPositionY: currentPositionY };
    }

    const smallBtnsPlayer1Div = document.querySelector(".many_small_btns_player1_div");
    const smallBtnsPlayer2Div = document.querySelector(".many_small_btns_player2_div");
    const playerMovesText = document.querySelector('#playerMovesText');

    if (round == 1) {
        round = 2;
        smallBtnsPlayer2Div.style.display = 'none';
        smallBtnsPlayer1Div.style.display = 'block';
        playerMovesText.innerText = 'Player 1 Round';
        let newPositions = movePlayer(player1, currentPositionX1, currentPositionY1, oneStep, 1540, 725, directionIndex1, topLimitPlayer1, leftLimit, topLimitPlayer1, lapsPlayer1, prevPositionX1, prevPositionY1);
        currentPositionX1 = newPositions.currentPositionX;
        currentPositionY1 = newPositions.currentPositionY;
        directionIndex1 = newPositions.directionIndex;
        lapsPlayer1 = newPositions.lapsCounter;
        prevPositionX1 = newPositions.prevPositionX;
        prevPositionY1 = newPositions.prevPositionY;
        cellPlayer1 += randomNumber;
        if (cellPlayer1 <= 56) {
            cellNumber = cellPlayer1;
        }
        else{
            cellNumber = cellPlayer1 -( 56 * Math.floor(lapsPlayer1 / 2));
        }
        if (cellNumber == 57){
            cellNumber = 1;
        }
    } else {
        round = 1;
        smallBtnsPlayer1Div.style.display = 'none';
        smallBtnsPlayer2Div.style.display = 'block';
        playerMovesText.innerText = 'Player 2 Round';
        let newPositions = movePlayer(player2, currentPositionX2, currentPositionY2, oneStep, 1540, 760, directionIndex2, topLimitPlayer2, leftLimit, topLimitPlayer2, lapsPlayer2, prevPositionX2, prevPositionY2);
        currentPositionX2 = newPositions.currentPositionX;
        currentPositionY2 = newPositions.currentPositionY;
        directionIndex2 = newPositions.directionIndex;
        lapsPlayer2 = newPositions.lapsCounter;
        prevPositionX2 = newPositions.prevPositionX;
        prevPositionY2 = newPositions.prevPositionY;
        cellPlayer2 += randomNumber;
        if (cellPlayer2 <= 56) {
            cellNumber = cellPlayer2;
        }
        else{
            cellNumber = cellPlayer2 - (56 * Math.floor(lapsPlayer2 / 2));
        }
        if (cellNumber == 57){
            cellNumber = 1;
        }
    }

    function isInteger(n) {
        return Number.isInteger(n);
    }

    if (isInteger((lapsPlayer1 / 2) - 0.5) == true){
        passed1 = 0;
    }

    if (isInteger(lapsPlayer1 - 0.5) == false){
        if (lapsPlayer1 / 2 > 0 && isInteger(lapsPlayer1 / 2) == true && passed1 == 0){
            giveCard1();
            countProfit1();
            eventVariable += 1;
            hardEventVariable += 1;
            passed1 = 1;
        }
    }
    
    if (isInteger((lapsPlayer2 / 2) - 0.5) == true){
        passed2 = 0;
    }

    if (isInteger(lapsPlayer2 - 0.5) == false){
        if (lapsPlayer2 / 2 > 0 && isInteger(lapsPlayer2 / 2) == true && passed2 == 0){
            giveCard2();
            countProfit2();
            eventVariable += 1;
            hardEventVariable += 1;
            passed2 = 1;
        }
    }

    if(isInteger(hardEventVariable / 6) && hardEventVariable != 0){
        hardEvent();
        hardEventVariable = 0;
    }

    if(isInteger(eventVariable / 2) && eventVariable != 0 && hardEventVariable != 0){
        easyEvent();
        eventVariable = 0;
    }

    const celltext = document.querySelector("#celltext");
    celltext.innerHTML = cellNumber;
    params = cellParams[cellNumber];
    climateValue = params.climate;
    transportValue = params.transport;
    populationValue = params.population;
    safetyValue = params.safety;
    staffValue = params.staff;

    updateCellContent('climate_2', climateValue);
    updateCellContent('transport_3', transportValue);
    updateCellContent('manpower_1', populationValue);
    updateCellContent('safety_1', safetyValue);
    updateCellContent('staff_1', staffValue);
    
    updateBusinessCardContent();

    console.log("###########");
    updateCashUI(); // Финальная синхронизация в конце хода
    




    if(cash1 < 0){
        setTimeout(function(){ location.reload(); }, 3 * 1000);
        eventText.textContent = 'PLAYER 1 TRUELY NOOOOOOOOB';
        new Audio('assets/sounds/gameSounds/bankruptcySound.mp3').play();
    }
    if(cash2 < 0){
        setTimeout(function(){ location.reload(); }, 3 * 1000);
        eventText.textContent = 'PLAYER 2 TRUELY NOOOOOOOOB';
        new Audio('assets/sounds/gameSounds/bankruptcySound.mp3').play();
    }

    let winCashAmount = 200000000;

    if(cash1 >= winCashAmount){
        setTimeout(function(){ location.reload(); }, 5 * 1000);
        eventText.textContent = 'Player 1 has won';
        new Audio('assets/sounds/gameSounds/winSound.mp3').play();
    }
    if(cash2 >= winCashAmount){
        setTimeout(function(){ location.reload(); }, 5 * 1000);
        new Audio('assets/sounds/gameSounds/winSound.mp3').play();
    }
}

rollDiceBtn.addEventListener("click", rolldice);


const shopBtn = document.querySelector('#shopBtn')
const shopDiv = document.querySelector('#shopDiv')
shopDiv.style.display = 'none'

function shopDisplay(){
    if (shopDiv.style.display == 'none'){
        shopDiv.style.display = 'flex'
        let audioLink = 'assets/sounds/shopSounds/shop' + (Math.floor(Math.random() * 4) + 1).toString() + '.mp4';
        let audio = new Audio(audioLink);
        audio.play();
    }
    else {
        shopDiv.style.display = 'none'
    }
}

shopBtn.addEventListener("click", shopDisplay)



// Buys the business currently shown in a shop slot for whichever player's turn it is.
// Follows the same convention used everywhere else in the file: round === 2 means
// Player 1 is the active player, round === 1 means Player 2 is the active player.
function buyFromShop(businessName, businessCost, buyBtn) {

    if (buyBtn.disabled) {
        return; // already bought since the last time the shop refreshed
    }

    if (!businessName || businessName === 'sold' || isNaN(businessCost)) {
        return; // this slot has no offer in it right now
    }

    let buyerCash = (round == 2) ? cash1 : cash2;
    let buyerCards = (round == 2) ? businessCards1 : businessCards2;

    if (buyerCards.length >= 5) {
        alert("You've reached the max of 5 business cards, sell one before buying more.");
        return;
    }

    if (buyerCash < businessCost) {
        alert('Not enough money to buy this business.');
        return;
    }

    if (round == 2) {
        cash1 -= businessCost;
        businessCards1.push(businessName);
        giveCard1Add();
    } else {
        cash2 -= businessCost;
        businessCards2.push(businessName);
        giveCard2Add();
    }

    updateCashUI();

    // Lock this slot until setShop() rolls a new offer
    buyBtn.disabled = true;
    buyBtn.textContent = 'Sold';
    

    //let audio = new Audio('assets/sounds/gameSounds/buildSound.mp4');
    //audio.volume = 0.5;
    //audio.play();
}


let shopBtns = document.querySelectorAll('.button_buy');
shopBtns.forEach(btn => {btn.addEventListener("click", function(){
    let btnId = this.id; // e.g. "shopBuyBtn1"
    let slotNumber = btnId.replace('shopBuyBtn', '');

    let textEl = document.querySelector(`#shopText${slotNumber}`);
    let costEl = document.querySelector(`#shopCost${slotNumber}`);

    let businessName = textEl.textContent.trim();
    let businessCost = parseInt(costEl.textContent.replace('$', ''));

    buyFromShop(businessName, businessCost, this);

    })});



// Wait until both business-card iframes have actually finished loading
// (instead of guessing with a fixed 1s delay) before the auto-roll on page load.
let autoStartInterval = setInterval(function(){
    if (iframe1Loaded && iframe2Loaded) {
        clearInterval(autoStartInterval);
        rolldice();
        giveCard1();
        giveCard2();
        setShop();
    }
}, 100);
});
