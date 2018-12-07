# Federez demo

Ce projet est une démo visant à montrer l'intégration d'une fédération d'identité utilisant OpenID
Connect. Il utilise pour cela Gitlab comme fournisseur d'identité (IDP)

Ce projet a été construit avec:
* [Node.js](nodejs.org)
* [Express](http://expressjs.com/)
* [Passport](http://www.passportjs.org/)

## Installation

Installez les dépendances du projet avec:

```
npm install
```

## Utilisation

Créez tout d'abord une [application dans votre compte Gitlab](https://gitlab.com/profile/applications), et
donnez-lui les scope read_user et openid. Si vous souhaitez lancer le projet localement, mettez
`http://localhost:3000/auth/gitlab/callback` comme URL de callback. Sinon, remplacez l'hôte par celui que
vous utiliserez.

Notez l'application ID et le Secret générés, et copiez-les dans le fichier `config.js`.

Lancez l'application avec:

```
npm start
```


## Docker et Traefik

Ce projet peut également être lancé avec Docker et docker-compose. La configuration du docker-compose est
d'ailleurs prévue pour facilement le déployer sur un serveur équipé de [Traefik](http://traefik.io/). Pensez
tout de même à remplacer le nom de l'hôte par votre url, puis lancez:

```
docker-compose up -d
```