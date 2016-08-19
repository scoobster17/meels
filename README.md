Meels
=====

Record your favourite meals - or Meels - in your own, digital recipe book.

Prerequisites
-------------

You will need to have ```node``` installed, along with ```npm``` (included with newer node versions).

Once you have cloned the repo, please navigate to the root directory and run ```npm install``` to install dependencies.

Notes
-----

Here are just some quick notes I have jotted down based on research from sainsburys.co.uk and food.com

Further features:
- image(s)
- video
- nutrition info
	- calories
	- total fat
	- saturated fat
	- salt
	- sugar
- rating
- reviews
- write a review
- print button
- social links
- favourites / wishlist
- links to buy ingredients
- related recipes
- link to conversion calculator?

Redux states to consider:

- list page
    - no recipes shown
        - (dispatch) get recipes
            - saved recipes shown

- categories page
    - no used categories shown
        - (dispatch) get used categories
            - used categories shown


- add page
    - no categories shown
        - (dispatch) get categories
            - categories shown
    - 0 total time
        - (dispatch) change prep or cooking time
            - total time updated
    - one / existing ingredient(s)
        - (dispatch) add ingredient button click
            - new ingredient fieldset added
    - one / existing instruction(s)
        - (dispatch) add instruction button click
            - new instruction field added
    - idle for user input
        - (dispatch) submit form
            - pushing data to REST api
                - (dispatch) response
                    - reset form and give user feedback added
