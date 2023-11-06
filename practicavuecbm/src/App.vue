<template>
  <v-app id="inspire"> 

     <!-- Barra superior: poner un icono de menu que controle el drawer al clickar y el título de la página --> 
     <v-app-bar app>
       <v-app-bar-nav-icon @click="drawer = !drawer">
       </v-app-bar-nav-icon>

       <v-toolbar-title> 
         Página principal 
       </v-toolbar-title>
     </v-app-bar>
   
     <!-- Menú de navegación lateral --> 
     <v-navigation-drawer
       v-model="drawer"
       app
       location="left"
       temporary
     >

       <!-- Poner título del menú --> 
       <v-list-item>
         <v-list-item-content>
           <v-list-item-title class = "title"> Menú </v-list-item-title>
         </v-list-item-content>
       </v-list-item>
     
       <!-- Lista de los item con iconos --> 
       <v-list
         dense
       >

         <v-list-item
           v-for = "item in items"
           :key = "item.title"
           :to = "item.to"
           link
         >

           <v-list-item-icon>
             <v-icon> {{ item.icon }} </v-icon>
           </v-list-item-icon>

           <v-list-item-content>
             <v-list-item-title> {{ item.title }} </v-list-item-title>
           </v-list-item-content>

          </v-list-item>

       </v-list>

     </v-navigation-drawer>


   <v-main>
     <!--  -->
     <router-view></router-view>
     
   </v-main>
   </v-app>  
</template>

<script>
 export default {
   data: () => ({ 
     drawer: null,
     items: [
       {
         title: 'Artistas',
         icon: 'mdi-account-music',
         to: '/artistas'
       },
       {
         title: 'Discos',
         icon: 'mdi-album',
         to: '/discos'
       },
     ],
   }),
  
 }
</script>