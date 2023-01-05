

module.exports = (sequelize, DataTypes) => {
    let alias = 'UserRole';

    let cols = {
        id:{
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        role:{
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }

    let config = {
        tableName: 'user_role',
        timestamps: false,
        deletedAt: false
    }

    const UserRole = sequelize.define(alias,cols,config);

    UserRole.associate = (models) => {
        UserRole.hasMany(models.User, {
            as: 'User',
            foreignKey: 'role_id'
        })
    }

    return UserRole;
}