const appId: string="9ca27b3b3c74c643772ca6556ca4a8a7";
//const statusSvg;
let answer: any;
let statusSvg: string;
let answer2: any;
const down: HTMLElement  = document.getElementById("down")!;
const c: string= '&#8451;';
const moreInfos: HTMLElement | null = document.getElementById("moreInfos");
const go: HTMLElement | null =  document.getElementById("go")!;
const add: HTMLElement | null =  document.getElementById("add")!;
const next: HTMLElement | null =  document.getElementById("NextPage")!;
go.addEventListener("click", function(){getWeather((<HTMLInputElement>document.getElementById("search")).value )});
add.addEventListener("click", addFav);
next.addEventListener("click", getWeatherFav);

let city:string;

function getWeather(x:string){
    

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${x}&appid=${appId}`).then(result => result.json())
    .then(data => {
        createCards(data);
        answer = data;
        console.log(data);

    });

}

function getWeatherFav(){
    
    let x :string;

    let favs : Array<any> = [];
    
    fetch('https://extreme-ip-lookup.com/json/')
    .then( res => res.json())
    .catch(function(error){
        errorFetch(error);
    })
    .then(response => {
      let country = response.country;
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${appId}`).then(result => result.json())
      .then(data => {
            
        document.getElementById("location")!.innerHTML=`<div class="justify-content-center align-items-center">
        <div class="col-12"><div class="${statusSvg} statusicon">
        </div><p>Land: ${country} ${Math.round(data.main.temp-273.15)} Grad</p>
        </div>
        </div>`;
        })
        .catch(function(error){
            errorFetch(error);
        });
    });
    


    favs[0] = window.localStorage.getItem('Fav');
    favs[1] = window.localStorage.getItem('Fav1');
    favs[2] = window.localStorage.getItem('Fav2');

    for (let index = 0; index < favs.length; index++) {
        if (favs[index]!==null){
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${favs[index]}&appid=${appId}`).then(result => result.json())
            .catch(function(error){
                errorFetch(error);
            })
            .then(data => {
                createCard(data);
                answer = data;
                console.log(data);       
            })
        }   
    }
    if(document.getElementById('second')!.getBoundingClientRect().width>0){
        document.getElementById('second')!.style.width = "0";
    } else {
        document.getElementById('second')!.style.width = "100vw";
    }

}


function errorFetch(x: any){
    alert(`Ein Fehler ist aufgetreten: ${x}`);
}


function createCard(x:any) {
    let favs = document.getElementsByClassName("fav")!;
    
    let cards = Array.prototype.slice.call(favs);
    let card: string;
    let tmp1 = x.weather[0].description;
    statusSvg = getIcon(tmp1);
    card =`<div class="row justify-content-center align-items-center top-right-inner">
    <div class="col-12"><div class="${statusSvg} statusicon">
    </div>
    <span>${x.name}</span>
    </div>
    <div class="col-12">
    <span>Temp: ${Math.round(temp(x.main.temp))}${c}</span>
    </div>
    </div>`;
    
    
    let index:number =0;
 
    
    for(let i=0;i<cards.length+1;i++) {

        if(cards[i].innerHTML===""){
            index = i;
            i = cards.length+1;
        } else if (i === 3){
            index = 0;
        }

    }
    cards[index].innerHTML = card;

}

function temp(x: number){
    return x-273.15
}


function addFav(){
     
    if (window.localStorage.getItem('Fav')===null){
        window.localStorage.setItem('Fav',answer.name);
    } else if (window.localStorage.getItem('Fav1')===null){
        window.localStorage.setItem('Fav1',answer.name);
    } else if (window.localStorage.getItem('Fav2')===null) {
        window.localStorage.setItem('Fav2',answer.name);
    } else {
        window.localStorage.setItem('Fav2',window.localStorage.getItem('Fav1')!);
        window.localStorage.setItem('Fav1',window.localStorage.getItem('Fav')!);
        window.localStorage.setItem('Fav',answer.name);
    }
}


function getIcon(x :any){
    if (x.includes('snow')){
        statusSvg = 'lightsnow';
    } else if (x.includes('clear sky')){
        statusSvg = 'clearsky';
    } else if (x.includes('few clouds')){
        statusSvg = 'fewclouds';
    } else if (x.includes('scattered clouds')){
        statusSvg = 'scatteredclouds';
    } else if (x.includes('broken clouds')){
        statusSvg = 'brokenclouds';
    } else if (x.includes('shower rain')){
        statusSvg = 'showerrain';
    } else if (x.includes('rain')){
        statusSvg = 'rain';
    } else if (x.includes('thunderstorm')){
        statusSvg = 'thunderstorm';
    } else if (x.includes('mist')){
        statusSvg = 'mist';
    }
    return statusSvg;
}

function createCards(x:any){
   let temp = x.weather[0].description;

    statusSvg = getIcon(temp);
     



let cityTemplate =`<div class="row justify-content-center align-items-center top-right-inner"><div class="col-12"><div class="${statusSvg} statusicon"></div><span>${temp}</span></div><div class="col-12"><span>Temp: ${Math.round(x.main.temp-273.15)}${c}</span></div><button id="toglle" class="toggledown"></button></div>`;
document.getElementById("top-right")!.innerHTML=cityTemplate;
let tglclick: HTMLElement = document.getElementById("toglle")!;
tglclick.addEventListener("click", toggleDropdown);
add!.style.visibility = "unset";

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
