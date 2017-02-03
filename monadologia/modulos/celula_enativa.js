class CelulaEnativa extends Celula{
	
	init(monadologia,estado,posicao){
		super.init(monadologia,estado,posicao);
		this.setRegras();
		if(estado===null || estado===undefined){
			this.estado = '0';
		} else {
			this.estado = estado + '';
			
		}
		this.proximoEstado = this.estado;
		
		//alert(this.estado);
	}
	
	setRegras(){
		this.regras = {
				'0':{
					'3':'1'
				},
				'1':{
					'4':'0',
					'5':'0',
					'6':'0',
					'7':'0',
					'8':'0',
					'1':'0',
					'2':'1',
					'3':'1'
				}
		}
	}
	
	
	calcularDNA(){
		if(this.zonaClara==null){
			this.setZonaClara();
		}
		var dna = '';
		for(var i=0;i<this.zonaClara.length;i++){
			var v = this.zonaClara[i];
			dna+= v.estado;
		}
		return dna;
	}
	
	
	perceber(){
		var dna = this.calcularDNA();
		var numVizinhos = 0;
		var proximo = null;
		
		for(var l=0;l<8;l++){
			var char = dna[l];
			if(dna[l]==='1'){
				numVizinhos++;
			}
		}
		if(this.regras[this.estado[0]]!=undefined){
			if(this.regras[this.estado[0]][numVizinhos+'']!=undefined){
				this.proximoEstado = this.regras[this.estado[0]][numVizinhos+''];
				if(this.proximoEstado!=this.estado){
					proximo = this;
				}
			}
		}
		
		if(dna.length>8){
			this.processarDNA(dna.substr(8));
		}
		return proximo;
		
	}
	
	processarDNA(dna){
		var dnas = dna.replace(/\./g,'').split('-');
		//alert(dnas);
		
		for(var i=0;i<dnas.length;i++){
			var regra = dnas[i];
			var estado = regra[0];
			var qtde = 0;
			var c = 1;
			while(regra[c]!=':'){
				qtde++;
				c++;
			}
			c++;
			var novoEstado = regra[c];
			if(this.regras[estado]===undefined){
				this.regras[estado] = {qtde:novoEstado};
			} else {
				this.regras[estado][qtde] = novoEstado;
			}
		}
			
	}
			
}