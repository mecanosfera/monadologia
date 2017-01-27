//estado inicial

var corIgualEstado = false;

var cores = {
		0: '#ffffff',
		1: '#000000',
		2: '#ff0000',
		3: '#ffff00',
		4: '#f0f0f0',
		5: '#cf0fff'
}

var linhas = ui.tamanho[0];
var colunas = ui.tamanho[1];


var estadoInicial = [
	[35,10,1],[35,11,1],[35,12,1],[35,13,1],[35,14,1],[35,15,1],[35,16,1],[35,17,1],[35,18,1],[35,19,1],[35,20,1],[35,21,1],[35,22,1],[35,23,1],[35,24,1],[35,25,1],[35,26,1],
	[CelulaImortal,90,26,1]
];

for(var i=0;i<colunas;i++){
	estadoInicial.push([CelulaDoidona,37,i,1]);
}



var glider1 = new GliderCerebral([1,3,1]);
glider1.append(estadoInicial);

/*var gliderDoidao = new Glider([CelulaDoidona,10,11,0]);
gliderDoidao.append(estadoInicial);*/

ui.update(corIgualEstado,cores,estadoInicial);
