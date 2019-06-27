# WordPress experience
Recently I’ve tried WordPress for one project. In this article I will share my experience related to implementation of the project, both positive and negative.

## Project description
![Petanque](/articles/2/article-2-1.jpg)

It was an outsource project which is basically a content website dedicated to Moscow Petanque Club. We worked in collaboration with UX/UI designer [Lara Sorokina](https://mobile.twitter.com/wid0ki) and project manager Dmitriy Silaev. So, the workflow can be represented as following: Dmitriy made the main communication with client, then Lara made up adaptive designs which suited needs and goals of the project.

Then I’ve got the designs made up in sketch. I am used to work in [Figma](https://www.figma.com/) with design files provided from other redactors, because it offers convenient interface for web developer to determine all the sizes, font styles, colors and other properties of design systems in the fastest way.

In the end, we’ve got the designs for several pages:
* landing page - main page for the website;
* club information - information with contacts and federation info of the club;
* cups page- with all the cups running or that are already been held;
* trainings page - online application for trainings;
* inventory page - offline shop with an ability to make an order.

So, when I realized the scope of the project, what were the full requirements and details of the desired solution, I chose to use CMS with custom theme. For that purpose, WordPress perfectly fits.

## WordPress
![WordPress](/articles/2/article-2-2.png)

[WordPress](https://wordpress.org/) is an open-source CMS based on PHP. Firstly, I was thinking of taking [KeystoneJS](https://keystonejs.com/) as a CMS because it is based on technologies I personally prefer more - node.js and javascript. But in fact, WordPress is the top 1 CMS on the market for over a decade already and it has best support in community. For me it was significant to develop a system that is manageable and scalable for further development and is comfortable to use by client. That is why WordPress is the best choice in this situation.

The main problem with WordPress for me was absence of any experience of working in it at all. But thankfully to the platform, it is very easy to learn. There are couple of educational video-casts dedicated to WordPress in YouTube. Besides that, WordPress itself has powerful documentation.

So what I have done step-by-step is:
1. Made a static site version using html, css (SCSS) and js  ([demo](https://moscow-petanque.netlify.com));
2. Learned basics of WordPress in a day and tried to run simple hello world blog, to understand how exactly it works;
3. Set up the project using WordPress and transferred all my static website work in there as separate theme;
4. Adjusted WordPress for object model of the project;
5. Turned on the plugins for instagram feed, forms, custom fields for custom entities, etc;
6. Modified the solution to fit in additional wishes of client.
Here is the link to the online version, which is now managed by customer:  [https://mospetanque.ru/](https://mospetanque.ru/)

## Why I liked WordPress
![Thumb up](/articles/2/article-2-4.png)

Firstly, I enjoyed working with WordPress because of its simplicity. All I had to do is to download the archive with bundled engine, put it in my web server served directory and run the configuration process in my browser.

Of course, I’ve made personal development and production configurations, set up separate theme and file structure / project file hierarchy. But anyway, it is way less than I could have done with 100% exclusive solution or CMS’s that I’ve already tried at the time.

Secondly, I liked the plugins part of the engine. It is very easy to use and manipulate. It is literally just the click-based meta-programming. Install this, put this in the page and ta-da, fully customizable instagram feed including lazy- and eager- loading features, custom fallbacks, etc. Much of a pleasure to use that kind of service!

## Why I did not like it
![Thumb down](/articles/2/article-2-3.png)

In my personal opinion, PHP is an outdated instrument. I mean, it’s useful for its own purposes, in 2005 when there are no other alternatives of dynamic website engine, but in 2019 there are a lot of different options, starting with simple spa and ending with SSR. As for now PHP should only be used with WordPress. Otherwise, it would be a progress-stopper.

Second thing that I didn’t like much about WordPress is that entity setup is performed inside PHP code. I think this limit was set on purpose to make migration of WordPress sites slightly less painful. But anyways, I don’t like this idea, because it produces lots of boilerplate code and leaves no ability to create entity types manually via admin panel.

## Summary
Taking everything into consideration, I would like to say that WordPress is perfect for some needs, like in my example, for organization website, which included news and updates, online cart shopping and many different pages that are supposed to be editable in an easy way.
