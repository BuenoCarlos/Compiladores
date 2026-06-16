// Gramática: 
// S := aA | bB
// A := cC | d
// B := eA | f
// C :=  g | ε

// First:
// S = a, b
// A = c, d
// B = e, f
// C = g, ε
           
// Follow:
// S = $
// A = $
// B = $
// C = $

class NaoTerminal {
    constructor(key, list){
        this.key = key;
        this.list = list
    }
}

class Producao{
    constructor(naoTerminal, inicial, producao){
        this.naoTerminal = naoTerminal;
        this.inicial = inicial;
        this.producao = producao;
    }
}

const epsilon = "ε";

let iteracao = 1;
let pilha = "$S";
let entrada = "";
let fim = false;
let producaoGlobal = [];
let palavraEntrada = document.getElementById("tokenInput");
let tabela = document.getElementById("resolutionTable");

// Gerador de sentença
function gerarSentenca(){
    let completo = false;
    let sentenca = "S";
    let nTerminal = "S";
    let passos = 0;

    while(!completo){
        for(let i in producaoGlobal){
            let naoTerminal = producaoGlobal[i];
            if(naoTerminal.key == nTerminal){
                let rand = Math.floor(Math.random() * naoTerminal.list.length);
                let prod = naoTerminal.list[rand];

                if(prod.producao !== epsilon){
                    sentenca = sentenca.replace(nTerminal, prod.producao);
                } else {
                    sentenca = sentenca.replace(nTerminal, '');
                }

                let encontrado = /([A-Z])/g.exec(sentenca);
                
                if(encontrado == null){
                    completo = true;
                } else {
                    nTerminal = encontrado[0];
                }
            }
        }
        passos++;

        if(passos >= 10){
            sentenca = "S";
            nTerminal = "S";
            passos = 0;
            completo = false;
        }
    }

    palavraEntrada.value = sentenca;
    iniciarAutomato();
}

function iniciarAutomato(){
    clearTable();
    
    let header = tabela.createTHead();
    let row = header.insertRow(-1);
    
    row.appendChild(columnHTML("th", " "));
    row.appendChild(columnHTML("th", "Pilha"));
    row.appendChild(columnHTML("th", "Entrada"));
    row.appendChild(columnHTML("th", "Ação"));
}

function iniciarProducao(nTerminal, inicial, producao){
    let existe = false;
    let naoTerminal;
    
    for(let i in producaoGlobal){
        naoTerminal = producaoGlobal[i];
        existe = naoTerminal.key == nTerminal;
        if(existe){
            producaoGlobal.splice(i, 1);
            break;
        }
    }

    if(!existe){
        naoTerminal = new NaoTerminal(nTerminal, []);
    }

    naoTerminal.list.push(new Producao(naoTerminal, inicial, producao));
    return naoTerminal;
}

// Solucao
function resolver(pilha, char){
    for (let i in producaoGlobal){
        let naoTerminal = producaoGlobal[i];
        if (naoTerminal.key == pilha) {
            for (let j in naoTerminal.list) {
                let producaoGlobal = naoTerminal.list[j];
                if (producaoGlobal.inicial.includes(char) && producaoGlobal.naoTerminal.key == pilha) {
                    return producaoGlobal;
                } 
            }
        }
    }
    return false;
}

function proximoPasso() {
    let acao = "";
    if (palavraEntrada.value.length > 0) {
        if (fim) {
            iniciarAutomato();
        }

        if (!entrada) {
            entrada = palavraEntrada.value + "$";
        }

        let charPilha = pilha.slice(-1);
        let pilhaTabela = pilha;
        let entradaTabela = entrada;
        pilha = pilha.slice(0, -1);

        iteracao++;

        if (charPilha == entrada.charAt(0) && charPilha == "$") {
            acao = "Aceito em " + iteracao + " passo(s).";
            fim = true;
            alert(acao);
        } else if (charPilha && charPilha == charPilha.toUpperCase()) {
            let producaoGlobal = resolver(charPilha, entrada.charAt(0));
            if (producaoGlobal) {
                acao = producaoGlobal.naoTerminal.key + " → " + producaoGlobal.producao;
                if (producaoGlobal.producao !== epsilon) {
                    pilha += producaoGlobal.producao.split("").reverse().join("");
                }
            } else {
                fim = true;
                acao = "Rejeitado em " + iteracao + " passo(s).";
                alert(acao);
            }
        } else if (charPilha && charPilha == entrada.charAt(0)) {
            acao = "Lê " + entrada.charAt(0);
            entrada = entrada.substring(1);
        } else {
            fim = true;
            acao = "Rejeitado em " + iteracao + " passo(s).";
            alert(acao);
        }

        inserirLinha(pilhaTabela, entradaTabela, acao);
        return acao;
    } else {
        fim = true;
        alert("Insira uma sentença!");
    }
}

function resolverCompleto() {
    let acao;
    iniciarAutomato();
    while (!fim) {
        acao = proximoPasso();
    }
}

//Helpers
function columnHTML(type, text, cssClass){
    let cell = document.createElement(type);
    cell.className = cssClass;
    cell.innerHTML = text;
    return cell;
}

function inserirLinha(pilha, entrada, acao){
    let row = tabela.insertRow(-1);
    row.appendChild(columnHTML("td", iteracao));
    row.appendChild(columnHTML("td", pilha));
    row.appendChild(columnHTML("td", entrada));
    row.appendChild(columnHTML("td", acao));

    tabela.scrollIntoView({ behavior: "smooth", block: "end" });
}

function clearTable(){
    iteracao = 0;
    pilha = "$S";
    entrada = "";
    acao = "";
    fim = false;
    
    while(tabela.hasChildNodes()){
        tabela.removeChild(tabela.lastChild);
    }
}

// Chamadas iniciais
iniciarAutomato();

// Mapeamento da tabela de parsing
producaoGlobal.push(iniciarProducao("S", ["a"], "aA"));
producaoGlobal.push(iniciarProducao("S", ["b"], "bB"));

producaoGlobal.push(iniciarProducao("A", ["c"], "cC"));
producaoGlobal.push(iniciarProducao("A", ["d"], "d"));

producaoGlobal.push(iniciarProducao("B", ["e"], "eA"));
producaoGlobal.push(iniciarProducao("B", ["f"], "f"));

producaoGlobal.push(iniciarProducao("C", ["g"], "g"));
producaoGlobal.push(iniciarProducao("C", ["$"], epsilon));