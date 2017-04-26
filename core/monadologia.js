const ERR_LIMITE_MONADA = 0; //mônada fora do limite


class Monadologia {
	
	constructor(ui,tamanho,estadoInicial,classeCelula){
		this.ui = ui;
		this.geracao = 0;
		this.celulasAtivas = 0;
		this.estado = [];
		this.tamanho = tamanho;
		this.mundo = new Mundo(this,tamanho);
		this.classeCelula = Celula;
		if(classeCelula!=null){
			this.classeCelula = classeCelula;
		}
		this.inicializarCelulas();
		this.setEstadoInicialCelulas(estadoInicial);
		this.estado = this.getEstados();
		this.geracao = 0;
		
	}
	
	inicializarCelulas(){
		for(var i=0;i<this.tamanho[0];i++){
			for(var j=0;j<this.tamanho[1];j++){
				new this.classeCelula(this);
			}
		}
	}
	
	setEstadoInicialCelulas(estadoInicial){
		if(estadoInicial!=null){
			for(var e of estadoInicial){
				if(typeof e[0]==='function'){
					if(e[1]<this.tamanho[0] && e[2]<this.tamanho[1]){
						new e[0](this,e[3],[e[1],e[2]]);
					} else {
						console.log('Célula com posição inválida: ['+e[1]+','+e[2]+'].');
					}
				} else if(e[0]<this.tamanho[0] && e[1]<this.tamanho[1]){
					this.mundo.celulas[e[0]][e[1]].estado = e[2];
				} else {
					console.log('Célula com posição inválida: ['+e[0]+','+e[1]+'].');
				}
			}
		}
	}
	
	getEstados(){
		var estados = [];
		for(var i=0;i<this.mundo.celulas.length;i++){
			for(var j=0;j<this.mundo.celulas[i].length;j++){
				estados.push(this.mundo.celulas[i][j]);
			}
		}
		return estados;
	}
	
	
	proximo(){
		this.estado = [];
		for(var i=0;i<this.mundo.celulas.length;i++){
			for(var j=0;j<this.mundo.celulas[i].length;j++){
				var celulaAfetada = this.mundo.celulas[i][j].perceber();
				if(celulaAfetada!=null){
					this.estado.push(celulaAfetada);
				}
			}
		}
		for(var celula of this.estado){
			celula.setProximoEstado();
		}
		this.geracao += 1;
		return this.estado;
	}
	
	
}