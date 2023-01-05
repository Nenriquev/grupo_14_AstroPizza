module.exports = (sequelize, DataTypes) => {
    let alias = 'User';

    let cols = {
        id:{
            type: DataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        names:{
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        telephone:{
            type: DataTypes.BIGINT(50),
            allowNull: true
        },
        password:{
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        profile_img:{
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        role_id:{
            type: DataTypes.BIGINT(10),
            allowNull: false,
            defaultValue: 1
        }
    }

    let config = {
        tableName: 'users',
        freezeTableName: true,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.User, {
            as: 'UserRole',
            foreignKey: 'role_id'
        })

        User.hasMany(models.Order, {
            as: 'order',
            foreignKey: 'user_id'
        })
    }

    return User;
}