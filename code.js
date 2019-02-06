"use strict";

function roll()
{
   let nDices = $('#dices').val();
   let exploding = $('#exploding').prop('checked');
   let target = $('#target').val();
   if (!nDices) return;
   
   let result = { successes: new Array(100).fill(0), failures: 0, critFailures: 0 };
   
   let max = 1000000;
   for (let i = 0; i < max; ++i)
   {
      let results = Array.apply(null, {length: nDices}).map(Function.call, () => Math.floor((Math.random() * 10) + 1));
      let successes = results.filter(x => x > 6).length;
      let tens = results.filter(x => x == 10).length;
      let ones = results.filter(x => x == 1).length;
      
      if (exploding)
         successes += tens;
      
      if (ones > 0 && successes == 0)
         result.critFailures++;
      else
         result.successes[successes]++;
   }
   
   function successMap()
   {
      let display = [];
      for (let i = 0; i < result.successes.length; ++i)
         if (result.successes[i] > 0)
            display.push('' + i + ' successes: ' + result.successes[i]/max + '<br />');
      return display;
   }
   
   function passTarget()
   {
      let passed = 0;
      for (let i = target; i < result.successes.length; ++i)
         passed += result.successes[i];
      return passed/max;
   }
   
   $('#result').empty().append(
      'Rolling ' + nDices + (exploding ? ' exploding ' : ' ') + 'dices.<br />',
      successMap(),
      'Critical failures: ' + result.critFailures/max + '<br />',
      '<br />',
      'Passed target: ' + passTarget()
   )
}