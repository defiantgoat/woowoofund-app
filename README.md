# WooWooFund Client Application
## Environment
The application was developed on a Mac running BigSur with the following environment:
* Node v12.16.1 (via nvm)

## Technologies Used
* React
* Redux
* Typescript
* Webpack
* Express JS

## Important Setup for Ubuntu 20.04
The api was run on an Ubuntu 20.04 virtual machine via VM Fusion.
* I created a new VM and installed the following packages via **apt**:
 * `build-essential`
 * `curl`
 * `file`
 * `git`
 * `imagemagick`
 * `libmagickwand-dev`
 * `ghostscript`
 
* I used RVM and installed Ruby v2.7.3
* For the client, I installed nvm and installed v12.16.1
 * I then installed yarn via npm. 

**The API uses ImageMagick to convert PDF files to images. A functionality that has been disabled in Ubuntu and requires editing the ImageMagick policy.xml file.
Run the following (if you need to on your machine of VM) A VM is recommended.**
### Update the ImageMagick policy.xml
* Use whatever text editing method you like to edit the following file
* `/etc/ImageMagick-6/policy.xml`
* Comment out or delete the following line: `<policy domain="coder" rights="none" pattern="PDF" />`


## To Run
* Pull Repo to local environment
* Run `yarn` to install node modules
* Run `yarn run develop` to start the application in local development mode
  * The client application will run at http://localhost:8080/app/
  * NOTE: The application expects the [WooWooFund API](https://github.com/defiantgoat/woowoofund-api) to be running as well at http://localhost:9292/api/

## Known Issues
* Application layout is not responsive currently, and will not work well on phone screens.
* Tests do not exist for full coverage as this is POC
* Design and UI/UX would need further refinement.
* Code needs to be reviewed for optimizations.
