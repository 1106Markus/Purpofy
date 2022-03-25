var prompts = [
{
	prompt: 'You find it difficult to introduce yourself to people?',
	weight: 1,
	class: 'group0'
},
{
	prompt: 'You get so lost in your thoughts that you ignore or forget your surroundings?',
	weight: 1,
	class: 'group1'
},
{
	prompt: 'You are likely to engage in Multitasking?',
	weight: 1,
	class: 'group2'
},
{
	prompt: 'The way others perceive you plays an important role for you?',
	weight: 1,
	class: 'group3'
},
{
	prompt: 'You are very organized in your daily life?',
	weight: 1,
	class: 'group4'
},
{
	prompt: 'You encounter difficulties while expressing emotions?',
	weight: 1,
	class: 'group5'
},
{
	prompt: 'You have problems making important decisions?',
	weight: 1,
	class: 'group6'
},
{
	prompt: 'You often set goals for yourself?',
	weight: 1,
	class: 'group7'
},
{
	prompt: 'You often chase and achieve these goals?',
	weight: 1,
	class: 'group8'
},
{
	prompt: 'You care more about making sure no one gets upset than winning a debate?',
	weight: 1,
	class: 'group9'
},
{
	prompt: 'You are sympathetic towards other people\'s problems?',
	weight: 1,
	class: 'group10'
},
{
	prompt: 'You wouuld rather improvise than spend time coming up with a detailed plan of action?',
	weight: 1,
	class: 'group11'
}

]

// This array stores all of the possible values and the weight associated with the value. 
// The stronger agreeance/disagreeance, the higher the weight on the user's answer to the prompt.
var prompt_values = [
{
	value: 'Strongly Agree', 
	class: 'btn-default btn-strongly-agree',
	weight: 5
},
{
	value: 'Agree',
	class: 'btn-default btn-agree',
	weight: 3,
}, 
{
	value: 'Neutral', 
	class: 'btn-default',
	weight: 0
},
{
	value: 'Disagree',
	class: 'btn-default btn-disagree',
	weight: -3
},
{ 
	value: 'Strongly Disagree',
	class: 'btn-default btn-strongly-disagree',
	weight: -5
}
]

// For each prompt, create a list item to be inserted in the list group
function createPromptItems() {

	for (var i = 0; i < prompts.length; i++) {
		var prompt_li = document.createElement('li');
		var prompt_p = document.createElement('p');
		var prompt_text = document.createTextNode(prompts[i].prompt);

		prompt_li.setAttribute('class', 'list-group-item prompt');
		prompt_p.appendChild(prompt_text);
		prompt_li.appendChild(prompt_p);

		document.getElementById('quiz').appendChild(prompt_li);
	}
}

// For each possible value, create a button for each to be inserted into each li of the quiz
function createValueButtons() {
	for (var li_index = 0; li_index < prompts.length; li_index++) {
		var group = document.createElement('div');
		group.className = 'btn-group btn-group-justified';

		for (var i = 0; i < prompt_values.length; i++) {
			var btn_group = document.createElement('div');
			btn_group.className = 'btn-group';

			var button = document.createElement('button');
			var button_text = document.createTextNode(prompt_values[i].value);
			button.className = 'group' + li_index + ' value-btn btn ' + prompt_values[i].class;
			button.appendChild(button_text);

			btn_group.appendChild(button);
			group.appendChild(btn_group);

			document.getElementsByClassName('prompt')[li_index].appendChild(group);
		}
	}
}

createPromptItems();
createValueButtons();

// Keep a running total of the values they have selected. If the total is negative, the user is introverted. If positive, user is extroverted.
// Calculation will sum all of the answers to the prompts using weight of the value * the weight of the prompt.
var total = 0;

// Get the weight associated to group number
function findPromptWeight(prompts, group) {
	var weight = 0;

	for (var i = 0; i < prompts.length; i++) {
		if (prompts[i].class === group) {
			weight = prompts[i].weight;
		}
	}

	return weight;
}

// Get the weight associated to the value
function findValueWeight(values, value) {
	var weight = 0;

	for (var i = 0; i < values.length; i++) {
		if (values[i].value === value) {
			weight = values[i].weight;
		}
	}

	return weight;
}

