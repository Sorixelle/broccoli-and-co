Feature: Invitation form

  Scenario: Submitting the invitation form successfully
    Given the user is on the home page
     When they request an invite
      And fill out the form with their details
     Then they should receive confirmation of their invitation

  Scenario: Submitting the invitation form with a previously used email
    Given the user is on the home page
     When they request an invite
      And fill out the form with a previously used email
     Then they should receive an error message
