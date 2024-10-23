describe('HTTP GET Method', ()=>{

    const baseURI = "https://reqres.in"

    it('Get users and validate', ()=>{
        
        //HTTP GET Call. Default request is GET. The method name is optional here unlike other methods
        //POST / PUT / PATCH / DELETE
        cy.request(baseURI+"/api/users?page=2").then((res) =>{
            
            //log full response in the console
            cy.log(res)
            
            //validate status code
            expect(res.status).equal(200)

            //validate length
            expect(res.body.data).has.length(6)

            //validate id of 1st element
            expect(res.body.data[0]).has.property('id', 7)

            //validate email of 2nd element
            expect(res.body.data[1]).has.property('email', 'lindsay.ferguson@reqres.in')

            //validate first name of 3rd element 
            expect(res.body.data[2]).has.property('first_name', 'Tobias')

            //validate last name of 4th element
            expect(res.body.data[3]).has.property('last_name', 'Fields')

            //validate fide rating should not be present in the 5th element
            expect(res.body.data[4]).not.has.property('fideRating')

            //validate contact should not be present in the 6th element
            expect(res.body.data[5]).not.have.property('contact')

        })

    })

})