const palavras = require('./dicionario.js');
const express = require('express');
const cors = require('cors')
const cronJob = require('cron').job;
const app = express();         
const bodyParser = require('body-parser')
const port = 3000; //porta padrão
let vit = 5;
let derr = 3;

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

//definindo palavra
let palavra = randPalavra();
//let palavra = 'campo'
console.log(palavra);

//Rotas de páginas
app.use("/css",express.static("./css"))

app.use("/imgs",express.static("./imgs"))

app.use("/scripts",express.static("./scripts"))

app.use(express.static("./public"))

app.use(cors())

app.use(bodyParser.json());
//rotas
app.get('/estatistica', function (req, res) {
  res.send(calcEstatistica());
});

app.post('/ver', function (req, res) {
  const body = req.body.palavra;
  console.log(body);
  resp=""
  for(i=0;i<5;i++){
    ver = true;
    if(body[i]==palavra[i]){
    resp = resp + 'v';
    ver = false;
    }else if(ver == true){
      for(j=0;j<5;j++){
        if(j!=i){
          if(body[i]==palavra[j]){
            resp  = resp + 'x';
            ver == false;
            j=10;
          }
        }
      }
    }
    if(!resp[i]){
      resp  = resp + 'f'
    }
  }
  if(resp == 'vvvvv'){
    vit = vit + 1;
  }else if(body[5] == 'z'){
    derr =  derr + 1;
  }
  console.log(resp);
  res.json(resp);
});

//funcoes
cronJob('00 00 00 * * *', () => { //muda toda meia noite a palavra
  palavra = randPalavra();
  vit = 0;
  derr = 0;
	console.log(palavra);
}, null, true);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function randPalavra(){
    return palavras()[getRandomInt(0,1000)];
}

function calcEstatistica(){
  var total = vit + derr;
  var taxa = vit / total;
  taxa = taxa * 100;
  return("Vitorias:"+vit+" Derrotas:"+derr+" Winrate global:"+taxa+"%");
}