# My first article

What this article would be about? I asked myself this question so many times before I even started to work on my own blog. Now, when I am done with MVP, the answer is obvious. I will write an article on my pains writing my own blog engine!

## Blog engine? Whaaat?

Yeah, actually it is not an engine, but just a react app with firebase as the data source. But nevertheless, it works for me as an engine, because I am planning to use it only for posting the articles through the firebase. So, it counts.

Still, it was not that easy to implement it as it is, I struggled with my choice of instruments a little. Firebase has some constraints, and even if it is like "hey, I am very simple, everybody can use me", in practice it is like "hey, I am too simple so you probably can't make advanced stuff with me".

For example, I really wanted to store my articles as `article-1.md`-like files, but unfortunately, did not find any information about the cors policy in firebase and how to turn it off. This is not even advanced topic though.

Other example is that in Firestore, it is not possible to store a newline symbol. After I tried storing `article-1.md`-like files in firebase and faced the cors problem, I decided to try out saving my articles in Markdown format, but with use of Firestore. So when I tried to save my file in a string, I lost all my newlines and the `showdown` parser I tried to use in runtime just gave me single `<h1>...</h1>` tag. What a pity...

Anyway, I resolved that problem with saving plain preprocessed HTML in Firestore, I hope I will not hate myself in some time for that decision, for me it looks fine for now. At least I have something to store my articles.   

## React pains

React is a bit useless without state management. I did not want to add a state manager to such small project and at the moment I've started working on the project, I did not have much time to explore React Hooks. Right now I am pretty happy with what I have. The project is tiny and in my opinion, the instruments should not be overused for no real reason.   

## CSS Transitions

In the project I really forced myself to use some of the fancy and attractive transitions between pages. For that purpose I used `react-transition-group`. After I have worked with it for a while, I realise that it is surely not the best way to work with animation in react.

Firstly, it dramatically increases the size of the component state (!!!one more field to store!!!). Secondly, it increases the CSS with at least one set of classes for each transition. I have not worked with other animation solutions in React so far, but it is obvious that there is a loot more better way to do that. Again, for that kind of tiny project it is not necessary to use something different, but for larger projects it is obligatory. 

## Summary

To summarize, with development of my little blog I learned a lot. Animations in React, some graphical design stuff, awesome some tools like [trianglify](https://trianglify.io/) and [realfavicongenerator.net](https://realfavicongenerator.net/). I enjoyed working with React, and I hope this is just the beginning for me.

Thank you for reading my first article in my blog, I hope you will come here later and notice some progress!
