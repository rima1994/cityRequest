var villes = {
	liste_villes : document.querySelector("#myac"),
	reponse : "",
	afficheVilles : function() {
		this.liste_villes.innerHTML = "";
		for (var i = 0; i < this.reponse.length; i++) {
			var tamp = document.createElement("p");
			tamp.textContent = this.reponse[i].name;
			this.liste_villes.appendChild(tamp);
		}
		console.log("Fin affichevilles");
	}
}
var yolo = [ "Tokyo", "Paris", "Londres" ];
function callBack(httpRequest) {
	villes.reponse = JSON.parse(httpRequest.response);
	console.log(httpRequest);
}
function myajax(url, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", url, true);
	httpRequest.addEventListener("load", function() {
		callBack(httpRequest);
	});
	httpRequest.send(null);
}
function cityRequest(nom_ville) {
	myajax("http://infolimon.iutmontp.univ-montp2.fr/~daviaudl/TD3/cityRequest.php?name="
			+ nom_ville);
	villes.afficheVilles();
}
var clavier = "";
document.onkeydown = function(event) {
	console.log(event.key);
	if (event.key = "Backspace") {
		clavier = clavier.substring(0, clavier.length - 1);
	} else {
		clavier += event.key;
	}
	cityRequest(clavier);
}
