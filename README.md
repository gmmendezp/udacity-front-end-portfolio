# Udacity Front End Portfolio

## Project Overview
For this project, you'll be building a portfolio website. You will be provided a design mockup as a PDF-file, and you must replicate that design in HTML and CSS. You will develop a responsive website that will display images, descriptions and links to each of the portfolio projects you will complete through the course of the Full Stack Nanodegree.
Once you've successfully replicated the design mockup, you are encouraged to continue tweaking and making customizations to the design to personalize it and make it your own! This is your living portfolio site, so make sure you're happy with it.


## Instructions
* Download the design mockup file from the Downloadables section (in the lower right hand corner of your screen, just below this text) and review it.
* Identify the various boxes you will need to build in order to recreate this design.
* Write your HTML and CSS files, continue to iterate until your work is representative of the design mockup.
* Take the time to personalize your portfolio with custom colors, additional content and your own images.
* Validate your HTML and CSS against the W3C's Validators. Note: the validators consider the following errors, whereas Udacity accepts these errors as acceptable:
  * HTML5: Bad value X-UA-Compatible for attribute http-equiv on element meta when using the X-UA-Compatible meta tag.
  * CSS3: Property [some property here] is an unknown vendor extension when using vendor prefixed properties (like -moz-box-sizing).

## Dependencies
* [npm](https://www.npmjs.com/)
* [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/script/index.php)

## Steps to run

1. Clone the repository by downloading the zip file or using `git clone`.
2. Open a terminal and go to the project folder.
3. Execute `npm install` and wait for it to finish.
3. Execute `grunt serve`
4. Navigate to [http://localhost:8000](http://localhost:8000) in your browser.

## Other tasks

* `grunt images` generates the needed `img` folder and creates the different image sizes (This is included when running `grunt serve`).
* `grunt validate` runs `JSHint`, `CSSLint` and html W3C validation of corresponding files.
