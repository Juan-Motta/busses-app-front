# OVERIDE - Proyecto app gestion viajes

## Acerca de la app


Overide es una applicacion creada con el fin de poder gestionar la compra de pasajes de buses intermunicipales.
Esta aplicacion esta creada como proyecto para el ciclo 3 de MisionTic20222

## Tecnologias utilizadas

La applicacion fue contruida usando las siguientes tecnologias:

* PostgreSQL
* Django
* VueJS

## Instalacion y configuracion

Una vez clonado el repositorio, se debe ingresar a la carpeta raiz y ejecutar el comando
```console
npm install
```
Una vez se han instalado los paquetes necesarios de Node, se debe correr el servidor de desarrollo con el comandi
```console
npm run serve
```
El servidor por defecto empezara a correr en el puerto 8080

## Caracteristicas

### Home Page

La Home Page esta diseñada para que el usuario tenga una impresion instantanea de lo que hace la pagina y la empresa, es posible encontrar a la mano la barra de navegacion, las opciones de registro e inicio de sesion y la caja de busqueda la cual esta destinada para realizar un filtrado del los viajes. Asi mismo la aplicacion ofrece un estilo responsive el cual se puede adaptar a cualquier dispositivo moderno.

<div align=center>
<img src="https://user-images.githubusercontent.com/78517969/137931640-d16584bf-8c8c-4b9d-b7cd-5eab2801ce21.png" width="600"> <img src="https://user-images.githubusercontent.com/78517969/137932164-2a949c4b-0abe-4ba2-9e6d-317db2de5c4d.png" width="250">
</div>


## Notas

**0.1.0**  

* Creada estructura base del proyecto
* Configurado Vue Router
* Configurado Vuex
* Configurado Axios
* Configurado Bootstrap

**0.2.0**

* Creada la vista Home de la aplicacion

**0.3.0**

* Creada la vista registro y login
* Creadas validaciones para la vista registro
* Creada conexion con la API /api/users
* Creacion de usuarios habilitada

**0.3.1**

* Creada sugerencia de trayectos en la vista Home en los campos origen y destino
* Creada conexion con la API a la ruta /api/trayectos


