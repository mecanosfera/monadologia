/************************
 * 						*
 *	TIPOS DE VARIÁVEIS	*
 * 						*
 ************************/


var NumeroInteiro = 1; //Também conhecido como "Integer" = 2,3,4,5.

var NumeroDecimal = 0.1; //Também conhecido como "Float" = 0.4, 0.0000015, 123.456

var Boolean_ = true; // Possui apenas dois valores, verdadeiro ou falso = true, false.

var String_ = "letras e palavras"; //Todo conteúdo textual. Deve ser colocado entre aspas, "", ou aspas simples ''.

var Nulo = null; //Valor único. Designa uma variável com valor nulo.

var Indefinido = undefined; //Valor de uma variável que foi declaradada mas ainda não foi inicializada. É diferente do valor nulo, pois neste caso a variável foi inicializada.

var NaoEhUmNumero = NaN; //Representa algum valor numérico impossível, como uma divisão por zero.

var Objeto = {
		array: [1,"coleção",'de',true,null,'variáveis'],
		funcao: function(){alert('Olá mundo!')}
}


/****************************
 * 							*
 *	OPERAÇÕES COM VARIÁVEIS	*
 * 							*
 ****************************/

 
var OperacoesNumeros = 1 + 2 - 3 * 4 / 0.5 + 6 % 7;

var OperacoesBooleanas = true == false != true;

var OperacoesStrings = "uma"+" "+"palavra "+"outra";

var OperacoesArrays = [1,2,3].concat(4,5,6);


//OPERAÇÕES DE COMPARAÇÃO

var IgualdadeEntreBooleans1 = false == false;
var IgualdadeEntreBooleans2 = false == false == true;
var IgualdadeEntreBooleans3 = false == true;
var IgualdadeEntreBooleans4 = true == true;

var IgualdadeEntreNumeros1 = 2 == 2;
var IgualdadeEntreNumeros2 = 2 == 2.0;

var IgualdadeEntreStrings1 = 'um' == "um";
var IgualdadeEntreStrings2 = 'dois' == 'Dois';

var IgualdadeEntreArrays1 = [1,3,2] == [1,2,3];
var IgualdadeEntreArrays2 = [1,2,3] == [1,2,3];
var Array1 = [1,2,3];
var Array2 = Array1;
var IgualdadeEntreArrays3 = Array1 == Array2;

var IgualdadeMista1 = 1 == true;
var IgualdadeMista2 = 0 == false;
var IgualdadeMista3 = 1 == '1';
var IgualdadeMista4 = '0' == false;
var IgualdadeMista5 = 'true' == true;
var IgualdadeMista6 = 'etc' == true;
var IgualdadeMista7 = 'etc' == false;
var IgualdadeMista8 = '' == false;

var IgualdadeEstrita = 1 === true;

var Desigualdade1 = 1 != 2;
var Desigualdade2 = true != true;
var Desigualdade3 = false != true;
var Desigualdade3 = false != 0;

var DesigualdadeEstrita = false !== 0;


//OPERAÇÕES DE COMPARAÇÃO

var Maior1 = 2>1;
var Maior2 = 1>2;

var Menor1 = 2<1;
var Menor2 = 1<2;

var MaiorOuIgual1 = 2>=2;
var MaiorOuIgual2 = 3>=2;

var MenorOuIgual1 = 2<=2;
var MenorOuIgual2 = 3<=2;

