describe('HTTP PUT Method', ()=>{

    const baseURI = "https://reqres.in"

    it('Update user and validate', ()=>{
        
        //HTTP PUT Call
        cy.request('PUT', baseURI+"/api/users/2", 
        {"name": "morpheus", 
        "job": "zion resident"})
        .then((res) =>{
            
            //log full response in the console
            cy.log(res)

            //validate status code
            expect(res.status).equal(200)

            //validate response
            expect(res.body).has.property('name', 'morpheus')
            expect(res.body).has.property('job', 'zion resident')

        })

    })

})