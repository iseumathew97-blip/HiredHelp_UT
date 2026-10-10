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

  // contact form: opens the visitor's email app with the request filled in.
  // (No backend yet; swap for a form service later if wanted.)
  var form=$('#quoteForm');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var lines=[];
      $$('input,select,textarea',form).forEach(function(f){
        var lab=form.querySelector('label[for="'+f.id+'"]');
        if(f.value) lines.push((lab?lab.textContent:f.name)+': '+f.value);
      });
      var subject=form.dataset.subject||'Website request';
      window.location.href='mailto:sales@hiredhelput.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(lines.join('\n'));
      $('#formSuccess').classList.add('show');
    });
  }
})();
