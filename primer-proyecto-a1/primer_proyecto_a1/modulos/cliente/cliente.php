<?php
include('../../db/DB.php');
EXTRACT($_REQUEST);

$class_cliente =  new cliente($conexion);
$datos = isset($datos) ? $datos : '[]';
print_r(json_encode($class_cliente->$accion($datos)));

class cliente{
    private $datos=[], $db;
    public $respuesta = ['msg'=>'correcto'];

    public function cliente($db=''){
        $this->db = $db;
    }
    public function recibir_datos($cliente=''){
        $this->datos = json_decode($cliente, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if( empty(trim($this->datos['codigo'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el codigo';
        }
        if( empty(trim($this->datos['nombre'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el nombre';
        }
        if( empty(trim($this->datos['direccion'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese la direccion';
        }
        if( empty(trim($this->datos['telefono'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el telefono';
        }
        if( empty(trim($this->datos['dui'])) ){
            $this->respuesta['msg'] = 'Por favor ingrese el dui';
        }
        return $this->almacenar_datos();
    }
    private function almacenar_datos(){
        if( $this->respuesta['msg']=='correcto' ){
            if( $this->datos['accion']=='nuevo' ){
                $this->db->consultas('INSERT INTO db_sistema_a1.clientes(idCliente, codigo, nombre, direccion, telefono, dui) 
                    VALUES(?,?,?,?,?,?)',
                    $this->datos['idCliente'], $this->datos['codigo'],$this->datos['nombre'],$this->datos['direccion'],
                    $this->datos['telefono'], $this->datos['dui']
                );
                return $this->db->obtenerUltimoId();
            }else if( $this->datos['accion']=='modificar' ){
                $this->db->consultas('UPDATE db_sistema_a1.clientes SET codigo=?, nombre=?, direccion=?, telefono=?, dui=? 
                    WHERE idCliente=?',
                    $this->datos['codigo'],$this->datos['nombre'],$this->datos['direccion'],
                    $this->datos['telefono'], $this->datos['dui'], $this->datos['idCliente']
                );
                return $this->datos['idCliente'];
            }else if( $this->datos['accion']=='eliminar' ){
                $this->db->consultas('DELETE FROM db_sistema_a1.clientes WHERE idCliente=?', $this->datos['idCliente']);
                return $this->datos['idCliente'];
            }
        } else{
            return $this->respuesta;
        }
    }
    public function obtener_datos(){
        $this->db->consultas('SELECT * FROM db_sistema_a1.clientes');
        return $this->db->obtener_datos();
    }
}
?>