linha=0
col=0
let palavra =""

function validarPalavra(){
    if(linha==5){
        temp = palavra + 'z'
    }else{
        temp = palavra
    }
    
    var settings = {
        "url": "https://wordle-noe.herokuapp.com/ver",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json"
        },
        "data": JSON.stringify({
          "palavra": temp
        }),
      };
      
      $.ajax(settings).done(function (response) {
        validar(response);
        console.log(response);
      });
}
function consultarEstatistica(num){
    var settings = {
        "url": "https://wordle-noe.herokuapp.com/estatistica",
        "method": "GET",
        "timeout": 0,
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        if(num == true){
            alert('Voce venceu!!!\n'+response)
            document.getElementById('hidden').style.display = 'block';
        }else{
            alert('Voce perdeu!!!\n'+response)
            document.getElementById('hidden').style.display = 'block';
        }
      });

/*
    fetch("/estatistica")
	.then(response => response.text())
	.then(result => alert(result))
	.catch(error => console.log('error', error));

    const retorno = await fetch('/estatistica')
    const estatistica = retorno.text()//await retorno.json();
    console.log(estatistica);
    */
   
}

/*
function enviar() {
    fetch('https://reqres.in/api/users',palavra)
    .then(function(response) {
        console.log(response);
    })
}
*/
function Digitar(tecla) {
    if(col != 5){
    var tb = document.getElementById('tabela')
    tb.rows[linha].cells[col].innerText = tecla;
    palavra = palavra + tecla;
    
    }
    console.log(palavra);
    console.log(col)
    if(col != 5){
        col++;
    }
}

function Remove(tecla){
    if(col!=0){
        var tb = document.getElementById('tabela')
        tb.rows[linha].cells[col-1].innerText = tecla;
        col--;
        temp = "";
        for(i=0;i<col;i++){
            temp = temp + palavra[i];
        }
        palavra = temp;
        console.log(col)
    }
}

function Enter(){
    if(col == 4 || col == 5){
        validarPalavra();
    }else{
        alert("insira todos as caixinhas da linha")
    }
}

function validar(servResp){
    var tb = document.getElementById('tabela')
    console.log(servResp[0])
    for(i=0;i<5;i++){
        if(servResp[i] == 'v'){
            tb.rows[linha].cells[i].style.backgroundColor = 'green'
        }else if(servResp[i] == 'x'){
            tb.rows[linha].cells[i].style.backgroundColor = 'yellow'
        }else if(servResp[i] == 'f'){
            tb.rows[linha].cells[i].style.backgroundColor = 'red'
        }
    }
    if(servResp == 'vvvvv'){
        consultarEstatistica(true);
    }else if (linha == 5){
        consultarEstatistica(false); 
    }else{
        linha++;
        col=0;
        palavra = ""
    }
}