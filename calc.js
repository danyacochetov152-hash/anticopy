(function(){
  'use strict';

  function fmt(n){
    return new Intl.NumberFormat('ru-RU').format(Math.round(n)) + ' ₽';
  }

  var ids = ['booksFirst','booksExtra','monthlyClients','links','partnerAvg','partnerClients'];

  function num(id){
    var el = document.getElementById(id);
    if (!el) return 0;
    var raw = String(el.value).replace(/\s/g,'').replace(',', '.');
    var v = parseFloat(raw);
    return (isNaN(v) || v < 0) ? 0 : v;
  }

  function set(id, text){
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function calc(){
    var key     = num('booksFirst') * 85000 + num('booksExtra') * 30000;
    var monthly = num('monthlyClients') * 2000 * 12;
    var links   = num('links') * 150 * 12;
    var partner = num('partnerAvg') * num('partnerClients');
    var total   = key + monthly + links + partner;

    var star      = total * 0.5;
    var anti      = total * 0.5;
    var head      = total * 0.3;
    var antiRest  = anti - head;

    set('resKey', fmt(key));
    set('resMonthly', fmt(monthly));
    set('resLinks', fmt(links));
    set('resPartner', fmt(partner));
    set('resTotal', fmt(total));
    set('resStar', fmt(star));
    set('resAnti', fmt(anti));
    set('resHead', fmt(head));
    set('resAntiRest', fmt(antiRest));

    var note = document.getElementById('jsNote');
    if (note) note.style.display = 'none';
  }

  function bind(){
    ids.forEach(function(id){
      var el = document.getElementById(id);
      if (!el) return;
      ['input','change','keyup','blur','paste'].forEach(function(evt){
        el.addEventListener(evt, calc);
      });
    });
    window.addEventListener('pageshow', calc);
    window.addEventListener('orientationchange', calc);
    document.addEventListener('visibilitychange', function(){
      if (!document.hidden) calc();
    });
    calc();
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }
})();