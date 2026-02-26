import { productDto } from "../dto/product.dto.js";

export const mapToProductDTO = (input, productDto) => {
    const output = {};
    for (let key in productDto) {
        if(input[key] !== undefined) {
            output[key] = input[key];
        }
    }
    return output;
}