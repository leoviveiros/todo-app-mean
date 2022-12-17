const fs = require('fs');

const password = fs.readFileSync('/run/secrets/database_user', 'utf-8');

db = db.getSiblingDB('todo');

db.createUser({
    user: "todo",
    pwd: password,
    roles: [{ role: "readWrite", db: "todo" }]
});