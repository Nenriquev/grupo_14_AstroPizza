module.exports = (sequelize, dataTypes) => {

  let alias = 'Item'; 
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    product_id: {
      type: dataTypes.BIGINT(10),
      allowNull: false,
    },
    order_id: {
      type: dataTypes.BIGINT(10),
      allowNull: false,
    },
    quantity: {
      type: dataTypes.BIGINT(5)
    },
    price: {
      type: dataTypes.FLOAT(10)
    }
    
  };
  let config = {
      tableName: 'items',
      timestamps: false,
  }

  const Item = sequelize.define(alias,cols,config);

    Item.associate = (models) =>{

      Item.belongsTo(models.Product, {
          as: 'Product',
          foreignKey: 'product_id'
      })

      Item.belongsTo(models.Order, {
        as: 'Order',
        foreignKey: 'order_id'
      })

      Item.hasMany(models.Extra, {
        as: 'Extra',
        foreignKey: 'item_id'
      });
    }


  return Item;

};