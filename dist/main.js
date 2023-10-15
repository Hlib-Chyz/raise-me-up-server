"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const express = require("express");
const common_1 = require("@nestjs/common");
const error_filter_1 = require("./shared/filters/error.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use('/static', express.static((0, path_1.join)(__dirname, '..', 'react-app', 'build')));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new error_filter_1.ErrorFilter());
    await app.listen(4200);
}
bootstrap();
//# sourceMappingURL=main.js.map