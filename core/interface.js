
class UI{
	
	constructor(){	
		
		var self = this;
		this.executando = false;	
		this.indGeracoes = $('#geracoes');
		//this.indCelulas = document.getElementById('celulas');
		this.setLoader('estado_inicial');
		this.setLoader('celula');
		this.loaded = false;
		this.setTamanho();
		$('#carregar').click(this.carregar);
		$('#sel_height').change(function(){self.setTamanho.call(self);});
		$('#sel_width').change(function(){self.setTamanho.call(self);});
		
	}
	
	setLoader(id){
		var select = $('#'+id);
		var input = $('#file_'+id);
		select.change(function(){
			if($(this).val() == 'escolher'){
				input.click();
				input.change(function(){
					var file = $(this)[0].files[0];
					if(file.type=='application/javascript' && file.name.substr(-3)=='.js'){
						var reader = new FileReader();
						reader.addEventListener('load',function(){
							var ops = $('#'+id+' option');
							var newOption = true;
							for(var i=0;i<ops.length;i++){
								if(ops[i].value==reader.result){
									select.val(ops[i].value);
									newOption = false;
								}
							}
							if(newOption){
								$('#'+id+' option').last().before('<option value="'+reader.result+'">local/'+file.name+'<\/option>');
								select.val(reader.result);
							}
						},false);
						reader.readAsDataURL(file);
					} else {
						file = null;
						input.val('');
						alert('Formato de arquivo inválido');
					}
					
				});
			}
		});
		
		$('#'+id).mousedown(function(){
			$(this).val(''); 
		});
	}
	
	update(corIgualEstado,cores,estadoInicial,classeCelula){
		var self = this;
		this.parar();
		this.corIgualEstado = corIgualEstado;
		//alert(this.corIgualEstado);
		this.cores = cores;
		this.estadoInicial = estadoInicial;
		this.monadologia = new Monadologia(this,[parseInt($('#sel_height').val()),parseInt($('#sel_width').val())],this.estadoInicial,classeCelula);
		this.velocidade = parseInt($('#velocidade').val());
		this.zoom = parseFloat($('#zoom').val());
		this.grid = new Grid(this);
		this.loaded = true;
		this.reiniciar();
		this.indGeracoes.text(0);
		$('#zoom').change(function(){self.setZoom.call(self)});
		$('#velocidade').change(function(){self.velocidade = parseInt($(this).val())});
		document.getElementById('game_grid').addEventListener('mousemove',function(event){
			//alert(self.zoom);
			if(event.offsetX>-1 && event.offsetX<=this.width && event.offsetY>-1 && event.offsetY<this.height){
				var celula = self.monadologia.mundo.celulas[parseInt(event.offsetX/(10*self.zoom))][parseInt(event.offsetY/(10*self.zoom))];
				var regras = '<pre>{\n';
				for(let e in celula.regras){
					regras += '   '+e+':{\n';
					for(let p in celula.regras[e]){
						regras+= '      '+p+':'+celula.regras[e][p]+'\n'
					}
					regras +='   }\n';
				}
				regras +='}</pre>';
				
				document.getElementById('celula_info').innerHTML = '<p>'+celula.posicao+'<br/><strong>estado:</strong> '+celula.estado+'<br/><strong>dna:</strong>'+celula.calcularDNA()+'</p><p>'+regras+'</p>';
			}
		},false);
	}
	
	
	carregar(){
		$('#script_estado_inicial').remove();
		//$('#script_celula').remove();
		//$('body').append('<script type="text/javascript" id="script_celula" src="'+$('#celula').val()+'"><\/script>');
		$('body').append('<script type="text/javascript" id="script_estado_inicial" src="'+$('#estado_inicial').val()+'"><\/script>');
		
		
	}
	
	setTamanho(){
		this.tamanho = [parseInt($('#sel_height').val()),parseInt($('#sel_width').val())];
	}
	
