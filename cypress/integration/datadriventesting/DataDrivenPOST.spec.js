describe('Data Driven User Creation Suite', () => {

    const baseURI = "http://localhost:3000"

    before(() => {
        cy.fixture('ddtpost').then(function (data) {
            this.data = data
        })
    })

    it('Create users and validate', function () {

        for (var i = 0; i < this.data.firstName.length; i++) {

            var fname = this.data.firstName[i]
            var lname = this.data.lastName[i]
            var rating = this.data.fideRating[i]

            //POST Call
            cy.request('POST', baseURI + "/users",
                {
                    firstName: fname,
                    lastName: lname,
                    fideRating: rating
                }).as('users')

            //validate header
            cy.get('@users')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json')

            //validate status code
            cy.get('@users')
                .its('status')
                .should('eq', 201)

            //log full response in the console
            cy.get('@users')
                .its('body').then((res) => {
                    cy.log(res)
                })

        }

    })

})