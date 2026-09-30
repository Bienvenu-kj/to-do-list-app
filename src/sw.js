self.addEventListener("install",function(e){
    console.log(e);
});

self.addEventListener("fetch",function(e){
    console.log(e);
    console.log(e.request)
})