# URL Image Manipulation

Insert commands in the URL to modify an existing image. Made with http://sharp.dimens.io

## How does it work

To get all existing images on the server just access it without any params like:
```
localhost:8082/
```
You will receive all images in the folder ``images`` in a JSON file like this:
```json
[
	"image1.png",
    "image2.png",
    ...
]
```

Now you can acces the given images like:
```
localhost:8082/image1.png
```
And you get the original picture back.

To modify any picture, give it some modification params:
```
localhost:8082/res_100_100/image1.png
```
You receive the same image as before but its now its 100x100 px

Set multiple modifications in one URL:
```
localhost:8082/res_100_100,embed/image1.png
```
## All modifications

more detail at http://sharp.dimens.io/en/stable/
### Resize Options

 * ``res_(width)_(height)`` Resize the image to the given params in px
 * ``h_(height)`` Set the height and the width will be auto 
 * ``w_(width)`` Set the width and the height will be auto 
 * ``crop_(dir)`` The possible directions are [north, east, south, west]
 * ``embed`` Preserving the aspect ratio to the maximum with or height
 * ``max`` Preserving the aspect ratio to be as large as possilbe
 * ``iAR`` Stretch the image to the exact width and/ or height

### Image Operation Options

 * ``rotate_(int) `` Rotate the image with [90, 180, 270, 360]
 * ~~``extract_(width)_(height)`` Extract a region of the image.~~
 * ``flip`` Flips the image
 * ``flop`` Flops the image
 * ``sharpen_(int)`` Sharpens the Image
 * ``blur_(int)`` Blurs the Image
 * ~~``extend`` Extends the Image~~
 * ``flatten`` Merge alpha transparency channel
 * ``trim_(int)`` Trim "boring" pixels from all edges
 * ``gamma_(int)`` Apply a gamma correction
 * ``negate`` Produce the "negative" of the image.
 * ``normalise`` Enhance output image contrast
 * ``threshold_(int)`` Any pixel value greather than or equal to the threshold

### Color Manipulation Options

* ``background_(red)_(green)_(blue)`` Set the background
* ``greyscale `` Sets image grey`

## Install

just run
```bash
npm install
```
And then start the server with
```bash
node server
```