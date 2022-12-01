const req = new XMLHttpRequest();
req.onreadystatechange = function(){
    if(req.readyState==4){
        let entrada = document.getElementById("entrada")
        resposta = JSON.parse(this.responseText)

        entrada.innerHTML=`
            <img src="${resposta.background_image}" alt="">
            <p>${resposta.description}</p>
        `
    }  
}
req.open("GET", `https://api.rawg.io/api/games/${localStorage.getItem("jogo")}?key=9f0aabf48f184d04ba05900ec2f4778e`);
req.send();