var ajaxRequete = new XMLHttpRequest();
var titre = document.getElementById('titre'); // le contenu saisie dans le champ 
var key ="f9fdb27834290807bff4be0f15bd2589" ; //clé authentification


var btn = document.getElementById('btnenvoyer'); // récupère le bouton envoyer
btn.addEventListener('click', function () { // événement sur le click du bouton

    //----------------onreadystatechange vérification de bonne réception (totale)

    ajaxRequete.onreadystatechange = function () {
        if (ajaxRequete.readyState === 4 && ajaxRequete.status === 200) { //controle du chargement complet des infos

            //console.log(ajaxRequete.response);
            var films = JSON.parse(ajaxRequete.response); // transforme le fichier reçu JSON en objet
            console.log(films);

            var tabResult = films.results
            console.log(tabResult);
            console.log(tabResult[0].poster_path);

            for (let d = 0; d < tabResult.length; d++) {
                let affiche = tabResult[d].poster_path;
                console.log(affiche);
               // -------------------------------------------- fonction creationCard-------------------------------------------------------
               function creationCard() {
                var card = document.createElement("article");
                card.className = "flip-card";

                var section = document.createElement("section");
                section.className = "flip-card-inner";
                section.style.width = "18rem";
                                 
                var divDevant = document.createElement("div");
                divDevant.className = "flip-card-front"; 
                
                var imgAffiche = document.createElement("img");
                imgAffiche.className = "card-img-top";
                if (tabResult[d].poster_path == null) {
                    return null;
                }
                imgAffiche.src = "https://image.tmdb.org/t/p/w342/" + tabResult[d].poster_path;

                var divDerriere = document.createElement("div");
                divDerriere.className = "flip-card-back"; 
                
                var titreFilm = document.createElement("h5");
                titreFilm.className = "card-title";
                titreFilm.innerText = tabResult[d].title;
                
                var synoptis = document.createElement("p");
                synoptis.className = "card-text";
                if (tabResult[d].overview.length <=0){
                    card.className ="flip-card-vide";
                }
                synoptis.innerText = tabResult[d].overview.slice(0, 500) + '...';

                infosRecu.className = "row";

                divDevant.appendChild(imgAffiche);
                divDerriere.appendChild(titreFilm);
                divDerriere.appendChild(synoptis);
                section.appendChild(divDevant);
                section.appendChild(divDerriere);
                card.appendChild (section);
                infosRecu.appendChild(card);
            }
            creationCard();
        }
    }
};
//----------------requête ajax open recherche
ajaxRequete.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + titre.value + "&language=fr-FR", true);
//----------------requête ajax send récupère
ajaxRequete.send();
}); 