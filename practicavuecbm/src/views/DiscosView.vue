<template>
  <div class="discos">   
      <v-card> 
          <v-data-table
              :headers="headers"
              :items="discos"
              :items-per-page="5"
              class="elevation-1"
          >
              <template v-slot:top>
                  <v-toolbar
                      flat
                  >

                      <!-- En la primera línea aparece un título, una línea vertical divisoria y el botón para añadir discos -->
                      <v-toolbar-title> DISCOS </v-toolbar-title>
      
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
                      
                          <!-- Al clickar sobre nuevo disco se abre una tarjeta -->
                          <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                  color="primary"
                                  dark
                                  class="mb-2"
                                  v-bind="attrs"
                                  v-on="on"
                              >
                                  Nuevo disco
                              </v-btn>
                          </template>

                          

                          <!-- En la tarjeta se permite al usuario introducir cada uno de los atributos del nuevo disco -->
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
                                                  label="Nombre del disco"
                                              ></v-text-field>     
                                          </v-col>

                                          <v-col>
                                              <v-text-field
                                                  v-model="editedItem.singer"
                                                  label="Artista"
                                              ></v-text-field>  
                                          </v-col>

                                          <v-col>
                                              <v-text-field
                                                  v-model="editedItem.year"
                                                  label="Año de salida"
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
      
                      <!-- Cuando se elimina un disco se muestra un mensaje para asegurar que se retende borrar -->
                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-text class="text-h6">¿Está seguro de que quiere borrar este disco?</v-card-text>
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
  
                  <!-- Desplegable para seleccionar el artista -->
                  <template v-slot:item.desplactions="{ item }">
                    <v-select
                    v-model="item.singer"
                      :items="artistOptions"
                      label="Artista"
                    >
                    <option v-for="item of artistOptions"> {{ item }} </option>
                  </v-select>
                  </template>
                
                  <!-- Iconos para editar y borrar cada disco -->
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
export default {

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Discos',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      //{ text: 'Artista', value: 'singer' },
      { text: 'Año de salida', value: 'year' },
      { text: 'Cantantes', value: 'desplactions', sortable: false },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    discos: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      singer: 0,
      year: 0,
    },
    defaultItem: {
      name: '',
      singer: 0,
      year: 0,
    },
    artistOptions:[  
        'Aespa',
        'Blackpink',
        'BTS',
        'Rosé',
        'Hwasa',
        'Itzy',
        'Twice',
        'GI-DLE',
        'Lisa',
    ],
    variant: ' ',
}),

computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nuevo disco' : 'Editar disco'
    },
  },
  
watch: {
  dialog (val) {
    val || this.close()
  },
  dialogDelete (val) {
    val || this.closeDelete()
  },
},


  methods: {
  initialize () {
    //this.artistOptions = this.$store.state.artists.name;
     this.discos = [
      {
        name: 'Hard to love',
        singer: 'Rosé',
        year: 2022,
      },
      {
        name: 'How you like that',
        singer: 'Blackpink',
        year: 2018,
      },
      {
        name: 'I love my body',
        singer: 'Hwasa',
        year: 2023,
      },
      {
        name: 'Wannabe',
        singer: 'Itzy',
        year: 2020,
      },
      {
        name: 'Cake',
        singer: 'Itzy',
        year: 2023,
      },
      {
        name: 'The feels',
        singer: 'Twice',
        year: 2021,
      },
      {
        name: 'Queen card',
        singer: 'GI-DLE',
        year: 2022,
      },
      {
        name: 'Money',
        singer: 'Lisa',
        year: 2021,
      },
      {
        name: 'As if it is your last',
        singer: 'Blackpink',
        year: 2016,
      },         
    ]
  },  

  close () {
    this.dialog = false
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    })
  },

  save () {
    if (this.editedIndex > -1) {
      Object.assign(this.discos[this.editedIndex], this.editedItem)
    } else {
      this.discos.push(this.editedItem)
    }
    this.close()
  },

  editItem (item) {
      this.editedIndex = this.discos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.discos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.discos.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    
  },
}
</script>

