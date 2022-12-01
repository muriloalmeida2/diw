let url = "https://api.rawg.io/api/games?key=a3e2955619954b6e81748cddaca76808";
let video_url= "https://api.rawg.io/api/games/3498/movies?key=a3e2955619954b6e81748cddaca76808";
let creatorsUrl="https://api.rawg.io/api/creators?key=a3e2955619954b6e81748cddaca76808";
let plataformaUrl = "https://api.rawg.io/api/platforms?key=a3e2955619954b6e81748cddaca76808";

const req = new XMLHttpRequest();

req.onreadystatechange = function(){
    if(req.readyState==4){
        inserirDados(this.responseText);
    }  
}
req.open("GET", url);
req.send();



function detalhes(idjogo){
    localStorage.setItem("jogo",idjogo);
    window.location.href="detalhes.html";
    
}
function pesquisa(){
    let resultados=document.getElementById("Resultados")
    let input = document.getElementById("barra")
    console.log (input.value)


    req.onreadystatechange = function(){
        if(req.readyState==4){
            resultados.innerHTML=""
            let resposta = JSON.parse(this.responseText)
            console.log(this.responseText);

            for (let i=0;i<10;i++){
                resultados.innerHTML+=` <p onclick="detalhes(${resposta.results[i].id})"> ${resposta.results[i].name}</p>
                `
            }
        }
       
    }
    if(input.value!=""){
    req.open("GET", `https://api.rawg.io/api/games?key=a3e2955619954b6e81748cddaca76808&search= ${input.value}` );
    req.send();
    }
    else {
        resultados.innerHTML=""
    }
   
}

function inserirDestaques(){
    const req2 = new XMLHttpRequest();
    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let resposta = JSON.parse(this.responseText);
            destaques = document.querySelector("#DESTAQUES > div")

            for(let i = 0; i < 1; i++){
                destaques.innerHTML += `
                <div class="mySlides">
                    <iframe width="480" height="300" src="${resposta.results[i].data[480]}" title="Pantera Negra: Wakanda para Sempre | Marvel Studios | Teaser Trailer Oficial Dublado" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <div>
                        <h2>${resposta.results[i].name}</h2>
                    </div>
                </div>
                `
            }

            destaques.innerHTML += `
                <div class="w3-right w3-hover-text-khaki" onclick="plusDivs(1)">&#10095;</div>
            `
            showDivs(slideIndex);
        }
    }
    req2.open("GET", video_url);
    req2.send();
}

function inserirDados(resposta){
    inserirDestaques()
    inserirPlataformas()

    req.onreadystatechange = function(){
        if(req.readyState==4){
            let x = JSON.parse(this.responseText)
            let creators= document.getElementById("creators")
            console.log(x)
            for (let i=0; i<4; i++){
                creators.innerHTML+=
                `
                    <div class="Cards_lancamento">
                        <h3>${x.results[i].name}</h3>
                        <img src="${x.results[i].image}" style="width:250px; heigth:250px;">
                        <ul>
                            <li>Criador de: ${x.results[i].games[4].name}</li>
                        </ul>             
                    </div>
                `
            }
        }
    }
    req.open("GET", "https://api.rawg.io/api/creators?key=a3e2955619954b6e81748cddaca76808");
    req.send();
  
    
    console.log(resposta)
    console.log(JSON.parse(resposta))
    resposta=JSON.parse(resposta)
    let cardPlataforma = document.querySelector("#PLATAFORMAS .Cards_Plataformas")
    let cardLancamentos = document.querySelector("#LANCAMENTOS .Cards_lancamento")
    let index = 0

    for (let i=0; i<3; i++){
        cardPlataforma.innerHTML+=`
                <div class="Card_Plataforma">
                    <h3>${resposta.results[i].name}</h3> 
                    <img src="${resposta.results[i].background_image}" alt="Disney+">
                    <ul>
                        <li>Rating: ${resposta.results[i].metacritic}</li>
                        <li>Data de lançamento: ${resposta.results[i].released}</li>
                    </ul>
                    <a href="#">Mais Detalhes</a>
                </div>
        `
    }
    
}
 function inserirPlataformas(){
    
    const req2 = new XMLHttpRequest();

    req2.onreadystatechange = function(){
        if(req2.readyState==4){
            let y = JSON.parse(this.responseText)
            let plat = document.querySelector("#PUBLISHER .Cards_Publishers")

            for(let i = 0; i < 6; i++){
                plat.innerHTML += `
                <div class="Cards_Publisher">
                    <h3><strong>${y.results[i].name}</strong></h3>
                    <img src="${y.results[i].image_background}" alt="${y.results[i].name}" style="width: 400px; height: 200px; padding:10px;">
                    
                   
                </div>
                `
            }
        }
    }
    
    req2.open("GET", plataformaUrl);
    req2.send();
}