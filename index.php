<!DOCTYPE html>
<html lang="pt-br">

	<head>
		<link rel="icon" href="assets/images/logo_crop.jpg" />
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Quiz_Projet</title>
		<!-- CSS externo -->
		<link rel="stylesheet" href="css/game.css" />
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

	</head>

	<body style="height:auto;">
		<div class="container tela-principal" style="/*border-left: 1px solid #dbdbdb; border-right: 1px solid #dbdbdb;*/">
			<div class="row" style="text-align:center;">
				<div class="col-md-12" style="margin: 10px 0;">
					<img src="assets/images/interrogacao.png" alt="Logo" style="width:10%;">
				</div>
				<div class="col-md-12" style="margin: 10px 0;">
					<span id='instrucoes'>Primeira etapa - Fácil</span>
					<input type="hidden" id='instrucoes_id' name='instrucoes_id' value="<?=base64_encode(1)?>" />
				</div>
				
				<div class="col-md-12 moedas" style="margin: 10px 0;display:none;">
					<span class='placar'>0 Moedas</span>
					<span id="final_quest"></span>
				</div>
				
				<div class="col-md-12 barra_progresso" style="margin: 10px auto; max-width: 50% !important;display:none;">
					<div class="progress">
						<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
					</div>
				</div>
			</div>
			<div class="begin_quiz" style="text-align:center; margin-top: 40px;">
				<button class="btn_start" style="padding: 5px 10px; border-radius: 20px; background-color: #62aeff; border: 1px solid #4a83c1; cursor:pointer;">
					Começar Questionário!
				</button>
			</div>
			<div class="questao" style="margin: 10px auto 100px; display:none;">
				<header class="topoQuestao" style="display: inline-block; text-align: center;">
					<div style="display: inline-flex;">
						<span id='nQuestao'>?</span>
						<h3 id='pergunta'>???</h3>
					</div>
					<div id='aviso' class='rodapeQuestao'>
						<span id='numero'></span>
						de <span id='total'></span>
					</div>
				</header>
				<div class='corpoQuestao'>
					<ol class='alternativas'>
						<li id="a" value="a" class='resposta'></li>
						<li id="b" value="b" class='resposta'></li>
						<li id="c" value="c" class='resposta'></li>
						<li id="d" value="d" class='resposta'></li>
					</ol>
				</div>
			</div>
			<audio src="assets/audio/positive.mp3" id='somAcerto'></audio>
			<audio src="assets/audio/negative.mp3" id='somErro'></audio>
			<audio src="assets/audio/aplausos.mp3" id='somAplausos'></audio>
			<input type="hidden" id='question_id' name='question_id' value='' />
			<input type="hidden" id='ordem_array' name='ordem_array' value='' />
			<input type="hidden" id='total_questions' name='total_questions' value='' />
			<input type="hidden" id='position_question' name='position_question' value='' />
			<input type="hidden" id='coins' name='coins' value='0' />
		</div>
	</body>
	<footer class="centro" id='autoria'>
		Desenvolvido por IT DevTech Service
	</footer>
	<!--script src="js/game.js"></script-->
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="js/game_2.js"></script>
</html>