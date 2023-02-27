# Projet_WebMapping
Projet de WebMapping sur le sujet "hit.json" de Capa fait de décembre 2022 à février 2023 à l'ENSG-Géomatique, supervisé par E. Fritsch.

Le but était de proposer sur une page web, une mini-carte de jeu de tir style FPS à partir d'un fichier "hit.json".

Tout d'abord, veuillez lire le sujet ([sujet_capa.txt](https://github.com/LaurisB07/Projet_WebMapping/files/10844720/sujet_capa.txt))pour être à-même à lire le texte suivant. De plus, énormément de spécifications se font en directemment dans le code en tant que commentaires. Enfin, voici le journal de bord que j'ai tenu lors du projet ([jdb_capa.txt](https://github.com/LaurisB07/Projet_WebMapping/files/10844730/jdb_capa.txt)).

## Présentation du fichier "hit.json"

Il est de la forme suivante : [websocket_forme.txt](https://github.com/LaurisB07/Projet_WebMapping/files/10844655/websocket_forme.txt)

Le "hit.json" se décompose en trois parties : les joueurs, les batteries et les quartiers généraux. Chacune de ces parties possède des objets dont les caractéristiques sont exploitables dans le fichier JavaScript. On recense pour les joueurs l'identifiant, l'équipe, le chef, la position, la capacité, l'orientation, l'état et la durée. Chaque caractéristique va se traduire sur la mini-carte d'une manière différente : la capacité sur l'opacité des marqueurs, le chef sur la couleur du marqueur, l'état sur la géométrie résultante du marqueur, etc. Pour les batteries, la couleur change en fonction de l'équipe la détenant et l'opacité traduit la capacité qu'elle contient. Idem pour les QG.






