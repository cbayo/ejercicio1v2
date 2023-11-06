<template>
    <div class="artistas">   
        <v-card> 
            <v-data-table
                :headers="headers"
                :items="artists"
                :items-per-page="5"
                class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar
                        flat
                    >

                        <!-- En la primera línea aparece un título, una línea vertical divisoria y el botón para añadir artistas -->
                        <v-toolbar-title> ARTISTAS </v-toolbar-title>
        
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
        
                        <v-spacer></v-spacer>
        
                        <v-dialog
                            v-model="dialog"
                            max-width="500px"
                        >
                        
                            <!-- Al clickar sobre nuevo artista se abre una tarjeta -->
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    Nuevo artista
                                </v-btn>
                            </template>

                            <!-- En la tarjeta se permite al usuario introducir cada uno de los atributos del nuevo artista -->
                            <v-card >
                              
                                <v-card-title>
                                    <span class="text-h5"> {{ formTitle }} </span>
                                </v-card-title>
                              
                                <v-card-text> 
                                    <v-container>
                                        <v-row>
                                            <v-col>
                                                <v-text-field
                                                    v-model="editedItem.name"
                                                    label="Nombre del artista"
                                                ></v-text-field>     
                                            </v-col>

                                            <v-col>
                                                <v-text-field
                                                    v-model="editedItem.numeroalbums"
                                                    label="Número de albums"
                                                ></v-text-field>  
                                            </v-col>

                                            <v-col>
                                                <v-text-field
                                                    v-model="editedItem.seguidores"
                                                    label="Número de seguidores"
                                                ></v-text-field>
                                            </v-col>

                                            <v-col>
                                                <v-text-field
                                                    v-model="editedItem.anioinicio"
                                                    label="Año de inicio"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>  
                                </v-card-text>

                                <!-- Se definen las acciones cancelar y guardar, utilizando un botón para cada caso -->
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="close"
                                    >
                                        Cancelar
                                    </v-btn>
                                    <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                    >
                                        Guardar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>  
                        </v-dialog>
        
                        <!-- Cuando se elimina un artista se muestra un mensaje para asegurar que se retende borrar -->
                        <v-dialog v-model="dialogDelete" max-width="500px">
                          <v-card>
                            <v-card-text class="text-h6">¿Está seguro de que quiere borrar este artista?</v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                                <v-btn color="cyan lighten-4" variant="text" @click="closeDelete">Cancelar</v-btn>
                                <v-btn color="cyan lighten-4" variant="text" @click="deleteItemConfirm">Si</v-btn>
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
    
                    <!-- Iconos para editar y borrar cada artista -->
                    <template v-slot:item.actions="{ item }">
                      <v-icon
                        size="small"
                        class="mr-2"
                        @click="editItem(item)"
                      >
                        mdi-pencil
                      </v-icon>
                      <v-icon
                        size="small"
                        @click="deleteItem(item)"
                      >
                        mdi-delete
                      </v-icon>
                    </template>

                    <!-- Se resetea con un botón cuando no hay datos en la tabla -->
                    <template v-slot:no-data>
                      <v-btn
                        color="primary"
                        @click="initialize"
                      >
                        Reset
                      </v-btn>
                    </template>
            </v-data-table>
        </v-card>
    </div>
</template>


 
<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Artistas',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Año de inicio', value: 'anioinicio' },
        { text: 'Número de albums', value: 'numeroalbums' },
        { text: 'Seguidores en instagram (millones)', value: 'seguidores' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      //artists: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        numeroalbums: 0,
        seguidores: 0,
        anioinicio: 0,
      },
      defaultItem: {
        name: '',
        numeroalbums: 0,
        seguidores: 0,
        anioinicio: 0,
      },
  }),
  computed: {
    formTitle () {
        return this.editedIndex === -1 ? 'Nuevo artista' : 'Editar artista'
      },
    ...mapState(['artists']),
  },
  methods: {
    ...mapMutations(['addArtist', 'updateArtist', 'deleteArtist']),
    ...mapActions(['fetchArtists']),
    // Cambio de métodos anteriores
    initialize() {
      this.$store.dispatch('fetchArtists'); // Carga los artistas desde el store al iniciar
      //this.fetchArtists;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.updateArtist({ index: this.editedIndex, artist: this.editedItem });
      } else {
        this.addArtist(this.editedItem);
      }
      this.close();
    },

    editItem(item) {
      this.editedIndex = this.artists.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.artists.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteArtist(this.editedIndex);
      this.closeDelete();
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    //console.log('Datos artista: ', this.artists);
    this.fetchArtists(); // Carga los artistas desde el store al iniciar
  },
};
</script>
