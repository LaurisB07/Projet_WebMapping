# Projet_WebMapping
Projet de WebMapping sur le sujet "hit.json" de Capa fait de décembre 2022 à février 2023 à l'ENSG-Géomatique, supervisé par E. Fritsch.

Le but était de proposer sur une page web, une mini-carte de jeu de tir style FPS à partir d'un fichier "hit.json".

Tout d'abord, veuillez lire le sujet ([sujet_capa.txt](https://github.com/LaurisB07/Projet_WebMapping/files/10844720/sujet_capa.txt))pour être à-même à lire le texte suivant. De plus, énormément de spécifications se font en directemment dans le code en tant que commentaires. Enfin, voici le journal de bord que j'ai tenu lors du projet ([jdb_capa.txt](https://github.com/LaurisB07/Projet_WebMapping/files/10844730/jdb_capa.txt)).

## Forme de la page

J'ai décidé de faire ma page web en format "grid", une grande première colonne qui contiendra la carte, deux autres plus petites pour les boutons qui me permettront de naviguer entre les éléments de la carte. En bas de l'écran, sous la carte se situera la barre de capacité du joueur.

## Création de la carte

J'ai d'abord commencé par importer un fond de carte grâce à Leaflet et aux anciens travaux de cartographie web effectués en cours. Puis, je lui applique un effet de style la rendant circulaire, forme de la plupart des mini-cartes de jeux vidéo. L'initalisation de la vue sur celle-ci se fait plus tard. 

## Présentation du fichier "hit.json"

Il est de la forme suivante : [websocket_forme.txt](https://github.com/LaurisB07/Projet_WebMapping/files/10844655/websocket_forme.txt)

Le "hit.json" se décompose en trois parties : les joueurs, les batteries et les quartiers généraux. Chacune de ces parties possède des objets dont les caractéristiques sont exploitables dans le fichier JavaScript. On recense pour les joueurs l'identifiant, l'équipe, le chef, la position, la capacité, l'orientation, l'état et la durée. Chaque caractéristique va se traduire sur la mini-carte d'une manière différente : la capacité sur l'opacité des marqueurs, le chef sur la couleur du marqueur, l'état sur la géométrie résultante du marqueur, etc. Pour les batteries, la couleur change en fonction de l'équipe la détenant et l'opacité traduit la capacité qu'elle contient. Idem pour les QG.

## Rotation et choix des marqueurs

Je trouve un fichier JavaScript libre de droits sur Internet permettant de rotationner les marqueurs que j'utilise. Ils proviennent du GitHub suivant : https://raw.githubusercontent.com/pointhi/leaflet-color-markers. L'add-on de rotation permet de donner un angle de rotation et un centre de rotation d'un marqueur, qui sera le centre du cercle blanc des marqueurs provenant du GitHub. Pour les marqueurs issus des ".svg", la rotation se fait au centre de ceux-ci. D'ailleurs, les ".svg" ont été modifiés par moi-même pour obtenir la couleur de mon choix et le fond transparent.

## Code JavaScript

J'ai premièrement créé le point de vue de l'arbitre de la partie car elle est la plus simple et la plus entraînante pour la suite. D'abord, les marqueurs des joueurs sont affichés. L'équipe 1 est bleue avec son chef violet et l'équipe 2 est orange avec son chef rouge. Ils sont tournés dans la bonne direction, la pointe du marqueur dirigée par l'orientation. Ensuite, les états des joueurs sont ajoutés. Chaque état correspond à une image attachée au joueur différente : le bouclier pour la protection, etc. Enfin, sont implémentés les géométries des joueurs : une part de camembert pour le tir, un cercle pour l'assaut et l'observation, un arc de cercle pour la protection. Les arcs de cercle ont été formés grâce à "turf.js" qui prend en compte les déformations liées à la latitude, Leaflet ne le faisant pas. Les arcs de cercle sont retranscrits en arcs d'ellipsoïde.

Puis, j'ai créé le point de vue du joueur. Chacune des objets cités ci-dessus s'affichent en fonction de plusieurs paramètres qui sont bien détaillés dans le code. Le faire ici serait trop long. La carte est centrée sur le joueur, qui est représenté toujours regardant vers le haut et en vert. Ses alliés sont en bleu et ses ennemis en orange (pour le chef de l'équipe, respectivement violet et rouge). En fonction de la distance d'observation du joueur ainsi que de la distance le séparant des autres objets, ils s'affichent ou non ou pas entièrement.

## Boutons sur la page

D'abord, les boutons de gauche : le bouton "Marqueurs" permet d'enlever et de remettre sur la carte tous les marqueurs de joueur, de batterie et de QG. Le bouton "États" fait de même avec les petites icônes sur les joueurs et celui "Géométries" suit la logique avec les géométries implémentées.

Pour les boutons de droite, c'est encore plus simple : chaque bouton correspond à un point de vue différent, les huit premiers sont de joueur et le dernier, de l'arbitre.

## Mise en place

Il suffit d'ajouter le dossier "WebMapping" en tant que VirtualHost sur Wamp et de cliquer sur "html" une fois sélectionné pour simuler le point de vue d'un joueur ou de l'arbitre lors d'une partie de Capa !




