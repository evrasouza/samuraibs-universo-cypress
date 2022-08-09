import toast from '../../components/toast'
import { el } from './elements'

class ResetPassPage {

    constructor() {
        this.toast = toast
    }

    go(token) {
        cy.visit('/reset-password?token=' + token)

        cy.contains(el.title)
            .should('be.visible')
    }

    form(newPass, confirmPass) {
        cy.get(el.password)
            .clear()
            .type(newPass)

        cy.get(el.password2)
            .clear()
            .type(confirmPass)
    }

    submit() {
        cy.contains(el.changePassButton).click()
    }

}

export default new ResetPassPage()