
export const refactorPhoneNumber = (countryCode: string, phoneNumber: string): string => {
    return "+" + (countryCode + phoneNumber).replace(/[() -]/g, "");
};

export const cleanEmail = (prefix: string, domain: string) => {
    const sanitizedPrefix = prefix.trim().replace(/@.*/, ""); // Remove everything after "@" symbol, "@"" included
    return sanitizedPrefix + domain;
}