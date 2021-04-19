"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../database/connection");
const Ubicacion = connection_1.db.define('ubicacion', {
    id_ubicacion: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    latitud: {
        type: sequelize_1.DataTypes.NUMBER
    },
    longitud: {
        type: sequelize_1.DataTypes.NUMBER
    },
    direccion: {
        type: sequelize_1.DataTypes.TEXT
    },
}, {
    timestamps: false
});
/*Ubicacion.hasMany(Usuario, {foreignKey: 'ubicacion_id', sourceKey: 'id_ubicacion'});
Usuario.belongsTo(Ubicacion);*/
//, {foreignKey: 'ubicacion_id', sourceKey: 'id'}
exports.default = Ubicacion;
//# sourceMappingURL=Ubicacion.js.map