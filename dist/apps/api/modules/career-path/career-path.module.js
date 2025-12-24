"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerPathModule = void 0;
const common_1 = require("@nestjs/common");
const career_path_controller_1 = require("./career-path.controller");
const career_path_service_1 = require("./career-path.service");
let CareerPathModule = class CareerPathModule {
};
exports.CareerPathModule = CareerPathModule;
exports.CareerPathModule = CareerPathModule = __decorate([
    (0, common_1.Module)({
        controllers: [career_path_controller_1.CareerPathController],
        providers: [career_path_service_1.CareerPathService],
    })
], CareerPathModule);
//# sourceMappingURL=career-path.module.js.map