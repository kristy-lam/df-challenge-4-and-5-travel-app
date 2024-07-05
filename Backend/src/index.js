import Config from "./Config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import UserRoutes from "./routes/User.routes.js";
import Router from "./routes/Router.js";

//* Had to install a package called cross-env for this to work:
//* npm install --save-dev cross-env
//* Hence, the scripts section in the package.json file is different
Config.load();
const { PORT, HOST, DB_URI } = process.env;

const router = new Router();
const userRoutes = new UserRoutes();
router.addRouter(userRoutes);

const server = new Server(PORT, HOST, router);
const database = new Database(DB_URI);

server.start();
await database.connect();
