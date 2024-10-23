describe('HTTP DELETE Method', ()=>{

    const baseURI = "https://reqres.in"

    it('Delete user and validate', ()=>{
        
        //HTTP DELETE Call
        cy.request('DELETE', baseURI+"/api/users/2").then((res) =>{
            
            //validate status code
            expect(res.status).equal(204)

            //validate response
            expect(res.body).not.has.property('name')
            expect(res.body).not.has.property('job')

        })

    })

})