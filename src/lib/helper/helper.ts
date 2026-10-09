export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const capitalizeProper = (str: string) => {
    return str.replaceAll(/\b\w/g, c => c.toUpperCase());
}

export const getPasswordStrength = (password: string) => {
    let score = 0;

    // Conditions
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++; // special char

    // Mapping score to strength
    const strengths = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"];
    const strength = strengths[Math.min(score, strengths.length - 1)];

    return { score, strength };
}

export const cookiesHelper = {
    capitalize,
    capitalizeProper,
    getPasswordStrength
}