// When user clicks a value to agree/disagree with the prompt, display to the user what they selected
$('.value-btn').mousedown(function () {
	var classList = $(this).attr('class');
	// console.log(classList);
	var classArr = classList.split(" ");
	// console.log(classArr);
	var this_group = classArr[0];
	// console.log(this_group);

	// If button is already selected, de-select it when clicked and subtract any previously added values to the total
	// Otherwise, de-select any selected buttons in group and select the one just clicked
	// And subtract deselected weighted value and add the newly selected weighted value to the total
	if($(this).hasClass('active')) {
		$(this).removeClass('active');
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	} else {
		
		total -= (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $('.'+this_group+'.active').text()));
	
		$('.'+this_group).removeClass('active');

		$(this).addClass('active');
		total += (findPromptWeight(prompts, this_group) * findValueWeight(prompt_values, $(this).text()));
	}

	console.log(total);
})



$('#submit-btn').click(function () {
	// After clicking submit, add up the totals from answers
	// For each group, find the value that is active
	$('.results').removeClass('hide');
	$('.results').addClass('show');
	
	if(total >= 31 && total <= 60) {
		// document.getElementById('intro-bar').style.width = ((total / 60) * 100) + '%';
		// console.log(document.getElementById('intro-bar').style.width);
		// document.getElementById('intro-bar').innerHTML= ((total / 60) * 100) + '%';
		document.getElementById('results').innerHTML = '<b>You are Type A Personality!</b><br><br>\
		Type A individuals are multitasking, ambitious, proactive, organized and status-conscious individuals. In addition, they are sympathetic, sensitive, truthful and always eager to help others.\n\
<br><br>\
Type A people are friendly and caring goal-driven and motivated individuals.\n\n\
<br><br>\
They are also easily frustrated and have a low tolerance for incompetence with people or projects.\
<br><br>\
The entire purpose of personality tests is that the tests can be used for self-reflection and helping individuals attempt to understand themselves towards improving their interaction with others.\
<br><br>\
Above all, personality tests show the strengths and weaknesses of an individual. With this key information, you can now focus on amplifying your strengths and suppressing your weaknesses.'
		;
	} else if(total >= 1 && total <= 30) {
		document.getElementById('results').innerHTML = '<b>You are Type B Personality!</b><br><br>\
		Type B individuals are laid-back with the ability to relax and enjoy small accomplishments. In addition, they tend to be calm, patient individuals and are generally uncompetitive as they often take the "win some, lose some" approach. They are rarely stressed and hardly ever frustrated with people or projects.\
<br><br>\
Here is how you really know though. If you read through painstakingly the above line by line, you are likely an A. If you skimmed through the text, you are probably a B.\
<br><br>\
The entire purpose of personality tests is that the tests can be used for self-reflection and helping individuals attempt to understand themselves towards improving their interaction with others.\
<br><br>\
Above all, personality tests show the strengths and weaknesses of an individual. With this key information, you can now focus on amplifying your strengths and suppressing your weaknesses.';
	} else if(total < 0 && total >= -30) {
		document.getElementById('results').innerHTML = '<b>You are Type C Personality!</b><br><br>\
		Type C individuals have a hard time sharing their emotions, feelings and/or needs with others. They are considered to be emotionally repressed.\
<br><br>\
They find it extremely difficult when it comes to making decisions of low and/or large magnitude.\
<br><br>\
They are naturally people pleasers.\
<br><br>\
The entire purpose of personality tests is that the tests can be used for self-reflection and helping individuals attempt to understand themselves towards improving their interaction with others.\
<br><br>\
Above all, personality tests show the strengths and weaknesses of an individual. With this key information, you can now focus on amplifying your strengths and suppressing your weaknesses.'
	} else if(total < -30 && total >= -60) {
		document.getElementById('results').innerHTML = '<b>You are Type D Personality!</b><br><br>\
		The Type D individuals are usually a combination of stressed, angry, worried, hostile and tense. They run a strict unchanged pattern of lifestyle and are averse to making changes.\
<br><br>\
For the Type D individual, security is a top priority.\
<br><br>\
Whether it\'s physical security and/or job security.\
<br><br>\
The entire purpose of personality tests is that the tests can be used for self-reflection and helping individuals attempt to understand themselves towards improving their interaction with others.\
<br><br>\
Above all, personality tests show the strengths and weaknesses of an individual. With this key information, you can now focus on amplifying your strengths and suppressing your weaknesses.'
;
	}

	// Hide the quiz after they submit their results
	$('#quiz').addClass('hide');
	$('#submit-btn').addClass('hide');
	$('#retake-btn').removeClass('hide');
})

// Refresh the screen to show a new quiz if they click the retake quiz button
$('#retake-btn').click(function () {
	$('#quiz').removeClass('hide');
	$('#submit-btn').removeClass('hide');
	$('#retake-btn').addClass('hide');

	$('.results').addClass('hide');
	$('.results').removeClass('show');
})