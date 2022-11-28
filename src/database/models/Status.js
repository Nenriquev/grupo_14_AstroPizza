module.exports = (sequelize, dataTypes) => {
  let alias = 'Status';
  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      status_name: {
          type: dataTypes.STRING
      },
  };
  let config = {
      tableName: 'status',
      timestamps: false
  };
  const Status = sequelize.define(alias, cols, config)

  Status.associate = (models) =>{
      Status.hasMany(models.Product,{
          as: 'products',
          foreignKey: 'status_id'
      })
  }

  return Status
}