const Token = require('../models/auth/tokens.model');
const User = require('../models/user.model');
const UserRole = require('../models/auth/user_roles.model');
const Role = require('../models/auth/role.model');
const Permission = require('../models/auth/permissions.model');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');


const accessTokenLife = process.env.JWT_EXPIRES_IN; 
const refreshTokenLife = process.env.JWT_REFRESH_EXPIRES_IN; 
const accessTokenSecret = process.env.JWT_SECRET; 

// Login 
exports.login = async (tokenRequest) => {
    try {
        const user = await User.findOne({username: tokenRequest.username});
        if(!user){
            throw new Error('User not found');  
        }

        const passwordValid = await user.comparePassword(tokenRequest.password)
        if (!passwordValid) {
            throw new Error('Invalid password');  
        }

        const now = new Date();
        const accessToken = await generateToken(user);
        const refreshToken = generateRefreshToken();

        const newToken = new Token({
            userId: user._id,                       
            username: user.username,                 
            token: accessToken,         
            refreshToken: refreshToken,
            refreshTokenExpiryTime: new Date(now.getTime() + parseInt(refreshTokenLife) * 1000),
            createdAt: now                      
        });
        await newToken.save();

        return { token: accessToken, refreshToken: refreshToken };  
    } catch (error) {
        throw new Error('Error creating token: ' + error.message);
    }
};

// Refresh Token 
exports.refreshToken = async (request) => {
    try {
        const token = await Token.findOne({ userId: request.userId, refreshToken: request.refreshToken });
        if (!token) {
            throw new Error('Token does not exist.');
        }

        const now = new Date();
        if (token.refreshTokenExpiryTime.getTime() < now.getTime()) {
            throw new Error('Token has expired.');
        }

        const user = await User.findById(request.userId);
        if (!user) {
            throw new Error('User not found.');
        }

        token.token = await generateToken(user);
        token.refreshToken = generateRefreshToken();
        token.refreshTokenExpiryTime = new Date(now.getTime() + parseInt(refreshTokenLife) * 1000);  

        await token.save();

        return { token: token.token, refreshToken: token.refreshToken };
    } catch (error) {
        throw new Error('Error while refreshing token: ' + error.message);
    }
};

async function generateToken(user) {
    const now = Math.floor(Date.now() / 1000);

    const userRole = await UserRole.findOne({userId: user._id});
    if(!userRole){
        throw new Error('User role not found');  
    }

    const role = await Role.findOne({_id: userRole.roleId});
    if(!role){
        throw new Error('Role not found');  
    }

    const permissions = await getClaims(userRole.roleId);

    const payload = {
        sub: user.username, 
        userId: user.id,
        role: role.name, 
        avatar: user.avatar,        
        iss: 'datNv7.com',           
        iat: now,                      
        exp: now + parseInt(accessTokenLife), 
        permissions: permissions,   
        jti: uuidv4(),                   
    };

    const token = jwt.sign(payload, accessTokenSecret, {
        algorithm: 'HS512',  
        header: {
            alg: 'HS512',  
            typ: 'JWT'      
        }
    });

    return token;
}

let getClaims = async function(roleId) {
    try {
        const permissions = await Permission.find({ roleId: roleId });
        
        const claims = permissions.map(permission => {
            const claimsForResource = [];

            if (permission.canCreate) {
                claimsForResource.push(permission.resources + '_create');
            }
            if (permission.canRead) {
                claimsForResource.push(permission.resources + '_read');
            }
            if (permission.canUpdate) {
                claimsForResource.push(permission.resources + '_update');
            }
            if (permission.canDelete) {
                claimsForResource.push(permission.resources + '_delete');
            }

            return claimsForResource;  
        });

        return claims.flat();  
    } catch (err) {
        console.error('Error getting permissions', err);
        return []; 
    }
};

function generateRefreshToken() {
    const randomBytes = crypto.randomBytes(32); 
    return randomBytes.toString('base64');  
}

