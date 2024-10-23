describe('HTTP POST Method', ()=>{

    const baseURI = "https://reqres.in"

    it('Create user and validate', ()=>{
        
        //HTTP POST Call
        cy.request('POST', baseURI+"/api/users", 
        {"name": "morpheus", 
        "job": "leader"})
        .then((res) =>{
            
            //log full response in the console
            cy.log(res)

            //validate status code
            expect(res.status).equal(201)

            //validate response
            expect(res.body).has.property('name', 'morpheus')
            expect(res.body).has.property('job', 'leader')

        })

    })

})