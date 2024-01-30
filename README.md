# Musclemotion

### Start the app

To start the development server run each of the following apps

Internal-Frontend: http://localhost:5000/
`npx nx run coruscant:serve --configuration=development`

Internal-Frontend: http://localhost:4000/
`npx nx run kamino:serve --configuration=development`

API: http://localhost:3000/api
`npx nx run endor:serve --configuration=development`

S3 Bucket: http://localhost:6000/
`npx nx run S3:serve --configuration=development `

## Ready to deploy?

Just run `nx build musclemotion` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.
