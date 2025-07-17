"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../../../../core/const");
const exceptions_1 = require("../../../../core/exceptions");
const headquarter_model_1 = require("../headquarter.model");
headquarter_model_1.HeadquarterSchema.pre("validate", function (next) {
    const state = this.geoLocation?.state?.toUpperCase();
    const city = this.geoLocation?.city;
    const zipCode = this.geoLocation?.zipCode;
    if (!const_1.VALID_LOCATIONS[state] || !const_1.VALID_LOCATIONS[state].includes(city) || !!const_1.VALID_LOCATIONS[state].includes(zipCode)) {
        return next(new exceptions_1.LocationHeadquarterInvalidError(`Combinación inválida: ${city}, ${state} o ${zipCode} no son validos entre sí`));
    }
    next();
});
//# sourceMappingURL=headquarter.middleware.js.map