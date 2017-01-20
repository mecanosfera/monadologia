var corIgualEstado = false;

var cores = {
		0: '#ffffff',
		1: '#000000'
}

var estadoInicial = [
	[0,1,1],
	[1,2,1],
	[2,0,1],[2,1,1],[2,2,1]
];

var glider1 = [
	[0,0,1],[0,2,1],
	[1,1,1],[1,2,1],
	[2,1,1]
];

var glider2 = [
	[0,2,1],
	[1,0,1],[1,2,1],
	[2,1,1],[2,2,1]
];

var glider3 = [
	[0,0,1],
	[1,1,1],[1,2,1],
	[2,0,1],[2,1,1]
];




ui.update(corIgualEstado,cores,estadoInicial);
