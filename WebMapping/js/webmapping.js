// Code du projet WebMapping "hit.json" de Capa fait par Lauris Bocaux 12/22 -> 02/23, proposé par Emmanuel Fritsch


//Création de la carte, initialisation de la position et du niveau de zoom

var map = L.map('map', {zoomSnap: 0.1}).setView([44.482728653624804,4.690335988998414], 18.8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 22
}).addTo(map);


//Liaison entre les éléments de la page et les éléments du JS

var carte = document.getElementById('map');


//Boutons de droite

var bouton_1 = document.getElementById('bouton_1');
var bouton_2 = document.getElementById('bouton_2');
var bouton_3 = document.getElementById('bouton_3');
var bouton_4 = document.getElementById('bouton_4');
var bouton_5 = document.getElementById('bouton_5');
var bouton_6 = document.getElementById('bouton_6');
var bouton_7 = document.getElementById('bouton_7');
var bouton_8 = document.getElementById('bouton_8');
var bouton_arbitre = document.getElementById('bouton_arbitre');


//Boutons de gauche

var bouton_marqueurs = document.getElementById('bouton_marqueurs');


//Barre de capacité

var nombre = document.getElementById('nombre');
var taille = document.getElementsByClassName('html')


//Event listeners sur les boutons

bouton_1.addEventListener('click', function(e){
    affichage(1);
});

bouton_2.addEventListener('click', function(e){
    affichage(2);
});

bouton_3.addEventListener('click', function(e){
    affichage(3);
});

bouton_4.addEventListener('click', function(e){
    affichage(4);
});

bouton_5.addEventListener('click', function(e){
    affichage(5);
});

bouton_6.addEventListener('click', function(e){
    affichage(6);
});

bouton_7.addEventListener('click', function(e){
    affichage(7);
});

bouton_8.addEventListener('click', function(e){
    affichage(8);
});

bouton_arbitre.addEventListener('click', function(e){
    affichage(9);
});


var click_marqueurs = 0

bouton_marqueurs.addEventListener('click', function(e){ //Si la couche est affichée, l'enlève et inversement
    
    if (click_marqueurs == 0){
        map.removeLayer(marqueurs);
        click_marqueurs += 1;
    }

    else if (click_marqueurs == 1){
        map.addLayer(marqueurs);
        click_marqueurs -= 1;
    }

})

var click_etats = 0

bouton_etats.addEventListener('click', function(e){ //Si la couche est affichée, l'enlève et inversement
    
    if (click_etats == 0){
        map.removeLayer(etats);
        click_etats += 1;
    }

    else if (click_etats == 1){
        map.addLayer(etats);
        click_etats -= 1;
    }

})

var click_geometries = 0

bouton_geometries.addEventListener('click', function(e){ //Si la couche est affichée, l'enlève et inversement
    
    if (click_geometries == 0){
        map.removeLayer(geometries);
        click_geometries += 1;
    }

    else if (click_geometries == 1){
        map.addLayer(geometries);
        click_geometries -= 1;
    }

})


//Création de la couche contenant les objets à afficher

var marqueurs = L.layerGroup();
marqueurs.addTo(map);

var etats = L.layerGroup();
etats.addTo(map);

var geometries = L.layerGroup();
geometries.addTo(map);

//Fonction d'affichage des éléments, en fonction du point de vue

