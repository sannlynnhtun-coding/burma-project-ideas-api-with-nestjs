# Burma Project Ideas API with Nest.js

## Installation and Setup

To deploy the project using Vercel, follow these simple steps:

1. Install Vercel globally:
   ```bash
   npm i -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

3. Select your email and provide the necessary credentials when prompted.

4. Deploy the project in production mode:
   ```bash
   vercel --prod
   ```

## Common Issues and Fixes

### PowerShell Execution Policy Error

If you encounter an error similar to the one below when executing scripts in PowerShell:

```
ng : File C:\Users\d\AppData\Roaming\npm\ng.ps1 cannot be loaded
```

This error occurs because your system's PowerShell is not configured to allow the execution of scripts by default. This issue is particularly common on Windows 10, especially when using Visual Studio Code with PowerShell as the default terminal.

#### How to Fix

You can resolve this issue by running the following command in the PowerShell terminal:

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## Useful Commands

### Creating a Controller in NestJS

To generate a controller in your NestJS application without creating a separate folder, use the command:

```bash
nest g co [controller name]
```

Simply replace `[controller name]` with the desired name for your controller.

### Running the NestJS Application in Development Mode

To start your NestJS application in development mode with automatic file watching, run:

```bash
npm run start:dev --watch
```

This command ensures that your server restarts automatically whenever changes are detected.

------

## Acknowledgements

Special thanks to the [Stack Overflow community](https://stackoverflow.com/questions/72863930/why-am-i-suddenly-getting-ng-file-c-users-d-appdata-roaming-npm-ng-ps1-canno) for providing solutions to common PowerShell execution policy issues.

# Projects

This document outlines a list of projects, indicating which have been completed and which are still in progress.

- [x] Min Thein Kha - Lat Htauk Bay Din
- [ ] Dream Dictionary
- [ ] Movie Ticket Online Booking System
- [x] Pick A Pile
- [ ] Myanmar Proverbs
- [ ] Zodiac
- [ ] Bagan Map
- [x] Birds
- [ ] Myanmar Months
- [x] Snakes
- [x] Art Gallery
- [ ] Incompatible Food
- [ ] Missing Historical Records
- [ ] Quotlets
- [ ] Burmese Recipes
- [ ] Burmese Agriculture
- [ ] Banking Management System
- [ ] PhayarSar