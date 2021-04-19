"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("sequelize/types");
const connection_1 = require("../database/connection");
/*export interface IUsuario {
  nombre: string
  tipo_doc: string
  num_doc: number
  telefono: number
  ubicacion_id: number
  nacimiento: Date
  rol: string
  email: string
  password: string
};

@Table({
  tableName: "usuario",
  timestamps: true
})

export default class Usuario extends Model implements IUsuario{
  @Column(${1:dataType})$0(dataType)
  nombre: string
  tipo_doc: string
  num_doc: number
  telefono: number
  ubicacion_id: number
  nacimiento: Date
  rol: string
  email: string
  password: string
}*/
const Usuario = connection_1.db.define('Usuario', {
    nombre: {
        type: types_1.DataTypes.INTEGER,
    },
    tipo_doc: {
        type: types_1.DataTypes.TEXT,
    },
    num_doc: {
        type: types_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    telefono: {
        type: types_1.DataTypes.INTEGER
    },
    ubicacion_id: {
        type: types_1.DataTypes.INTEGER
    },
    nacimiento: {
        type: types_1.DataTypes.DATE
    },
    rol: {
        type: types_1.DataTypes.STRING
    },
    email: {
        type: types_1.DataTypes.TEXT
    },
    password: {
        type: types_1.DataTypes.STRING
    }
});
exports.default = Usuario;
//# sourceMappingURL=Usuario.js.map