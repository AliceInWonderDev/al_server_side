A continuación se explicará la forma en que se hizo el deploy con heroku:

Instale el Heroku CLI en la computadora, luego a través de la terminal cree remotamente el repositorio con el siguiente comando:

``` 
heroku git:remote -a repository-name
```

luego hice el deploy a través del siguiente comando:

```
git push heroku master
```
Es de señalar que este último comando se utiliza cada vez que se hace un cambio y después de haber subido dicho cambio a GitHub

Antes de lograr el deploy me encontré con varias configuraciones que eran necesarias hacer, como por ejemplo: 

cambiar del puerto 3001 al 8000

Además, tuve que añadir credenciales, sin las que no habría podido hacer el deploy funcional: 'Acces-Control-Allow-Origin', '*';...

Finalmente, cambie el script "test" por "start: node app.js" en el package.json del servidor.


