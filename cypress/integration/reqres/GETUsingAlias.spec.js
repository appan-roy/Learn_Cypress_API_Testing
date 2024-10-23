describe('HTTP GET Method Using Alias', ()=>{

    const baseURI = "https://reqres.in"

    beforeEach(()=>{
        cy.request('GET', baseURI+"/api/users?page=2").as('users')
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
        .should('eq', 200)

    })

    it('Validate simple json object', ()=>{
        
        cy.get('@users')
        .its('body')
        .should('contain', {"total_pages": 2})

    })

    it('Validate complex json object', ()=>{
        
        cy.get('@users')
        .its('body').then((res)=>{
            expect(res.data[0]).has.property('first_name', 'Michael')
        })

    })

    it('Get full response in the console', ()=>{
        
        cy.get('@users')
        .its('body').then((res)=>{
            cy.log(res)
        })

    })

})