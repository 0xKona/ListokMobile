# Known Bugs and Issues

- When a user uploads a new picture when creating or editing a recipe, if they exit the recipe form without submitting it (saving the recipe) the picture will remain in the google cloud bucket, this causes unneccessary / wasteful usage of space in the bucket. 
    - Side Effects: 
        - None noticeable by user, just unneccesarily wastes storage space.
    - To Fix:
        - Either change logic so that it only submits the new image at the same time as the recipe form, or add logic to exiting the form so that it deletes the image upon exiting, the first option makes more sense but will require reworking the image selector component. 

- When a user uploads or deletes a picture, the loading spinner appears on top of the image component in a way that looks janky and items below is can be seen ( basically it looks terrible ).
    - Side Effects:
        - None.
    - To Fix: 
        - Conditionally remove conflicting items when loading. component may be reworked anyway. 