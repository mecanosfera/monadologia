class CelulaMovel extends Celula{
	
	init(monadologia,estado,posicao){
		super.init(monadologia,estado,posicao);
		this.moveu = false;
	}
	
	mover(coords,i){
		// alert(i);
		var pos = [this.posicao[0],this.posicao[1]];
		var next = [this.posicao[0]+coords[0],this.posicao[1]+coords[1]];
		if(next[0]==this.monadologia.tamanho[0]){
			next[0] = 0;
		}
		if(next[1]==this.monadologia.tamanho[1]){
			next[1] = 0;
		}
		var celulaTrocar = this.mundo.celulas[next[0]][next[1]];
		this.mundo.celulas[next[0]][next[1]] = this;
		this.posicao = next;
		try{
			celulaTrocar.posicao = pos;
		} catch(err){
			console.log(pos);
		}
		this.mundo.celulas[pos[0]][pos[1]] = celulaTrocar;
		celulaTrocar.setZonaClara();
		this.monadologia.estado.push(celulaTrocar);
		this.moveu = true;
	}
	
	
}


class CelulaCerebro extends CelulaMovel{
	
	
	setZonaClara(){
		var p0 = this.posicao[0];
		var p1 = this.posicao[1];
		this.celulasServas=[];
		this.celulasServas[0] = this.mundo.getCelula(p0-1,p1); 	// Norte
																// NO(-1,-1)
																// N(-1,0)
																// NE(-1,+1)
		this.celulasServas[1] = this.mundo.getCelula(p0-1,p1+1);// Nordeste O (
																// 0,-1) C( 0,0)
																// L ( 0,+1)
		this.celulasServas[2] = this.mundo.getCelula(p0,p1+1); 	// Leste
																// SO(+1,-1)
																// S(-1,0)
																// SE(+1,+1)
		this.celulasServas[3] = this.mundo.getCelula(p0+1,p1+1);// Sudeste
		this.celulasServas[4] = this.mundo.getCelula(p0+1,p1);	// Sul
		this.celulasServas[5] = this.mundo.getCelula(p0+1,p1-1);// Sudoeste
		this.celulasServas[6] = this.mundo.getCelula(p0,p1-1);	// Oeste
		this.celulasServas[7] = this.mundo.getCelula(p0-1,p1-1);// Noroeste
		
		this.zonaClara = [];
		
		for(var i=-2;i<3;i++){
			for(var j=-2;j<3;j++){
				if(i==-2 || i==2){
					this.zonaClara.push(this.mundo.getCelula(p0+i,p1+j));
				} else {
					if(j==-2 || j==2){
						this.zonaClara.push(this.mundo.getCelula(p0+i,p1+j));
					}
				} 
			}
		}
	}
	
	getEstadoGlider(){
		if(this.zonaClara==null){
			this.setZonaClara();
		}
		this.estadoGlider = 0;
		if(this.estado==0){
			if(this.celulasServas[1].estado==1){
				this.estadoGlider = 2;
			}
		} else {
			if(this.celulasServas[1].estado==1){
				this.estadoGlider = 1;
			} else {
				this.estadoGlider = 3;
			}
		}
	}
	
	detectarPerturbacao(){
		if(this.estadoGlider==0){
			for(var i=0;i<this.zonaClara.length;i++){
				if(this.zonaClara[i].estado==1 && (i!=0 && i!=4 && i!=5)){
					return true;
				}
			}
		} else if(this.estadoGlider==1){
			for(var i=0;i<this.zonaClara.length;i++){
				if(this.zonaClara[i].estado==1 && (i!=9 && i!=10 && i!=15)){
					return true;
				}
			}
		} else if(this.estadoGlider==2){
			for(var i=0;i<this.zonaClara.length;i++){
				if(this.zonaClara[i].estado==1 && (i!=0 && i!=1 && i!=10)){
					return true;
				}
			}
		} else if(this.estadoGlider==3){
			for(var i=0;i<this.zonaClara.length;i++){
				if(this.zonaClara[i].estado==1 && (i!=3 && i!=4 && i!=15)){
					return true;
				}
			}
		}
		return false;
	}
	
	perceber(){
		if(this.zonaClara==null){
			this.setZonaClara();
		}
		if(!this.moveu){
			this.getEstadoGlider();
			if(this.detectarPerturbacao()){
				return this.morrer();
			} else {
				if(this.estadoGlider==0){
					this.proximoEstado=1;
					this.celulasServas[0].mudarEstado(0);
					this.celulasServas[1].mudarEstado(1);
					this.celulasServas[3].mudarEstado(0);
					this.celulasServas[5].mudarEstado(0);
					this.celulasServas[7].mudarEstado(1);
				} else if (this.estadoGlider==1){
					this.proximoEstado=0;
					this.celulasServas[3].mudarEstado(1);
					this.celulasServas[6].mudarEstado(1);
					this.celulasServas[7].mudarEstado(0);
				} else if (this.estadoGlider==2){
					this.proximoEstado=1;
					this.celulasServas[1].mudarEstado(0);
					this.celulasServas[3].mudarEstado(0);
					this.celulasServas[5].mudarEstado(1);
					this.celulasServas[6].mudarEstado(0);
					this.celulasServas[7].mudarEstado(1);
				} else if (this.estadoGlider===3){
					this.proximoEstado=0;
					this.celulasServas[0].mudarEstado(1);
					this.celulasServas[3].mudarEstado(1);
					this.celulasServas[7].mudarEstado(0);
				}
				this.celulasServas[3].mover([+1,+1],3);
				this.mover([+1,+1],-1);
				this.celulasServas[7].mover([+1,+1],7);
				this.celulasServas[2].mover([+1,+1],2);
				this.celulasServas[0].mover([+1,+1],0);
				this.celulasServas[1].mover([+1,+1],1);
				this.celulasServas[4].mover([+1,+1],4);
				this.celulasServas[6].mover([+1,+1],6);
				this.celulasServas[5].mover([+1,+1],5);
				return this;
			}
		}
		return null;
	}
	
	morrer(){
		var cels = [];
		for(var i=0;i<this.celulasServas.length;i++){
			var cs = this.celulasServas[i];
			var cel = new Celula(this.monadologia,cs.estado,cs.posicao);
			this.mundo.celulas[cel.posicao[0]][cel.posicao[1]] = cel;
			cels.push(cel);
		}
		var descerebrada = new Celula(this.monadologia,this.estado,this.posicao);
		this.mundo.celulas[this.posicao[0]][this.posicao[1]] = descerebrada;
		cels.push(descerebrada);
		for(var j=0;j<cels.length;j++){
			cels[j].perceber();
		}
	}
	
	setProximoEstado(){
		super.setProximoEstado();
		this.moveu=false;
	}
	
	
	
}



class CelulaServa extends CelulaMovel{
	
	
	perceber(){
		return null;
	}
	
	mudarEstado(estado){
		this.proximoEstado = estado;
		this.monadologia.estado.push(this);
	}
	
	
	
}