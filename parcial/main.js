const db_sistema = openDatabase('db_codigo_estudiante', '1.0', 'Sistema', 5 * 1024 * 1024);
if( !db_sistema ){
    alert('Lo siento, el navagador no soporta BD offline');
}
var appLibreria = new Vue({
    el: '#appLibreria',
    data: {
        forms:{
            'autor':{mostrar:false},
            'libro':{mostrar:false}
        }
    },
});
document.addEventListener('DOMContentLoaded', e=>{
    let formularios = document.querySelectorAll('.mostrar').forEach(formulario=>{
        formulario.addEventListener('click', evento=>{
            let formulario = evento.target.dataset.form;
            appLibreria.forms[formulario].mostrar = true;
        });
    });
});