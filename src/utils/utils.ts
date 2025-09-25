export const generateCode = () =>{
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10); // Random digit between 0 and 9
    }
    return code;
}