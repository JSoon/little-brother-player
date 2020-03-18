<h1>little-brother-player</h1>

![little-brother](./logo.jpg)

<h1>Content Table</h1>

- [Introduction](#introduction)
- [Features in the near future](#features-in-the-near-future)
- [Design Principle](#design-principle)
  - [Lifecycle Diagram](#lifecycle-diagram)
  - [Live Comment](#live-comment)

# Introduction

小老弟H5多媒体播放器。

> Little brother player, which is in progress, is a video player based on HTML5 and coded with ES2015.
> The detailed documents will be produced in the nearly future once the primary features have been fulfilled. If there's anything else you might want to know, please feel free to contact me at serdeemail@gmail.com either in English or Mandarin.

# Features in the near future

- [x] Playing mp3
- [x] Playing mp4
- [x] Playing m3u
- [x] Displaying poster
- [ ] Advertisement
- [ ] Statistics
- [x] Live comment (AKA 弹幕)
- [ ] Share
- [ ] Text tracks
- [ ] ...(TBD)

# Design Principle

## Lifecycle Diagram

![little-brother](./docs/Lifecycle-Diagram.png)

## Live Comment

Considering the rendering performance, this implementation manages to avoid triggerring all the stages but `Composite`. So we do almost everything that's essential at the first place. The process for live comment would be like following steps:

1. Initial `n` pieces comment elements in the DOM for reuse with fixed positions along the Y axis of the video.
2. Bind `transitionend` event on the container of all comment elements to reset the positions of them.
3. Transform the comment element by a certain distance, which is typically the video width that is cached. So as long as the size of the video is not changed, it won't trigger the Layout of browser.
4. As the comments going, there will be no new DOM element being created and appended into the document. As a result, there will be no extra Javascript calculation, less Style, less Layout. The only updates are the innerHTML and styles of comments, which is not a problem at all with GPU acceleration.

