module.exports = (sequelize, DataTypes) => {
    const Cliente = sequelize.define('Cliente', {
        nombre: DataTypes.STRING,
        telefono: DataTypes.STRING,
        email: DataTypes.STRING
    }, {
        timestamps: false, //CreateAt, UpdateAt
        tableName: 'cliente'
    }
    );
    return Cliente;
};