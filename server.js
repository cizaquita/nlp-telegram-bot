var TelegramBot = require('node-telegram-bot-api');
var nlp = require('compromise');

var token = '138467244:AAE-ug93RUAE5auZJNQd9TcUay0jGKhehTI';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function(msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, "Bot prueba NLP - /nlp [texto]\n\nBusca Nombres, lugares, verbos, valores en letra y los convierte a número, "+
  						  "sustantivos.\nLibreria compromise para Node.js\n\nBy @Cizaquita 8)");
});

bot.onText(/\/nlp/, function(msg, match){
	//var fromId = msg.from.id;
	var chatId = msg.chat.id;
	console.log(JSON.stringify(msg));
	var options = {parse_mode: 'HTML'};
	var nlpx = nlp(msg.text);
	var nombres = nlpx.people();
	var lugares = nlpx.places();
	var verbos = nlpx.match('#Verb');
	var values = nlpx.values().toNumber();
	var sustantivos = nlpx.nouns();
	/*bot.sendMessage(fromId, '<b>Nombres:</b> ' + nombres.out('text') + 
							'\n<b>Lugares:</b> ' + lugares.out('text') +
							'\n<b>Verbos:</b> ' + verbos.out('text') +
							'\n<b>Valores:</b> ' + values.out('text')+
							'\n<b>Sustantivos:</b> ' + sustantivos.out('text'), options);*/
	bot.sendMessage(chatId, '<b>Nombres:</b> ' + nombres.out('text') + 
							'\n<b>Lugares:</b> ' + lugares.out('text') +
							'\n<b>Verbos:</b> ' + verbos.out('text') +
							'\n<b>Valores:</b> ' + values.out('text')+
							'\n<b>Sustantivos:</b> ' + sustantivos.out('text'), options);
});