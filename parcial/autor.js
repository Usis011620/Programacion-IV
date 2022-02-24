Vue.component('autor',{
    data:()=>{
        return {
            buscar:'',
            autores:[],
            autor:{
                accion : 'nuevo',
                mostrar_msg : false,
                msg : '',
                idAutor : '',
                codigo: '',
                nombre: '',
                pais: '',
                telefono: ''
            }
        }
    },
    methods:{
        buscandoAutor(){
            this.obtenerAutors(this.buscar);
        },
        eliminarAutor(autor){
            if( confirm(`Esta seguro de eliminar el autor ${autor.nombre}?`) ){
                this.autor.idAutor = autor.idAutor;
                this.autor.accion = 'eliminar';
                this.guardarAutor();
            }
        },
        modificarAutor(autor){
            this.autor = JSON.parse(JSON.stringify(autor));
            this.autor.accion = 'modificar';
        },
        guardarAutor(){
            let sql = '',
                parametros = [];
            if(this.autor.accion=="nuevo"){
                sql = 'INSERT INTO autores (codigo, nombre, pais, telefono) VALUES (?,?,?,?)';
                parametros = [this.autor.codigo, this.autor.nombre, this.autor.pais, this.autor.telefono];
            } else if(this.autor.accion=="modificar"){
                sql = 'UPDATE autores SET codigo=?, nombre=?, pais=?, telefono=? WHERE idAutor=?';
                parametros = [this.autor.codigo, this.autor.nombre, this.autor.pais, this.autor.telefono, this.autor.idAutor];
            } else if(this.autor.accion=="eliminar"){
                sql = 'DELETE FROM autores WHERE idAutor=?';
                parametros = [this.autor.idAutor];
            }
            db_sistema.transaction(tx=>{
                    tx.executeSql(sql,
                    parametros,
                    (tx, res)=>{
                        this.nuevoAutor();
                        this.obtenerAutors();
                        this.autor.mostrar_msg = true;
                        this.autor.msg = 'Autor procesado con exito';
                    },
                    (tx, err)=>{
                        this.autor.mostrar_msg = true;
                        this.autor.msg = `Error al guardar el autor: ${err.message}`;
                    });
                });
        },
        obtenerAutors(valor=''){
            let respuesta = db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT * FROM autores WHERE nombre like "%${valor}%" OR codigo like "%${valor}%" ORDER BY nombre`, [], (index, datos)=>{
                    this.autores = [];
                            for(let i=0; i<datos.rows.length; i++){
                                this.autores.push(datos.rows[i]);
                            }
                        });
            });
        },
        nuevoAutor(){
            this.autor.accion = 'nuevo';
            this.autor.msg = '';
            this.autor.codigo = '';
            this.autor.nombre = '';
            this.autor.pais = '';
            this.autor.telefono = '';
        }
    },
    created(){
        db_sistema.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS autores(idAutor INTEGER PRIMARY KEY AUTOINCREMENT, codigo char(10), nombre char(100), pais TEXT, telefono TEXT)');
        }, err=>{
            console.log(err);
        });
        this.obtenerAutors();
    },
    template:`
        <div id="appCiente">
            <div class="card text-white" id="carAutor">
                <div class="card-header bg-primary">
                    Registro de Autores
                    <button type="button" class="btn-close text-end" data-bs-dismiss="alert" data-bs-target="#carAutor" aria-label="Close"></button>
                </div>
                <div class="card-body text-dark">
                    <form method="post" @submit.prevent="guardarAutor" @reset="nuevoAutor">
                        <div class="row p-1">
                            <div class="col col-md-2">Codigo:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el codigo" v-model="autor.codigo" pattern="[0-9]{3,10}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Nombre:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el nombre" v-model="autor.nombre" pattern="[A-Za-zñÑáéíóúü ]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Pais:</div>
                            <div class="col col-md-3">
                                <input title="Ingrese el pais" v-model="autor.pais" pattern="[A-Za-zñÑáéíóúü ]{3,100}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-2">Telefono:</div>
                            <div class="col col-md-2">
                                <input title="Ingrese el tel" v-model="autor.telefono" pattern="[0-9]{4}-[0-9]{4}" required type="text" class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-5 text-center">
                                <div v-if="autor.mostrar_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                                    {{ autor.msg }}
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
            <div class="card text-white" id="carBuscarAutor">
                <div class="card-header bg-primary">
                    Busqueda de Autores
                    <button type="button" class="btn-close" data-bs-dismiss="alert" data-bs-target="#carBuscarAutor" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th colspan="6">
                                    Buscar: <input @keyup="buscandoAutor" v-model="buscar" placeholder="buscar aqui" class="form-control" type="text" >
                                </th>
                            </tr>
                            <tr>
                                <th>CODIGO</th>
                                <th>NOMBRE</th>
                                <th>PAIS</th>
                                <th>TELEFONO</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in autores" @click='modificarAutor( item )' :key="item.idAutor">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.pais}}</td>
                                <td>{{item.telefono}}</td>
                                <td>
                                    <button class="btn btn-danger" @click="eliminarAutor(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
});