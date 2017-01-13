class Celula {
	
	
	/* Inicializa a célula a partir do processo (monadologia) ao qual pertence,
	 * ao seu mundo e estado inicial. A posição inicial é definida ao ser
	 * adicionada ao mundo. Se o estado não for definido começa com zero.
	 */
	constructor(monadologia,mundo,estado){
		this.monadologia = monadologia;
		this.mundo = mundo;
		this.posicao = this.mundo.addCelula(this);
		this.zonaClara = null;
		if(estado!=null){
			this.estado = estado;
		} else {
			this.estado = 0;
		}
		this.proximoEstado = this.estado;
		//this.estadoAntigo = this.estado;
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
			if(this.posicao[0]==1 && this.posicao[1]==2){
				//alert(this.posicao+' i:'+i+' - zcp:'+this.zonaClara[i].posicao+' e:'+this.zonaClara[i].estado+' eA:'+this.zonaClara[i].estadoAntigo);
			}
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