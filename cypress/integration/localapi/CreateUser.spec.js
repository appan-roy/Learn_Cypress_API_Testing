describe('HTTP POST Suite', ()=>{

    const baseURI = "http://localhost:3000"

    it('Create a user and validate', ()=>{
        
        //POST Call
        cy.request('POST', baseURI+"/users",
        {firstName: "Aaron",
        lastName: "Nimschowitz",
        fideRating: 2777
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
        .its('body').then((res)=>{

            cy.log(res)

        })

        //check user is created
        cy.get('@users')
        .its('body').then((res)=>{

            expect(res).has.property('firstName', 'Aaron')
            expect(res).has.property('lastName', 'Nimschowitz')
            expect(res).has.property('fideRating', 2777)
            expect(res).has.property('id', 21)

        })

    })

})