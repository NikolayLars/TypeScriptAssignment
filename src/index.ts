//THIS IS THE ENTRY FILE - WRITE YOUR MAIN LOGIC HERE!




/*
import { helloWorld, Beispiel } from "./myModule";
import { alertMe } from "./myOtherModule";

console.log(helloWorld);
customElements.define("my-beispiel", Beispiel);

alertMe();

const myInputValue = document.querySelector<HTMLInputElement>("#myInput");

const myInputValueAlternate = document.querySelector(
  "#myInput"
) as HTMLInputElement;

document
  .querySelector<HTMLInputElement>("#myInput")
  ?.addEventListener("focus", doSmth);

function doSmth(e: UIEvent) {
  const val = e.target as HTMLInputElement;
  console.log(e, val.value);
}
*/

const appId: string="9ca27b3b3c74c643772ca6556ca4a8a7";
//const statusSvg;
let answer: any;
let statusSvg: string;
let answer2: any;
const down: HTMLElement  = document.getElementById("down")!;
const c: string= '&#8451;';
const moreInfos: HTMLElement | null = document.getElementById("moreInfos");
const go: HTMLElement | null =  document.getElementById("go")!;
go.addEventListener("click", getWeather);


function getWeather(){
    
    let city:string = (<HTMLInputElement>document.getElementById("search")).value ;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}`).then(result => result.json())
    .then(data => {
        createCards(data);
        answer = data;

    });

}

function temp(x: number){
    return x-273.15
}


function createCards(x:any){
   let temp = x.weather[0].description;
if (temp.includes('snow')){
    statusSvg = 'lightsnow';
} else if (temp.includes('clear sky')){
    statusSvg = 'clearsky';
} else if (temp.includes('few clouds')){
    statusSvg = 'fewclouds';
} else if (temp.includes('scattered clouds')){
    statusSvg = 'scatteredclouds';
} else if (temp.includes('broken clouds')){
    statusSvg = 'brokenclouds';
} else if (temp.includes('shower rain')){
    statusSvg = 'showerrain';
} else if (temp.includes('rain')){
    statusSvg = 'rain';
} else if (temp.includes('thunderstorm')){
    statusSvg = 'thunderstorm';
} else if (temp.includes('mist')){
    statusSvg = 'mist';
}
        
     



let cityTemplate =`<div class="row justify-content-center align-items-center top-right-inner"><div class="col-12"><div class="${statusSvg} statusicon"></div><span>${temp}</span></div><div class="col-12"><span>Temp: ${Math.round(x.main.temp-273.15)}${c}</span></div><button id="toglle" class="toggledown"></button></div>`;
document.getElementById("top-right")!.innerHTML=cityTemplate;
let tglclick: HTMLElement = document.getElementById("toglle")!;
tglclick.addEventListener("click", toggleDropdown);


}

function toggleDropdown(): void{


  
        let city: string = (<HTMLInputElement>document.getElementById("search")).value;
    
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${answer.coord.lat}&lon=${answer.coord.lon}&appid=${appId}`).then(result => result.json())
        .then(data => {
            answer2 = data;
            let buildstring = `
            <div class='row moreInfoScroll'>
                <div class='col-3 extra'>
                    <span>Weather: </span>
                    <span>Day: </span>
                    <span>Night: </span>
                    <span>Evening: </span>
                    <span>Morning: </span>
                    <span>Min: </span>
                    <span>Max: </span>
                </div>
            `;
            data.daily.forEach((element: { weather: { description: any; }[]; temp: { day: number; night: number; eve: number; morn: number; min: number; max: number; }; }) => {
                buildstring = buildstring + `
                <div class='col-3 extra'>
                    <span>${element.weather[0].description}</span>
                    <span>${Math.round(element.temp.day-273.15)}${c}</span>
                    <span>${Math.round(element.temp.night-273.15)}${c}</span>
                    <span>${Math.round(element.temp.eve-273.15)}${c}</span>
                    <span>${Math.round(element.temp.morn-273.15)}${c}</span>
                    <span>${Math.round(element.temp.min-273.15)}${c}</span>
                    <span>${Math.round(element.temp.max-273.15)}${c}<span>
                </div>
                `
            });
        buildstring = buildstring + "</div>";
        moreInfos!.innerHTML = buildstring;
        moreInfos!.classList.add("expand");
        })
    

    

}
