//celula



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
			this.estado = '000000';
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
		var r = 0;
		var g = 0;
		var b = 0;
		
		
		var totalVizinhos = 0;
		for(var i=0;i<this.zonaClara.length;i++){
			var zc = this.zonaClara[i].estado;
			if(zc.length==6){
				r += parseInt('0x'+zc[0]+zc[1]);
				g += parseInt('0x'+zc[2]+zc[3]);
				b += parseInt('0x'+zc[4]+zc[5]);
			} else if (zc.length==3){
				r += parseInt('0x'+zc[0]);
				g += parseInt('0x'+zc[1]);
				b += parseInt('0x'+zc[2]);
			}
		}
		
		this.proximoEstado = parseInt(r/8).toString(16)+parseInt(g/8).toString(16)+parseInt(b/8).toString(16);
		return this;
	}
	
}
