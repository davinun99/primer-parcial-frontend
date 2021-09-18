class Producto{
    idProducto!: number;
    idTipoProducto!: number;
}
export default class Servicio {
    idPresentacionProducto!: number;
    nombre!: string;
    descripcion!: string;
    idProducto!:Producto;
};