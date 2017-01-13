var monada1 = new Monada(monad,mundo,0);
monada1.perceber();


class Monada {
	
	
	/* Inicializa a mônada a partir do processo (monadologia) ao qual pertence,
	 * ao seu mundo e estado inicial. A posição inicial é definida ao ser
	 * adicionada ao mundo. Se o estado não for definido começa com zero.
	 */
	constructor(monadologia,mundo,estado){
		this.monadologia = monadologia;
		this.mundo = mundo;
		this.posicao = this.mundo.addMonada(this);
		this.zonaClara = null;
		if(estado!=null){
			this.estado = estado;
		} else {
			this.estado = 0xFFFFFF;
		}
	}
	
	
	/*Define as oito mônadas adjacentes que a mônada pode perceber.*/
	setZonaClara(){
		this.zonaClara=[];
		p0 = this.posicao[0];
		p1 = this.posicao[1];
		this.zonaClara[0] = this.mundo.getMonada(p0-1,p1);
		this.zonaClara[1] = this.mundo.getMonada(p0-1,p1+1);
		this.zonaClara[2] = this.mundo.getMonada(p0,p1+1);
		this.zonaClara[3] = this.mundo.getMonada(p0+1,p1+1);
		this.zonaClara[4] = this.mundo.getMonada(p0+1,p1);
		this.zonaClara[5] = this.mundo.getMonada(p0+1,p1-1);
		this.zonaClara[6] = this.mundo.getMonada(p0,p1-1);
		this.zonaClara[7] = this.mundo.getMonada(p0-1,p1-1);		
	}
	
	
	/* É onde se encontra o princípio interno da mônada que define como deve
	 * acontecer a sua mudança de estado. Na primeira vez que é executada
	 * define a zona clara. Caso haja mudança de estado a mônada retorna a si
	 * mesma, caso não retorna nulo.
	 */
	perceber(){
		if(this.zonaClara==null){
			this.setZonaClara();
		}
		var totalVizinhos = this.estado;
		for(i=0;i<this.zonaClara.length;i++){
			totalVizinhos += this.zonaClara[i].estado;
		}
		totalVizinhos = totalVizinhos/9;
		totalVizinhos = parseInt('0x'+totalVizinhos.toString(16));
		if(this.estado!=totalVizinhos){
			this.estado = totalVizinhos;
			return this;
		}
		
		return null;
	}
	
}

