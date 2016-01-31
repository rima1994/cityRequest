function affichevilles(p_villes) {
	var liste_villes = document.querySelector("#myac");
	liste_villes.innerHTML = "";
	for (var i = 0; i < p_villes.length; i++) {
		var tamp = document.createElement("p");
		tamp.textContent = p_villes[i];
		liste_villes.appendChild(tamp);
	}
	console.log("Fin affichevilles");
}

var toto = [ "NewYork", "Tokyo", "Paris" ];
affichevilles(toto);
var a = $villes;
