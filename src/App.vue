<template>

  <div >
    <nav class="navbar .navbar-dark" style="background-color: #191654; color : white ; text-align:center">
      <a href="/" class="navbar-brand " style="color : white ; padding : 20px ;" >Jesica Romina Sieiro</a>
    </nav>
    <!--MAIN CONTENT-->
    <div class="container">
      <div class="row mt-3">
        <div class="col-sm-5 text-center">
          <!--NUEVO-->
          <!--<div class="card" style="width: 15rem;">
              <img src="./assets/fotoPorfolio.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <p>
                Buenas! Soy Licenciada en Gestión de Tecnología y lo que más me apasiona es aprender continuamente nuevas tecnologías e ir probando cada una de ellas.
                A la derecha les muestro una de las cosas que hice, un blog en el cual voy subiendo contenido teorico y mi repositorio de git.  
              </p>
              <p>
                Muchisimas gracias por haber entrado y ojalá podamos conocernos y aprender juntos.
              </p>
              </div>
          </div>-->

          <img  src="./assets/fotoPorfolio.jpg" class="foto-presentacion" alt="Foto de Jesica Sieiro">

          <div class="presentacion">
              <p>
                Buenas! Soy Licenciada en Gestión de Tecnología y lo que más me apasiona es aprender continuamente nuevas tecnologías e ir probando cada una de ellas.
                A la derecha les muestro una de las cosas que hice, un blog en el cual voy subiendo contenido teorico y mi repositorio de git.  
              </p>
              <p>
                Muchisimas gracias por haber entrado y ojalá podamos conocernos y aprender juntos.
              </p>
          </div>

         <!-- <div class="card" style="margin: 30px 0px">
          
            <div class="card-body" >
               <p>
                Buenas! Soy Licenciada en Gestión de Tecnología y lo que más me apasiona es aprender continuamente nuevas tecnologías e ir probando cada una de ellas.
                A la derecha les muestro una de las cosas que hice, un blog en el cual voy subiendo contenido teorico y mi repositorio de git.  
              </p>
              <p>
                Muchisimas gracias por haber entrado y ojalá podamos conocernos y aprender juntos.
              </p>
            </div>
          </div>-->
          
          <!--FIN DE NUEVO-->

          <!--CARD PARA AGREGAR-->
          
           <div class="card" v-if="ocultar">
            <div class="card-header">
              <h3>Agrega un nuevo Sitio Web</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="addWebsite">
                <div class="form-group">
                  <input type="text" class="form-control"
                    id="name" 
                    v-model="newWebsite.name"
                    placeholder="Nombre del sitio">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" 
                    id="description"
                    v-model="newWebsite.description"
                    placeholder="Descripción del sitio">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" 
                    id="tecnology"
                    v-model="newWebsite.tecnology"
                    placeholder="Tecnología utilizada">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" 
                    id="url"
                    v-model="newWebsite.url"
                    placeholder="Dirección URL del sitio">
                </div>
                <button type="submit" class="btn btn-primary">
                  Guardar
                </button>
              </form>
            </div>
          </div>
        </div>

        <!--FIN DE CARD DE AGREGAR-->


        <div class="col-sm-7 text-center">
          <!--<img src="./assets/fotoPorfolio.jpg" style="width: 10rem; margin:20px" alt="...">-->
           <!--<img src="./assets/logo.png">-->
           <div class="card tarjeta" >
             <div class="card-header">
               <h3>Lista de Sitios Web</h3>
             </div>
             <div class="card-body">
               <table class="table  table-hover blanco"  >
                 <thead>
                   <tr>
                     <th>Nombre</th>
                     <th>Descripción</th>
                     <th>Tecnología usada</th>
                     <th v-if="ocultar">Operaciones</th>
                     <th v-else>Visitar</th>
                     
                   </tr>
                   
                 </thead>
                 <tbody>
                   <tr v-for="(w, index) in websites" v-bind:key="index['.id']">
                     <td >
                       <a class="blanco" v-bind:href="w.url" target="_blank">{{w.name}}</a>
                     </td>
                     <td>
                       {{w.description}}
                     </td>
                     <td>
                       {{w.tecnology}}
                     </td>
                     <td v-if="ocultar">
                       <button class="btn btn-danger" @click="deleteWebsite(index)" >
                         Delete
                       </button>
                      
                       <!-- prueba para agregar btn de editar 
                       <button class="btn btn-danger" @click="editar(index,w)">
                         Edit
                       </button>-->
                     </td>
                     <td v-else>
                        <a class="btn btn-success" v-bind:href="w.url" target="_blank" >
                         Ir
                       </a>
                     </td>
                     
                   </tr>
                 </tbody>
               </table>
             </div>
           </div>
        </div>
      </div>
    </div>
    
   
  </div>
