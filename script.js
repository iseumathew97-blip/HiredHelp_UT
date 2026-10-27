(function(){
  var $=function(s,r){return (r||document).querySelector(s);};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};

  var yr=$('#year'); if(yr) yr.textContent=new Date().getFullYear();

  // mobile nav
  var menuBtn=$('#menuBtn'), navLinks=$('#navLinks');
  if(menuBtn&&navLinks){
    menuBtn.addEventListener('click',function(){navLinks.classList.toggle('open');});
    $$('a',navLinks).forEach(function(a){a.addEventListener('click',function(){navLinks.classList.remove('open');});});
  }

  // header shrink
  var header=$('#siteHeader');
  if(header) window.addEventListener('scroll',function(){header.classList.toggle('scrolled',window.scrollY>30);});

  // scroll reveal
  var fades=$$('.fade-up');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
    },{threshold:.15});
    fades.forEach(function(el){io.observe(el);});
  } else { fades.forEach(function(el){el.classList.add('in');}); }

  // service accordion
  $$('.svc-head').forEach(function(head){
    head.addEventListener('click',function(){
      var card=head.closest('.svc-card');
      card.setAttribute('data-open',card.getAttribute('data-open')==='true'?'false':'true');
    });
  });

  // hero checklist loop
  var clip=$$('#clipList li');
  if(clip.length){
    var idx=0;
    var tick=function(){clip.forEach(function(li){li.classList.remove('checked');});clip[idx].classList.add('checked');idx=(idx+1)%clip.length;};
    tick(); setInterval(tick,1600);
  }

  // tabs (manufacturing)
  var tabs=$$('.tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){t.setAttribute('aria-selected',t===tab?'true':'false');});
      $$('.panel').forEach(function(p){p.classList.toggle('active',p.id===tab.dataset.panel);});
    });
  });

  // area chips -> preselect city, jump to contact
  $$('.area-chip').forEach(function(chip){
    chip.addEventListener('click',function(){
      var sel=$('#city');
      if(sel){
        var want=chip.dataset.city==='Other'?'Other Utah County — check availability':chip.dataset.city;
        for(var i=0;i<sel.options.length;i++){if(sel.options[i].text===want){sel.value=sel.options[i].value;break;}}
      }
      var c=$('#contact'); if(c) c.scrollIntoView({behavior:'smooth'});
    });
  });

  // lightbox
  var lb=$('#lightbox');
  if(lb){
    var lbImg=$('#lightboxImg'), lbCap=$('#lightboxCap');
    $$('.gallery figure').forEach(function(fig){
      fig.addEventListener('click',function(){
        lbImg.src=fig.dataset.full; lbImg.alt=fig.dataset.cap; lbCap.textContent=fig.dataset.cap; lb.classList.add('open');
      });
    });
    $('#lightboxClose').addEventListener('click',function(){lb.classList.remove('open');});
    lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('open');});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('open');});
  }

  // contact form.
  // Set FORM_ENDPOINT to a form service URL (e.g. https://formspree.io/f/xxxxxxx)
  // and submissions are emailed to the address configured in that service.
  // While it is empty, the form falls back to opening the visitor's email app.
  var FORM_ENDPOINT='https://formspree.io/f/mwllljkn';
  var form=$('#quoteForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var lines=[], data={};
      $$('input,select,textarea',form).forEach(function(f){
        var lab=form.querySelector('label[for="'+f.id+'"]');
        var name=lab?lab.textContent:f.name;
        if(f.value){lines.push(name+': '+f.value); data[name]=f.value;}
      });
      var subject=form.dataset.subject||'Website request';
      var ok=$('#formSuccess'), btn=$('button[type="submit"]',form);
      if(!FORM_ENDPOINT){
        window.location.href='mailto:sales@hiredhelput.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
        ok.classList.add('show');
        return;
      }
      data._subject=subject;
      if(btn){btn.disabled=true; btn.dataset.label=btn.textContent; btn.textContent='Sending...';}
      fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){
          if(!r.ok) throw new Error('send failed');
          ok.textContent='Thanks, we got your request. We will contact you soon. Or call 385-412-1277.';
          ok.classList.add('show'); form.reset();
        })
        .catch(function(){
          ok.textContent='Sorry, that did not send. Please call 385-412-1277 or email sales@hiredhelput.com.';
          ok.classList.add('show');
        })
        .then(function(){ if(btn){btn.disabled=false; btn.textContent=btn.dataset.label;} });
    });
  }
})();
