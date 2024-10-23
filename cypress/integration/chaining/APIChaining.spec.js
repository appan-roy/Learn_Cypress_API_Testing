describe('API Chaining', ()=>{

    const baseURI = "http://localhost:3000"

    it('Validate request response chaining', ()=>{

        //run 1st request
        cy.request('GET', baseURI+'/students').as('students')

        //validate response status
        cy.get('@students')
        .its('status').should('eq', 200)

        //capture response data
        cy.get('@students')
        .its('body').then((res)=>{
            
            const fname = res[2].firstName
            const lname = res[2].lastName

            //run 2nd request
            cy.request('POST', baseURI+'/users', 
            {
                firstName: fname,
                lastName: lname,
                fideRating: 2714
            }).as('users')

            //validate response status
            cy.get('@users')
            .its('status').should('eq', 201)

            //validate response data
            cy.get('@users')
            .its('body').then((res)=>{
                expect(res).has.property('firstName', fname)
                expect(res).has.property('lastName', lname)
                expect(res).has.property('fideRating', 2714)
            })

        })

    })

})