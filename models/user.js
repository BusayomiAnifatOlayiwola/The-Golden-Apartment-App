'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasOne(models.apartment)
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
       len: {
        args: [1,99],
        msg: 'Name must be between 1 and 99 characters'
       }
      }
    },
    license: DataTypes.STRING,
    image: {
      type :DataTypes.STRING,
      defaultValue: 'https://lh3.googleusercontent.com/proxy/7C7_Xfy4A5VtBNgBEXHoyUlOCC6OWE63h1oCDFNTNzatdV9xzRVXwCXqIEewe1lFNqSWACDOut6GdLJFJ0iusWn1rycV2ZYPQo_MM9UZCLAgksVdntsmzVKcNDi1XniPj2k'
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: { // does a boolean check
          msg: 'Invalid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  //signup
  // Before a user is created, we are encrypting the password and using hash in its place
  user.addHook('beforeCreate', (pendingUser) => { // pendingUser is object that gets passed to DB
    // Bcrypt is going to hash the password
    let hash = bcrypt.hashSync(pendingUser.password, 12); //
    pendingUser.password = hash; // this will go to the DB
  });

  //sign in
  // checking the password on Sign-In and comparing to the hashed password in the DB
  user.prototype.validPassword = function(typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password); // check to see if password is correct.
    
    return isCorrectPassword;
  }

  // return an object from the database of the user without the encrypted password
  user.prototype.toJSON = function() {
    let userData = this.get(); // 
    delete userData.password; // it doesn't delete password from database, only removes it. 
    
    return userData;
  }

  return user;
};