module.exports = (sequelize, DataTypes) => {
    const ContaCuenta = sequelize.define('ContaCuenta', {
        nro_cuenta: DataTypes.STRING,
        gestion_id: DataTypes.INTEGER
    }, {
        timestamps: false, //CreateAt, UpdateAt
        tableName: 'cuenta',
        schema: 'conta'
    }
    );
    return ContaCuenta;
};