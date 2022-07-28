const bcrypt = require('bcrypt')

bcrypt.hash('123456789', 10).then(r => console.log(r))