const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errors = require("./controllers/error");

const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errors.get404);

Product.belongsTo(User, {constraints:true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
	.sync({ force:true })
	.then(() => {
		app.listen(3002);
	})
	.catch((err) => console.log(err)); //na krijon tabletat dhe relationships ne db
