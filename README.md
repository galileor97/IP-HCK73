# IP-HCK73

> Deployment Link:
- Server: https://potret.galileor.com
- Client: https://potret-ai.vercel.app/

# API Documentation

Endpoints
User Management
## 1. Register User
- URL: /register
- Method: POST
- Description: Register a new user
### Request Body:
```json
{
"username": "string",
"email": "string",
"password": "string"
}
```
*Response (201 & Created)*
```json
{
"id": "number",
"username": "string",
"email": "string"
}
```
## 2. User Login
- URL: /login
- Method: POST
- Description: Authenticate a user
### Request Body:
```json
{
"email": "string",
"password": "string"
}
```
*Response (201 & Created)*
```json
{
"access_token": "string"
}
```
## 3. Google Authentication
- URL: /google-auth
- Method: POST
- Description: Authenticate or register a user using Google
### Request Body:
```json
{
"googleToken": "string"
}
```
*Response (200 & OK or 201 & Created)*
```json
{
"access_token": "string"
}
```
## 4. Get User Profile
- URL: /user
- Method: GET
- Description: Get the profile of the authenticated user
- Authentication: Required
*Response (201 & Created)*
```json
{
"user": {
"id": "number",
"username": "string",
"email": "string",
"photo": "string"
}
}
```
## 5. Update User Photo
- URL: /user/photo
- Method: PUT
- Description: Update the user's profile photo
- Authentication: Required
### Request Body:
```json
{
"photoUrl": "string"
}
```
*Response (200 & OK)*
```json
{
"message": "Profile photo updated successfully",
"user": {
"id": "number",
"username": "string",
"email": "string",
"photo": "string"
}
}
```
## 6. Get All Users
- URL: /users
- Method: GET
- Description: Get a list of all users (potentially admin&only)
& Authentication: Required

*Response (200 & OK)*
Array of user objects
Image Management
## 7. Get User's Images
- URL: /images
- Method: GET
- Description: Get all images for the authenticated user
- Authentication: Required

*Response (200 & OK)*
```json
{
"data": [
{
"id": "number",
"imageUrl": "string",
"userId": "number",
"createdAt": "date",
"updatedAt": "date"
}
]
}
```
## 8. Delete Image
- URL: /images/:id
- Method: DELETE
- Description: Delete a specific image
- Authentication: Required
- Parameters: id [number] - Image ID

*Response (200 & OK)*

```json
{
"message": "Image with id <id> successfully deleted"
}
```
## 9. Get Image by ID
- URL: /images/:id
- Method: GET
- Description: Get details of a specific image
- Authentication: Required
- Parameters: id [number] - Image ID

*Response (200 & OK)*
```json
{
"image": {
"id": "number",
"imageUrl": "string",
"userId": "number",
"createdAt": "date",
"updatedAt": "date"
}
}
```
Prediction
## 10. Create Prediction
- URL: /predict
- Method: POST
- Description: Generate a prediction based on uploaded images
- Authentication: Required
### Request Body: Form&data with image files
& base_image: File
- style_image: File
- identity_image: File
- composition_image: File


*Response (200 & OK)*
```json
{
"prediction": ["string"],
"cloudinaryUrl": "string"
}
```
## 11. Generate Sample Image
- URL: /generate-sample
- Method: GET
- Description: Generate a sample image using predefined inputs

*Response (200 & OK)*
```json
{
"output": ["string"]
}
```
Error Responses
*Response (400 & Bad Request)*
```json
{
"message": "Validation error message"
}
```
*Response (401 & Unauthorized)*
```json
{
"message": "Email or Password is incorrect"
}
```
*Response (403 & Forbidden)*
```json
{
"message": "UnAuthenticate"
}
```
*Response (404 & Not Found)*
```json
{
"message": "Data not found"
}
```
*Response (500 & Internal Server Error)*
```json
{
"message": "Internal Server Error"
}
```