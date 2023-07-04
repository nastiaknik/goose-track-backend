# Dare Drop Streaming Backend

This backend servise is intended to work with the front-end part of the GooseTrack web-app, created by BioLab team within GoIT academy graduation project.

## Swagger Docs

Detailed API documentation is avaliable at [this endpoint](https://goose-track-backend-i4mr.onrender.com/docs/)

```javascript
"https://goose-track-backend-i4mr.onrender.com/docs/";
```

![Swagger photo](./public/assets/01_readme_swagger.jpg)

## Base URL

The backend part of the web-app is located at render.com web service.
The base URL is indicated below:

```javascript
BASE_URL = "https://goose-track-backend-i4mr.onrender.com";
```

## Endpoints

The endpoints avaliable are listed below:

### Authentication endpoints

The **authentication endpoints** are avaliable at the route

```javascript
"/api/auth";
```

Endpoints avaliable:

  <p><span style="color:#2596be; font-size:16px; font-weight: 600;">POST/register</span> - user registration endpoint;</p>
  <p><span style="color:#39835a; font-size:16px; font-weight: 600;">GET/activate/:verificationToken</span> - user registration endpoint;</p>
  <p><span style="color:#2596be; font-size:16px; font-weight: 600;">POST/activate</span> - user verification email resend endpoint;</p>
  <p><span style="color:#2596be; font-size:16px; font-weight: 600;">POST/login</span> - user login endpoint;</p>
  <p><span style="color:#2596be; font-size:16px; font-weight: 600;">POST/logout</span> - user logout endpoint;</p>
  <p><span style="color:#39835a; font-size:16px; font-weight: 600;">GET/refresh</span> - user refresh endpoint;</p>
  <p><span style="color:#a06aa2; font-size:16px; font-weight: 600;">PATCH/user</span> - update user data endpoint;</p>
  <p><span style="color:#39835a; font-size:16px; font-weight: 600;">GET/current</span> - receive user data endpoint.</p>

### Reviews endpoints

The **reviews endpoints** are avaliable at the route

```javascript
"/api/reviews";
```

Endpoints avaliable:

  <p><span style="color:#39835a; font-size:16px; font-weight: 600;">GET/</span> - get all reviews of all users;</p>
  <p><span style="color:#2596be; font-size:16px; font-weight: 600;">POST/</span> - add new user review;</p>
  <p><span style="color:#39835a; font-size:16px; font-weight: 600;">GET/my-review/:id</span> - get current user's review;</p>
  <p><span style="color:#a06aa2; font-size:16px; font-weight: 600;">PATCH/my-review/:id</span> - get current user's review;</p>
  <p><span style="color:#df655d; font-size:16px; font-weight: 600;">DELETE/my-review/:id</span> - get current user's review.</p>

### Tasks endpoints

The **tasks endpoints** are avaliable at the route

```javascript
"/api/tasks";
```

Endpoints avaliable:

  <p><span style="color:#39835a; font-size:16px; font-weight: 600;">GET/</span> - get all user's tasks;</p>
  <p><span style="color:#39835a; font-size:16px; font-weight: 600;">GET/month/:year-:month</span> - get user's tasks by month;</p>
  <p><span style="color:#39835a; font-size:16px; font-weight: 600;">GET/month/:year-:month-:day</span> - get user's tasks by day;</p>
  <p><span style="color:#2596be; font-size:16px; font-weight: 600;">POST/</span> - add user's task;</p>
  <p><span style="color:#a06aa2; font-size:16px; font-weight: 600;">PATCH/:id</span> - update user's task;</p>
  <p><span style="color:#df655d; font-size:16px; font-weight: 600;">DELETE/:id</span> - delete user's task;</p>
  <p><span style="color:#a06aa2; font-size:16px; font-weight: 600;">PATCH/category/:id</span> - update task state category;</p>

## Technology stack

Backend part of the web-app was created using indicated tech stack:

<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192108372-f71d70ac-7ae6-4c0d-8395-51d8870c2ef0.png" alt="Git" title="Git" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png" alt="REST" title="REST" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="nodejs" title="NodeJS" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="express" title="Express" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB" /></code>
<code><img height="50" src="https://avatars.githubusercontent.com/u/1460763?s=200&v=4" alt="Cloudinary" title="Cloudinary" /></code>
<code><img height="50" src="https://avatars.githubusercontent.com/u/181234?s=200&v=4" alt="SendGrid" title="SendGrid" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" alt="swagger" title="Swagger" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192108891-d86b6220-e232-423a-bf5f-90903e6887c3.png" alt="Visual Studio Code" title="Visual Studio Code" /></code>
<code><img height="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="postman" title="Postman" /></code>
