module.exports = (sequelize, dataTypes) => {
  let alias = 'Product'; 
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(500),
      allowNull: false,
    },
    price: {
      type: dataTypes.BIGINT(15),
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING(500),
      allowNull: false,
    },
    image: {
      type: dataTypes.STRING(500),
      allowNull: true,
    },
    category_id: {
      type: dataTypes.BIGINT(10),
      allowNull: false
    },
    status_id: {
      type: dataTypes.BIGINT(10),
      allowNull: true
    },
  };

  let config = {
      timestamps: false,
      deletedAt: false
  }

  const Product = sequelize.define(alias,cols,config);

  Product.associate = (models) =>{

    Product.belongsTo(models.Category,{
        as: 'category',
        foreignKey: 'category_id'
    })

    Product.belongsTo(models.Status,{
      as: 'status',
      foreignKey: 'status_id'
    })  

    Product.belongsToMany(models.Item, {
      through: 'id',
      as: 'item',
      foreignKey: 'product_id'
    }) 
  }

  return Product

};