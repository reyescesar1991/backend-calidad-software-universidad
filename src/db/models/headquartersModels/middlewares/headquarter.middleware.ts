import { VALID_LOCATIONS } from "../../../../core/const";
import { LocationHeadquarterInvalidError } from "../../../../core/exceptions";
import { HeadquarterSchema } from "../headquarter.model";

HeadquarterSchema.pre("validate", function(next) {
  

  const state = this.geoLocation?.state?.toUpperCase();
  const city = this.geoLocation?.city;
  const zipCode = this.geoLocation?.zipCode;

  if (!VALID_LOCATIONS[state] || !VALID_LOCATIONS[state].includes(city) || !!VALID_LOCATIONS[state].includes(zipCode)) {
    return next(new LocationHeadquarterInvalidError(`Combinación inválida: ${city}, ${state} o ${zipCode} no son validos entre sí` ));
  }

  next();
});