const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const api = require('./api');

module.exports = function (passport) {
    console.log('Inicio');

    async function findUser(email) {
        const emailobjt = {email:email};
        await api.post('adm/email',emailobjt).then(response => (this.data = response.data[0]));
        return this.data;
    }

    async function findUserById(id) {
        await api.post('adm/'+id).then(response => (this.info = response.data[0]));
        return this.info;
    }

    passport.serializeUser((adm, done) => {
        done(null, adm.id);
    });

    passport.deserializeUser((id, done) => {
        try {
            const adm = findUserById(id);
            done(null, adm);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'senha'
    },
        async (email, senha, done) => {
            try {
                const adm = await findUser(email);
                // usuário inexistente
                if (!adm) { return done(null, false) }
                // comparando as senhas
                const isValid = bcrypt.compareSync(senha, adm.senha);

                if (!isValid) return done(null, false)
                
                return done(null, adm)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}