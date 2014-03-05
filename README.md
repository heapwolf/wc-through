# SYNOPSIS
unix wc core util as a through stream, counts into an object

# USAGE

as data passes though it increments the counter

```js
  
  var counters = {}

  fs.createReadStream('./foo.txt')
    .pipe(wc(counters))
    .on('end', function() {
      console.log(counters)
    })

```

the result is something like this

```json
{ "ccount": 219127, "wcount": 32584, "lcount": 655 }
```
