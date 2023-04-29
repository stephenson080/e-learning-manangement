import {hash,compare, genSalt} from 'bcrypt'


const SALTROUND=10

export async function encryptPassword(password: string): Promise<string>{
    return new Promise((res, rej) => {
        genSalt(SALTROUND, function(errSalt, salt) {
            if (errSalt) rej(errSalt)
            hash(password, salt, function(err, hash) {
                if (err) rej(err)
                res(hash)
            });
        })
        
    })
}

export async function decryptPassword(password: string, hash: string): Promise<boolean>{
    return new Promise((res, rej) => {
        compare(password, hash, function(err, result) {
            if (err) rej(err)
            res(result)
        });
    })
}

export function trimUser(user: any){
    return {
        _id: user._id,
        name: user.name,
        role: user.role,
        regNo: user.regNo
    }
}