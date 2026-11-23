/* Google Analytics 4 for hiredhelput.com (Measurement ID G-RKF18MGG58) */
(function(){
  var ID='G-RKF18MGG58';
  var s=document.createElement('script');
  s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+ID;
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  gtag('js',new Date());
  gtag('config',ID);

  var path=location.pathname;
  var division=path.indexOf('/manufacturing')===0?'manufacturing':(path.indexOf('/home')===0?'home_services':'hub');

  // phone and email clicks
  document.addEventListener('click',function(e){
    var a=e.target.closest?e.target.closest('a[href]'):null;
    if(!a) return;
    var h=a.getAttribute('href')||'';
    if(h.indexOf('tel:')===0) gtag('event','phone_click',{division:division,link_text:(a.textContent||'').trim().slice(0,40)});
    else if(h.indexOf('mailto:')===0) gtag('event','email_click',{division:division});
  });

  // called by script.js after a form is accepted
  window.hhTrackForm=function(source){
    gtag('event','generate_lead',{division:division,how_heard:source||'not_given'});
  };
})();
