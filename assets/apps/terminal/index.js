mkw(`<input class="i1" id="termbox" placeholder="Enter JS code here"></i1>
<button class="b1" onclick="document.getElementById('termbox').value = '';">Clear</button><button class="b1"
    onclick="const t = document.getElementById('termbox').value;eval(t);snack('Executed.', 2500);">Execute!</button>`, 'Terminal', '280px', 'auto', undefined, undefined, true, undefined, "terminal");