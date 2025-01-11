import React from 'react';
import '../styles/PasswordStrengthMeter.css';

const PasswordStrengthMeter = ({ password }) => {
    const calculateStrength = (password) => {
        const strength = calculatePasswordStrength(password);
        return strength;
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;

        // Sprawdzenie długości hasła
        if (password.length >= 8) {
            strength++;
        }

        // Sprawdzenie wielkości liter
        if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
            strength++;
        }

        // Sprawdzenie obecności znaków specjalnych
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            strength++;
        }

        // Sprawdzenie złożoności hasła
        if (/\d/.test(password) && /[a-zA-Z]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
            strength++;
        }

        return strength;
    };

    const strength = calculateStrength(password);

    const getStrengthDescription = () => {
        switch (strength) {
            case 1:
                return 'Słabe';
            case 2:
                return 'Średnie';
            case 3:
                return 'Dobre';
            case 4:
                return 'Bardzo dobre';
            default:
                return 'Bardzo słabe';
        }
    };

    const getProgressBarColor = () => {
        switch (strength) {
            case 1:
                return 'weak';
            case 2:
                return 'medium';
            case 3:
                return 'strong';
            case 4:
                return 'very-strong';
            default:
                return 'very-weak';
        }
    };

    return (
        <div className="password-strength-meter">
            <progress
                className={`strength-${getProgressBarColor()}`}
                value={strength}
                max="4"
            />
            <label className="strength-label">
                {getStrengthDescription()}
            </label>
        </div>
    );
};

export default PasswordStrengthMeter;
