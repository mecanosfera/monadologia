//celula



class Celula {
	
	
	/* Inicializa a célula a partir do processo (monadologia) ao qual pertence,
	 * ao seu mundo e estado inicial. A posição inicial é definida ao ser
	 * adicionada ao mundo. Se o estado não for definido começa com zero.
	 */
	constructor(monadologia,estado,posicao){
		this.init(monadologia,estado,posicao)
	}
	
	init(monadologia,estado,posicao){
		this.monadologia = monadologia;
		this.mundo = monadologia.mundo;
		this.posicao = null;
		if(posicao!=null){
			this.posicao = posicao;
			this.mundo.addCelula(this);
		} else {
			this.posicao = this.mundo.addCelula(this);
		}
		this.zonaClara = null;
		if(estado!=null){
			this.estado = estado;
		} else {
			this.estado = 0;
		}
		this.proximoEstado = this.estado;
	}
	
	
	/*Define as oito células adjacentes que a célula pode perceber.*/
	setZonaClara(){
		var p0 = this.posicao[0];
		var p1 = this.posicao[1];
		this.zonaClara=[];
		this.zonaClara[0] = this.mundo.getCelula(p0-1,p1); 	// Norte		NO(-1,-1) N(-1,0) NE(-1,+1)
		this.zonaClara[1] = this.mundo.getCelula(p0-1,p1+1);// Nordeste		O ( 0,-1) C( 0,0) L ( 0,+1)
		this.zonaClara[2] = this.mundo.getCelula(p0,p1+1); 	// Leste		SO(+1,-1) S(-1,0) SE(+1,+1)
		this.zonaClara[3] = this.mundo.getCelula(p0+1,p1+1);// Sudeste
		this.zonaClara[4] = this.mundo.getCelula(p0+1,p1);	// Sul
		this.zonaClara[5] = this.mundo.getCelula(p0+1,p1-1);// Sudoeste
		this.zonaClara[6] = this.mundo.getCelula(p0,p1-1);	// Oeste
		this.zonaClara[7] = this.mundo.getCelula(p0-1,p1-1);// Noroeste
		
	}
	
	
	/* É onde se encontra o princípio interno da célula que define como deve
	 * acontecer a sua mudança de estado. Na primeira vez que é executada
	 * define a zona clara. Caso haja mudança de estado a célula retorna a si
	 * mesma, caso não retorna nulo.
	 */
	perceber(){
		if(this.zonaClara==null){
			this.setZonaClara();
		}
		var totalVizinhos = 0;
		for(var i=0;i<this.zonaClara.length;i++){
			totalVizinhos += this.zonaClara[i].estado;
		}
		if(this.estado==1 && (totalVizinhos<2 || totalVizinhos>3)){
			this.proximoEstado=0;
			return this;
		} else if (this.estado==0 && totalVizinhos==3){
			this.proximoEstado=1;
			return this;
		}
		return null;
	}
	
}


class CelulaImortal extends Celula{
	
	
	init(monadologia,estado,posicao){
		super.init(monadologia,estado,posicao);
		this.estado=3;
	}
	
	perceber(){
		return null;
	}
	
}

class CelulaDoidona extends Celula{
	
	
	init(monadologia,estado,posicao){
		super.init(monadologia,estado,posicao);
		if(this.estado==0){
			this.estado = 1;
		} else {
			this.estado = 2;
		}
	}
	
	
	perceber(){
		if(this.zonaClara==null){
			this.setZonaClara();
		}
		var totalVizinhos = 0;
		for(var i=0;i<this.zonaClara.length;i++){
			totalVizinhos += this.zonaClara[i].estado;
		}
		if(this.estado==2 && (totalVizinhos<2 || totalVizinhos>3)){
			this.proximoEstado=1;
			return this;
		} else if (this.estado==1 && totalVizinhos==3){
			this.proximoEstado=2;
			return this;
		}
		return null;
	}
}

class Glider {
	
	constructor(propriedades){
		this.init(propriedades)
	}
	
	init(propriedades){
		if(typeof propriedades[0] === 'function'){
			this.tipoCelula = propriedades[0];
			this.linha = propriedades[1];
			this.coluna = propriedades[2];
			this.estado = propriedades[3];
		} else {
			this.tipoCelula = null;
			this.linha = propriedades[0];
			this.coluna = propriedades[1];
			this.estado = propriedades[2];
		}
		this.setEstado();
	}
	
	setEstado(){
		if(this.estado==0){
			this.coordenadas = [
				[this.linha+0,this.coluna+1,1],
				[this.linha+1,this.coluna+2,1],
				[this.linha+2,this.coluna+0,1],[this.linha+2,this.coluna+1,1],[this.linha+2,this.coluna+2,1]
			];
		} else if (this.estado==1){
			this.coordenadas = [
				[this.linha+0,this.coluna+0,1],[this.linha+0,this.coluna+2,1],
				[this.linha+1,this.coluna+1,1],[this.linha+1,this.coluna+2,1],
				[this.linha+2,this.coluna+1,1]
			];
		} else if (this.estado==2){
			this.coordenadas = [
				[this.linha+0,this.coluna+2,1],
				[this.linha+1,this.coluna+0,1],[this.linha+1,this.coluna+2,1],
				[this.linha+2,this.coluna+1,1],[this.linha+2,this.coluna+2,1]
			];
		} else {
			this.coordenadas = [
				[this.linha+0,this.coluna+0,1],
				[this.linha+1,this.coluna+1,1],[this.linha+1,this.coluna+2,1],
				[this.linha+2,this.coluna+0,1],[this.linha+2,this.coluna+1,1]
			];
		}
	}
	
	append(estados){
		if(this.tipoCelula==null){
			for(var i=0;i<this.coordenadas.length;i++){
				estados.push(this.coordenadas[i]);
			}
		} else {
			for(var i=0;i<this.coordenadas.length;i++){
				estados.push([this.tipoCelula,this.coordenadas[i][0],this.coordenadas[i][1],this.coordenadas[i][2]]);
			}
		}
	}
	
}



