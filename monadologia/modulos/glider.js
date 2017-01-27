class GliderBasico {
	
	constructor(propriedades){
		this.init(propriedades)
	}
	
	init(propriedades){
		this.linha = propriedades[0];
		this.coluna = propriedades[1];
		this.estado = propriedades[2];
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
		for(var i=0;i<this.coordenadas.length;i++){
			estados.push(this.coordenadas[i]);
		}
	}
	
}




class Glider extends GliderBasico{
	
	
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

class GliderCerebral extends Glider{
	
	init(propriedades){
		super.init(propriedades);
		this.tipoCelula = CelulaServa;
	}
	
	append(estados){
		var linhaC = this.linha;
		var colunaC = this.coluna;
		if(this.estado==0){
			linhaC += 1;
			estados.push([CelulaCerebro,linhaC,colunaC,0]);
		} else if (this.estado==2){
			linhaC += 1;
			colunaC -= 1;
			estados.push([CelulaCerebro,linhaC,colunaC,0]);
		} else if (this.estado==1){
			linhaC += 1;
			colunaC += 1;
		} else if (this.estado==4){
			linhaC += 1;
			colunaC += 1;
		}
		
		
		
		for(var i=-1;i<2;i++){
			for(var j=-1;j<2;j++){
				if(!(i==0 && j==0)){	
					estados.push([CelulaServa,linhaC+i,colunaC+j,0]);
				}
			}
		}
		for(var i=0;i<this.coordenadas.length;i++){
			if((this.estado==1 && i==2) || (this.estado==3 && i==1)){
				estados.push([CelulaCerebro,this.coordenadas[i][0],this.coordenadas[i][1],this.coordenadas[i][2]]);
			} else {
				estados.push([CelulaServa,this.coordenadas[i][0],this.coordenadas[i][1],this.coordenadas[i][2]]);
			}
		}
	}
	
	
}