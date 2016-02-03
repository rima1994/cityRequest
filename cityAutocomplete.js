var villes = {
	liste_villes : document.querySelector("#myac"),
	valeur_saisie = document.querySelector("#acdiv"),
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
	setTimeout(cityRequest(clavier), 200));
}
var bouton = villes.valeur_saisie;
bouton.addEventListener("click", function(event) {
	clavier = event.target;
	game.fiftyfifty(event);
})