</template>

<script>
import Firebase from 'firebase';
import config from './config';


//inicializo la bdd de firebase y le paso la configuracion 
let app=Firebase.initializeApp(config);
//Hago la coneccion a la bdd la guardamos en una variable
let db=app.database();
//creamos una referencia y le decimos que vamos a almacenar nadamas 
//una coleccion de sitios web. Tambien lo guardamos en una variable
let websitesRef=db.ref('websites');

import toastr from 'toastr';

export default {
  name: 'App',
  firebase:{
    //indico que cuando se hace referencia a websites en el template
    //hoy a estar utilizando websitesRef
    websites:websitesRef
  },
  //defino el dato que voy a poder almacenar
  //la propiedad data te permite modelar el dato que vas a poder almacenar
  //desde tu tamplate
  data(){
    
    //en este caso data es una funcion 
    //donde retornamos un modelo de sitio web que va a ser un objeto
    return {
      websites:[],
      newWebsite:{
        name:'',
        description:'',
        url:'',
        tecnology:'',
      },
     ocultar:false
    }

  },
  
  //NUEVO
  created() {
             Firebase.database().ref('websites').on('value', (snapshot) => {
                 this.websites = snapshot.val() 
             })
         },     
  //
  methods:{
    addWebsite(){
      //con la coleccion de firebase (websitesRef)
      // enviamos el modelo a la bdd (haciendo push)   
      websitesRef.push(this.newWebsite);
      toastr.success("El sitio fue agregado a la lista");
      this.newWebsite.name='';
      this.newWebsite.description='';
      this.newWebsite.url='';
      this.newWebsite.tecnology='';
    },
    //recibe por parametro el elemeto que es uno de los sitios de la tabla
    deleteWebsite(index){
   /*
   -----PRUEBA-------(IMPRIME EN CONSOLA LOS DATOS DE LOS OBJETOS DE LA LISTA)
      websitesRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childKey)
        console.log(childData)
        });
    
    });
  */
        if(confirm("Desea eliminar la dirección URL?")){
          websitesRef.child(index).remove();
          toastr.success("El sitio fue eliminado de la lista");
        }
        
    },


    //EDITAR -- queda por hacer
    /*editar(index,ws){
      //obtener datos del objeto
      
      //llenar inputs con datos del objeto
      //inhabilitar btn guardar
      //poner boton Modificar
      //obtener datos de los inputs
      //guardarlos en firebase
    }*/
    
  },
 

  
}


</script>

<style>
a{
  text-decoration: none;
}

.blanco{
  color: white
}

.tarjeta{
  background: transparent; color : white ; border-color : white;
}

.presentacion{
   color: white; margin : 20px; padding: 10px; text-align : left ;
}
.foto-presentacion{
  width: 10rem; border-radius: 50% ; border: solid 2px #191654
}

@media(max-width: 767px){
  body{
    height: 100%;
  }
  #app {

        background: #43C6AC;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to right, #191654, #43C6AC);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to right, #191654, #43C6AC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        height: 100vh;
  }
}
</style>