	setZoom(){
		var z = parseFloat($('#zoom').val());
		
		if(z!=this.zoom){
			this.zoom = z;
			if(this.executando){
				this.parar();
				this.grid.updateZoom(z,this.monadologia.getEstados());
				this.executando = true;
				this.executar(this);
			} else {
				this.grid.updateZoom(z,this.monadologia.getEstados());
			}
		} 
		
	}
	
	
	
	iniciar(){
		if(!this.executando){
			this.parar();
			this.executando=true;
			var self = this;
			this.executar(self);
			$('#iniciar').text('>parar');
		//this.btIniciar.innerHTML='Parar';
		//this.btProximo.className='inativo';
		} else {
			this.parar();
			this.executando = false;
		}
	}
	
	
	executar(self){
		if(self.executando){
			self.proximo();
			
			setTimeout(function(){self.executar(self);},self.velocidade);
		}
	}
	
	parar(){
		if(this.executando){
			clearTimeout();
			this.executando = false;
			$('#iniciar').text('>iniciar');
			//this.btIniciar.innerHTML='Iniciar';
			//this.btProximo.className='ativo';
		}
	}
	
	reiniciar(){
		//alert(this.loaded);
		this.parar();
		//this.monadologia = new Monadologia(this,this.tamanho,this.estadoInicial);
		//this.indGeracoes.innerHTML = this.monadologia.geracao;
		//this.indCelulas.innerHTML = this.monadologia.celulasAtivas;
		this.grid.draw(this.monadologia.estado);
	}
	
	proximo(){
		this.grid.draw(this.monadologia.proximo());
		this.indGeracoes.text(this.monadologia.geracao);
		
	}
	
	
	proximoPasso(){
		if(!this.executando){
			this.proximo();
		}
	}
	
	
	
}


class Grid {
	
	constructor(ui){
		this.ui = ui;
		this.zoom = ui.zoom;
		this.canvas = document.getElementById('game_grid');
		this.canvas.width = parseInt(this.ui.monadologia.tamanho[1]*10*this.zoom);
		this.canvas.height = parseInt(this.ui.monadologia.tamanho[0]*10*this.zoom);
		this.cxt = this.canvas.getContext('2d');
		this.tamanhoCelula = parseInt(10*this.zoom);
		this.updating = false;
	}
	
	
	draw(estados){
		for(var i=0;i<estados.length;i++){
			if(this.ui.corIgualEstado){
				this.cxt.fillStyle = '#'+estados[i].estado;
			} else {
				
				if(typeof estados[i].estado==='string'){
					if(this.ui.cores[estados[i].estado[0]]!=null){
						this.cxt.fillStyle = this.ui.cores[estados[i].estado[0]];
					} else {
						this.cxt.fillStyle = this.ui.cores[0];
					}
				} else {
					if(this.ui.cores[estados[i].estado]!=null){
						this.cxt.fillStyle = this.ui.cores[estados[i].estado];
					}else{
						this.cxt.fillStyle = this.ui.cores[0];
					}
				}
		
			}
			this.cxt.strokeStyle='#cccccc';
			if(estados[i] instanceof CelulaServa){
				this.cxt.strokeStyle='#0000ff';
			} else if (estados[i] instanceof CelulaCerebro){
				if(estados[i].estado==1){
					this.cxt.fillStyle='#ff0000';
				} else {
					this.cxt.fillStyle='#ccc';
				}
			}
			this.cxt.fillRect(estados[i].posicao[1]*this.tamanhoCelula,estados[i].posicao[0]*this.tamanhoCelula,this.tamanhoCelula,this.tamanhoCelula);
			this.cxt.strokeRect((estados[i].posicao[1]*this.tamanhoCelula),(estados[i].posicao[0]*this.tamanhoCelula),this.tamanhoCelula,this.tamanhoCelula);

		}
	}
	
	updateZoom(zoom,estados){
		this.zoom = zoom;
		this.canvas.width = parseInt(this.ui.monadologia.tamanho[1]*10*this.zoom);
		this.canvas.height = parseInt(this.ui.monadologia.tamanho[0]*10*this.zoom);
		this.tamanhoCelula = parseInt(10*this.zoom);
		this.draw(estados);
	}
	
}