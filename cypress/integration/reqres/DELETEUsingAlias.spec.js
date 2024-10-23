describe('HTTP DELETE Method Using Alias', ()=>{

    const baseURI = "https://reqres.in"

    beforeEach(()=>{
        cy.request('DELETE', baseURI+"/api/users/2").as('users')
    })

    it('Validate the status code', ()=>{
        
        cy.get('@users')
        .its('status')
        .should('eq', 204)

    })

    it('Validate response', ()=>{
        
        cy.get('@users')
        .its('body').then((res)=>{

            expect(res).not.has.property('name')
            expect(res).not.has.property('job')

        })

    })

})