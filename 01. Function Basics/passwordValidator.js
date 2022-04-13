/*

The validator accespts 2 args: password and username.
Password must:
- be at least 8 characters long 
- cannot contain spaces CHECK
- cannot contain the username CHECK

Return true if everything is correct, false otherwise.


*/

function isValid(password, username) {
    if(!password || !username) return false;
    if (password.includes(" ") || password.includes(username) || password.length <= 8) {
        return false;
    }
    return true;
}

console.log(isValid("moristeEnMadrid", "JuanFernandoQuintero"));