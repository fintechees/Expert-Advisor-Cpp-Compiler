# Expert-Advisor-Cpp-Compiler

This is a Nodejs package to help Fintechee's users compile C/C++ source codes(to make the expert advisors runnable on browser). It will be installed on your local PC. So, network is not required to compile your C/C++ source files.

To know more details about Fintechee, please access our official website: https://www.fintechee.com or our main Github repo: https://github.com/fintechee/Expert-Advisor-Studio

## Prerequisite
Emscripten is required to compile C/C++ files.
So, you need to install it in advance.

## Usage
1. Installation
- Download the git repo, and then extract the zip file.
- cd the directory
- npm i

2. Run
node app.js

3. Compiled files
The compiled files will be stored in the sub-directory: ./static and you can access it via http://127.0.0.1:3000/js/[your js file name]
/js is the alias of ./static

## MIT
