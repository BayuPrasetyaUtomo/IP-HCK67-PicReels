npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string

npx sequelize-cli model:generate --name Image --attributes title:string,imgUrl:string

npx sequelize-cli model:generate --name Mood --attributes name:string

npx sequelize-cli model:generate --name MoodImage --attributes ImageId:integer,MoodId:integer

npx sequelize-cli model:generate --name UserMoods --attributes UserId:integer,MoodId:integer


npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli seed:generate --name demo-image
npx sequelize-cli seed:generate --name demo-mood
