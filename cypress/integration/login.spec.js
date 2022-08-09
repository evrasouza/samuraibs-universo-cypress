import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dashboard'

describe('login', function () {

    context('quando o usuário é muito bom', function () {

        const user = {
            name: "avatar",
            email: "avatar@samuraibs.com.br",
            password: "pwd123",
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })

        it('deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })

    })

    context('quando o usuário é bom mas a senha esta incorreta', function () {

        let user = {
            name: "krisium",
            email: "krisium@samuraibs.com.br",
            password: "pwd123",
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })

        })

        it('deve notificar erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })

    })

    context('quando o formato do email é inválido', function () {

        const emails = [
            'notreve.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            'notreve@',
            '111',
            '&*^&^&*',
            'xpto123'
        ]

        before(function(){
            loginPage.go()
        })

        emails.forEach(function (email) {
            it('não deve logar com o email: ' + email, function () {
                const user = { email: email, password: 'pwd123' }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alertHaveText('Informe um email válido')
            })
        })

    })

    context('quando não preencho nenhum dos campos', function() {

        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), function () {
                loginPage.alertHaveText(alert)                
            })
        })
    })

})