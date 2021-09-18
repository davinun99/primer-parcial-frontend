import { Paciente } from "./paciente";

export class Horario {
	dia!: number;
	horaAperturaCadena!: string;
	horaCierreCadena!: string;
	intervaloMinutos!: number;
	idEmpleado!: Paciente;
}