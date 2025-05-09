import { Types } from "mongoose";

export const convertMongoIdsToString = <T extends Types.ObjectId | string>(
  ids: T | T[]
): T extends any[] ? string[] : string => {
  const converter = (id: T): string => {
    if (typeof id === 'string') return id;
    if (id instanceof Types.ObjectId) return id.toString();
    return String(id);
  };

  return Array.isArray(ids)
    ? (ids.map(converter) as any)
    : (converter(ids) as any);
};