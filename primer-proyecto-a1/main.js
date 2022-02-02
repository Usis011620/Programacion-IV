var app = new Vue({
    el: '#appCliente',
    data: {
        cliente: {
            accion: '',
            msg : '',
            idCliente: '',
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            dui: ''
        },
    },
    methods: {
        guardarCliente(){
            console.log(this.cliente);
        }
    }
});