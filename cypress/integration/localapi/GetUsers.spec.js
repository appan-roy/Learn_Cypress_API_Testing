describe('HTTP GET Suite', ()=>{

    const baseURI = "http://localhost:3000"

    it('Get users and validate', ()=>{
        
        //GET Call
        cy.request('GET', baseURI+"/users").as('users')

        //validate header
        cy.get('@users')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')

        //validate status code
        cy.get('@users')
        .its('status')
        .should('eq', 200)

        //validate simple json object
        cy.get('@users')
        .its('body').then((res)=>{
            expect(res[1]).has.property('firstName', 'Mikhail')
            expect(res[1]).has.property('lastName', 'Tal')
            expect(res[1]).has.property('fideRating', 2765)
            expect(res[1]).has.property('id', 2)
        })

        //log full response in the console
        cy.get('@users')
        .its('body').then((res)=>{
            cy.log(res)
        })

    })

})