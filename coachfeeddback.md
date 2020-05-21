Readme

- Screen shot. Does the final return statement pass the ACs?
- I like the approach table. Why Jasmine? Why nyc?
- Getting started
      - I don’t think you need the cloning details or dependencies info. You can take it as read that whoever is reviewing a tech test knows this stuff and it distracts from the flow
      - When I install I get `npm WARN bank@1.0.0 No repository field.` what’s that about?
- Interacting
      - account.printStatement(); doesn’t pass the AC. I’d really like you to think why because I say.
- Stories
      - I like the invalid transaction stuff
- Implementation
      - “My initial steps were too rushed” I don’t think that paragraph is phrased well. There’s a way to be honest about your feedback without putting yourself down.
- structure
      - Like the diagram
      - It tells me that’s a LOT going on though. …Too much?
      - Were I to be really picky I’d point out the the grammar of the following bullet points is inconsistent.

Linting

- My VSCode with eslint and prettier setup strongly disagrees with your linting. You might need to expose more rules.
  - significant improvement I think. Installed prettier and configured to run with eslint. Worked out one of thee reasons eslint errors weren't showing was because errors show with open files only (doh!)

Commits

- Great! Clear. Could always add emojis though… (https://gist.github.com/parmentf/035de27d6ed1dce0b36a)

Tests

- Feature
	- Three feature test files? For this simple an app!?
		- merged into one file and simplified, fixing highlighted problems throughout

- Account
	* I think there’s better way(s) of writing `const StatementMockFunction = function StatementMockFunction()`. In fact you use seven lines for a simple mock. Is there no simpler way to do that in jasmine?
		* there isn't because we're mocking a function that has a constructor, and Jasmine doesn't have an easy way of doing this
	* Account requires you to provide an object with transaction types (i.e. deposit and withdrawl? (Again, is withdrawl the right word?) I haven’t looked at the implementation yet but that doesn’t seem right.
		* these are Account dependencies 

        - Deposit
            - You’re doing some function definitions and arrow functions. Using both in one file looks inconsistent. If not being defined on the top level, preferably they should be arrows.
            - Some of the lines are too long. Your linter OK’d them?
            - You’ve got a chunky beforeEach and an after each function here. Is there no other way of doing this?
            - A deposit holds the balance?
        - isValidAmount
            - How else has the JS ecosystem solved this problem?
        - Statement
            - More before/after blocks I see…
            - `transaction1` I never want to see an integer in a variable name
            - You’re defining transactions in unit tests for statement. What’s another way of solving the need for data in a test file?
            - Transactions need a lot of info! Six things?
        - withdrawl
            - I really think this is the wrong word.
            - I didn’t notice it on deposit. But I think injecting isValidAmount is taking dependency injection a little too far.
            - Same comments about arrow functions, line length and before/after functions.

Implementation
OK. So this is a big-y. And I now understand your point about prototype construction in the readme. You’re allowing for es6 syntax so I think everything other than isValidAmount should be a class.

Broader point
I’m surprised to see requires and not imports use
