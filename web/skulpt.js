function make_outf(output) {
  return function(text) {
    var mypre = document.getElementById(output);
    mypre.innerHTML = mypre.innerHTML + text;
  };
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}
// Here's everything you need to run a python program in skulpt
// grab the code from your textarea
// get a reference to your pre element for output
// configure the output function
// call Sk.importMainWithBody()
function runit(yourcode, output, mycanvas) {
   var prog = document.getElementById(yourcode).value;
   var mypre = document.getElementById(output);
   mypre.innerHTML = '';
   Sk.pre = output;
   //Sk.python3 = true
   outf = make_outf(output);
   Sk.configure({output:outf, read:builtinRead});
   //Sk.python3 = true
   (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = mycanvas;
   var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody("<stdin>", false, prog, true);
   });
   myPromise.then(function(mod) {
       console.log('success');
   },
       function(err) {
       console.log(err.toString());
       outf(err)
   });
}