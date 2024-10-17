class DataCollection {

    constructor(model) {
      this.model = model;
    }
  //  how to use assoications 
  // [    
  //     { model: usersCollection.model.sequelize.models.sofa, as: 'sofas' },
  //     // Add other associations here if needed
  // ]
  //   get(id, includeAssociations = []) {
  //     const options = {
  //         where: id ? { id } : {},
  //         include: includeAssociations
  //     };

  //     return this.model.findAll(options).then(records => {
  //         // If fetching by id, return a single record or null
  //         return id ? records[0] || null : records;
  //     });
  // }
    get(id) {
      if (id) {
        return this.model.findOne({ where: { id } });
      }
      else {
        return this.model.findAll({});
      }
    }
  
    create(record) {
      return this.model.create(record);
    }
  
    update(id, data) {
      return this.model.findOne({ where: { id } })
        .then(record => record.update(data));
    }
  
    delete(id) {
      return this.model.destroy({ where: { id }});
    }
  
  }
  
  module.exports = DataCollection;