function affichage(pov) {

    marqueurs.clearLayers(); //Mise à zéro des marqueurs à afficher
    etats.clearLayers(); //Mise à zéro des états à afficher
    geometries.clearLayers(); //Mise à zéro des géométries à afficher

    fetch('../hit.json') //Accès au "hit.json"
    .then(result => result.json())
    .then(r => {


        //Point de vue de l'arbitre

        if (pov == 9) {

            //Mise à jour de la barre de capacité

            nombre.innerHTML = "L'arbitre n'a pas de capacité ! ";
            taille[0].style.width = '100%';


            //Mise à jour de la carte

            map.setView([44.482728653624804,4.690335988998414], 18.2);
            carte.style.rotate = "0deg"; //Rotation de la carte en direction du Nord

            //Affichage de tous les joueurs et de leur rôle

            for (var i = 0; i < Object.keys(r['joueur']).length; i++) { 


                //Affichage des joueurs

                if (r['joueur'][i]['equipe'] == 1 && r['joueur'][i]['chef']) { //Si c'est le chef de l'équipe 1
                    var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ 
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png', //Marqueur violet
                        iconAnchor: [12,15]
                      })});
                }

                if (r['joueur'][i]['equipe'] == 1 && !(r['joueur'][i]['chef'])) { //Si c'est un joueur de l'équipe 1
                    var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ 
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', //Marqueur bleu
                        iconAnchor: [12,15]
                      })});
                }

                if (r['joueur'][i]['equipe'] == 2 && r['joueur'][i]['chef']) { //Si c'est le chef de l'équipe 2
                    var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ 
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', //Marqueur rouge
                        iconAnchor: [12,15]
                      })});
                }

                if (r['joueur'][i]['equipe'] == 2 && !(r['joueur'][i]['chef'])) { //Si c'est un joueur de l'équipe 2
                    var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ 
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png', //Marqueur orange
                        iconAnchor: [12,15]
                      })});
                }

                m.setOpacity(0.8 * r['joueur'][i]['capa'] / 1000 + 0.2); //L'opacité du marqueur représente la capacité d'un joueur. Plus il est transparent, moins il a de capacité.
                m.addTo(marqueurs); //Ajout du marqueur à la carte
                m.setRotationAngle(180 + r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                m.setRotationOrigin('12px 13px'); //Défintion du centre de rotation du marqueur
              
            
                //Affichage des états

                var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/' + r['joueur'][i]['etat'].toLowerCase() + '.svg', //Chaque état a sa propore icône
                    iconSize: [20, 20]
                  })});

                m.setRotationAngle(r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                m.setRotationOrigin('10px 10px'); //Défintion du centre de rotation du marqueur
                m.addTo(etats);
                
                if (r['joueur'][i]['etat'] == 'TIR') { //Si le joueur est en plein tir, on affiche la zone de tir par un polygone.

                    //Création d'un arc de cercle de 30° à 40 mètres du joueur, l'orientation étant le centre de celui-ci
                    // Il se traduit par un arc d'ellipsoïde à cause de la déformation liée à la latitude.
                    var arc = turf.lineArc(turf.point(r['joueur'][i]['position']), 40 / 1000, - r['joueur'][i]['orientation'] - 15 + 90, - r['joueur'][i]['orientation'] + 15 + 90, {steps: 1000, units: 'kilometers', properties: {foo: 'bar'}});    
                    
                    var coo_poly = [r['joueur'][i]['position']]; //Création de la liste contenant les coordonnées du polygone
                    
                    for (var j = 0; j < Object.keys(arc['geometry']['coordinates']).length; j++) { //Implémentation des coordonnées de l'arc
                        coo_poly.push(arc['geometry']['coordinates'][j]);
                    }
                    
                    var polygon = L.polygon(coo_poly,{fillColor: 'red', color: 'red', opacity: 0.3, zIndexOffset: -1}).addTo(geometries); //Ajout de la zone de tir
                }

                if (r['joueur'][i]['etat'] == 'ASSAUT') { //Si le joueur est en plein assaut, on affiche la zone d'assaut par un cercle.
                    
                    var circle = L.circle(r['joueur'][i]['position'], 25,{fillColor: 'green', color: 'green', opacity: 0.3, zIndexOffset: -1}).addTo(geometries); //La zone d'assaut est de 25 mètres.

                }

                if (r['joueur'][i]['etat'] == 'OBSERVATION') { //Si le joueur est en plein observation, on affiche la zone d'observation par un cercle.
                    
                    var range = 30 * (1 + r['joueur'][i]['duree'] / 45); //Rayon de vision du joueur en observation

                    if (range > 75) { //Il augmente de 100% en 45 secondes et ne peut pas dépasser 2.5 fois le rayon initial, de 30 mètres.
                        range = 75;
                    }  

                    var circle = L.circle(r['joueur'][i]['position'], range, {fillColor: 'purple', color: 'purple', fillOpacity: 0.1, opacity: 0.1, zIndexOffset: -1}).addTo(geometries); //Ajout de la zone d'observation

                }

                if (r['joueur'][i]['etat'] == 'PROTECTION') { //Si le joueur est en pleine protection, on affiche la direction de protection par un arc de cercle.

                    var arc = turf.lineArc(turf.point(r['joueur'][i]['position']), 5 / 1000, - r['joueur'][i]['orientation'], - r['joueur'][i]['orientation'] + 180, {steps: 1000, units: 'kilometers', properties: {foo: 'bar'}});    
                    
                    var arc_f = L.polyline(arc['geometry']['coordinates'],{color: 'black', opacity: 1, zIndexOffset: -1}).addTo(geometries); //Ajout de l'arc de cercle (plutôt d'ellipsoïde)
                }
            }


        //Affichage des batteries

        for (var i = 0; i < Object.keys(r['batterie']).length; i++) { 

            if (r['batterie'][i]['equipe'] == 0) { //Si la batterie n'a pas encore d'équipe
                var m = L.marker(r['batterie'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/batterie.svg',
                    iconSize: [30, 30]
                  })});
            }

            if (r['batterie'][i]['equipe'] == 1) {
                var m = L.marker(r['batterie'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/batterie_bleue.svg',
                    iconSize: [30, 30]
                  })});
            }

            if (r['batterie'][i]['equipe'] == 2) {
                var m = L.marker(r['batterie'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/batterie_rouge.svg',
                    iconSize: [30, 30]
                  })});
            }

            m.setOpacity(0.8 * r['batterie'][i]['capa'] / 1000 + 0.2); //L'opacité du marqueur représente la capacité de la batterie. Plus il est transparent, moins il a de capacité.
            m.addTo(marqueurs); //Ajout du marqueur à la carte
        }


        //Affichage des QG

        for (var i = 0; i < Object.keys(r['qg']).length; i++) { 
            if (r['qg'][i]['equipe'] == 1) {
                var m = L.marker(r['qg'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/qg_bleu.svg',
                    iconSize: [60, 40]
                  })});
            }

            if (r['qg'][i]['equipe'] == 2) {
                var m = L.marker(r['qg'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/qg_rouge.svg',
                    iconSize: [60, 40]
                  })});
            }

            m.setOpacity(0.8 * r['qg'][i]['capa'] / 1000 + 0.2); //L'opacité du marqueur représente la capacité du QG. Plus il est transparent, moins il a de capacité.
            m.addTo(marqueurs); //Ajout du marqueur à la carte
        }

        }


        //Point de vue du joueur

        else {

            //Mise à jour de la barre de capacité

            nombre.innerHTML = '' + r['joueur'][pov-1]['capa'] + ' ';
            taille[0].style.width = r['joueur'][pov-1]['capa'] / 10 + '%';


            //Mise à jour de la carte

            map.setView(r['joueur'][pov-1]['position'], 18.7); //Ajustement de la carte au joueur, rayon à peine supérieur à 75 mètres pour pouvoir tout voir lors d'une observation maximale

            carte.style.rotate = - r['joueur'][pov-1]['orientation'] + "deg"; //Rotation de la carte dans la direction du joueur

            var range = 30 * (1 + r['joueur'][pov-1]['duree'] * (r['joueur'][pov-1]['etat'] == 'OBSERVATION') / 45); //Rayon de vision du joueur en observation

            if (range > 75) { //Il augmente de 100% en 45 secondes et ne peut pas dépasser 2.5 fois le rayon initial, de 30 mètres.
                range = 75;
            } 


            //Boucle sur les joueurs pour déterminer ceux à ajouter

            for (var i = 0; i < Object.keys(r['joueur']).length; i++) {

                if (i == pov - 1) { //Si le joueur est celui du point de vue

                    var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', //Marqeur vert
                        iconAnchor: [12,15]
                      })});
                    m.setRotationAngle(180 + r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                    m.setRotationOrigin('12px 13px'); //Défintion du centre de rotation du marqueur
                    m.setOpacity(0.8 * r['joueur'][i]['capa'] / 1000 + 0.2); //L'opacité du marqueur représente la capacité d'un joueur. Plus il est transparent, moins il a de capacité.
                    m.addTo(marqueurs); //Ajout du marqueur à la carte

                    var e = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage de l'état
                        iconUrl: '../images/' + r['joueur'][i]['etat'].toLowerCase() + '.svg', //Chaque état a sa propore icône
                        iconSize: [20, 20]
                      })});
    
                    e.setRotationAngle(r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                    e.setRotationOrigin('10px 10px'); //Défintion du centre de rotation du marqueur
                    e.addTo(etats);

                    if (r['joueur'][i]['etat'] == 'TIR') { //Si le joueur est en plein tir, on affiche la zone de tir par un polygone.

                        //Création d'un arc de cercle de 30° à 40 mètres du joueur, l'orientation étant le centre de celui-ci
                        // Il se traduit par un arc d'ellipsoïde à cause de la déformation liée à la latitude.
                        var arc = turf.lineArc(turf.point(r['joueur'][i]['position']), 40 / 1000, - r['joueur'][i]['orientation'] - 15 + 90, - r['joueur'][i]['orientation'] + 15 + 90, {steps: 1000, units: 'kilometers', properties: {foo: 'bar'}});    
                        
                        var coo_poly = [r['joueur'][i]['position']]; //Création de la liste contenant les coordonnées du polygone
                        
                        for (var j = 0; j < Object.keys(arc['geometry']['coordinates']).length; j++) { //Implémentation des coordonnées de l'arc
                            coo_poly.push(arc['geometry']['coordinates'][j]);
                        }
                        
                        var polygon = L.polygon(coo_poly,{fillColor: 'red', color: 'red', opacity: 0.3, zIndexOffset: -1}).addTo(geometries); //Ajout de la zone de tir
                    }
    
                    if (r['joueur'][i]['etat'] == 'ASSAUT') { //Si le joueur est en plein assaut, on affiche la zone d'assaut par un cercle.
                        
                        var circle = L.circle(r['joueur'][i]['position'], 25,{fillColor: 'green', color: 'green', opacity: 0.3, zIndexOffset: -1}).addTo(geometries); //La zone d'assaut est de 25 mètres.
    
                    }
    
                    if (r['joueur'][i]['etat'] == 'OBSERVATION') { //Si le joueur est en plein observation, on affiche la zone d'observation par un cercle.
                        
                        var range = 30 * (1 + r['joueur'][i]['duree'] / 45); //Rayon de vision du joueur en observation
    
                        if (range > 75) { //Il augmente de 100% en 45 secondes et ne peut pas dépasser 2.5 fois le rayon initial, de 30 mètres.
                            range = 75;
                        }  
    
                        var circle = L.circle(r['joueur'][i]['position'], range, {fillColor: 'purple', color: 'purple', fillOpacity: 0.1, opacity: 0.1, zIndexOffset: -1}).addTo(geometries); //Ajout de la zone d'observation
    
                    }
    
                    if (r['joueur'][i]['etat'] == 'PROTECTION') { //Si le joueur est en pleine protection, on affiche la direction de protection par un arc de cercle.
                        
                        var arc = turf.lineArc(turf.point(r['joueur'][i]['position']), 5 / 1000, - r['joueur'][i]['orientation'], - r['joueur'][i]['orientation'] + 180, {steps: 1000, units: 'kilometers', properties: {foo: 'bar'}});    
                        
                        var arc_f = L.polyline(arc['geometry']['coordinates'],{color: 'black', opacity: 1, zIndexOffset: -1}).addTo(geometries); //Ajout de l'arc de cercle (plutôt d'ellipsoïde)
                    }
                }

                else if (r['joueur'][i]['equipe'] == r['joueur'][pov-1]['equipe']) { //Si c'est un allié du joueur


                    //Calcul de la distance entre le joueur et son allié

                    var from = turf.point([r['joueur'][pov-1]['position'][1],r['joueur'][pov-1]['position'][0]]); //Longitude et latitude sont inversées dans turf.js, pas de panique !
                    var to = turf.point([r['joueur'][i]['position'][1],r['joueur'][i]['position'][0]]);
                    var distance = turf.distance(from, to);
                    distance *= 1000;

                    if (distance <= range) { //Si l'allié est à la distance de vision ou moins du joueur
                        
                        if (r['joueur'][i]['chef']) { //Si l'allié est le chef
                            var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png', //Marqeur violet
                                iconAnchor: [12,15]
                              })});
                        }

                        else { //Si l'allié n'est pas le chef
                            var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', //Marqeur bleu
                                iconAnchor: [12,15]
                              })});
                        }


                        m.setRotationAngle(180 + r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                        m.setRotationOrigin('12px 13px'); //Défintion du centre de rotation du marqueur
                        m.setOpacity(0.8 * r['joueur'][i]['capa'] / 1000 + 0.2); //L'opacité du marqueur représente la capacité d'un joueur. Plus il est transparent, moins il a de capacité.
                        m.addTo(marqueurs); //Ajout du marqueur à la carte
    
                        var e = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage de l'état
                            iconUrl: '../images/' + r['joueur'][i]['etat'].toLowerCase() + '.svg', //Chaque état a sa propore icône
                            iconSize: [20, 20]
                          })});
        
                        e.setRotationAngle(r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                        e.setRotationOrigin('10px 10px'); //Défintion du centre de rotation du marqueur
                        e.addTo(etats);
                        
                    }

                    else if (distance <= 1.5 * range) { //Si l'allié est entre 1.5x et 1x la distance de vision du joueur

                        if (r['joueur'][i]['chef']) { //Si l'allié est le chef
                            var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png', //Marqeur violet
                                iconAnchor: [12,15]
                              })});
                        }

                        else { //Si l'allié n'est pas le chef
                            var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png', //Marqeur bleu
                                iconAnchor: [12,15]
                              })});
                        }


                        m.setRotationAngle(180 + r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                        m.setRotationOrigin('12px 13px'); //Défintion du centre de rotation du marqueur
                        m.setOpacity(0.8 * r['joueur'][i]['capa'] / 1000 + 0.2); //L'opacité du marqueur représente la capacité d'un joueur. Plus il est transparent, moins il a de capacité.
                        m.addTo(marqueurs); //Ajout du marqueur à la carte
                    
                    }

                    else if (distance <= 2.5 * range) { //Si l'allié est entre 2.5x et 1.5x la distance de vision du joueur

                        if (r['joueur'][i]['chef']) { //Si l'allié est le chef
                            var m = L.circle(r['joueur'][i]['position'], 3.5, {color: '#742E98', fillColor: '#9C2BCB', opacity: (0.8 * r['joueur'][i]['capa'] / 1000 + 0.2)}); //Affichage de la position en violet
                        }

                        else { //Si l'allié n'est pas le chef
                            var m = L.circle(r['joueur'][i]['position'], 3.5, {color: '#3274A3', fillColor: '#2A81CB', opacity: (0.8 * r['joueur'][i]['capa'] / 1000 + 0.2)}); //Affichage de la position en bleu
                        }

                        m.addTo(marqueurs); //Ajout du marqueur à la carte
                    
                    }

                }

                else if (r['joueur'][i]['equipe'] != r['joueur'][pov-1]['equipe']) { //Si c'est un ennemi du joueur


                    //Calcul de la distance entre le joueur et son ennemi

                    var from = turf.point([r['joueur'][pov-1]['position'][1],r['joueur'][pov-1]['position'][0]]); //Longitude et latitude sont inversées dans turf.js, pas de panique !
                    var to = turf.point([r['joueur'][i]['position'][1],r['joueur'][i]['position'][0]]);
                    var distance = turf.distance(from, to);
                    distance *= 1000;

                    if (distance <= 0.5 * range) { //Si l'ennemi est à 0.5x la distance de vision ou moins du joueur
                        
                        if (r['joueur'][i]['chef']) { //Si l'ennemi est le chef
                            var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', //Marqeur rouge
                                iconAnchor: [12,15]
                              })});
                        }

                        else { //Si l'ennemi n'est pas le chef
                            var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png', //Marqeur orange
                                iconAnchor: [12,15]
                              })});
                        }


                        m.setRotationAngle(180 + r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                        m.setRotationOrigin('12px 13px'); //Défintion du centre de rotation du marqueur
                        m.addTo(marqueurs); //Ajout du marqueur à la carte
    
                        var e = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage de l'état
                            iconUrl: '../images/' + r['joueur'][i]['etat'].toLowerCase() + '.svg', //Chaque état a sa propore icône
                            iconSize: [20, 20]
                          })});
        
                        e.setRotationAngle(r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                        e.setRotationOrigin('10px 10px'); //Défintion du centre de rotation du marqueur
                        e.addTo(etats);
                        
                    }

                    else if (distance <= range) { //Si l'ennemi est entre 1x et 0.5x la distance de vision du joueur

                        if (r['joueur'][i]['chef']) { //Si l'ennemi est le chef
                            var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', //Marqeur rouge
                                iconAnchor: [12,15]
                              })});
                        }

                        else { //Si l'ennemi n'est pas le chef
                            var m = L.marker(r['joueur'][i]['position'], {icon: L.icon({ //Affichage du marqueur
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png', //Marqeur orange
                                iconAnchor: [12,15]
                              })});
                        }


                        m.setRotationAngle(180 + r['joueur'][i]['orientation']); //Définition de la rotation du marqueur
                        m.setRotationOrigin('12px 13px'); //Défintion du centre de rotation du marqueur
                        m.addTo(marqueurs); //Ajout du marqueur à la carte
                    
                    }

                    else if (distance <= 1.5 * range) { //Si l'ennemi est entre 1.5x et 1x la distance de vision du joueur

                        if (r['joueur'][i]['chef']) { //Si l'ennemi est le chef
                            var m = L.circle(r['joueur'][i]['position'], 3.5, {color: '#982E40', fillColor: '#CB2B3E'}); //Affichage de la position en rouge
                        }

                        else { //Si l'ennemi n'est pas le chef
                            var m = L.circle(r['joueur'][i]['position'], 3.5, {color: '#98652E', fillColor: '#CB8427'}); //Affichage de la position en orange
                        }

                        m.addTo(marqueurs); //Ajout du marqueur à la carte
                    
                    }

                }

            }


        //Affichage des batteries

        for (var i = 0; i < Object.keys(r['batterie']).length; i++) { 

            if (r['batterie'][i]['equipe'] == 0) { //Si la batterie n'a pas encore d'équipe
                var m = L.marker(r['batterie'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/batterie.svg',
                    iconSize: [30, 30]
                  })});
            }

            else if (r['batterie'][i]['equipe'] == r['joueur'][pov-1]['equipe']) { //Si la batterie appartient à l'équipe du joueur
                var m = L.marker(r['batterie'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/batterie_bleue.svg',
                    iconSize: [30, 30]
                  })});
            }

            else {
                var m = L.marker(r['batterie'][i]['position'], {icon: L.icon({ //Si la batterie n'appartient pas à l'équipe du joueur
                    iconUrl: '../images/batterie_rouge.svg',
                    iconSize: [30, 30]
                  })});
            }

            m.setRotationAngle(r['joueur'][pov-1]['orientation']); //Définition de la rotation du marqueur
            m.setOpacity(0.8 * r['batterie'][i]['capa'] / 1000 + 0.2); //L'opacité du marqueur représente la capacité de la batterie. Plus il est transparent, moins il a de capacité.
            m.addTo(marqueurs); //Ajout du marqueur à la carte
        }


        //Affichage des QG

        for (var i = 0; i < Object.keys(r['qg']).length; i++) { 
            if (r['qg'][i]['equipe'] == 1) {
                var m = L.marker(r['qg'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/qg_bleu.svg',
                    iconSize: [60, 40]
                  })});
            }

            if (r['qg'][i]['equipe'] == 2) {
                var m = L.marker(r['qg'][i]['position'], {icon: L.icon({ 
                    iconUrl: '../images/qg_rouge.svg',
                    iconSize: [60, 40]
                  })});
            }

            m.setRotationAngle(r['joueur'][pov-1]['orientation']); //Définition de la rotation du marqueur
            m.setOpacity(0.8 * r['qg'][i]['capa'] / 1000 + 0.2); //L'opacité du marqueur représente la capacité du QG. Plus il est transparent, moins il a de capacité.
            m.addTo(marqueurs); //Ajout du marqueur à la carte
        }

        }

    })

}
