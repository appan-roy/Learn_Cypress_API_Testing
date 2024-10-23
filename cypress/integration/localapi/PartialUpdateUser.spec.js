describe('HTTP PATCH Suite', ()=>{

    const baseURI = "http://localhost:3000"

    it('Partially update a user and validate', ()=>{
        
        //PATCH Call
        cy.request('PATCH', baseURI+"/users/21",
        {
        fideRating: 2714
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

        //check user is partially updated
        cy.get('@users')
        .its('body').then((res)=>{

            expect(res).has.property('fideRating', 2714)
            expect(res).has.property('id', 21)

        })

    })

})