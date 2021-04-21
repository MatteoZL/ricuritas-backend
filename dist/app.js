"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
// Settings
app.set("port", process.env.PORT || 5000);
// Middlwares
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_fileupload_1.default({ useTempFiles: true }));
// Routes
const index_routes_1 = __importDefault(require("./routes/index.routes"));
app.use('/api', index_routes_1.default);
function createServer() {
    app.listen(app.get("port"), () => {
        console.log("Server on port", app.get("port"));
    });
}
exports.default = createServer;
//# sourceMappingURL=app.js.map