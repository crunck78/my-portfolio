# MyPortfolio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.9.

## Development server

Run `ng serve --proxy-config proxy.conf.json` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Command to Fetch remote Branches

```bash
git fetch --prune && git branch -vv | grep ': gone]' | awk '{print $1}' | xargs git branch -D
```

```powershell
git fetch --prune; git branch -vv | Select-String ': gone]' | %{ $_.ToString().Trim().Split(' ')[0] } | %{ git branch -D $_ }

```

You can automatically delete local branches that do not exist on the remote by running the following command:

This command does the following:

1. ```git fetch --prune```: Fetches the latest changes from the remote repository and prunes any remote-tracking branches that no longer exist on the remote.
2. ```git branch -vv```: Lists all local branches with additional information, including their last commit and the remote branch they are tracking.
3. ```grep ': gone]```': Filters the output to only show branches that are no longer present on the remote repository.
4. ```awk '{print $1}'```: Extracts the branch names from the filtered output.
5. ```xargs git branch -D```: Deletes the local branches that were identified in the previous step.

You can run this command manually whenever you want to clean up your local branches. Alternatively, you can set up a cron job or a scheduled task to run this command automatically at regular intervals.

## Docker development

1. Build image: `docker build -t your-image-name .`
2. Run container: `docker run -p 8080:80 your-image-name`

## Development dependencies

Check dependencies for vulnerabilities:

```bash
npx auditjs ossi
```
