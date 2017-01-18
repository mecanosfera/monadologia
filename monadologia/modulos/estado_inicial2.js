var corIgualEstado = false;

var cores = {
		0: '#ffffff',
		1: '#ff0000'
}





var estadoInicial = [
	[35,10,1],[35,11,1],[35,12,1],[35,13,1],[35,14,1],[35,15,1],[40,16,1],[36,17,1],[35,18,1],[35,19,1],[35,20,1],[40,21,1],[36,22,1],[35,23,1],[35,24,1],[35,25,1],[35,26,1],
	[90,26,1]
];//.concat(glider);

var linha = parseInt(ui.tamanho[0]/2);
var coluna = parseInt(ui.tamanho[1]/2);

var glider = [
	[linha,  coluna+1,1],
	[linha+1,coluna+2,1],
	[linha+2,coluna+0,1],[linha+2,coluna+1,1],[linha+2,coluna+2,1]
];

estadoInicial = estadoInicial.concat(glider);


//alert(estadoInicial);


ui.update(corIgualEstado,cores,estadoInicial);
