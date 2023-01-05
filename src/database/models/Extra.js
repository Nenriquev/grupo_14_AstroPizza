module.exports = (sequelize, dataTypes) => {

  let alias = 'Extra'; 
  let cols = {
    id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    item_id:{
      type: dataTypes.BIGINT(10),
      allowNull: false,
    },
    product_id:{
      type: dataTypes.BIGINT(10),
      allowNull: false,
    }
  };
  let config = {
      tableName: 'extras',
      timestamps: false,
  }

  const Extra = sequelize.define(alias,cols,config);

    Extra.associate = (models) =>{

      Extra.belongsTo(models.Product, {
          as: 'Product',
          foreignKey: 'product_id'
      })

      Extra.belongsTo(models.Item, {
        as: 'Item',
        foreignKey: 'item_id'
    })
    }


  return Extra;

};