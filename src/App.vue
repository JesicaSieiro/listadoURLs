<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <a href="/" class="navbar-brand">URL Database</a>
    </nav>
    <!--MAIN CONTENT-->
    <div class="container">
      <div class="row mt-5">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-header">
              <h3>Agrega un nuevo Sitio Web</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="addWebsite">
                <div class="form-group">
                  <input type="text" class="form-control" 
                    v-model="newWebsite.name"
                    placeholder="Nombre del sitio">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" 
                    v-model="newWebsite.author"
                    placeholder="Autor del sitio">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" 
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
        <div class="col-sm-8 text-center">
           <img src="./assets/logo.png">
           <div class="card">
             <div class="card-header">
               <h3>Lista de Sitios Web</h3>
             </div>
             <div class="card-body">
               <table class="table table-striped table-bordered">
                 <thead>
                   <tr>
                     <th>Nombre</th>
                     <th>Autor</th>
                     <th>Operaciones</th>
                   </tr>
                   
                 </thead>
                 <tbody>
                   <tr v-for="(w, index) in websites" v-bind:key="index['.id']">
                     <td >
                       <a v-bind:href="w.url" target="_blank">{{w.name}}</a>
                     </td>
                     <td>
                       {{w.author}}
                     </td>
                     <td>
                       <button class="btn btn-danger" @click="deleteWebsite(index)">
                         Delete
                       </button>
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
        author:'',
        url:''
      }
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
      this.newWebsite.author='';
      this.newWebsite.url='';
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
        
    }
    
  }
}
</script>

<style>
#app {
  background: #1a2a6c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #fdbb2d, #b21f1f, #1a2a6c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
}
</style>
