# my_toast_ui_calendar
my calendar Toast UI Calendar

## 1. Commencer



> Création application ToastTUICalendar qui permet de gérer un calendrier  
>
> 

#### 	1.1 Installation NodeJS and NPM

> installer les outils de développement  native NodeJS modules :



```sh
$ sudo apt-get install build-essential nodejs
#
# puis install curl
$ sudo apt-get update
$ sudo apt-get install curl
```



####  	1.2 I Creation de l'application via vue@cli

​	

##### installation de la version 2 du client vuejs 

```sh
$ mkdir ToastTUICalendarr
$ cd ToastTUICalendarr
$ sudo npm install -g vue@2.6.14

```

##### Création de l'application 

```shell
$ vue create my_toast_ui_alendar
$ cd my_toast_ui_alendar
# lancer le projet
$ npm run serve
# lance navigateur http://localhost:8080
```

##### Création du composant Vue Meeting Selector

installer la version avant la dernière cad version == **toast-ui-calendar@1.1.3**

```shell
$ npm install @toast-ui/calendar --save
```

dans le fichier APP.vue 

rajouter cette ligne 

```shell
$ import VueMeetingSelector from 'toast-tui-calendar';
```



*  [src/ App.vue ](https://github.com/Siabdel/my_toast_ui_calendar/blob/main/App.vue):

* Component  [src/TxCalendar.vue](https://github.com/Siabdel/my_toast_ui_calendar/blob/main/components/TxCalendar.vue)
* 



> 
>
> on remarque que les data qui porte les date disponibles sont charger via le fichier data.json

### Intégration a Github 

Enregistrer les sources dans le serveur Github (login : siabdel58@gmail.com/: G1)

sur votre github vous creer le dépot "vue-meeting-calendar"

ensuite vous pouvez pousser les sources

```shell
$ cd src
# init depot git
$ git init 
$ git branch -m main 
# add remote git address
$ git remote add origin https://github.com/Siabdel/my-toad-ui-calendar.git
$ git pull origin main 
# add src
$ git add .
$ git commit -am "init project my-toad-ui-calendar "
$ git push origin main 


```


