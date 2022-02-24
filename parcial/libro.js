Vue.component('libro',{
    data:()=>{
        return {
            buscar:'',
            libros:[],
            autores:[],
            libro:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idLibro : '',
                idAutor: '',
                codigo: '',
                titulo: '',
                editorial: '',
                edicion: ''
            }
        }
    },
    methods:{
        buscandoLibro(){
            this.obtenerLibros(this.buscar);
        },
        eliminarLibro(libro){
            if( confirm(`Esta seguro de eliminar el libro ${libro.titulo}?`) ){
                this.libro.idLibro = libro.idLibro;
                this.libro.accion = 'eliminar';
                this.guardarLibro();
            }
        },
        modificarLibro(libro){
            this.libro = JSON.parse(JSON.stringify(libro));
            console.log(this.libro);
            this.libro.accion = 'modificar';
        },
        guardarLibro(){
            let sql = '',
                parametros = [];
            if(this.libro.accion=="nuevo"){
                sql = 'INSERT INTO libros (idAutor, codigo, titulo, editorial, edicion) VALUES (?,?,?,?,?)';
                parametros = [this.libro.idAutor, this.libro.codigo, this.libro.titulo, this.libro.editorial, this.libro.edicion];
            } else if(this.libro.accion=="modificar"){
                sql = 'UPDATE libros SET idAutor=?, codigo=?, titulo=?, editorial=?, edicion=? WHERE idLibro=?';
                parametros = [this.libro.idAutor, this.libro.codigo, this.libro.titulo, this.libro.editorial, this.libro.edicion, this.libro.idLibro];
            } else if(this.libro.accion=="eliminar"){
                sql = 'DELETE FROM libros WHERE idLibro=?';
                parametros = [this.libro.idLibro];
            }
            db_sistema.transaction(tx=>{
                    tx.executeSql(sql,
                    parametros,
                    (tx, res)=>{
                        this.nuevoLibro();
                        this.obtenerLibros();
                        this.obtenerAutores();
                        this.libro.mostrar_msg = true;
                        this.libro.msg = 'Libro procesado con exito';
                    },
                    (tx, err)=>{
                        this.libro.mostrar_msg = true;
                        this.libro.msg = `Error al guardar el libro: ${err.message}`;
                    });
                });
        },
        obtenerLibros(valor=''){
            let respuesta = db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT l.idLibro, l.idAutor, l.codigo, l.titulo, l.editorial, l.edicion, a.nombre as autor FROM libros l INNER JOIN autores a ON l.idAutor=a.idAutor WHERE l.titulo like "%${valor}%" OR l.codigo like "%${valor}%" OR a.nombre like "%${valor}%" ORDER BY l.titulo`, [], (index, datos)=>{
                        this.libros = [];
                            for(let i=0; i<datos.rows.length; i++){
                                this.libros.push(datos.rows[i]);
                            }
                        });
            });
        },
        obtenerAutores(){
            let respuesta = db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT * FROM autores ORDER BY nombre`, [], (index, datos)=>{
                    this.autores = [];
                    for(let i=0; i<datos.rows.length; i++){
                        this.autores.push(datos.rows[i]);
                    }
                });
            });
        },
        nuevoLibro(){
            this.libro.accion = 'nuevo';
            this.libro.msg = '';
            this.libro.idLibro = '';
            this.libro.idAutor = '';
            this.libro.codigo = '';
            this.libro.titulo = '';
            this.libro.editorial = '';
            this.libro.edicion = '';
            this.obtenerAutores();
        }
    },
    created(){
        db_sistema.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS libros(idLibro INTEGER PRIMARY KEY AUTOINCREMENT, idAutor INTEGER, codigo TEXT, titulo TEXT, editorial TEXT, edicion TEXT, FOREIGN KEY(idAutor) REFERENCES autores(idAutor))');
        }, err=>{
            console.log(err);
        });
        this.obtenerLibros();
        this.obtenerAutores();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carLibro">
                <div class="card-header bg-primary">
                    Registro de Libros
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carLibro" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarLibro" @reset="nuevoLibro">
                        <div class="row p-1">
                            <div class="col-md-2">Autor</div>
                            <div class="col-md-3">
                                <select class="form-control" v-model="libro.idAutor">
                                    <option v-for="autor in autores" :value="autor.idAutor">{{autor.nombre}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="libro.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Titulo:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el titulo" v-model="libro.titulo" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Editorial:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese la editorial" v-model="libro.editorial" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Edicion:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese la edicion" v-model="libro.edicion" pattern="[0-9]{1,2}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="libro.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ libro.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row m-2">
                            <div class="col col-md-5 text-center">
                                <input class="btn btn-success" type="submit" value="Guardar">
                                <input class="btn btn-warning" type="reset" value="Nuevo">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="card text-white" id="carBuscarLibro">
                <div class="card-header bg-primary">
                    Busqueda de Libros
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarLibro" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoLibro" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>AUTOR</th>
                                <th>CODIGO</th>
                                <th>TITULO</th>
                                <th>EDITORIAL</th>
                                <th>EDICION</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in libros" @click='modificarLibro( item )' :key="item.idLibro">
                                <td>{{ item.autor }}</td>
                                <td>{{ item.codigo }}</td>
                                <td>{{ item.titulo }}</td>
                                <td>{{ item.editorial }}</td>
                                <td>{{ item.edicion }}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarLibro(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});