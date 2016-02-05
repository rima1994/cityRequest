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
function myajax(url, callback, startLoadingAction, endLoadingAction) {
	startLoadingAction;
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", url, true);*
	httpRequest.addEventListener("load", function() {
		callBack(httpRequest);
	});
	httpRequest.send(null);
	endLoadingAction;
}
function cityRequest(nom_ville) {
	myajax("http://infolimon.iutmontp.univ-montp2.fr/~daviaudl/TD3/cityRequest.php?name="
			+ nom_ville);
	villes.afficheVilles();
}
var clavier = "";
document.onkeydown = function(event) {
	clavier = document.querySelector("#acdiv").querySelector("input").value;
	debounce();
}
function debounce() {
	console.log("debounce");
	window.setTimeout(cityRequest(clavier), 200);
}
function startLoadingAction() {

}
function endLoadingAction() {

}
