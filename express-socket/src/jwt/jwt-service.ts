const jwt = require('jsonwebtoken');


export function getuserNameFromToken(token: string): string {
    const secretKey = process.env.JWT_TOKEN as string
    try {
        // Verify and decode the token
        const decoded = jwt.decode(token, secretKey);
        return decoded.sub; 
    } catch (error) {
        console.error("Invalid token:", error.message);
        return null; // Return null if the token is invalid
    }
}