---
title: "Beyond the Limit of Fertile Land..."
year: 2016
date: 2016-01-16
duration: ca. 23'30"
instrumentation: "three violoncellos"
score: "/assets/scores/Beyond the Limit of Fertile Land.pdf"
---
When composing this piece, I used de Bruijn sequences, which are sequences with an alphabet of size k in which every combination of n elements of this alphabet appears exactly just once, and no combinations are missing. E.g. the sequence 001021122(0) contains every combination possible of two numbers exactly once, i.e. 00, 01, 10, 02, 21, 12, 22, 20. A de Bruijn sequence is cyclic, and can be notated in two ways: the last n-1 elements can be repetitions of the first n-1, or alternatively ommited. I opted for the first option (explicit cycle instead of implicit) as, otherwise, not all combinations are present (e.g. in the example above, the string "20" would be missing, or rather left implicit).  

The sequences used are:
* alphabet k=12, string length n=3 for pitches
* alphabet k=12, string length n=3 for durations (but reverse, i.e. [11, 11, ..., 0, 0])
* alphabet k=6, string length n=3 for dynamics
* alphabet k=3, string length n=3 for registers
  
Pitches and duration sequences appear only one single time each, plus the first two elements of the next cycle. Dynamics sequence appears 8 times, plus the first two elements. Sequence of pitch registers appears 64 times, plus the first two elements.