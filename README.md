# Site-notes

# 1)Créer un compte(gratuitement) sur MongoDb https://www.mongodb.com/atlas/database

# 2)Sur le tableau de bord, créer un cluster avec les options gratuites

# 3)Dans l'onglet database access, ajouter un user avec username et mot de passe et "Read and write to any database"

# 4)Dans l'onglet network access, cliquer sur Add IP Adress et Add access from anywhere

# 5)Une fois le cluster créé, depuis MongoDB Atlas, cliquer sur Connect, puis connect your application, choisir le driver node.js le plus récent, connection string only, et copier la chaine de caractères(normalement mongodb+serv://...)

# 6)Créer un fichier .env à la base avec MONGOOSE_PASS = la chaine de caractères

# 7)npm install mongoose, npm install express, npm install path, npm install cors, npm install fs, npm install http, npm install multer
