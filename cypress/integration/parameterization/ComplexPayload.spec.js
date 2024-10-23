describe('Complex Payload POST Suite', ()=>{

    const baseURI = "http://localhost:3000"

    before(()=>{
        cy.fixture('studentsdata').then(function(data){
            this.data = data
        })
    })

    it('Create a student and validate', function(){
 
        //POST Call
        cy.request('POST', baseURI+"/students",
        {firstName: this.data.firstName,
        lastName: this.data.lastName,
        mobileNo: this.data.mobileNo,
        id: this.data.id,
        subjects: [
            this.data.subjects[0],
            this.data.subjects[1],
            this.data.subjects[2]
        ]
        }).as('students')

        //validate header
        cy.get('@students')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json')

        //validate status code
        cy.get('@students')
        .its('status')
        .should('eq', 201)

        //log full response in the console
        cy.get('@students')
        .its('body').then((res)=>{

            cy.log(res)

        })

        //check student is created
        cy.get('@students')
        .its('body').then((res)=>{

            expect(res).has.property('firstName', 'Chirag')
            expect(res).has.property('lastName', 'Verma')
            expect(res).has.property('mobileNo', 7890654321)
            expect(res).has.property('id', 11)
            expect(res.subjects[0]).to.equal('Maths')
            expect(res.subjects[1]).to.equal('Computer Application')
            expect(res.subjects[2]).to.equal('Physics')

        })

    })

})