```

npm i -g vercel

vercel login

email==>>

vercel --prod

```

[why am I suddenly getting: ng : File C:\Users\d\AppData\Roaming\npm\ng.ps1 cannot be loaded](https://stackoverflow.com/questions/72863930/why-am-i-suddenly-getting-ng-file-c-users-d-appdata-roaming-npm-ng-ps1-canno)

This happens as your system, power shell is not yet allowed to execute any executable scripts. This error is encountered mainly in Windows 10 when using VS Code IDE where Power Shell is selected as a command-line option by default.

You can fix this issue by execute the following CMD command in the same Powershell terminal

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

you can create controller without creating folder
```
nest g co [controller name]
```

```
npm run dev
```
