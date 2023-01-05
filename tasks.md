### Project files structure
 - controllers (route controllers)
 - helpers (helpful functions)
 - models
  - Post.ts
 - public (static files)
 - routes (connect controllers route functions with app.ts)
 - views (EJS files)
 - app.ts (init server file)
 - database.ts (database connection realisation)

### Tasks
 [x] Build project files structure
 [x] Realise server launch and modules in app.ts
 [x] Insert ready EJS files to 'views' directory
 [x] Realise working among routes, controllers, views (homepage and contacts page)
 [x] Integrate SQL Database (ValentinaDB)
  - [x] Realise CRUD operations in 'post-controller'
  - [x] Create 'Post' class of Database with CRUD operation functions
 [x] Make test requests
 [x] Realise Handling Error functions
 [x] Create basic API
 - Refresh and learn:
  [x] Basic types
  [x] Functions
  [~] Objectsmpm
  [~] Classes
  [] Heritance
  [] Namespaces & modules
  [] Interfaces
  [] Generics
 ['in-process'] Refactor project for better working with Typescript

### To Refactor
 [x] Not required but imports & module.exports ==> export before function
 [] Do not use 'any'
 [] JSON to interfaces | types
 [] Remove static methods from 'Post' class
 [] mysql2
 [] JSlint
