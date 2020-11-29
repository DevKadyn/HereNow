//Formula Changer
var formulaTemp = localStorage.getItem('formulaTemp');
if(formulaTemp === null){
	localStorage.setItem('formulaTemp','f');
	formulaTemp = 'f';
	}
else if(formulaTemp === 'f'){
	formulaTemp = 'f';
	}
else if(formulaTemp === 'c'){
	formulaTemp = 'c';
	}

var formulaWind = localStorage.getItem('formulaWind');
if(formulaWind === null){
	localStorage.setItem('formulaWind','mph');
	formulaWind = 'mph';
	}
if(formulaWind === 'mph'){
	formulaWind = 'mph';
	}
else if(formulaWind === 'kph'){
	formulaWind ='kph';
	}
