/*
 * tamanho = [linhas,colunas];
 * [0][0],[0][1],[0][2]
 * [1][0],[1][1],[1][2]
 * [2][0],[2][1],[2][2]
 */

class Mundo {
	
	constructor(monadologia,tamanho){
		this.monadologia = monadologia;
		//alert(tamanho);
		this.tamanho = tamanho;
		this.setEspacoCelulas();
		this.ultimaCelula = null;
	}
	
	setEspacoCelulas(){
		this.celulas = [];
		for(var linha=0;linha<this.tamanho[0];linha++){
			this.celulas.push([]);
			for(var coluna=0;coluna<this.tamanho[1];coluna++){
				this.celulas[linha].push(null);
			}
		}
	}
	
	
	addCelula(celula){
		if(this.ultimaCelula==null){
			this.celulas[0][0] = celula;
			this.ultimaCelula = [0,0];
			return [0,0];
		} else {
			if(this.ultimaCelula[0]==(this.tamanho[0]-1) && this.ultimaCelula[1]==(this.tamanho[1]-1)){
				//console.log()
				this.monadologia.erro(ERR_LIMITE_MONADA);
				return null;
			} else if(this.ultimaCelula[0]==(this.tamanho[0]-1)){
				this.ultimaCelula = [0,this.ultimaCelula[1]+1];
				this.celulas[0][this.ultimaCelula[1]] = celula;
				return [this.ultimaCelula[0],this.ultimaCelula[1]];
			} else {
				this.ultimaCelula[0]=this.ultimaCelula[0]+1;
				this.celulas[this.ultimaCelula[0]][this.ultimaCelula[1]] = celula;
				return [this.ultimaCelula[0],this.ultimaCelula[1]];
			}
		}
	}
	
	getCelula(p0,p1){
		//alert(posicao);
		if(p0<0){
			p0 = this.tamanho[0]-1;
		} else if (p0==this.tamanho[0]){
			p0 = 0;
		}
		if(p1<0){
			p1 = this.tamanho[1]-1;
		} else if (p1==this.tamanho[1]){
			p1 = 0;
		}
		
		return this.celulas[p0][p1];
	}
	
	
	
	
}