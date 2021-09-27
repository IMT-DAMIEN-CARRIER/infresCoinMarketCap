# TP_CI_CONTAINERISATION

---

#### Léon Bousquet - Damien Carrier - Arthur Duca - Clément Savinaud

---

## TP noté du cours Intégration Continue & Containerisation - IMT Mines Alès - INFRES 12.

### Présentation du projet

---

`https://github.com/MirakuSan/infresCoinMarketCap`

---

Il s’agit d’un projet étudiant pour mettre en pratique le cours d’intégration continue et containérisation.

Ce cours est dispensé en 3ᵉ année INFRES option DL à l’IMT Mines d’Alès par `Amine Bourouiba`.

Cette petite application React/Express utilise l’API `https://coinlib.io/apidocs` pour faire des requêtes GET simple.

Le but du TP étant surtout de mettre en place la containérisation et d’utiliser la CI/CD de GitHub avec notamment GitHub
Actions.

---

### Pré-recquis

* `Docker version 20.10.8, build 3967b7d`

### Instalation du projet

```shell
git clone https://github.com/MirakuSan/infresCoinMarketCap.git
```

### Lancement du projet

```shell
docker-compose up -d
```

Ensuite vous pourrez vous rendre sur `http://localhost:3001` pour utiliser le projet.

La partie serveur de l'application est disponible à l'adresse `http://localhost:3000`.

Vous pourrez par exemple la tester de cette manière :

* `curl -I "http://localhost:3000/global" | grep "200 OK"`

--- 

### Description de la CI/CD

Nous avons décidé de séparer la CI/CD en 3 différents workflow :

1. workflow-branches
2. workflow-main
3. workflow-release

#### workflow-branches

C'est surement le workflow le plus utilisé de notre application avec le main.

En effet, il est exécuté à chaque création de Pull Request (PR).

```yaml
name: workflow-branches
on:
  pull_request:
    branches:
      - main
jobs:
  build-api:
    name: Build api solution
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 14.x ]
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - run: docker build api/. -t ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_api
      - run: docker run -p 3000:3000 --name infrescoinmarketcap_api -d ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_api
      - run: sleep 10
      - run: docker exec infrescoinmarketcap_api npm test

  build-client:
    name: Build client solution
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 14.x ]
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
      - run: docker build client/. -t ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_client
      - run: docker run -p 3001:3001 -d ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_client
      - run: sleep 10
      - run: curl -I http://localhost:3001/ | grep "200 OK"
```

Il nous permet de build le client et l'api et de lancer les tests sur l'api afin de vérifié que l'application ne
présente pas d'erreur au niveau des endpoints à chaques nouvelles PR.

#### workflow-main

Ce workflow est exécuté à chaque merge dans la branche main.

```yaml
name: workflow-main
on:
  push:
    branches:
      - main
jobs:
  publish-api:
    name: Push Docker image to Docker Hub
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2
      - name: Log in to Docker Hub
        uses: docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - run: docker build api/. -t ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_api:latest
      - run: docker run -p 3000:3000 --name infrescoinmarketcap_api -d ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_api:latest
      - run: sleep 10
      - run: docker exec infrescoinmarketcap_api npm test
      - run: docker push ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_api:latest

  publish-client:
    name: Push Docker image to Docker Hub
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2
      - name: Log in to Docker Hub
        uses: docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - run: docker build client/. -t ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_client:latest
      - run: docker push ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_client:latest
```

Ce workflow permet la création des images docker avec le tag latest.

#### workflow-release

Finalement, ce workflow est exécuté au moment de la création de chaque release.

```yaml
name: workflow-release
on:
  release:
    types: [ published ]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Release
        uses: softprops/action-gh-release@v1
        if: startsWith(github.ref, 'refs/tags/')

  publish-api:
    name: Push Docker image to Docker Hub
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2
      - name: Log in to Docker Hub
        uses: docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - run: docker build api/. -t ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_api:${{ github.event.release.tag_name }}
      - run: docker push ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_api:${{ github.event.release.tag_name }}

  publish-client:
    name: Push Docker image to Docker Hub
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Check out the repo
        uses: actions/checkout@v2
      - name: Log in to Docker Hub
        uses: docker/login-action@f054a8b539a109f9f41c372932f1ae047eff08c9
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      - run: docker build client/. -t ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_client:${{ github.event.release.tag_name }}
      - run: docker push ${{ secrets.DOCKER_USERNAME }}/infrescoinmarketcap_client:${{ github.event.release.tag_name }}
```

Il va créer les 2 images pour le client et l'api avec le tag : [RELEASE_TAG].