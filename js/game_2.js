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
				console.log(data);
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
								var texto_fim = "Parabéns, você conseguiu concluir o teste!";
							}else{
								var texto_fim = "Infelizmente você só conseguiu "+coins+" Moedas e não conseguiu passar!";
							}
							$("#final_quest").html(texto_fim);
							$("#final_quest").show();
						}
						$(".barra_progresso").hide();
						$(".questao").hide();
					}, 500);
				}
			}
		});
	});
});









let somAcerto = document.querySelector('#somAcerto')
let somErro = document.querySelector('#somErro')
let somAplausos = document.querySelector('#somAplausos')









/*
function pegarDados(i) {
	const url = 'data.json'; // ENDERECO DO ARQUIVO JSON
    fetch(url).then(response => {

        return response.json();

    }).then(data => {

        if (data.erro) {
            console.log("Erro ao acessar o JSON");
            return;
        }

        // passar o quantidade de questoes para a variavel
        let qtdQuestoes = (data.questoes.length) - 1;
        // escrver a qtdQuestoes para total
        total.textContent = parseInt(qtdQuestoes);

        // passe o valor de i no parametro
        atribuirDados(data, i);

    })

} // fim pegarDados

function atribuirDados(data, i) {
    if (i >= data.questoes.length) {
        //console.log('Fim das questoes')
        i = 1
    }
	var nQuestao = $('#nQuestao').html();
    nQuestao.textContent = data.questoes[i].numQuestao
    pergunta.textContent = data.questoes[i].pergunta

    a.textContent = data.questoes[i].alternativaA
    b.textContent = data.questoes[i].alternativaB
    c.textContent = data.questoes[i].alternativaC
    d.textContent = data.questoes[i].alternativaD

    numero.textContent = data.questoes[i].numQuestao

    let certa = document.querySelector('#correct')
    certa.value = data.questoes[i].correta
    //console.log(resposta)
}


*/