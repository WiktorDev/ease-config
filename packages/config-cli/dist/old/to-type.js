"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toType = toType;
function toType(value) {
    if (value === null)
        return 'null';
    switch (typeof value) {
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
    }
    if (Array.isArray(value)) {
        return `${toType(value[0] ?? 'any')}[]`;
    }
    if (typeof value === 'object') {
        let result = '{\n';
        for (const [k, v] of Object.entries(value)) {
            result += `  ${k}: ${toType(v)};\n`;
        }
        result += '}';
        return result;
    }
    return 'any';
}
//# sourceMappingURL=to-type.js.map