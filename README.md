# TZmap

A world map and clock system that uses SVG graphics to create a high resolution, scalable map of the earth and day night regions, as well an interface of a time zone converter.

An up to date copy is visible at [https://hshark.net/map](https://hshark.net/map)

## Setup:

```
npm install express
npm install jsdom
node testserver.js 
```

## Client Side Render

Visit [http://localhost:8080](http://localhost:8080) in browser. This is because the main page makes use of fetch requests only available in browsers when loading the page from a web server instead of the local filesystem.

Alternatively, you may copy all files except testserver.js to a static directory of an existing webserver without using the test server script.

## Server Side Render

Visit [http://localhost:8080/embeddable](http://localhost:8080/embeddable) in browser to view a server side rendered image. You must use the server script in order for this to display properly. This generated image may be embedded in other websites using iframe, if deployed to a secure, publicly accessible website.

## Credits

All map data was obtained via [https://www.naturalearthdata.com/about/terms-of-use/](https://www.naturalearthdata.com/about/terms-of-use/) and converted to JSON format for compatibility.
