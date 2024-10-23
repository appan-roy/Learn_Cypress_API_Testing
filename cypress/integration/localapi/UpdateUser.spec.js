describe('HTTP PUT Suite', ()=>{

    const baseURI = "http://localhost:3000"

    it('Update a user and validate', ()=>{
        
        //PUT Call
        cy.request('PUT', baseURI+"/users/21",
        {firstName: "Alexander",
        lastName: "Grischuk",
        fideRating: 2789
        }).as('users')

        //validate header
        cy.get('@users')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')

        //validate status code
        cy.get('@users')
        .its('status')
        .should('eq', 200)

        //log full response in the console
        cy.get('@users')
        .its('body').then((res)=>{

            cy.log(res)

        })

        //check user is updated
        cy.get('@users')
        .its('body').then((res)=>{

            expect(res).has.property('firstName', 'Alexander')
            expect(res).has.property('lastName', 'Grischuk')
            expect(res).has.property('fideRating', 2789)
            expect(res).has.property('id', 21)

        })

    })

})