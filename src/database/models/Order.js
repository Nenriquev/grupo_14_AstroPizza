module.exports = (sequelize, dataTypes) => {

  let alias = 'Order'; 
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: dataTypes.BIGINT(10),
      allowNull: false,
    },
    payMethod: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    total_items: {
      type: dataTypes.BIGINT(5),
      allowNull: false,
    },
    total: {
      type: dataTypes.FLOAT(10),
      allowNull: false,
    },
    
  };
  let config = {
      tableName: 'orders',
      freezeTableName: true,
      timestamps: true,
      deleteAt: false,
      createdAt: true,
      updatedAt: false,
  }

  const Order = sequelize.define(alias,cols,config);
  Order.associate = (models) =>{

    Order.belongsTo(models.User,{
        as: 'User',
        foreignKey: 'user_id'
    })

    Order.hasMany(models.Item,{
      as: 'Item',
      foreignKey: 'order_id'
    })
  }
  
  return Order;
}