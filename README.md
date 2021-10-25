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

### Sistema de Logeo

El sistema de logeo de la aplicacion es un modulo que se encarga de controlar todo el manejo de las credenciales de autenticacion obtenidas desde la API. Este modulo esta basado en promesas y su objetivo es verificar si existen o no credenciales almacenadas en el localstorage, si son validas o si fueron entregadas credenciales para realizar una peticion a la API y guardar las nuevas credenciales entregadas, asi como el de guardar el estado de la autenticacion y la informacion personal del usuario en el storage de la aplicacion.

![Logica logeo (1)](https://user-images.githubusercontent.com/78517969/138601392-46a7fe87-84fb-424d-8e11-b3384c3a273f.png)

### Sistema de autenticacion

El sistema de autenticacion se encuentra definido en el el archivo index.js dentro de la carpeta router. Para definir las rutas protegidas se utiliza la meta propiedad requiresAuth junto con el metodo beforeEach que a nivel global pregunta si el usuario esta autenticado verificando la variable en el storage de la aplicacion isLoged.

```javascript
{
    path: '/reserva',
    name: 'Reserva',
    meta: {
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "register" */ '../views/Reserva.vue')
}
```

```javascript
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.isLoged) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});
```

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

**0.3.2**

* Creadas validaciones para el filtro de viajes de la vista Home

**0.4.0**

* Creada vista viajes
* Creada conexion con la API /api/trayectos
* Añadida barra de filtrado en la vista viajes
* Añadidas validaciones para el formulario de la barra de filtrado
* Añadida opcion para mostrar lista de viajes disponibles de acuerdo a formulario de filtro o a la informacion ingresada en la vista Home

**0.4.1**

* Creada conexion en la vista Login con la API 
* Configurado store de la aplicacion
* Ahora cuando un usuario se logea correctamente sus datos personales se almacenan en el store
* Ahora cuando un usuario se logea correctamente se almacenan los tokens de autenticacion en el localStorage

**0.5.0**

* Recontruido el sistema de autenticacion, nuevo sistema de autenticacion basado en promesas
* Corregidos errores de autenticacion
* Optimizado layout de la aplicacion, ahora la barra de navegacion y el footer no se renderizan si no se han visto modificados

**0.6.0**

* Agregado sistema de proteccion de rutas, ahora cuando un usuario quiera cceder a una ruta protegida sin estar logeado se le pediran las credenciales de autenticacion, de lo contrario se devolvera a la pagina Home
* Agregada nueva vista, reservas (protegida)