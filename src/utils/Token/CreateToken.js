exports.createToken = async (user) => {
    try {
        const payload = { id: user.id, email: user.email, role: user.role };
        const token = await jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    } catch (error) {
        console.error('Error creating token:', error);
        throw new Error('Token creation failed');
    }
}