describe('HTTP POST Method Using Alias', ()=>{

    const baseURI = "https://reqres.in"

    beforeEach(()=>{
        cy.request('POST', baseURI+"/api/users", 
        {"name": "morpheus", 
        "job": "leader"
        }).as('users')
    })

    it('Validate the header', ()=>{
        
        cy.get('@users')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')

    })

    it('Validate the status code', ()=>{
        
        cy.get('@users')
        .its('status')
        .should('eq', 201)

    })

    it('Get full response in the console', ()=>{
        
        cy.get('@users')
        .its('body').then((res)=>{
            cy.log(res)
        })

    })

    it('Validate response', ()=>{
        
        cy.get('@users')
        .its('body').then((res)=>{

            expect(res).has.property('name', 'morpheus')
            expect(res).has.property('job', 'leader')

        })

    })

})