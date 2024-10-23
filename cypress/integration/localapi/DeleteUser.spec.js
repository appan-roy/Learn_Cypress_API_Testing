describe('HTTP DELETE Suite', ()=>{

    const baseURI = "http://localhost:3000"

    it('Delete a user and validate', ()=>{
        
        //DELETE Call
        cy.request('DELETE', baseURI+"/users/21").as('users')

        //validate status code
        cy.get('@users')
        .its('status')
        .should('eq', 200)

        //check user is deleted
        cy.get('@users')
        .its('body').then((res)=>{

            expect(res).not.has.property('firstName')
            expect(res).not.has.property('lastName')
            expect(res).not.has.property('fideRating')
            expect(res).not.has.property('id')

        })

    })

})