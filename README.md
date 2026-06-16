# Analisador Sintático

## Descrição
Este projeto foi desenvolvido para a disciplina de Compiladores e tem como objetivo implementar um Analisador Sintático Preditivo LL(1) capaz de verificar se uma sentença pertence à linguagem definida por uma gramática livre de contexto.

A aplicação permite que o usuário insira uma sentença manualmente ou gere uma sentença válida automaticamente. Em seguida, o analisador realiza a validação sintática utilizando uma tabela de parsing LL(1) e exibe cada etapa do processo de reconhecimento.

Além da validação completa, o sistema oferece um modo de execução passo a passo, permitindo acompanhar detalhadamente as operações realizadas na pilha e na entrada durante a análise.

## Gramática Utilizada
S ::= aA | bB

A ::= cC | d

B ::= eA | f

C ::= g | ε
## Conjuntos FIRST

S = a, b

A = c, d

B = e, f

C = g, ε

## Conjuntos FOLLOW

S = $

A = $

B = $

C = $
## Como Executar
1. Baixe ou clone os arquivos do projeto.
2. Mantenha a estrutura de arquivos original.
3. Abra o arquivo `index.html` em qualquer navegador.
4. Digite uma sentença no campo de entrada ou utilize o botão Gerar para criar uma sentença válida.
5. Escolha uma das opções:
    * Próximo Passo: executa uma única etapa da análise.
    * Resolver: executa toda a análise automaticamente.
6. O sistema exibirá o resultado da validação e o histórico completo das ações realizadas.

Ou: https://buenocarlos.github.io/Compiladores/src/index.html

## Funcionamento
O analisador utiliza uma pilha para controlar o processo de derivação e uma tabela LL(1) para determinar qual produção deve ser aplicada em cada situação.

Durante a execução, são realizadas as seguintes etapas:

1. Inicialização da pilha com o símbolo inicial da gramática.
2. Leitura do símbolo atual da entrada.
3. Consulta da tabela de parsing.
4. Aplicação da produção correspondente.
5. Atualização da pilha.
6. Consumo dos símbolos terminais.
7. Aceitação ou rejeição da sentença.

Cada ação executada é registrada e exibida ao usuário, permitindo acompanhar todo o processo de análise sintática.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap

## Estrutura do Projeto
```text
Compiladores/
│
├── src/
│   ├── css/
│   │   ├── fonts.css
│   │   ├── main.css
│   │   └── root.css
│   │
│   ├── js/
│   │   └── main.js
│   │
│   └── index.html
│
└── README.md
```
##

## Autores

Projeto desenvolvido para a disciplina de Compiladores.

Alunos: Carlos Eduardo Bueno e João Carlos Jakaboski

Instituição: Universidade Regional Integrada do Alto Uruguai e das Missões - URI Erechim

Ano: 2026
