module.exports = (sequelize, DataTypes) => {
    const VentaDetalle = sequelize.define('VentaDetalle', {
        producto_id: DataTypes.INTEGER,
        venta_id: DataTypes.INTEGER,
        precio: DataTypes.DOUBLE
    }, {
        timestamps: false,
        tableName: 'venta_detalle'
    }
    );
    return VentaDetalle;
};