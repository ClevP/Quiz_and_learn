$(document).ready(function() {
	$(".btn_start").on("click", function(event){
		$(".begin_quiz").hide();
		$(".moedas").show();
		$(".barra_progresso").show();
		$(".instrucoes").show();
		$(".questao").show();
		var instrucoes_id = $("#instrucoes_id").val();
		instrucoes_id = atob(instrucoes_id);
		var retorno, x,y,n, tmp, ordem_array ="", arr = [], maximo = 10;;
		for (x = 0; x < 10; x++) {
		   arr[x] = x + 1;
		}
		for (y = arr.length; y;) {
			n = Math.random() * y-- | 0;
			tmp = arr[n];
			arr[n] = arr[y];
			arr[y] = tmp;
		}
		for(y=1;y<arr.length;y++){
			ordem_array = (y==1)?arr[y]:ordem_array+","+arr[y];
		}
		$("#ordem_array").val(ordem_array);
		
		$.ajax({
			method:"get",
			dataType:"json",
			url:'data.json',
			success: function(data){
				// console.log(data);
				retorno = data["questoes"+instrucoes_id];
				// $('#nQuestao').html(retorno[arr[0]]["numQuestao"]);
				$('#nQuestao').html("1");
				$('#pergunta').html(retorno[arr[0]]["pergunta"]);
				$('#a').html(retorno[arr[0]]["alternativaA"]);
				$('#b').html(retorno[arr[0]]["alternativaB"]);
				$('#c').html(retorno[arr[0]]["alternativaC"]);
				$('#d').html(retorno[arr[0]]["alternativaD"]);
				$('#numero').html("1");
				$('#total').html(arr.length);
				$('#question_id').val(arr[0]);
				$('#position_question').val("1");
				$('#total_questions').val(arr.length);
				$('.progress-bar').css("width", "10%");
				$("#tm").val(0);
				$("#cronometro").show();
				startCountdown();
			}
		});
	});
	
	$(".resposta").on("click", function(event){
		var value = $(this).html();
		var questao = $('#question_id').val();
		var coins = $('#coins').val();
		var ordem_array = $("#ordem_array").val();
		var position_question = $("#position_question").val();
		var total_question = $("#total_questions").val();
		position_question = parseInt(position_question)+1;
		var bar = position_question*10;
		var arr = ordem_array.split(",");
		var instrucoes_id = $("#instrucoes_id").val();
		instrucoes_id = atob(instrucoes_id);
		if(position_question-1 != total_question){
			for(var y=1;y<arr.length;y++){
				ordem_array = (y==1)?arr[y]:ordem_array+","+arr[y];
			}
		}else{
			ordem_array = "";
		}
		$("#ordem_array").val(ordem_array);
		
		$.ajax({
			method:"get",
			dataType:"json",
			url:'data.json',
			success: function(data){
				retorno = data["questoes"+instrucoes_id];
				if(retorno[questao]["correta"] == value){
					coins = parseInt(coins)+10;
					document.querySelector('#somAcerto').play();
				}else{
					document.querySelector('#somErro').play();
				}
				if(ordem_array != ""){
					setTimeout(function() { 
						$('#nQuestao').html(position_question);
						$('#pergunta').html(retorno[arr[0]]["pergunta"]);
						$('#a').html(retorno[arr[0]]["alternativaA"]);
						$('#b').html(retorno[arr[0]]["alternativaB"]);
						$('#c').html(retorno[arr[0]]["alternativaC"]);
						$('#d').html(retorno[arr[0]]["alternativaD"]);
						$('#numero').html(position_question);
						$('#question_id').val(arr[0]);
						$('#position_question').val(position_question);
						$('.progress-bar').css("width", bar+"%");
						$('.placar').html(coins+" Moedas");
						$('#coins').val(coins);
					}, 500);
				}else{
					$("#tm").val(2);
					setTimeout(function() {
						instrucoes_id = parseInt(instrucoes_id)+1;
						$("#instrucoes_id").val(btoa(instrucoes_id));
						switch(instrucoes_id) {
							case 2:
								$("#instrucoes").html("Segunda etapa - Médio");
								$("#instrucoes").css("background-color","#fff700");
								break;
							case 3:
								$("#instrucoes").html("Terceira etapa - Difícil");
								$("#instrucoes").css("background-color","#ff0000");
								break;
						}
						if(instrucoes_id !=4){
							$(".begin_quiz").show();
						}else{
							$("#instrucoes").hide();
							$(".placar").hide();
							if(coins >100){
								var texto_fim = "Parabéns, você conseguiu concluir o teste! <br/> <a href='assets/images/interrogacao.png' download>Clique aqui e faça o download! </a>";
							}else{
								var texto_fim = "Infelizmente você só conseguiu "+coins+" Moedas e não conseguiu passar!";
							}
							$("#final_quest").html(texto_fim);
							$("#final_quest").show();
						}
						$("#cronometro").hide();
						$(".barra_progresso").hide();
						$(".questao").hide();
					}, 500);
				}
			}
		});
	});
});

var tempo = "";
function startCountdown(){
	var tm = $("#tm").val();
	if(tm!="1"){
		var instrucoes_id = $("#instrucoes_id").val();
		instrucoes_id = atob(instrucoes_id);
		if(instrucoes_id == 1) {
			tempo = 60;// Tempo em segundos
		}else if(instrucoes_id == 2) {
			tempo = 40;// Tempo em segundos
		}else if(instrucoes_id == 3) {
			tempo = 20;// Tempo em segundos
		}
		$("#tm").val(1);
	}
	
	if((tempo - 1) >= 0){
		var min = parseInt(tempo/60);
		var seg = tempo%60;
		if(min < 10){
			min = "0"+min;
			min = min.substr(0, 2);
		}
		if(seg <=9){
			seg = "0"+seg;
		}
		$("#cronometro").html('00:'+min+':'+seg);
		tempo = parseInt(tempo-1);
		if(tm!="2"){
			setTimeout("startCountdown()",1000);
		}
	} else {
		$("#cronometro").hide();
		$("#instrucoes").hide();
		$(".placar").hide();
		$(".barra_progresso").hide();
		$(".questao").hide();
		$("#final_quest").html("Infelizmente seu tempo acabou e você não conseguiu passar!");
		$("#final_quest").show();
	}
}

let somAcerto = document.querySelector('#somAcerto')
let somErro = document.querySelector('#somErro')
let somAplausos = document.querySelector('#somAplausos')
