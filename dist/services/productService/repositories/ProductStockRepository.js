"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStockRepositoryImpl = void 0;
const tsyringe_1 = require("tsyringe");
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
let ProductStockRepositoryImpl = class ProductStockRepositoryImpl {
    ProductStockModel;
    constructor(ProductStockModel) {
        this.ProductStockModel = ProductStockModel;
    }
    async findProductStockByProductIdAndWarehouseId(customIdProduct, customIdWarehouse) {
        return await this.ProductStockModel.findOne({ productCustomId: customIdProduct, warehouseCustomId: customIdWarehouse }).exec();
    }
    async findProductStockByProductId(idProduct) {
        return await this.ProductStockModel.find({ productId: idProduct }).exec();
    }
    async findProductByProductCustomId(customIdProduct) {
        return await this.ProductStockModel.find({ productCustomId: customIdProduct }).exec();
    }
    async findProductByWarehouseId(idWarehouse) {
        return await this.ProductStockModel.find({ warehouseId: idWarehouse }).exec();
    }
    async findProductByWarehouseCustomId(customIdWarehouse) {
        return await this.ProductStockModel.find({ warehouseCustomId: customIdWarehouse }).exec();
    }
    async findAllProductsStock() {
        return await this.ProductStockModel.find({}).exec();
    }
    async createProductStock(dataCreateProductStock, session) {
        const [productStock] = await this.ProductStockModel.create([dataCreateProductStock], { session });
        return productStock;
    }
    async updateProductStock(idProduct, idWarehouse, dataUpdateProductStock, session) {
        return await this.ProductStockModel.findOneAndUpdate({ productCustomId: idProduct, warehouseCustomId: idWarehouse }, dataUpdateProductStock, { new: true, runValidators: true, session }).exec();
    }
    async activateProductInWarehouse(customIdProduct, idWarehouse, session) {
        return await this.ProductStockModel.findOneAndUpdate({ productCustomId: customIdProduct, warehouseCustomId: idWarehouse }, { $set: { statusInWarehouse: true } }, { new: true, runValidators: true, session }).exec();
    }
    async inactivateProductInWarehouse(customIdProduct, idWarehouse, session) {
        return await this.ProductStockModel.findOneAndUpdate({ productCustomId: customIdProduct, warehouseCustomId: idWarehouse }, { $set: { statusInWarehouse: false } }, { new: true, runValidators: true, session }).exec();
    }
    async addStockProduct(idProduct, idWarehouse, quantity, session) {
        return await this.ProductStockModel.findOneAndUpdate({ productCustomId: idProduct, warehouseCustomId: idWarehouse }, { $inc: { quantity: quantity } }, { new: true, runValidators: true, session }).exec();
    }
    async removeStockProduct(idProduct, idWarehouse, quantity, session) {
        return await this.ProductStockModel.findOneAndUpdate({ productCustomId: idProduct, warehouseCustomId: idWarehouse }, { $inc: { quantity: -quantity } }, { new: true, runValidators: true, session }).exec();
    }
    async getStockByWarehouse(idWarehouse) {
        try {
            const warehouseObjectId = new mongoose_2.default.Types.ObjectId(idWarehouse);
            const pipeline = [
                // 1. Filtrar los documentos en ProductStock por el warehouseId
                { $match: { warehouseId: warehouseObjectId } },
                // 2. Lookup para unir con la colección de Productos (para productCustomId y productName)
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "productId",
                        foreignField: "_id",
                        as: "productData"
                    }
                },
                // 3. Desestructurar el array productData (asumiendo que hay un solo producto por productId)
                { $unwind: "$productData" },
                // 4. Lookup para unir con la colección de Almacenes (para warehouseName)
                {
                    $lookup: {
                        from: "warehouses", // Nombre de tu colección de almacenes en MongoDB
                        localField: "warehouseId",
                        foreignField: "_id",
                        as: "warehouseData"
                    }
                },
                // 5. Desestructurar el array warehouseData (asumiendo que hay un solo almacén por warehouseId)
                { $unwind: "$warehouseData" },
                // 6. Proyectar y renombrar los campos para que coincidan con StockByWarehouseResponse
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de ProductStock
                        quantity: "$quantity", // Directamente del ProductStock
                        productCustomId: "$productCustomId", // Directamente del ProductStock
                        productName: "$productData.name", // Del lookup a Product
                        warehouseId: "$warehouseCustomId", // Tu Zod espera el ID custom del almacén, no el ObjectId
                        warehouseName: "$warehouseData.name" // Del lookup a Warehouse
                    }
                }
            ];
            const results = await this.ProductStockModel.aggregate(pipeline).exec();
            if (results.length === 0) {
                return null;
            }
            return results;
        }
        catch (error) {
            console.error(`Error getting stock for warehouse ${idWarehouse}:`, error);
            throw error;
        }
    }
    async getStockTotalByProduct(idProduct) {
        try {
            const productObjectId = new mongoose_2.default.Types.ObjectId(idProduct);
            const pipeline = [
                // 1. Filtrar los documentos en ProductStock por el productId
                { $match: { productId: productObjectId } },
                // 2. Agrupar por productId para sumar la cantidad total de stock de ese producto
                {
                    $group: {
                        _id: "$productId", // Agrupamos por el ID del producto
                        totalQuantity: { $sum: "$quantity" }, // Sumamos todas las cantidades de stock
                        // Mantenemos los campos productCustomId y productId para la proyección final
                        productCustomId: { $first: "$productCustomId" }, // Tomamos el primer productCustomId encontrado (todos serán el mismo para este producto)
                    }
                },
                // 3. Lookup para unir con la colección de Productos (para obtener el productName)
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "_id", // Ahora el _id del grupo es el productId
                        foreignField: "_id", // El _id de la colección de productos
                        as: "productData" // El array donde se guardará el documento del producto
                    }
                },
                // 4. Desestructurar el array productData (asumiendo que siempre habrá un solo producto por ID)
                { $unwind: "$productData" },
                // 5. Proyectar y renombrar los campos para que coincidan con StockTotalByProductResponse
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de grupo
                        productId: "$_id", // El _id del grupo es ahora el productId
                        productCustomId: "$productCustomId", // Del campo que mantuvimos en el $group
                        productName: "$productData.name", // Del lookup a Product
                        quantity: "$totalQuantity" // La cantidad total sumada del $group
                    }
                }
            ];
            const result = await this.ProductStockModel.aggregate(pipeline).exec();
            // Si no se encuentra el producto o no tiene stock, el resultado será un array vacío
            // Devolvemos el primer elemento o null
            return result[0] || null;
        }
        catch (error) {
            console.error(`Error getting total stock for product ${idProduct}:`, error);
            throw error;
        }
    }
    async getTotalStockMonetaryValueByWarehouse(idWarehouse) {
        try {
            const warehouseObjectId = new mongoose_2.default.Types.ObjectId(idWarehouse);
            const pipeline = [
                // 1. Filtrar los documentos de ProductStock por el warehouseId
                { $match: { warehouseId: warehouseObjectId } },
                // 2. Lookup para unir con la colección de Productos
                // Necesitamos el 'sellingPrice' para el cálculo del valor monetario
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos
                        localField: "productId",
                        foreignField: "_id",
                        as: "productData"
                    }
                },
                // 3. Desestructurar el array productData (asumiendo un solo match de producto)
                { $unwind: "$productData" },
                // 4. Lookup para unir con la colección de Almacenes
                // Necesitamos el 'name' para warehouseName
                {
                    $lookup: {
                        from: "warehouses", // Nombre de tu colección de almacenes
                        localField: "warehouseId",
                        foreignField: "_id",
                        as: "warehouseData"
                    }
                },
                // 5. Desestructurar el array warehouseData (asumiendo un solo match de almacén)
                { $unwind: "$warehouseData" },
                // 6. Agrupar TODOS los documentos restantes en un único grupo para sumar el valor total
                {
                    $group: {
                        _id: "$warehouseId", // Agrupamos por el ID del almacén para tener un solo resultado por almacén
                        totalMonetaryValue: {
                            $sum: { $multiply: ["$quantity", "$productData.sellingPrice"] }
                        },
                        // Preservamos el nombre y el ID custom del almacén para la proyección final
                        warehouseName: { $first: "$warehouseData.name" },
                        warehouseCustomId: { $first: "$warehouseCustomId" } // Asumo que el custom ID viene de ProductStock
                    }
                },
                // 7. Proyectar los campos finales para que coincidan con el nuevo DTO
                {
                    $project: {
                        _id: 0, // Ocultar el _id del grupo
                        warehouseId: "$warehouseCustomId", // Usamos el custom ID del almacén para el DTO
                        warehouseName: "$warehouseName",
                        totalMonetaryValue: "$totalMonetaryValue"
                    }
                }
            ];
            const result = await this.ProductStockModel.aggregate(pipeline).exec();
            // Si el almacén no tiene stock o el ID no existe, result será un array vacío
            return result[0] || null;
        }
        catch (error) {
            console.error(`Error getting total monetary value for warehouse ${idWarehouse}:`, error);
            throw error;
        }
    }
    async getAmountTotalStockByProduct(idProduct) {
        try {
            const productObjectId = new mongoose_2.default.Types.ObjectId(idProduct);
            const pipeline = [
                // 1. Filtrar los documentos en ProductStock por el productId dado
                { $match: { productId: productObjectId } },
                // 2. Lookup para unir con la colección de Productos
                // Necesitamos el 'name' (para productName) y 'sellingPrice' (para el cálculo del monto total)
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "productId",
                        foreignField: "_id",
                        as: "productData" // Este campo contendrá el documento del producto (como un array)
                    }
                },
                // 3. Desestructurar el array productData (asumiendo que cada stock se relaciona con un único producto)
                { $unwind: "$productData" },
                // 4. Agrupar por el productId para sumar todas las cantidades y mantener los datos del producto
                {
                    $group: {
                        _id: "$productId", // Agrupamos por el ID del producto para consolidar todas sus entradas de stock
                        totalQuantity: { $sum: "$quantity" }, // Sumamos las cantidades de stock de todos los almacenes para este producto
                        // Preservamos los datos del producto necesarios para la proyección final
                        productCustomId: { $first: "$productCustomId" }, // Todos los stocks del mismo producto tendrán el mismo custom ID
                        productName: { $first: "$productData.name" }, // Tomamos el nombre del producto de la data unida
                        sellingPrice: { $first: "$productData.sellingPrice" } // Tomamos el precio de venta de la data unida
                    }
                },
                // 5. Proyectar los campos finales y realizar el cálculo del totalAmount
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de grupo
                        productId: "$_id", // El _id del grupo es el productId
                        productCustomId: "$productCustomId", // Del campo mantenido en el $group
                        productName: "$productName", // Del campo mantenido en el $group
                        // Calcular totalAmount: totalQuantity (sumada en el $group) * sellingPrice (preservado en el $group)
                        totalAmount: { $multiply: ["$totalQuantity", "$sellingPrice"] }
                    }
                }
            ];
            const result = await this.ProductStockModel.aggregate(pipeline).exec();
            // Si el producto no existe o no tiene stock en ningún almacén, result será un array vacío
            // Devolvemos el primer (y único) elemento o null
            return result[0] || null;
        }
        catch (error) {
            console.error(`Error getting total stock monetary value for product ${idProduct}:`, error);
            throw error;
        }
    }
    async getMonetaryValueForSpecificProductInWarehouse(// Nuevo nombre más descriptivo
    idProduct, idWarehouse) {
        try {
            const productObjectId = new mongoose_2.default.Types.ObjectId(idProduct);
            const warehouseObjectId = new mongoose_2.default.Types.ObjectId(idWarehouse);
            const pipeline = [
                // 1. Filtrar los documentos en ProductStock por ambos IDs (producto y almacén)
                // Gracias a tu índice único compuesto, esto te dará un máximo de un documento.
                {
                    $match: {
                        productId: productObjectId,
                        warehouseId: warehouseObjectId
                    }
                },
                // 2. Lookup para unir con la colección de Productos
                // Necesitamos el 'name' para productName y 'sellingPrice' para el cálculo
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "productId",
                        foreignField: "_id",
                        as: "productData" // Array donde se guardará el documento del producto
                    }
                },
                // 3. Desestructurar el array productData (asumiendo que siempre habrá un solo match)
                { $unwind: "$productData" },
                // 4. Lookup para unir con la colección de Almacenes
                // Necesitamos el 'name' para warehouseName
                {
                    $lookup: {
                        from: "warehouses", // Nombre de tu colección de almacenes en MongoDB
                        localField: "warehouseId",
                        foreignField: "_id",
                        as: "warehouseData" // Array donde se guardará el documento del almacén
                    }
                },
                // 5. Desestructurar el array warehouseData (asumiendo que siempre habrá un solo match)
                { $unwind: "$warehouseData" },
                // 6. Proyectar los campos finales y realizar el cálculo
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de ProductStock
                        productId: "$productId", // Directamente del documento ProductStock
                        productCustomId: "$productCustomId", // Directamente del documento ProductStock
                        productName: "$productData.name", // Del lookup a Product
                        // Calcular totalAmount: quantity (de ProductStock) * sellingPrice (de ProductData)
                        totalAmount: { $multiply: ["$quantity", "$productData.sellingPrice"] },
                        warehouseId: "$warehouseCustomId", // Tu Zod espera el ID custom del almacén, que está en ProductStock
                        warehouseName: "$warehouseData.name" // Del lookup a Warehouse
                    }
                }
            ];
            const result = await this.ProductStockModel.aggregate(pipeline).exec();
            // Si la combinación product/warehouse no se encuentra (o no tiene stock), el array result estará vacío
            // Devolvemos el primer (y único) elemento o null
            return result[0] || null;
        }
        catch (error) {
            console.error(`Error getting monetary value for product ${idProduct} in warehouse ${idWarehouse}:`, error);
            throw error;
        }
    }
    async findProductsByStockLevel(status) {
        try {
            const pipeline = [
                // 1. Agrupar la cantidad de stock total por cada producto desde ProductStock
                {
                    $group: {
                        _id: "$productId", // Agrupamos por el ID del producto
                        totalQuantity: { $sum: "$quantity" }, // Sumamos la cantidad de todos los almacenes para cada producto
                    }
                },
                // 2. Unir con la colección de Productos para obtener minimumStockLevel, maximumStockLevel y otros detalles del producto
                {
                    $lookup: {
                        from: "products", // Nombre de tu colección de productos en MongoDB
                        localField: "_id", // El _id del grupo es el productId
                        foreignField: "_id",
                        as: "productData" // El array donde se guardará el documento del producto
                    }
                },
                // 3. Desestructurar el array productData (asumiendo que siempre habrá un solo producto por ID)
                { $unwind: "$productData" },
                // 4. Filtrar por productos activos (usando el campo isActive de ProductModel)
                {
                    $match: {
                        "productData.isActive": true // Filtramos por productos que estén activos
                    }
                },
                // 5. Filtrar basado en el estado (low, overstock, ok) utilizando los niveles de stock del producto
                {
                    $match: {
                        $expr: {
                            $switch: {
                                branches: [
                                    {
                                        case: { $eq: [status, "low"] },
                                        then: { $lt: ["$totalQuantity", "$productData.minimumStockLevel"] }
                                    },
                                    {
                                        case: { $eq: [status, "overstock"] },
                                        then: { $gt: ["$totalQuantity", "$productData.maximumStockLevel"] }
                                    },
                                    {
                                        case: { $eq: [status, "ok"] },
                                        then: {
                                            $and: [
                                                { $gte: ["$totalQuantity", "$productData.minimumStockLevel"] },
                                                { $lte: ["$totalQuantity", "$productData.maximumStockLevel"] }
                                            ]
                                        }
                                    }
                                ],
                                default: false // Si el estado no coincide con ninguno, no devuelve nada
                            }
                        }
                    }
                },
                // 6. Proyectar los campos finales para que coincidan con StockByStatusResponse
                {
                    $project: {
                        _id: 0, // Ocultar el _id del documento de grupo
                        productCustomId: "$productData.idProduct", // <-- Mapear a idProduct del documento Product
                        productName: "$productData.name",
                        quantity: "$totalQuantity",
                        status: status // <-- El valor del estado pasado como parámetro
                    }
                }
            ];
            const products = await this.ProductStockModel.aggregate(pipeline).exec();
            if (products.length === 0) {
                return null;
            }
            return products;
        }
        catch (error) {
            console.error(`Error finding products by stock level '${status}':`, error);
            throw error;
        }
    }
};
exports.ProductStockRepositoryImpl = ProductStockRepositoryImpl;
exports.ProductStockRepositoryImpl = ProductStockRepositoryImpl = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ProductStockModel")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProductStockRepositoryImpl);
//# sourceMappingURL=ProductStockRepository.js.map