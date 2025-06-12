
export const configureDateToJwt = (expToken: number) => {

    // 3.1. Toma el valor del timestamp (en segundos)
    const expirationTimestampInSeconds: number = expToken;

    // 3.2. Multiplícalo por 1000 para convertirlo a milisegundos
    const expirationTimestampInMilliseconds: number = expirationTimestampInSeconds * 1000;

    // 3.3 Crea un objeto Date de JavaScript con los milisegundos
    return new Date(expirationTimestampInMilliseconds);
}