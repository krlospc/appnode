module.exports = (sequelize, DataTypes) => {
    const Venta = sequelize.define('Venta', {
        cliente_id: DataTypes.INTEGER,
        total: DataTypes.DOUBLE,
        fecha: DataTypes.DATE
    }, {
        timestamps: false, //CreateAt, UpdateAt
        tableName: 'venta'
    }
    );
    return Venta;
};