# Known Bugs and Issues

- When a user uploads a new picture when creating or editing a recipe, if they exit the recipe form without submitting it (saving the recipe) the picture will remain in the google cloud bucket, this causes unneccessary / wasteful usage of space in the bucket. 
    - Side Effects: 
        - None noticeable by user, just unneccesarily wastes storage space.
    - To Fix:
        - Either change logic so that it only submits the new image at the same time as the recipe form, or add logic to exiting the form so that it deletes the image upon exiting, the first option makes more sense but will require reworking the image selector component. 

- User token expires after 24hrs no matter what.
    - To Fix
        - Extend token life.
        - Refresh when api accessed via middleware.