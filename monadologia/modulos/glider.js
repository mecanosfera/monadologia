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