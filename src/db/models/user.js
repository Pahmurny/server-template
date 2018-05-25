import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    createdAt: {
      field: 'createdat',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updatedat',
      type: DataTypes.DATE,
    },
  }, {
    schema: 'public',
    tableName: 'users',
    freezeTableName: true,
    timestamps: true,
  });

  User.associate = (models) => {
  };

  User.hook('beforeSave', (user, options) => {
    if (user.changed('password')) {
      const saltRounds = 5;
      return bcrypt.hash(user.password, saltRounds)
        .then((hash) => {
          user.password = hash;
        })
        .catch(sequelize.Promise.reject(new Error('Error while saving user')));
    }
  });

  User.prototype.view = function view(full) {
    // console.log('VIEW THIS:', this);
    return this;
  };

  User.prototype.authenticate = function authenticate(password) {
    return bcrypt.compare(password, this.password).then(valid => (valid ? this : false));
  };

  return User;
};
