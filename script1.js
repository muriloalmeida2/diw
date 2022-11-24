let url = "https://api.rawg.io/api/games?key=a3e2955619954b6e81748cddaca76808";
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
    req.open("GET", `https://api.rawg.io/api/games?key=9f0aabf48f184d04ba05900ec2f4778e&search= ${input.value}` );
    req.send();
    }
    else {
        resultados.innerHTML=""
    }
   
}

function inserirDados(resposta){
    
    /*req.onreadystatechange = function(){
        inserirDados(this.responseText);
    }
    
    req.open("GET", url);
    req.send();*/
    
    console.log(resposta)
    console.log(JSON.parse(resposta))
    resposta=JSON.parse(resposta)
    let cardPlataforma = document.querySelector("#PLATAFORMAS .Cards_Plataformas")
    let cardLancamentos = document.querySelector("#LANCAMENTOS .Cards_lancamento")
/*
    for (let i=0; i<4; i++){
        cardLancamentos.innerHTML+=`
            <div class="Card_lancamento">
                <div class="Info">
                    <p><strong>${resposta.results[i].name}</strong></p>
                    <p><strong>${resposta.results[i].metacritic}</strong></p>
                </div>
                <iframe width="300" height="150" src="https://api.rawg.io/api/games/${resposta.result[i].id}/movies?key=9f0aabf48f184d04ba05900ec2f4778e" title="Homem-Aranha: Sem Volta Para Casa | Trailer Teaser Oficial Legendado" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `
    }
 */

    for (let i=0; i<3; i++){
        cardPlataforma.innerHTML+=`
                <div class="Card_Plataforma">
                    <h3>${resposta.results[i].name}</h3> 
                    <img src="${resposta.results[i].background_image}" alt="Disney+">
                    <ul>
                        <li>Rating: ${resposta.results[i].metacritic}</li>
                        <li>Data de lançamento: ${resposta.results[i].released}</li>
                    </ul>
                    <a href="#">Mais Detalhes...</a>
                </div>
        `
    }
    
}