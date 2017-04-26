var corIgualEstado = false;

var cores = {
		'0': '#ffffff',
		'1': '#000000',
		'2': '#00ff00',
		'3': '#999999',
		'4': '#ff0000',
		'5': '#0000ff'
}



var linha = parseInt(ui.tamanho[0]);
var coluna = parseInt(ui.tamanho[1]);


var estadoInicial = [];

estadoInicial.push([10,10,'5........01:4-0:4-1:4|']);

for(var c=0;c<coluna;c++){
	estadoInicial.push([37,c,'1']);
}




ui.update(corIgualEstado,cores,estadoInicial,CelulaEnativa);
