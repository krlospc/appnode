module.exports = (sequelize, DataTypes) => {
    const Producto = sequelize.define('Producto', {
        nombre: DataTypes.STRING,
        precio: DataTypes.DOUBLE,
        cantidad: DataTypes.INTEGER,
        categoria: DataTypes.STRING
    }, {
        timestamps: false, //CreateAt, UpdateAt
        tableName: 'producto'
    }
    );
    return Producto;
};