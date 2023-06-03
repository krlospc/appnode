module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nombre: DataTypes.STRING,
        usuario: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        rol: DataTypes.STRING
    }, {
        timestamps: false, //CreateAt, UpdateAt
        tableName: 'usuario'
    }
    );
    return Usuario;
};